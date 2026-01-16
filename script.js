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
    const mainSection = document.getElementById('main-content');
    const settingsSection = document.getElementById('settings-page');
    const notifPage = document.getElementById('notifications-page');
    const profilePage = document.getElementById('profile-page');
    const timeSwitch = document.getElementById('time-format-switch');
    const languageSelect = document.getElementById('language-select');

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

    const translations = {
        "pt-BR": {
            home: "Início", library: "Sua Biblioteca", createPl: "Criar playlist ou pasta",
            artists: "Artistas Populares", albums: "Álbuns Populares", notif: "Novidades",
            settings: "Configurações", profile: "Perfil", save: "Salvar e Voltar", back: "Voltar",
            search: "O que você quer ouvir?", weatherSearch: "Buscar cidade",
            humidity: "Umidade", wind: "Vento", max: "Temp. Máx", min: "Temp. Mín",
            tempUnit: "Graus Celsius", plTitle: "Crie sua Primeira Playlist",
            plSub: "É fácil, vamos te ajudar.", plBtn: "Criar Playlist",
            langTitle: "Idioma", timeTitle: "Horário", timeSub: "Escolha sua preferência de formato: 12 horas ou 24 horas.",
            audioTitle: "Qualidade do Áudio", audioSub: "Ajuste a fidelidade sonora das faixas.",
            audioOpt: ["Automática", "Baixa", "Normal", "Alta (Recomendado)"],
            profileStats: "0 Playlists • 0 Seguidores"
        },
        "en-US": {
            home: "Home", library: "Your Library", createPl: "Create playlist or folder",
            artists: "Popular Artists", albums: "Popular Albums", notif: "What's New",
            settings: "Settings", profile: "Profile", save: "Save and Back", back: "Back",
            search: "What do you want to listen to?", weatherSearch: "Search city",
            humidity: "Humidity", wind: "Wind", max: "Max Temp", min: "Min Temp",
            tempUnit: "Degrees Fahrenheit", plTitle: "Create your first playlist",
            plSub: "It's easy, we'll help you.", plBtn: "Create Playlist",
            langTitle: "Language", timeTitle: "Time Format", timeSub: "Choose your preference: 12-hour or 24-hour.",
            audioTitle: "Audio Quality", audioSub: "Adjust the sound fidelity of the tracks.",
            audioOpt: ["Automatic", "Low", "Normal", "High (Recommended)"],
            profileStats: "0 Playlists • 0 Followers"
        },
        "es-ES": {
            home: "Inicio", library: "Tu Biblioteca", createPl: "Crear lista o carpeta",
            artists: "Artistas Populares", albums: "Álbumes Populares", notif: "Novedades",
            settings: "Configuraciones", profile: "Perfil", save: "Guardar y Volver", back: "Volver",
            search: "¿Qué quieres escuchar?", weatherSearch: "Buscar ciudad",
            humidity: "Humedad", wind: "Vento", max: "Temp. Máx", min: "Temp. Mín",
            tempUnit: "Grados Celsius", plTitle: "Crea tu primera lista",
            plSub: "Es fácil, te ayudaremos.", plBtn: "Crear lista",
            langTitle: "Idioma", timeTitle: "Formato de hora", timeSub: "Elige tu preferencia: 12 horas o 24 horas.",
            audioTitle: "Calidad de audio", audioSub: "Ajusta la fidelidad de sonido de las pistas.",
            audioOpt: ["Automática", "Baja", "Normal", "Alta (Recomendado)"],
            profileStats: "0 Listas • 0 Seguidores"
        }
    };

    function applyLanguage(lang) {
        const t = translations[lang];
        if (!t) return;

        document.querySelectorAll('.home-link .tooltip-text').forEach(el => el.innerText = t.home);
        document.querySelector('.nav-library p').innerText = t.library;
        document.querySelector('.plus-btn .tooltip-text').innerText = t.createPl;
        document.querySelector('.search-bar input').placeholder = t.search;

        const notifIcon = document.getElementById('notif-nav-btn');
        if(notifIcon) notifIcon.querySelector('.tooltip-text').innerText = t.notif;
        const configIcon = document.getElementById('config-nav-btn');
        if(configIcon) configIcon.querySelector('.tooltip-text').innerText = t.settings;
        const profileIcon = document.getElementById('profile-nav-btn');
        if(profileIcon) profileIcon.querySelector('.tooltip-text').innerText = t.profile;

        const h2Main = document.querySelectorAll('#main-content h2');
        if (h2Main.length >= 2) {
            h2Main[0].innerText = t.artists;
            h2Main[1].innerText = t.albums;
        }

        const plBox = document.querySelector('.nav-playlist');
        if (plBox) {
            plBox.querySelector('h5').innerText = t.plTitle;
            plBox.querySelector('p').innerText = t.plSub;
            plBox.querySelector('button').innerText = t.plBtn;
        }

        document.getElementById('settings-title').innerText = t.settings;
        document.getElementById('lang-title').innerText = t.langTitle;
        document.getElementById('time-title').innerText = t.timeTitle;
        document.getElementById('time-sub').innerText = t.timeSub;
        document.getElementById('audio-title').innerText = t.audioTitle;
        document.getElementById('audio-sub').innerText = t.audioSub;
        document.getElementById('back-home-btn').innerText = t.save;

        const audioSelect = document.getElementById('audio-quality-select');
        if(audioSelect) {
            Array.from(audioSelect.options).forEach((opt, i) => opt.innerText = t.audioOpt[i]);
        }

        const cityInput = document.getElementById('wf-city-input');
        if (cityInput) cityInput.placeholder = t.weatherSearch;
        const weatherStats = document.querySelectorAll('.wf-stat-item h2');
        if (weatherStats.length >= 4) {
            weatherStats[0].innerText = t.max; weatherStats[1].innerText = t.min;
            weatherStats[2].innerText = t.humidity; weatherStats[3].innerText = t.wind;
        }

        document.getElementById('notif-page-title').innerText = t.notif;
        document.getElementById('back-home-notif').innerText = t.back;
        document.getElementById('profile-page-title').innerText = t.profile;
        document.getElementById('profile-stats').innerText = t.profileStats;
        document.getElementById('back-home-profile').innerText = t.back;
    }

    function showOnly(section) {
        [mainSection, settingsSection, notifPage, profilePage].forEach(s => {
            if(s) s.style.display = 'none';
        });
        section.style.display = 'block';
    }

    document.getElementById('config-nav-btn').addEventListener('click', () => showOnly(settingsSection));
    document.getElementById('home-nav-btn').addEventListener('click', (e) => { e.preventDefault(); showOnly(mainSection); });
    document.getElementById('notif-nav-btn').addEventListener('click', () => showOnly(notifPage));
    document.getElementById('profile-nav-btn').addEventListener('click', () => showOnly(profilePage));

    [document.getElementById('back-home-notif'), document.getElementById('back-home-profile')].forEach(btn => {
        if(btn) btn.addEventListener('click', () => showOnly(mainSection));
    });

    document.getElementById('back-home-btn').addEventListener('click', () => {
        saveSettings();
        showOnly(mainSection);
    });

    function updateClock() {
        const clockElement = document.getElementById('brasilia-clock');
        if (clockElement) {
            const is24h = timeSwitch.checked;
            const options = { 
                hour: '2-digit', minute: '2-digit', 
                hour12: !is24h, timeZone: 'America/Sao_Paulo' 
            };
            clockElement.textContent = new Intl.DateTimeFormat('pt-BR', options).format(new Date());
        }
    }
    setInterval(updateClock, 1000);

    function saveSettings() {
        const config = { lang: languageSelect.value, is24h: timeSwitch.checked };
        localStorage.setItem('user_spotify_config', JSON.stringify(config));
        applyLanguage(config.lang);
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

    languageSelect.addEventListener('change', (e) => applyLanguage(e.target.value));
    timeSwitch.addEventListener('change', updateClock);
    loadSettings();
});

const profilePicDisplay = document.getElementById('profile-pic-display');
const profileUpload = document.getElementById('profile-upload');
const changePicBtn = document.getElementById('change-pic-btn');
const removePicBtn = document.getElementById('remove-pic-btn');
const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=1db954&color=fff&size=150";

function loadProfileImage() {
    const savedImage = localStorage.getItem('user_profile_image');
    if (savedImage) {
        profilePicDisplay.src = savedImage;
        removePicBtn.style.display = "block";
    } else {
        profilePicDisplay.src = defaultAvatar;
        removePicBtn.style.display = "none";
    }
}

changePicBtn.addEventListener('click', () => {
    profileUpload.click();
});

profileUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;
            profilePicDisplay.src = base64Image;
            localStorage.setItem('user_profile_image', base64Image);
            removePicBtn.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

removePicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profilePicDisplay.src = defaultAvatar;
    localStorage.removeItem('user_profile_image');
    profileUpload.value = "";
    removePicBtn.style.display = "none";
});

document.getElementById('close-player-btn').addEventListener('click', () => {
    document.getElementById('player-bar').classList.add('player-bar-hidden');
});

loadProfileImage();