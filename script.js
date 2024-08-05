const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeControl = document.getElementById('volume-control');
const playlistElement = document.getElementById('playlist');
const playlistsElement = document.getElementById('playlists');
const searchInput = document.getElementById('search');
const newPlaylistNameInput = document.getElementById('new-playlist-name');
const addPlaylistBtn = document.getElementById('add-playlist');

let playlists = {
    'Default': [
        { title: 'Song 1', src: 'songs/song1.mp3' },
        { title: 'Song 2', src: 'songs/song2.mp3' },
        { title: 'Song 3', src: 'songs/song3.mp3' }
    ]
};
let currentPlaylist = 'Default';
let currentIndex = 0;

function loadSong(index) {
    audio.src = playlists[currentPlaylist][index].src;
    audio.load();
    playPauseBtn.textContent = 'Play';
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    }
}

function prevSong() {
    currentIndex = (currentIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

function nextSong() {
    currentIndex = (currentIndex + 1) % playlists[currentPlaylist].length;
    loadSong(currentIndex);
    audio.play();
    playPauseBtn.textContent = 'Pause';
}

function setVolume() {
    audio.volume = volumeControl.value;
}

function renderPlaylist() {
    playlistElement.innerHTML = '';
    playlists[currentPlaylist].forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentIndex = index;
            loadSong(index);
            audio.play();
            playPauseBtn.textContent = 'Pause';
        });
        playlistElement.appendChild(li);
    });
}

function renderPlaylists() {
    playlistsElement.innerHTML = '';
    Object.keys(playlists).forEach((playlist) => {
        const li = document.createElement('li');
        li.textContent = playlist;
        li.addEventListener('click', () => {
            currentPlaylist = playlist;
            currentIndex = 0;
            renderPlaylist();
            loadSong(currentIndex);
        });
        playlistsElement.appendChild(li);
    });
}


function addPlaylist() {
    const newPlaylistName = newPlaylistNameInput.value.trim();
    if (newPlaylistName && !playlists[newPlaylistName]) {
        playlists[newPlaylistName] = [];
        localStorage.setItem('playlists', JSON.stringify(playlists));
        renderPlaylists();
        newPlaylistNameInput.value = '';
    }
}
function filterPlaylist() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPlaylist = playlists[currentPlaylist].filter(song => song.title.toLowerCase().includes(searchTerm));
    playlistElement.innerHTML = '';
    filteredPlaylist.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.title;
        li.addEventListener('click', () => {
            currentIndex = index;
            loadSong(index);
            audio.play();
            playPauseBtn.textContent = 'Pause';
        });
        playlistElement.appendChild(li);
    });
}

playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
volumeControl.addEventListener('input', setVolume);
searchInput.addEventListener('input', filterPlaylist);
addPlaylistBtn.addEventListener('click', addPlaylist);

renderPlaylists();
renderPlaylist();
loadSong(currentIndex);
