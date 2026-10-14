// ===== Endolaser Treino — lógica =====
const LS = 'endolaser_v1';
const DAILY_GOAL = 30; // XP/dia
const todayStr = () => new Date().toISOString().slice(0,10);

function load(){
  let s = {};
  try { s = JSON.parse(localStorage.getItem(LS)) || {}; } catch(e){ s = {}; }
  s.xp = s.xp||0; s.streak = s.streak||0; s.lastDay = s.lastDay||null;
  s.todayDay = s.todayDay||null; s.todayXp = s.todayXp||0;
  s.lessons = s.lessons||{};   // id -> {done:bool, best:acc, correct, total}
  s.cards = s.cards||{};       // idx -> {box, due}
  return s;
}
function save(s){ localStorage.setItem(LS, JSON.stringify(s)); }
let S = load();

// streak / daily rollover
(function rollover(){
  const t = todayStr();
  if (S.todayDay !== t){ S.todayDay = t; S.todayXp = 0; save(S); }
})();

function addXp(n){
  S.xp += n; S.todayXp += n;
  const t = todayStr();
  if (S.lastDay !== t){
    const y = new Date(Date.now()-86400000).toISOString().slice(0,10);
    S.streak = (S.lastDay === y) ? S.streak+1 : 1;
    S.lastDay = t;
  }
  save(S);
}

