const json = [
   {
      id: 1,
      title:'Tomorrow',
      artist:'Downplay',
      img: '/imgs/downplay.jpg',
      uri: '/sounds/audio1.mp3',
   },
   {
      id: 2,
      title:'Stronger',
      artist:'Emphatic',
      img: '/imgs/emphatic.jpg',
      uri: '/sounds/audio2.mp3',
   },
   {
      id: 3,
      title:'Die For You',
      artist:'Starset',
      img: '/imgs/starset.jpg',
      uri: '/sounds/audio3.mp3',
   },
];

const player = document.querySelector("#audio");
const progress = document.querySelector("#progress");
const img = document.querySelector(".img");
const title = document.querySelector("#outTitle");
const progress_bar = document.querySelector(".progress-bar");

let flag = false
let count = 0;


function carregaMusica(index = 0){
   player.src = json[index].uri;
   img.style.backgroundImage = `url('${json[index].img}')`;
   title.innerHTML = `${json[index].artist} - ${json[index].title}`;
}

carregaMusica();




function totalDuration(){
   const duration = Number(player.duration)
   const minutos = Math.floor(duration / 60);
   const seconds = Math.floor(duration % 60);


   document.querySelector(".total-timer").innerHTML = `${minutos < 10 ? `0${minutos}` :minutos}:${seconds < 10 ? `0${seconds}`:seconds}`;
}




function playMusic(){
   if(!flag){
      player.play();

   } else {
      player.pause()
   }
   flag = !flag;
   trocaIcone(flag);
   totalDuration();
}



function trocaIcone(data){
   const btnPlay = document.querySelector(".play");
   if(data){
      btnPlay.innerHTML = `<i class="bi bi-pause-fill"></i>`
   } else {
      btnPlay.innerHTML = `<i class="bi bi-play-fill"></i>`;
   }
}




function progressBar(e){
   let duration = e.target.duration
   let currentTime = e.target.currentTime

   let porcentagem = (currentTime / duration) * 100 ;

   let minutos = Math.floor(currentTime / 60);
   let seconds = Math.floor(currentTime % 60);

   progress.style.width = `${porcentagem}%`
   document.querySelector(".current-timer").innerHTML = `${minutos < 10 ? `0${minutos}` :minutos}:${seconds < 10 ? `0${seconds}`:seconds}`;
   if(currentTime === duration){
      playMusic();
   }

}
player.addEventListener("timeupdate", progressBar);


function nextMusic(){
   count+=1;
   if(count >= json.length){
      count = 0;
   }

   carregaMusica(count);
   if(flag)playMusic();
   document.querySelector(".total-timer").innerHTML = '00:00'
}


function previousMusic(){
   if(count === 0){
      return;
   }
   count-=1;

   carregaMusica(count);
   if(flag)playMusic();
   document.querySelector(".total-timer").innerHTML = '00:00'
}

function progressClick(e){
   let progressWidth = progress_bar.clientWidth;
   let clickOffsetX = e.offsetX
   let duration = player.duration;

   player.currentTime = (clickOffsetX / progressWidth) * duration;
}
progress_bar.addEventListener("click", progressClick);