window.player = {
  cover: document.querySelector('.card-image'),
  title: document.querySelector('.card-content h5'),
  artist: document.querySelector('.artist'),
  audio: document.querySelector('audio'),
  nextInformation: document.querySelector('#next'),
  playlist: document.querySelector('.tracks'),
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  currentPlayingButton: '',

  start() {
    this.loadPlaylist();
    this.update();
    this.audio.onended = () => this.next();
  },

  next() {
    this.currentPlayingButton.style.background = '#313554';
    this.currentPlaying++;
    if (this.currentPlaying == this.audioData.length) this.restart();
    this.update();
    this.audio.oncanplay = this.audio.play;
  },

  restart() {
    this.currentPlaying = 0;
    this.update();
  },

  update() {
    this.currentAudio = this.audioData[this.currentPlaying];
    this.nextTrackInfo();
    this.cover.style.background = `url(${this.currentAudio.cover}) no-repeat center center / cover`;
    this.title.innerText = this.currentAudio.title;
    this.artist.innerHTML = this.currentAudio.artist;
    this.audio.src = this.currentAudio.file;

    this.currentPlayingButton = document.getElementById(this.currentAudio.id);
    this.currentPlayingButton.style.background = 'red';
  },

  nextTrackInfo() {
    try {
      this.nextInformation.innerHTML = `<strong>Próxima:</strong> ${
        this.audioData[this.currentPlaying + 1].title
      }`;
    } catch (error) {
      this.nextInformation.innerHTML = '';
    }
  },

  loadPlaylist() {
    audios.map((track) => {
      this.playlist.innerHTML += `<li><button id='${track.id}' onclick="player.changeTrack(id)">${track.id} - ${track.title}</button></li>`;
    });
  },

  changeTrack(id) {
    this.currentPlayingButton.style.background = '#313554';
    this.currentPlaying = id - 1;
    this.update();
    this.audio.oncanplay = this.audio.play;
  },
};
