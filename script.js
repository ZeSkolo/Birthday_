const lock=document.querySelector('#lockScreen'), experience=document.querySelector('#experience');
const form=document.querySelector('#passwordForm'), password=document.querySelector('#password'), error=document.querySelector('#error');
function unlock(){lock.style.display='none';experience.hidden=false;requestAnimationFrame(()=>document.querySelectorAll('.reveal').forEach(el=>observer.observe(el)));sparkle(16);}
form.addEventListener('submit',e=>{e.preventDefault();if(password.value==='0418'){sessionStorage.setItem('kemjuuki-unlocked','yes');unlock()}else{error.textContent='Not quite… hint: four numbers that mean something to us.';password.animate([{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'none'}],{duration:250})}});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.14});
if(sessionStorage.getItem('kemjuuki-unlocked')==='yes'||location.search.includes('preview=1')||location.pathname.endsWith('preview.html')) unlock();
function sparkle(count=24){for(let i=0;i<count;i++){const p=document.createElement('span');p.className='petal';p.textContent=['★','♡','·','♥'][Math.floor(Math.random()*4)];p.style.left=Math.random()*100+'vw';p.style.fontSize=12+Math.random()*18+'px';p.style.animationDuration=3+Math.random()*4+'s';p.style.setProperty('--drift',(Math.random()*180-90)+'px');document.querySelector('#petals').appendChild(p);setTimeout(()=>p.remove(),7000)}}
document.querySelector('#confettiBtn').addEventListener('click',()=>sparkle(42));
const no=document.querySelector('#noBtn');let dodges=0;['mouseenter','click','touchstart'].forEach(evt=>no.addEventListener(evt,e=>{e.preventDefault();dodges++;no.style.transform=`translate(${Math.random()*140-70}px,${Math.random()*70-35}px)`;if(dodges>2)no.textContent='Okay fine, YES';}));
document.querySelector('#yesBtn').addEventListener('click',()=>{document.querySelector('#answerText').textContent='Correct answer. You are loved in every timeline. ♡';sparkle(30)});
const envelope=document.querySelector('#envelope');function toggleLetter(){envelope.classList.toggle('open')}envelope.addEventListener('click',toggleLetter);envelope.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleLetter()}});
document.querySelectorAll('.gift').forEach(g=>g.addEventListener('click',()=>{document.querySelector('#giftReveal').textContent='★ '+g.dataset.message;g.style.transform='translateY(-8px) rotate(1deg)';sparkle(12)}));
const cake=document.querySelector('#cake'),wish=document.querySelector('#wishBtn');function makeWish(){cake.classList.add('blown');showToast('Wish sent to the universe ♡');sparkle(50)}cake.addEventListener('click',makeWish);wish.addEventListener('click',makeWish);
function showToast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2600)}

// Kemjuuki's Couple Arcade
const wonGames=new Set();
function winGame(name,card){if(wonGames.has(name))return;wonGames.add(name);card.classList.add('won');const stamps=document.querySelectorAll('#stampTrack i');stamps[wonGames.size-1].classList.add('won');stamps[wonGames.size-1].textContent='♥';document.querySelector('#stampCount').textContent=wonGames.size+' / 4';sparkle(18);if(wonGames.size===4){const prize=document.querySelector('#arcadePrize');prize.classList.add('unlocked');prize.innerHTML='<span>🎟️</span><div><b>PRIZE UNLOCKED: One wish, no questions asked</b><p>Screenshot this coupon. Redeem it with me whenever you want, Kaju ki Katlii. ♡</p></div>';showToast('All games won — secret prize unlocked!')}}

