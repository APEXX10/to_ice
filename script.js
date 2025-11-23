// Basic interactive behavior and confetti for the proposal page
(function(){
  const envelope = document.getElementById('envelope');
  const paper = document.getElementById('paper');
  const recipientSpan = document.getElementById('recipient');
  const paperText = document.getElementById('paperText');

  // Edit these values directly to customize
  let recipient = 'ICE';
  let message = 'ฉันชอบเธอมาก อยากให้เธอเป็นแฟนฉัน จะยอมไหม?';

  // Only populate from script defaults if the HTML doesn't already contain custom text.
  if(!recipientSpan.textContent || !recipientSpan.textContent.trim()){
    recipientSpan.textContent = recipient;
  }
  if(!paperText.textContent || !paperText.textContent.trim()){
    paperText.textContent = message;
  }

  let opened = false;

  function openEnvelope(){
    if(opened) return;
    opened = true;
    envelope.classList.add('open');
    envelope.setAttribute('aria-pressed','true');
    // small delay then show confetti
    setTimeout(()=> launchConfetti(), 600);
    // start 10-second countdown then navigate to the proposal page
    startCountdown && startCountdown(10, ()=>{ window.location.href = 'proposal.html'; });
  }

  function closeEnvelope(){
    if(!opened) return;
    opened = false;
    envelope.classList.remove('open');
    envelope.setAttribute('aria-pressed','false');
    // stop countdown if envelope closed
    stopCountdown && stopCountdown();
  }

  function toggleEnvelope(){
    if(opened) closeEnvelope(); else openEnvelope();
  }

  envelope.addEventListener('click', toggleEnvelope);
  envelope.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleEnvelope(); } });

  // Countdown implementation (shows in #countdown). Calls callback when finished.
  const countdownEl = document.getElementById('countdown');
  let countdownTimer = null;
  function startCountdown(seconds, onFinish){
    if(!countdownEl) return;
    clearInterval(countdownTimer);
    let t = Math.max(0, Math.floor(seconds));
    countdownEl.hidden = false;
  countdownEl.textContent = `เริ่มเลยมั้ยคะ? ${t} วิ`;
    countdownTimer = setInterval(()=>{
      t--;
      if(t <= 0){
        clearInterval(countdownTimer);
        countdownEl.textContent = 'กำลังเริ่ม...';
        if(typeof onFinish === 'function') onFinish();
      } else {
        countdownEl.textContent = `เริ่มเลยมั้ยคะ? ${t} วิ`;
      }
    }, 1000);
  }
  function stopCountdown(){
    if(countdownTimer) clearInterval(countdownTimer);
    if(countdownEl) countdownEl.hidden = true;
  }

  // Confetti
  function launchConfetti(){
    const root = document.getElementById('confetti-root');
    const colors = ['#ff6b6b','#ffd166','#6ee7b7','#8ec5ff','#cba6ff','#ffb4c0'];
    const count = 80;
    for(let i=0;i<count;i++){
      const el = document.createElement('div');
      el.className = 'confetti';
      const size = 6 + Math.random()*12;
      el.style.width = size + 'px';
      el.style.height = (size * 1.6) + 'px';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.left = (10 + Math.random()*80) + '%';
      el.style.top = (Math.random()*30) + '%';
      el.style.opacity = (0.9 - Math.random()*0.4).toString();
      el.style.borderRadius = (Math.random()*4) + 'px';
      root.appendChild(el);

      // animate in an outward arc
      const dx = (Math.random()*2-1) * 300;
      const dy = 400 + Math.random()*200;
      const rot = (Math.random()*360);
      el.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity:el.style.opacity },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity:0.2 }
      ],{ duration: 1600 + Math.random()*1400, easing: 'cubic-bezier(.2,.7,.2,1)', iterations:1 });

      setTimeout(()=>{ try{ root.removeChild(el); }catch(e){} }, 3200);
    }
  }

})();
