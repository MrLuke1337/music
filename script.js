document.addEventListener("DOMContentLoaded", () => {
    // Lista dos brabos (não mexe aqui se não quebra tudo)
    const artistsData = [
        { name: "Henrique & Juliano", image: "./img/artista-henrique-juliano.jpg", audio: "./Music/Última Saudade - Ao Vivo_spotdown.org.mp3" },
        { name: "Jorge & Mateus", image: "./img/artista-jorge-mateus.jpg", audio: "./Music/Logo Eu_spotdown.org.mp3" },
        { name: "Zé Neto & Cristiano", image: "./img/artista-ze-neto.jpg", audio: "./Music/Notificação Preferida - Ao Vivo_spotdown.org.mp3" },
        { name: "Gusttavo Lima", image: "./img/artista-gustavo-limma.jpg", audio: "./Music/Retrovisor_spotdown.org.mp3" },
        { name: "Luan Santana", image: "./img/artista-luan-santana.jpg", audio: "./Music/DONA - Ao Vivo_spotdown.org.mp3" },
        { name: "Matheus & Kauan", image: "./img/artista-mateus-kauan.jpg", audio: "./Music/Vou Ter Que Superar - Ao Vivo_spotdown.org.mp3" },
    ];

    const albumsData = [
        { name: "White Noise", artists: "Sleepy john", image: "./img/album-white-noise.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
        { name: "O céu explica Tudo", artists: "Henrique & Juliano", image: "./img/album-ceu-explica.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
        { name: "Nada como um dia...", artists: "Racionais", image: "./img/album-vida-loka.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
        { name: "HIT ME HARD AND SOFT", artists: "Billie Eilish", image: "./img/album-hit-me.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
        { name: "CAJU", artists: "Liniker", image: "./img/album-caju.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
        { name: "Escândalo íntimo", artists: "Luisa Sonza", image: "./img/album-escandalo.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
    ];

    let currentAudio = new Audio();
    let isPlaying = false;
    let currentPlaylist = [];
    let currentTrackIndex = 0;
    let lastVolume = 1;

    const mainPlayIcon = document.getElementById('main-play-icon');
    const playerBar = document.getElementById('player-bar');
    const prevIcon = document.getElementById('prev-icon');
    const nextIcon = document.getElementById('next-icon');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');
    const progressSlider = document.getElementById('progress-slider');
    const currentTimeEl = document.getElementById('current-time');
    const totalDurationEl = document.getElementById('total-duration');
    
    const minimizeBtn = document.getElementById('minimize-btn');

    playerBar.classList.add('player-bar-hidden');

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function playTrack(index, playlist) {
        currentPlaylist = playlist;
        currentTrackIndex = index;
        const track = playlist[index];

        currentAudio.src = track.audio;
        currentAudio.play();
        isPlaying = true;

        document.getElementById('player-title').innerText = track.name;
        document.getElementById('player-artist').innerText = track.artists || "Artista";
        document.getElementById('player-img').src = track.image;

        playerBar.classList.remove('player-bar-hidden');
        playerBar.classList.remove('player-bar-minimized');
        mainPlayIcon.classList.replace('fa-circle-play', 'fa-circle-pause');
    }
    minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playerBar.classList.toggle('player-bar-minimized');
    });

    currentAudio.addEventListener('timeupdate', () => {
        if (currentAudio.duration) {
            const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
            progressSlider.value = progress;
            progressSlider.style.background = `linear-gradient(to right, #1db954 ${progress}%, rgba(255, 255, 255, 0.1) ${progress}%)`;
            currentTimeEl.innerText = formatTime(currentAudio.currentTime);
            totalDurationEl.innerText = formatTime(currentAudio.duration);
        }
    });

    progressSlider.addEventListener('input', () => {
        if (currentAudio.duration) {
            const time = (progressSlider.value / 100) * currentAudio.duration;
            currentAudio.currentTime = time;
        }
    });

    mainPlayIcon.addEventListener('click', () => {
        if (isPlaying) {
            currentAudio.pause();
            mainPlayIcon.classList.replace('fa-circle-pause', 'fa-circle-play');
        } else if (currentAudio.src) {
            currentAudio.play();
            mainPlayIcon.classList.replace('fa-circle-play', 'fa-circle-pause');
        }
        isPlaying = !isPlaying;
    });

    nextIcon.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
        playTrack(currentTrackIndex, currentPlaylist);
    });

    prevIcon.addEventListener('click', () => {
        currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        playTrack(currentTrackIndex, currentPlaylist);
    });

    const updateVolumeUI = (val) => {
        const percentage = val * 100;
        volumeSlider.style.background = `linear-gradient(to right, #1db954 ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%)`;
        if (val == 0) volumeIcon.className = 'fa-solid fa-volume-xmark';
        else if (val < 0.5) volumeIcon.className = 'fa-solid fa-volume-low';
        else volumeIcon.className = 'fa-solid fa-volume-high';
    };

    volumeSlider.addEventListener('input', (e) => {
        currentAudio.volume = e.target.value;
        updateVolumeUI(e.target.value);
    });

    volumeIcon.addEventListener('click', () => {
        if (currentAudio.volume > 0) {
            lastVolume = currentAudio.volume;
            currentAudio.volume = 0;
            volumeSlider.value = 0;
        } else {
            currentAudio.volume = lastVolume > 0 ? lastVolume : 0.5;
            volumeSlider.value = currentAudio.volume;
        }
        updateVolumeUI(currentAudio.volume);
    });

    currentAudio.addEventListener('ended', () => nextIcon.click());

    const artistGrid = document.querySelector(".artists-grid");
    artistsData.forEach((artist, index) => {
        const artistCard = document.createElement("div");
        artistCard.className = "artist-card";
        artistCard.innerHTML = `
            <img src="${artist.image}" alt="artista">
            <h3>${artist.name}</h3>
            <p>Artista</p>
            <div class="play-button"><i class="fa-solid fa-play"></i></div>
        `;
        artistCard.addEventListener('click', () => playTrack(index, artistsData));
        artistGrid.appendChild(artistCard);
    });

    const albumsGrid = document.querySelector(".albums-grid");
    albumsData.forEach((album, index) => {
        const albumCard = document.createElement("div");
        albumCard.className = "album-card";
        albumCard.innerHTML = `
            <img src="${album.image}" alt="album">
            <h3>${album.name}</h3>
            <p>${album.artists}</p>
            <div class="play-button"><i class="fa-solid fa-play"></i></div>
        `;
        albumCard.addEventListener('click', () => playTrack(index, albumsData));
        albumsGrid.appendChild(albumCard);
    });

    updateVolumeUI(volumeSlider.value);
});