// Game 1: memory match
const memoryIcons=['🍰','🌙','💌','🌸','🍰','🌙','💌','🌸'];let memoryOpen=[],memoryLock=false,memoryMoves=0;
function setupMemory(){const board=document.querySelector('#memoryBoard');memoryOpen=[];memoryLock=false;memoryMoves=0;document.querySelector('#memoryMoves').textContent='Moves: 0';board.innerHTML='';[...memoryIcons].sort(()=>Math.random()-.5).forEach(icon=>{const tile=document.createElement('button');tile.className='memory-tile';tile.textContent=icon;tile.setAttribute('aria-label','Hidden memory card');tile.addEventListener('click',()=>flipMemory(tile,icon));board.appendChild(tile)})}
function flipMemory(tile,icon){if(memoryLock||tile.classList.contains('flipped')||tile.classList.contains('matched'))return;tile.classList.add('flipped');tile.setAttribute('aria-label',icon);memoryOpen.push({tile,icon});if(memoryOpen.length===2){memoryMoves++;document.querySelector('#memoryMoves').textContent='Moves: '+memoryMoves;if(memoryOpen[0].icon===memoryOpen[1].icon){memoryOpen.forEach(x=>x.tile.classList.add('matched'));memoryOpen=[];if(document.querySelectorAll('.memory-tile.matched').length===8)winGame('memory',document.querySelector('#memoryGame'))}else{memoryLock=true;setTimeout(()=>{memoryOpen.forEach(x=>x.tile.classList.remove('flipped'));memoryOpen=[];memoryLock=false},650)}}}
document.querySelector('#resetMemory').addEventListener('click',setupMemory);setupMemory();

// Game 2: word decoder
document.querySelector('#checkDecoder').addEventListener('click',()=>{const val=document.querySelector('#decoderInput').value.trim().toLowerCase().replace(/\s/g,''),status=document.querySelector('#decoderStatus');if(val==='kemjuuki'){status.textContent='Decoded! My brilliant Kemjuuki. ♥';winGame('decoder',document.querySelector('#decoderGame'))}else{status.textContent='Not quite… the letters are all there. Try again 😏'}});
document.querySelector('#decoderInput').addEventListener('keydown',e=>{if(e.key==='Enter')document.querySelector('#checkDecoder').click()});

// Game 3: this-or-that date builder
const dateChoices=[['Sunset drive','Midnight walk'],['Street food','Fancy dinner'],['Movie cuddles','Game-night chaos'],['Photos together','Phones completely away']];let choiceIndex=-1,chosen=[];
function renderChoice(){const prompt=document.querySelector('#choicePrompt'),btns=[...document.querySelectorAll('#choiceButtons button')];if(choiceIndex<0){prompt.textContent='Ready to plan our date?';return}if(choiceIndex>=dateChoices.length){prompt.textContent='Perfect date created: '+chosen.join(' + ');document.querySelector('#choiceButtons').hidden=true;document.querySelector('#choiceResult').textContent='Approved. I am taking notes. 📝';winGame('choices',document.querySelector('#choiceGame'));return}prompt.textContent='Pick one — no overthinking';btns[0].textContent=dateChoices[choiceIndex][0];btns[1].textContent=dateChoices[choiceIndex][1]}
document.querySelectorAll('#choiceButtons button').forEach((btn,i)=>btn.addEventListener('click',()=>{if(choiceIndex<0)choiceIndex=0;else{chosen.push(dateChoices[choiceIndex][i]);choiceIndex++}renderChoice()}));

