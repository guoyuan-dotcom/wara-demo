const player = document.querySelector('video');
const buttons = [...document.querySelectorAll('.chapter')];
const times = [0, 112.86666666666667, 151.16666666666666, 231.13333333333335];
const message = document.createElement('p');
message.className='player-error';message.setAttribute('role','status');
document.querySelector('.film-caption').after(message);
buttons.forEach((button,index)=>button.addEventListener('click',async()=>{
 message.textContent='';
 player.currentTime=times[index];
 player.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});
 try{await player.play()}catch{message.textContent='Press play in the video player to continue.'}
}));
player.addEventListener('timeupdate',()=>{
 const active=times.reduce((best,time,i)=>player.currentTime>=time?i:best,-1);
 buttons.forEach((button,i)=>button.classList.toggle('is-active',i===active));
});
player.addEventListener('error',()=>message.textContent='The video could not load. You can download the film below.');