function show(id){
  document.querySelectorAll('.screen').forEach(e=>e.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
  window.scrollTo(0,0);
}
function setTop(){
  document.getElementById('s-streak').textContent = S.streak;
  document.getElementById('s-xp').textContent = S.xp;
}

// ---------- HOME ----------
function lessonUnlocked(i){
  if (i===0) return true;
  const prev = TRILHA[i-1];
  return !!(S.lessons[prev.id] && S.lessons[prev.id].done);
}
function renderHome(){
  setTop();
  // meta diária
  const pct = Math.min(100, Math.round(S.todayXp/DAILY_GOAL*100));
  document.getElementById('goalpct').textContent = pct+'%';
  document.getElementById('goalpath').style.strokeDashoffset = (100-pct);
  document.getElementById('goaltxt').textContent = Math.min(S.todayXp,DAILY_GOAL)+' / '+DAILY_GOAL+' XP hoje';
  // trilha
  const box = document.getElementById('trilha'); box.innerHTML='';
  TRILHA.forEach((l,i)=>{
    const st = S.lessons[l.id]||{};
    const unlocked = lessonUnlocked(i);
    const done = !!st.done;
    const el = document.createElement('div');
    el.className = 'node'+(done?' done':'')+(unlocked?'':' locked');
    const acc = st.best!=null ? st.best+'% de acerto' : (l.questions.length+' questões');
    el.innerHTML = `<div class="ic">${done?'✓':l.icone}</div>
      <div class="tt"><b>${i+1}. ${l.titulo}</b><small>${unlocked?acc:'🔒 Conclua a lição anterior'}</small>
      <div class="minibar"><i style="width:${done?100:0}%"></i></div></div>
      <div class="chev">${unlocked?'▶':'🔒'}</div>`;
    if (unlocked) el.onclick = ()=>startLesson(i);
    box.appendChild(el);
  });
}

// ---------- LESSON ----------
let cur = { li:0, qi:0, correct:0, picked:null, answered:false };
function startLesson(i){
  cur = { li:i, qi:0, correct:0, picked:null, answered:false };
  show('lesson'); renderQ();
}
function renderQ(){
  const l = TRILHA[cur.li], q = l.questions[cur.qi];
  document.getElementById('pbar').style.width = (cur.qi/l.questions.length*100)+'%';
  document.getElementById('hearts').textContent = `${cur.qi+1}/${l.questions.length}`;
  document.getElementById('q-title').textContent = q.q;
  const ob = document.getElementById('q-opts'); ob.innerHTML='';
  // embaralhar opções mantendo índice correto
  const order = q.opts.map((t,idx)=>({t,idx})).sort(()=>Math.random()-0.5);
  q._order = order;
  order.forEach((o,pos)=>{
    const b = document.createElement('button');
    b.className='opt'; b.textContent=o.t;
    b.onclick = ()=>pick(pos,b);
    ob.appendChild(b);
  });
  cur.picked=null; cur.answered=false;
  const fb=document.getElementById('feedback'); fb.className='feedback hidden';
  const cb=document.getElementById('checkbtn'); cb.className='big'; cb.textContent='Verificar'; cb.disabled=true; cb.onclick=checkAnswer;
}
function pick(pos,btn){
  if (cur.answered) return;
  cur.picked=pos;
  document.querySelectorAll('#q-opts .opt').forEach(e=>e.classList.remove('sel'));
  btn.classList.add('sel');
  document.getElementById('checkbtn').disabled=false;
}
function checkAnswer(){
  if (cur.picked==null || cur.answered) return;
  cur.answered=true;
  const l=TRILHA[cur.li], q=l.questions[cur.qi];
  const chosen=q._order[cur.picked];
  const isOk = chosen.idx===q.correct;
  const opts=document.querySelectorAll('#q-opts .opt');
  opts.forEach((e,pos)=>{ e.classList.add('disabled');
    if (q._order[pos].idx===q.correct) e.classList.add('ok');
    else if (pos===cur.picked) e.classList.add('no');
  });
  if (isOk) cur.correct++;
  const fb=document.getElementById('feedback');
  fb.className='feedback '+(isOk?'good':'bad');
  document.getElementById('fb-title').textContent = isOk?'Correto! ✅':'Quase! A resposta certa está marcada.';
  document.getElementById('fb-exp').textContent = q.exp;
  const cb=document.getElementById('checkbtn');
  cb.className='big '+(isOk?'good':'bad');
  cb.textContent = (cur.qi+1 < l.questions.length)?'Continuar':'Finalizar';
  cb.disabled=false; cb.onclick=nextQ;
}
function nextQ(){
  const l=TRILHA[cur.li];
  if (cur.qi+1 < l.questions.length){ cur.qi++; renderQ(); }
  else finishLesson();
}
function finishLesson(){
  const l=TRILHA[cur.li];
  const acc = Math.round(cur.correct/l.questions.length*100);
  const gained = cur.correct*10 + (acc===100?10:0);
  addXp(gained);
  const prev=S.lessons[l.id]||{};
  S.lessons[l.id] = { done:true, best:Math.max(prev.best||0,acc), correct:cur.correct, total:l.questions.length };
  save(S);
  document.getElementById('r-emoji').textContent = acc>=80?'🎉':(acc>=50?'👍':'💪');
  document.getElementById('r-title').textContent = acc>=80?'Mandou bem!':'Lição concluída!';
  document.getElementById('r-xp').textContent='+'+gained;
  document.getElementById('r-acc').textContent=acc+'%';
  show('result'); setTop();
}
function quitLesson(){ show('home'); renderHome(); }

// ---------- FLASHCARDS (SRS Leitner simples) ----------
let fq = [], fi = 0, fFlipped=false;
function dueCards(){
  const t = todayStr();
  const arr=[];
  FLASHCARDS.forEach((_,idx)=>{
    const c=S.cards[idx]; if (!c || !c.due || c.due<=t) arr.push(idx);
  });
  return arr;
}
function openFlash(){
  fq = dueCards(); if (fq.length===0) fq = FLASHCARDS.map((_,i)=>i); // se nada vencido, revisa tudo
  fq.sort(()=>Math.random()-0.5);
  fi=0; show('flash');
  document.getElementById('fdone').classList.add('hidden');
  document.getElementById('frate').classList.add('hidden');
  document.getElementById('card').classList.remove('hidden');
  renderCard();
}
function renderCard(){
  if (fi>=fq.length){ 
    document.getElementById('card').classList.add('hidden');
    document.getElementById('frate').classList.add('hidden');
    document.getElementById('fdone').classList.remove('hidden');
    return;
  }
  const idx=fq[fi]; const [term,def]=FLASHCARDS[idx];
  document.getElementById('fc-term').textContent=term;
  document.getElementById('fc-def').textContent=def;
  document.getElementById('fcount').textContent=(fi+1)+'/'+fq.length;
  document.getElementById('fpbar').style.width=(fi/fq.length*100)+'%';
  fFlipped=false;
  document.getElementById('card').classList.remove('flip');
  document.getElementById('frate').classList.add('hidden');
}
function flipCard(){
  fFlipped=!fFlipped;
  document.getElementById('card').classList.toggle('flip',fFlipped);
  document.getElementById('frate').classList.toggle('hidden',!fFlipped);
}
function rateCard(good){
  const idx=fq[fi];
  const c=S.cards[idx]||{box:0};
  if (good){ c.box=Math.min((c.box||0)+1,5); } else { c.box=1; }
  const days=[0,1,2,4,7,15][c.box]||15;
  c.due=new Date(Date.now()+days*86400000).toISOString().slice(0,10);
  S.cards[idx]=c; save(S);
  if (good) addXp(3);
  setTop();
  fi++; renderCard();
}

// ---------- PROGRESS ----------
function renderProgress(){
  document.getElementById('p-xp').textContent=S.xp;
  document.getElementById('p-streak').textContent=S.streak+' dia'+(S.streak===1?'':'s');
  let c=0,t=0;
  Object.values(S.lessons).forEach(l=>{ c+=l.correct||0; t+=l.total||0; });
  document.getElementById('p-acc').textContent = t? Math.round(c/t*100)+'%':'—';
  const box=document.getElementById('p-lessons'); box.innerHTML='';
  TRILHA.forEach((l,i)=>{
    const st=S.lessons[l.id]||{};
    const d=document.createElement('div'); d.className='prow';
    d.innerHTML=`<span>${l.icone} ${i+1}. ${l.titulo}</span><b>${st.done?(st.best+'%'):'—'}</b>`;
    box.appendChild(d);
  });
}
function resetAll(){
  if (confirm('Zerar todo o progresso (XP, ofensiva, lições)?')){
    localStorage.removeItem(LS); S=load(); renderHome(); show('home');
  }
}

// init
renderHome(); show('home');
if ('serviceWorker' in navigator){ navigator.serviceWorker.register('sw.js').catch(()=>{}); }