// Game 4: catch the hearts
let catchTimer=null,spawnTimer=null,catchScore=0,timeLeft=15;
document.querySelector('#startCatch').addEventListener('click',startCatch);
function startCatch(){const arena=document.querySelector('#catchArena');arena.innerHTML='';clearInterval(catchTimer);clearInterval(spawnTimer);catchScore=0;timeLeft=15;updateCatch();spawnTimer=setInterval(spawnItem,520);catchTimer=setInterval(()=>{timeLeft--;updateCatch();if(timeLeft<=0||catchScore>=8)endCatch()},1000)}
function spawnItem(){const arena=document.querySelector('#catchArena');if(!arena||catchScore>=8)return;const item=document.createElement('button'),heart=Math.random()>.27;item.className='falling-item';item.textContent=heart?'💗':'🌧️';item.style.left=Math.random()*82+'%';item.style.animationDuration=(1.7+Math.random()*1.2)+'s';item.setAttribute('aria-label',heart?'Catch heart':'Avoid cloud');item.addEventListener('click',()=>{if(heart){catchScore++;item.textContent='✨'}else{catchScore=Math.max(0,catchScore-1);item.textContent='💨'}updateCatch();setTimeout(()=>item.remove(),100)});arena.appendChild(item);setTimeout(()=>item.remove(),3100)}
function updateCatch(){document.querySelector('#catchScore').textContent='Hearts: '+catchScore+' / 8';document.querySelector('#catchTime').textContent='Time: '+timeLeft}
function endCatch(){clearInterval(catchTimer);clearInterval(spawnTimer);const arena=document.querySelector('#catchArena');arena.querySelectorAll('.falling-item').forEach(x=>x.remove());const btn=document.createElement('button');btn.className='catch-start';if(catchScore>=8){btn.textContent='You caught my heart ♥';winGame('catch',document.querySelector('#catchGame'))}else btn.textContent='So close — try again';btn.addEventListener('click',startCatch);arena.appendChild(btn)}


// Level 02: the intentionally annoying birthday gift gate
const giftGate=document.querySelector('#giftGate');
function showGiftGate(){lock.style.display='none';experience.hidden=true;giftGate.hidden=false;window.scrollTo(0,0)}
function passGiftGate(choice){sessionStorage.setItem('kemjuuki-gift-choice',choice);giftGate.hidden=true;experience.hidden=false;requestAnimationFrame(()=>document.querySelectorAll('.reveal:not(.visible)').forEach(el=>observer.observe(el)));sparkle(45);showToast(choice+' selected. Birthday universe unlocked!')}
function resetToGate(modal){modal.hidden=true;giftGate.hidden=false;giftGate.querySelector('.gate-card').classList.add('shake');setTimeout(()=>giftGate.querySelector('.gate-card').classList.remove('shake'),400)}
document.querySelectorAll('.answer-option.correct').forEach(btn=>btn.addEventListener('click',()=>passGiftGate(btn.dataset.choice)));
const retryModal=document.querySelector('#retryModal'),naughtyModal=document.querySelector('#naughtyModal');
document.querySelector('#nothingOption').addEventListener('click',()=>{retryModal.hidden=false;document.querySelector('#customWish').focus()});
document.querySelector('#otherOption').addEventListener('click',()=>{retryModal.hidden=false;document.querySelector('#retryTitle').textContent='Okay, tell me everything.';document.querySelector('#customWish').focus()});
document.querySelector('#closeRetry').addEventListener('click',()=>resetToGate(retryModal));
document.querySelector('#saveWish').addEventListener('click',()=>{const input=document.querySelector('#customWish'),msg=document.querySelector('#wishSaved');if(!input.value.trim()){msg.textContent='No cheating—write at least one thing 😤';return}localStorage.setItem('kemjuuki-custom-wish',input.value.trim());msg.textContent='Demand saved! But you still need to choose 01 or 02 😈';setTimeout(()=>resetToGate(retryModal),1500)});
document.querySelector('#naughtyOption').addEventListener('click',()=>{naughtyModal.hidden=false;sparkle(20)});
document.querySelector('#naughtyRetry').addEventListener('click',()=>resetToGate(naughtyModal));
unlock=function(){showGiftGate()};
if(sessionStorage.getItem('kemjuuki-unlocked')==='yes'&&!sessionStorage.getItem('kemjuuki-gift-choice'))showGiftGate();
if(sessionStorage.getItem('kemjuuki-gift-choice')){giftGate.hidden=true;lock.style.display='none';experience.hidden=false;requestAnimationFrame(()=>document.querySelectorAll('.reveal').forEach(el=>observer.observe(el)))}
