document.addEventListener("DOMContentLoaded", () => {
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

    const btnConfig = document.getElementById('config-nav-btn');
    const btnHome = document.getElementById('home-nav-btn');
    const btnBackHome = document.getElementById('back-home-btn');
    const mainSection = document.getElementById('main-content');
    const settingsSection = document.getElementById('settings-page');
    const timeSwitch = document.getElementById('time-format-switch');
    const languageSelect = document.querySelectorAll('.settings-select')[1];

    function togglePage(showSettings) {
        if(showSettings) {
            mainSection.style.display = 'none';
            settingsSection.style.display = 'block';
        } else {
            mainSection.style.display = 'block';
            settingsSection.style.display = 'none';
        }
    }

    btnConfig.addEventListener('click', () => togglePage(true));
    btnHome.addEventListener('click', (e) => {
        e.preventDefault();
        togglePage(false);
    });

    function updateClock() {
        const clockElement = document.getElementById('brasilia-clock');
        if (clockElement) {
            const is24h = timeSwitch.checked;
            const options = { 
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: !is24h, 
                timeZone: 'America/Sao_Paulo' 
            };
            clockElement.textContent = new Intl.DateTimeFormat('pt-BR', options).format(new Date());
        }
    }
    setInterval(updateClock, 1000);

    const translations = {
        "pt-BR": {
            home: "Início", library: "Sua Biblioteca", createPl: "Criar playlist ou pasta",
            artists: "Artistas Populares", albums: "Álbuns Populares", notif: "Novidades",
            settings: "Configurações", profile: "Perfil", save: "Salvar e Voltar",
            search: "O que você quer ouvir?", weatherSearch: "Buscar cidade",
            humidity: "Umidade", wind: "Vento", max: "Temp. Máx", min: "Temp. Mín",
            tempUnit: "Graus Celsius", plTitle: "Crie sua Primeira Playlist",
            plSub: "É fácil, vamos te ajudar.", plBtn: "Criar Playlist"
        },
        "en-US": {
            home: "Home", library: "Your Library", createPl: "Create playlist or folder",
            artists: "Popular Artists", albums: "Popular Albums", notif: "What's New",
            settings: "Settings", profile: "Profile", save: "Save and Back",
            search: "What do you want to listen to?", weatherSearch: "Search city",
            humidity: "Humidity", wind: "Wind", max: "Max Temp", min: "Min Temp",
            tempUnit: "Degrees Fahrenheit", plTitle: "Create your first playlist",
            plSub: "It's easy, we'll help you.", plBtn: "Create Playlist"
        },
        "es-ES": {
            home: "Inicio", library: "Tu Biblioteca", createPl: "Crear lista o carpeta",
            artists: "Artistas Populares", albums: "Álbumes Populares", notif: "Novedades",
            settings: "Configuraciones", profile: "Perfil", save: "Guardar y Volver",
            search: "¿Qué quieres escuchar?", weatherSearch: "Buscar ciudad",
            humidity: "Humedad", wind: "Viento", max: "Temp. Máx", min: "Temp. Mín",
            tempUnit: "Grados Celsius", plTitle: "Crea tu primera lista",
            plSub: "Es fácil, te ayudaremos.", plBtn: "Crear lista"
        }
    };

    function applyLanguage(lang) {
        const t = translations[lang];
        if (!t) return;

        const homeTooltip = document.querySelector('.home-link .tooltip-text');
        if(homeTooltip) homeTooltip.innerText = t.home;
        
        document.querySelector('.nav-library p').innerText = t.library;
        document.querySelector('.plus-btn .tooltip-text').innerText = t.createPl;

        const plBox = document.querySelector('.nav-playlist');
        if (plBox) {
            plBox.querySelector('h5').innerText = t.plTitle;
            plBox.querySelector('p').innerText = t.plSub;
            plBox.querySelector('button').innerText = t.plBtn;
        }

        document.querySelector('.search-bar input').placeholder = t.search;
        
        const bellIcon = document.querySelector('.fa-bell');
        if(bellIcon) bellIcon.closest('a, div').querySelector('.tooltip-text').innerText = t.notif;

        const gearIcon = document.querySelector('.fa-gear');
        if(gearIcon) gearIcon.closest('a, div').querySelector('.tooltip-text').innerText = t.settings;

        const userIcon = document.querySelector('.fa-user');
        if(userIcon) userIcon.closest('a, div').querySelector('.tooltip-text').innerText = t.profile;

        const cityInput = document.getElementById('wf-city-input');
        if (cityInput) cityInput.placeholder = t.weatherSearch;

        const weatherStats = document.querySelectorAll('.wf-stat-item h2');
        if (weatherStats.length >= 4) {
            weatherStats[0].innerText = t.max;
            weatherStats[1].innerText = t.min;
            weatherStats[2].innerText = t.humidity;
            weatherStats[3].innerText = t.wind;
        }

        const tempDesc = document.querySelector('#wf-main-temp div p:last-child');
        if (tempDesc) tempDesc.innerText = t.tempUnit;

        const h2Main = document.querySelectorAll('#main-content h2');
        if (h2Main.length >= 2) {
            h2Main[0].innerText = t.artists;
            h2Main[1].innerText = t.albums;
        }

        const settingsTitle = document.querySelector('#settings-page h2');
        if(settingsTitle) settingsTitle.innerText = t.settings;
        btnBackHome.innerText = t.save;
    }

    function saveSettings() {
        localStorage.setItem('user_spotify_config', JSON.stringify({
            lang: languageSelect.value,
            is24h: timeSwitch.checked
        }));
    }

    function loadSettings() {
        const saved = localStorage.getItem('user_spotify_config');
        if (saved) {
            const config = JSON.parse(saved);
            languageSelect.value = config.lang;
            timeSwitch.checked = config.is24h;
            applyLanguage(config.lang);
        } else {
            applyLanguage('pt-BR');
        }
        updateClock();
    }

    btnBackHome.addEventListener('click', () => {
        saveSettings();
        togglePage(false);
    });

    languageSelect.addEventListener('change', (e) => applyLanguage(e.target.value));
    timeSwitch.addEventListener('change', updateClock);

    loadSettings();
});