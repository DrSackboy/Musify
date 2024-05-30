const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


const songTitle = 'Guillotine';
const songSrc = 'Death Grips - Exmilitary - 2 - Guillotine.mp3';
const songCover = 'Death-Grips-Exmilitary.jpg';


loadSong(songTitle, songSrc, songCover);


function loadSong(title, src, cover) {
  title.innerText = title;
  audio.src = src;
  cover.src = cover;
}


function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}


function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}


playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


audio.addEventListener('timeupdate', DurTime);


function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}


audio.addEventListener('timeupdate', updateProgress);


progressContainer.addEventListener('click', setProgress);


audio.addEventListener('ended', () => {
  pauseSong();
  audio.currentTime = 0;
});


function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  let sec;
  let sec_d;


  let min = Math.floor(currentTime / 60);
  min = min < 10 ? '0' + min : min;


  sec = Math.floor(currentTime % 60);
  sec = sec < 10 ? '0' + sec : sec;


  currTime.innerHTML = min + ':' + sec;

  let min_d = Math.floor(duration / 60);
  min_d = min_d < 10 ? '0' + min_d : min_d;

  sec_d = Math.floor(duration % 60);
  sec_d = sec_d < 10 ? '0' + sec_d : sec_d;


  durTime.innerHTML = min_d + ':' + sec_d;
}


const volumeSlider = document.getElementById('volume-slider');

audio.volume = volumeSlider.value;


volumeSlider.addEventListener('input', function() {
  audio.volume = this.value;
});

