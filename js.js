const audio = document.getElementById('audio');
const title = document.getElementById('title');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const volumeSlider = document.getElementById('volume');
const progressBar = document.getElementById('progress');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const equalizer = document.getElementById('equalizer');

let songs = [
  { title: 'ISHQ LIKHU', src: 'SEVEN.mp3' },
  { title: 'TERI YAADA YAADA', src: 'SIX.mp3' },
  { title: 'AB KUCH HOS NAHI HE', src: 'four.mp3' },
];

let songIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function loadSong(index) {
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸';
  equalizer.style.display = 'flex';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶';
  equalizer.style.display = 'none';
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
});

function nextSong() {
  if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
  } else {
    songIndex = (songIndex + 1) % songs.length;
  }
  loadSong(songIndex);
  playSong();
}

audio.addEventListener('ended', () => {
  if (isRepeat) {
    playSong();
  } else {
    nextSong();
  }
});





volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent || 0;
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});
document.getElementById("shuffle").addEventListener("click", function () {
  this.classList.toggle("active");
});

document.getElementById("repeat").addEventListener("click", function () {
  this.classList.toggle("active");
});
shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle;
  shuffleBtn.style.color = isShuffle ? 'black' : '#fff';
});

repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat;
  repeatBtn.style.color = isRepeat ? 'black' : '#fff';
});

loadSong(songIndex);