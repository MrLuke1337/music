// Define data in global scope immediately so it's available for other modules
window.artistsData = [
    { name: "Henrique & Juliano", image: "./img/artista-henrique-juliano.jpg", audio: "./Music/Última Saudade - Ao Vivo_spotdown.org.mp3" },
    { name: "Jorge & Mateus", image: "./img/artista-jorge-mateus.jpg", audio: "./Music/Logo Eu_spotdown.org.mp3" },
    { name: "Zé Neto & Cristiano", image: "./img/artista-ze-neto.jpg", audio: "./Music/Notificação Preferida - Ao Vivo_spotdown.org.mp3" },
    { name: "Gusttavo Lima", image: "./img/artista-gustavo-limma.jpg", audio: "./Music/Retrovisor_spotdown.org.mp3" },
    { name: "Luan Santana", image: "./img/artista-luan-santana.jpg", audio: "./Music/DONA - Ao Vivo_spotdown.org.mp3" },
    { name: "Matheus & Kauan", image: "./img/artista-mateus-kauan.jpg", audio: "./Music/Vou Ter Que Superar - Ao Vivo_spotdown.org.mp3" },
];

window.albumsData = [
    { name: "White Noise", artists: "Sleepy john", year: "2023", image: "./img/album-white-noise.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { name: "O céu explica Tudo", artists: "Henrique & Juliano", year: "2017", image: "./img/album-ceu-explica.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
    { name: "Nada como um dia...", artists: "Racionais", year: "2002", image: "./img/album-vida-loka.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
    { name: "HIT ME HARD AND SOFT", artists: "Billie Eilish", year: "2024", image: "./img/album-hit-me.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
    { name: "CAJU", artists: "Liniker", year: "2024", image: "./img/album-caju.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
    { name: "Escândalo íntimo", artists: "Luisa Sonza", year: "2023", image: "./img/album-escandalo.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
];

const translations = {
    "pt-BR": {
        home: "Início", library: "Sua Biblioteca", createPl: "Criar playlist ou pasta",
        artists: "Artistas Populares", albums: "Álbuns Populares", notif: "Novidades",
        settings: "Configurações", profile: "Perfil", save: "Salvar e Voltar", back: "Voltar",
        search: "O que você quer ouvir?", weatherSearch: "Buscar cidade",
        humidity: "Umidade", wind: "Vento", max: "Máx", min: "Mín",
        plTitle: "Crie sua Primeira Playlist",
        plSub: "É fácil, vamos te ajudar.", plBtn: "Criar Playlist",
        langTitle: "Idioma", timeTitle: "Horário", timeSub: "Escolha sua preferência de formato: 12 horas ou 24 horas.",
        audioTitle: "Qualidade do Áudio", audioSub: "Ajuste a fidelidade sonora das faixas.",
        audioOpt: ["Automática", "Baixa", "Normal", "Alta (Recomendado)"],
        profileStats: "0 Playlists • 0 Followers", profileTitle: "Seu Perfil",
        changePic: "Alterar", removePic: "Remover",
        legal: "Legal", privacyCenter: "Centro de Privacidade", privacyPolicy: "Política de Privacidade",
        cookies: "Cookies", ads: "Sobre anúncios", accessibility: "Acessibilidade",
        notifTitle: "O que há de novo",
        notifItemTitle: "Novos Lançamentos", notifItemDesc: "Henrique & Juliano acabaram de lançar um novo álbum.",
        artistVerified: "Artista Verificado", artistFollow: "Seguir", artistPopular: "Populares",
        trackSuccess: "Sucesso 1", trackLive: "Ao Vivo", trackAcoustic: "Acústico", trackRemix: "Remix", trackFeat: "Ft. Convidado",
        albumType: "Álbum", albumSongs: "músicas", albumTrackPrefix: "Faixa do Álbum", thTitle: "Título",
        cpLabel: "Playlist", cpMainTitle: "Minha Playlist nº 1", lblPlName: "Nome", lblPlDesc: "Descrição",
        btnSave: "Salvar", btnCancel: "Cancelar", plNamePlaceholder: "Adicione um nome", plDescPlaceholder: "Adicione uma descrição opcional"
    },
    "en-US": {
        home: "Home", library: "Your Library", createPl: "Create playlist or folder",
        artists: "Popular Artists", albums: "Popular Albums", notif: "What's New",
        settings: "Settings", profile: "Profile", save: "Save and Back", back: "Back",
        search: "What do you want to listen to?", weatherSearch: "Search city",
        humidity: "Humidity", wind: "Wind", max: "Max", min: "Min",
        plTitle: "Create your first playlist",
        plSub: "It's easy, we'll help you.", plBtn: "Create Playlist",
        langTitle: "Language", timeTitle: "Time Format", timeSub: "Choose your preference: 12-hour or 24-hour.",
        audioTitle: "Audio Quality", audioSub: "Adjust the sound fidelity of the tracks.",
        audioOpt: ["Automatic", "Low", "Normal", "High (Recommended)"],
        profileStats: "0 Playlists • 0 Followers", profileTitle: "Your Profile",
        changePic: "Change", removePic: "Remove",
        legal: "Legal", privacyCenter: "Privacy Center", privacyPolicy: "Privacy Policy",
        cookies: "Cookies", ads: "About Ads", accessibility: "Accessibility",
        notifTitle: "What's new",
        notifItemTitle: "New Releases", notifItemDesc: "Henrique & Juliano just released a new album.",
        artistVerified: "Verified Artist", artistFollow: "Follow", artistPopular: "Popular",
        trackSuccess: "Hit 1", trackLive: "Live", trackAcoustic: "Acoustic", trackRemix: "Remix", trackFeat: "Feat. Guest",
        albumType: "Album", albumSongs: "songs", albumTrackPrefix: "Album Track", thTitle: "Title",
        cpLabel: "Playlist", cpMainTitle: "My Playlist #1", lblPlName: "Name", lblPlDesc: "Description",
        btnSave: "Save", btnCancel: "Cancel", plNamePlaceholder: "Add a name", plDescPlaceholder: "Add an optional description"
    },
    "es-ES": {
        home: "Inicio", library: "Tu Biblioteca", createPl: "Crear lista o carpeta",
        artists: "Artistas Populares", albums: "Álbumes Populares", notif: "Novedades",
        settings: "Configuraciones", profile: "Perfil", save: "Guardar y Volver", back: "Volver",
        search: "¿Qué quieres escuchar?", weatherSearch: "Buscar ciudad",
        humidity: "Humedad", wind: "Viento", max: "Máx", min: "Mín",
        plTitle: "Crea tu primera lista",
        plSub: "Es fácil, te ayudaremos.", plBtn: "Crear lista",
        langTitle: "Idioma", timeTitle: "Formato de hora", timeSub: "Elige tu preferencia: 12 horas o 24 horas.",
        audioTitle: "Calidad de audio", audioSub: "Ajusta la fidelidad de sonido de las pistas.",
        audioOpt: ["Automática", "Baja", "Normal", "Alta (Recomendado)"],
        profileStats: "0 Listas • 0 Seguidores", profileTitle: "Tu Perfil",
        changePic: "Cambiar", removePic: "Eliminar",
        legal: "Legal", privacyCenter: "Centro de Privacidad", privacyPolicy: "Política de Privacidad",
        cookies: "Cookies", ads: "Sobre anuncios", accessibility: "Accesibilidad",
        notifTitle: "Qué hay de nuevo",
        notifItemTitle: "Nuevos Lanzamientos", notifItemDesc: "Henrique & Juliano acaban de lanzar un nuevo álbum.",
        artistVerified: "Artista Verificado", artistFollow: "Seguir", artistPopular: "Populares",
        trackSuccess: "Éxito 1", trackLive: "En Vivo", trackAcoustic: "Acústico", trackRemix: "Remezcla", trackFeat: "Ft. Invitado",
        albumType: "Álbum", albumSongs: "canciones", albumTrackPrefix: "Pista del Álbum", thTitle: "Título",
        cpLabel: "Lista", cpMainTitle: "Mi Lista n.º 1", lblPlName: "Nombre", lblPlDesc: "Descripción",
        btnSave: "Guardar", btnCancel: "Cancelar", plNamePlaceholder: "Añadir un nombre", plDescPlaceholder: "Añadir una descripción opcional"
    }
};

function getTranslations(lang) {
    return translations[lang] || translations["pt-BR"];
}

window.getArtistTracks = function(artist, lang) {
    const t = getTranslations(lang || 'pt-BR');
    return [
        {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackSuccess}`, plays: "350.234.111", audio: artist.audio},
        {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackLive}`, plays: "120.500.222", audio: artist.audio},
        {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackAcoustic}`, plays: "90.100.500", audio: artist.audio},
        {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackRemix}`, plays: "45.200.000", audio: artist.audio},
        {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackFeat}`, plays: "12.854.123", audio: artist.audio}
    ];
};

window.getAlbumTracks = function(album, lang) {
     const t = getTranslations(lang || 'pt-BR');
     const trackCount = 10;
     const mockAlbumTracks = [];
     for(let i = 0; i < trackCount; i++) {
        mockAlbumTracks.push({
            name: `${t.albumTrackPrefix} ${i + 1}`,
            artists: album.artists,
            image: album.image,
            audio: album.audio,
            duration: "3:30"
        });
    }
    return mockAlbumTracks;
};

// Exposed Play Function
window.playTrack = function(index, playlist, rowElement) {
    playTrack(index, playlist, rowElement);
}

// Exposed Open Details Functions
window.openArtistDetails = function(artist) {
    openArtistDetails(artist);
}

window.openAlbumDetails = function(album) {
    openAlbumDetails(album);
}

document.addEventListener("DOMContentLoaded", () => {
    // Local Variables for UI
    const artistsData = window.artistsData;
    const albumsData = window.albumsData;

    let currentAudio = new Audio();
    // Critical for Web Audio API to work with external/server files
    currentAudio.crossOrigin = "anonymous"; 

    let isPlaying = false;
    let currentPlaylist = [];
    let currentTrackIndex = 0;
    let lastVolume = 1;
    let currentlyPlayingRow = null; 
    let currentOpenedPlaylistId = null;

    // --- Web Audio API Variáveis ---
    let audioContext;
    let analyser;
    let audioSource;
    let isVisualizerInit = false;

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
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');
    const playerImg = document.getElementById('player-img');

    const mainSection = document.getElementById('main-content');
    const settingsSection = document.getElementById('settings-page');
    const notifPage = document.getElementById('notifications-page');
    const profilePage = document.getElementById('profile-page');
    const artistDetailsPage = document.getElementById('artist-details-page');
    const albumDetailsPage = document.getElementById('album-details-page');
    const createPlaylistPage = document.getElementById('create-playlist-page');
    const playlistDetailsPage = document.getElementById('playlist-details-page');

    const timeSwitch = document.getElementById('time-format-switch');
    const languageSelect = document.getElementById('language-select');

    playerBar.classList.add('player-bar-hidden');

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    // --- Lógica do Visualizador de Áudio (Barras de Frequência) ---
    // Esta função desenha o espectro de áudio usando barras verticais.
    function initVisualizer() {
        if (isVisualizerInit) return;
        
        try {
            // 1. Cria o contexto de áudio
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // 2. Cria o analisador
            analyser = audioContext.createAnalyser();
            
            // Suavização para evitar que as barras "pisquem" muito rápido
            analyser.smoothingTimeConstant = 0.8;

            // 3. FFT Size (Fast Fourier Transform).
            analyser.fftSize = 128; 

            // Conecta a fonte de áudio
            audioSource = audioContext.createMediaElementSource(currentAudio);
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);
            
            const bufferLength = analyser.frequencyBinCount; 
            const dataArray = new Uint8Array(bufferLength);
            
            const canvas = document.getElementById("audio-visualizer");
            const ctx = canvas.getContext("2d");
            
            function renderFrame() {
                requestAnimationFrame(renderFrame);
                
                // Limpa o canvas para o próximo frame
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                if(!isPlaying) return;

                // 4. Preenche o array dataArray com os dados de frequência atuais (0 a 255)
                analyser.getByteFrequencyData(dataArray);

                const width = canvas.width;
                const height = canvas.height;

                const barWidth = (width / bufferLength) * 1.5; 
                let barHeight;
                let x = 0;

                // 5. Criação do Gradiente Vertical (Roxo -> Ciano -> Verde)
                const gradient = ctx.createLinearGradient(0, height, 0, 0); // De baixo para cima
                gradient.addColorStop(0, "rgba(29, 185, 84, 1)");    // Verde Spotify (Base)
                gradient.addColorStop(0.5, "rgba(0, 198, 255, 1)");  // Ciano (Meio)
                gradient.addColorStop(1, "rgba(189, 0, 255, 1)");    // Roxo (Topo - Picos Altos)

                ctx.fillStyle = gradient;

                for (let i = 0; i < bufferLength; i++) {
                    barHeight = (dataArray[i] / 255) * height * 1.2;
                    ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);
                    x += barWidth;
                }
            }
            renderFrame();
            isVisualizerInit = true;
        } catch (e) {
            console.error("Falha ao inicializar AudioContext:", e);
        }
    }

    // --- Dynamic Title Logic ---
    function updatePageTitle(songName) {
        if (isPlaying && songName) {
            document.title = `Tocando agora: ${songName}`;
        } else {
            document.title = "Spotify – Web player";
        }
    }

    function getAllAvailableTracks() {
        let allTracks = [];
        const lang = languageSelect.value;
        
        artistsData.forEach(artist => {
            const tracks = window.getArtistTracks(artist, lang);
            allTracks = [...allTracks, ...tracks];
        });

        albumsData.forEach(album => {
            const tracks = window.getAlbumTracks(album, lang);
            allTracks = [...allTracks, ...tracks];
        });
        
        return allTracks;
    }

    function updateRowUI() {
        document.querySelectorAll('.song-row').forEach(row => {
            row.classList.remove('playing');
            const icon = row.querySelector('.play-icon-row');
            if(icon) icon.className = 'fa-solid fa-play play-icon-row';
        });

        let container = null;
        if (artistDetailsPage.style.display === 'block') {
            container = document.getElementById('artist-songs-list');
        } else if (albumDetailsPage.style.display === 'block') {
            container = document.getElementById('album-songs-list');
        } else if (playlistDetailsPage.style.display === 'block') {
            container = document.getElementById('playlist-songs-list');
        }

        if (!container) return;

        const playingTrack = currentPlaylist[currentTrackIndex];

        if (!playingTrack) return;

        const playingUid = playingTrack.name + (playingTrack.artists || playingTrack.artistName || "");

        const rows = container.querySelectorAll('.song-row');
        rows.forEach(row => {
            const rowUid = row.dataset.uid;
            if (rowUid === playingUid) {
                row.classList.add('playing');
                const icon = row.querySelector('.play-icon-row');
                if (icon) {
                    icon.className = isPlaying ? 'fa-solid fa-pause play-icon-row' : 'fa-solid fa-play play-icon-row';
                }
            }
        });
    }

    function playTrack(index, playlist, rowElement = null) {
        // Inicializa o Visualizador na primeira interação do usuário.
        if (!isVisualizerInit) {
            initVisualizer();
            if(audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
        }

        if (playlist) {
            currentPlaylist = playlist;
        }
        currentTrackIndex = index;
        const track = currentPlaylist[index];

        const isSameAudioUrl = currentAudio.src.includes(encodeURI(track.audio.replace('./', ''))) || currentAudio.src === track.audio;
        const isSameSongName = playerTitle.innerText === track.name;
        
        if (isSameAudioUrl && isSameSongName) {
            if (!currentAudio.paused) {
                currentAudio.pause();
                isPlaying = false;
            } else {
                currentAudio.play();
                isPlaying = true;
            }
        } else {
            currentAudio.src = track.audio;
            // Tenta dar play.
            currentAudio.play().catch(e => console.log("Erro no autoplay (esperado sem interação):", e));
            isPlaying = true;

            playerTitle.innerText = track.name;
            playerArtist.innerText = track.artists || track.artistName || "Artista";
            playerImg.src = track.image;
            
            playerBar.classList.remove('player-bar-hidden');
            playerBar.classList.remove('player-bar-minimized');
        }

        updatePageTitle(isPlaying ? track.name : null);
        mainPlayIcon.className = isPlaying ? 'fa-solid fa-circle-pause' : 'fa-solid fa-circle-play';
        updateRowUI();
    }

    mainPlayIcon.addEventListener('click', () => {
        if (!currentAudio.src) return;
        playTrack(currentTrackIndex, null, null); 
    });

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
    
    // Pause Event for Title
    currentAudio.addEventListener('pause', () => {
         updatePageTitle(null);
    });

    progressSlider.addEventListener('input', () => {
        if (currentAudio.duration) {
            currentAudio.currentTime = (progressSlider.value / 100) * currentAudio.duration;
        }
    });

    nextIcon.addEventListener('click', () => {
        if (currentPlaylist.length > 0) {
            currentTrackIndex = (currentTrackIndex + 1) % currentPlaylist.length;
            playTrack(currentTrackIndex, currentPlaylist, null); 
        }
    });

    prevIcon.addEventListener('click', () => {
        if (currentPlaylist.length > 0) {
            currentTrackIndex = (currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
            playTrack(currentTrackIndex, currentPlaylist, null);
        }
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

    function showOnly(section) {
        [mainSection, settingsSection, notifPage, profilePage, artistDetailsPage, albumDetailsPage, createPlaylistPage, playlistDetailsPage].forEach(s => {
            if(s) {
                s.style.display = 'none';
                s.classList.remove('fade-in'); // Reset animation
            }
        });
        
        section.style.display = 'block';
        // Force reflow for animation restart
        void section.offsetWidth; 
        section.classList.add('fade-in');
        
        setTimeout(updateRowUI, 50); 
    }

    document.getElementById('config-nav-btn').addEventListener('click', () => showOnly(settingsSection));
    document.getElementById('home-nav-btn').addEventListener('click', (e) => { e.preventDefault(); showOnly(mainSection); });
    
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => { 
            e.preventDefault(); 
            showOnly(mainSection); 
        });
    }

    document.getElementById('notif-nav-btn').addEventListener('click', () => showOnly(notifPage));
    document.getElementById('profile-nav-btn').addEventListener('click', () => showOnly(profilePage));
    
    const openCreatePage = () => {
        showOnly(createPlaylistPage);
    };

    const btnCreatePl = document.getElementById('btn-create-playlist');
    const btnPlus = document.getElementById('btn-plus-create');
    
    if (btnCreatePl) btnCreatePl.addEventListener('click', openCreatePage);
    if (btnPlus) btnPlus.addEventListener('click', openCreatePage);


    document.getElementById('btn-cancel-playlist').addEventListener('click', () => showOnly(mainSection));


    [document.getElementById('back-home-notif'), 
     document.getElementById('back-home-profile'),
     document.getElementById('back-home-artist'),
     document.getElementById('back-home-album'),
     document.getElementById('back-home-playlist')].forEach(btn => {
        if(btn) btn.addEventListener('click', () => showOnly(mainSection));
    });

    document.getElementById('back-home-btn').addEventListener('click', () => {
        saveSettings();
        showOnly(mainSection);
    });

    function openArtistDetails(artist) {
        const lang = languageSelect.value;
        const t = getTranslations(lang);

        document.getElementById('artist-detail-img').src = artist.image;
        document.getElementById('artist-detail-name').innerText = artist.name;

        document.getElementById('artist-verified-text').innerText = t.artistVerified;
        document.getElementById('artist-follow-btn').innerText = t.artistFollow;
        document.getElementById('artist-popular-title').innerText = t.artistPopular;
        document.getElementById('back-home-artist').innerText = "< " + t.back;

        const songsList = document.getElementById('artist-songs-list');
        songsList.innerHTML = ''; 

        const mockTracks = window.getArtistTracks(artist, lang);

        mockTracks.forEach((track, i) => {
            const row = document.createElement('div');
            row.className = 'song-row';
            row.dataset.uid = track.name + (track.artistName || "");

            row.innerHTML = `
                <div class="song-index-container">
                    <span class="song-num">${i + 1}</span>
                    <i class="fa-solid fa-play play-icon-row"></i>
                </div>
                <div class="song-info-wrapper">
                    <img src="${track.image}" alt="">
                    <div class="song-title-group">
                        <span class="song-title">${track.name}</span>
                    </div>
                </div>
                <span class="song-plays">${track.plays}</span>
                <span class="song-duration">3:45</span>
            `;
            row.addEventListener('click', () => playTrack(i, mockTracks, row));
            songsList.appendChild(row);
        });

        document.getElementById('play-artist-main-btn').onclick = () => {
            const firstRow = songsList.querySelector('.song-row');
            playTrack(0, mockTracks, firstRow);
        };
        showOnly(artistDetailsPage);
    }

    function openAlbumDetails(album) {
        const lang = languageSelect.value;
        const t = getTranslations(lang);

        document.getElementById('album-cover-img').src = album.image;
        document.getElementById('album-title').innerText = album.name;
        document.getElementById('album-artist-name').innerText = album.artists;
        document.getElementById('album-year').innerText = album.year;
        
        document.getElementById('album-type-label').innerText = t.albumType;
        document.getElementById('th-title').innerText = t.thTitle;
        document.getElementById('back-home-album').innerText = "< " + t.back;

        const songsList = document.getElementById('album-songs-list');
        songsList.innerHTML = '';

        const mockAlbumTracks = window.getAlbumTracks(album, lang);
        document.getElementById('album-songs-count').innerText = `${mockAlbumTracks.length} ${t.albumSongs},`;

        mockAlbumTracks.forEach((track, i) => {
            const row = document.createElement('div');
            row.className = 'song-row album-track-row'; 
            row.dataset.uid = track.name + (track.artists || "");

            row.innerHTML = `
                <div class="song-index-container">
                    <span class="song-num">${i + 1}</span>
                    <i class="fa-solid fa-play play-icon-row"></i>
                </div>
                <div class="song-info-wrapper">
                    <div class="song-title-group">
                        <span class="song-title" style="font-size: 15px;">${track.name}</span>
                        <span class="song-artist-mini">${track.artists}</span>
                    </div>
                </div>
                <span class="song-plays"></span>
                <span class="song-duration">${track.duration}</span>
            `;
            row.style.gridTemplateColumns = "35px 4fr 1fr 1fr"; 

            row.addEventListener('click', () => playTrack(i, mockAlbumTracks, row));
            songsList.appendChild(row);
        });

        document.getElementById('play-album-btn').onclick = () => {
            const firstRow = songsList.querySelector('.song-row');
            playTrack(0, mockAlbumTracks, firstRow);
        };

        const colors = ['#535353', '#782b2b', '#2b4e78', '#2b7856', '#70782b'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        albumDetailsPage.style.background = `linear-gradient(to bottom, ${randomColor} 0%, #121212 400px)`;

        showOnly(albumDetailsPage);
    }

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
        artistCard.addEventListener('click', () => openArtistDetails(artist));
        artistCard.querySelector('.play-button').addEventListener('click', (e) => {
            e.stopPropagation();
            const tracks = window.getArtistTracks(artist, languageSelect.value);
            playTrack(0, tracks, null);
        });
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
        albumCard.addEventListener('click', () => openAlbumDetails(album));
        albumCard.querySelector('.play-button').addEventListener('click', (e) => {
            e.stopPropagation();
            const tracks = window.getAlbumTracks(album, languageSelect.value);
            playTrack(0, tracks, null);
        });
        albumsGrid.appendChild(albumCard);
    });

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

        document.getElementById('notif-page-title').innerText = t.notifTitle;
        document.getElementById('back-home-notif').innerText = t.back;
        document.getElementById('notif-item-title').innerText = t.notifItemTitle;
        document.getElementById('notif-item-desc').innerText = t.notifItemDesc;

        document.getElementById('profile-page-title').innerText = t.profileTitle;
        document.getElementById('profile-stats').innerText = t.profileStats;
        document.getElementById('back-home-profile').innerText = t.back;
        document.getElementById('txt-change-pic').innerText = t.changePic;
        document.getElementById('txt-remove-pic').innerText = t.removePic;


        document.getElementById('link-legal').innerText = t.legal;
        document.getElementById('link-privacy-center').innerText = t.privacyCenter;
        document.getElementById('link-privacy-policy').innerText = t.privacyPolicy;
        document.getElementById('link-cookies').innerText = t.cookies;
        document.getElementById('link-ads').innerText = t.ads;
        document.getElementById('link-access').innerText = t.accessibility;


        document.getElementById('back-home-artist').innerText = "< " + t.back;
        document.getElementById('back-home-album').innerText = "< " + t.back;
        
        document.getElementById('back-home-playlist').innerText = "< " + t.back;

        const cpLabel = document.querySelector('.cp-label');
        if(cpLabel) cpLabel.innerText = t.cpLabel;
        const cpMainTitle = document.getElementById('cp-main-title');
        if(cpMainTitle) cpMainTitle.innerText = t.cpMainTitle;
        const lblPlName = document.getElementById('lbl-pl-name');
        if(lblPlName) lblPlName.innerText = t.lblPlName;
        const lblPlDesc = document.getElementById('lbl-pl-desc');
        if(lblPlDesc) lblPlDesc.innerText = t.lblPlDesc;
        const plNameInput = document.getElementById('pl-name-input');
        if(plNameInput) plNameInput.placeholder = t.plNamePlaceholder;
        const plDescInput = document.getElementById('pl-desc-input');
        if(plDescInput) plDescInput.placeholder = t.plDescPlaceholder;
        const btnSavePl = document.getElementById('btn-save-playlist');
        if(btnSavePl) btnSavePl.innerText = t.btnSave;
        const btnCancelPl = document.getElementById('btn-cancel-playlist');
        if(btnCancelPl) btnCancelPl.innerText = t.btnCancel;
        

        const langBtn = document.querySelector('.nav-lang-button');
        if(langBtn) {
             const langName = lang === 'pt-BR' ? 'Português do Brasil' : (lang === 'en-US' ? 'English (US)' : 'Español');
             langBtn.innerHTML = `<i class="fa-solid fa-globe"></i> ${langName}`;
        }
    }

    function updateClock() {
        const clockElement = document.getElementById('brasilia-clock');
        if (clockElement) {
            const is24h = timeSwitch.checked;
            clockElement.textContent = new Intl.DateTimeFormat('pt-BR', { 
                hour: '2-digit', minute: '2-digit', hour12: !is24h, timeZone: 'America/Sao_Paulo' 
            }).format(new Date());
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

    const profilePicDisplay = document.getElementById('profile-pic-display');
    const profileUpload = document.getElementById('profile-upload');
    const changePicBtn = document.getElementById('change-pic-btn');
    const removePicBtn = document.getElementById('remove-pic-btn');
    const defaultAvatar = "https://ui-avatars.com/api/?name=User&background=1db954&color=fff&size=150";

    function loadProfileImage() {
        const savedImage = localStorage.getItem('user_profile_image');
        if (savedImage && savedImage.startsWith('data:image')) {
            profilePicDisplay.src = savedImage;
            if (removePicBtn) removePicBtn.style.display = "block";
        } else {
            profilePicDisplay.src = defaultAvatar;
            if (removePicBtn) removePicBtn.style.display = "none";
        }
    }

    if (changePicBtn) changePicBtn.addEventListener('click', () => profileUpload.click());
    if (profileUpload) {
        profileUpload.addEventListener('change', function() {
            const file = this.files[0];
            if (file && file.size < 1024 * 1024) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePicDisplay.src = e.target.result;
                    localStorage.setItem('user_profile_image', e.target.result);
                    if (removePicBtn) removePicBtn.style.display = "block";
                };
                reader.readAsDataURL(file);
            } else if (file) {
                alert("Imagem muito grande (> 1MB).");
            }
        });
    }
    if (removePicBtn) {
        removePicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profilePicDisplay.src = defaultAvatar;
            localStorage.removeItem('user_profile_image');
            profileUpload.value = "";
            removePicBtn.style.display = "none";
        });
    }

    const closePlayerBtn = document.getElementById('close-player-btn');
    if (closePlayerBtn) {
        closePlayerBtn.addEventListener('click', () => {
            playerBar.classList.add('player-bar-hidden');
            currentAudio.pause();
            isPlaying = false;
            updateRowUI();
        });
    }

    function addSongToCurrentPlaylist(track) {
        if (!currentOpenedPlaylistId) return;

        const playlists = JSON.parse(localStorage.getItem('my_custom_playlists')) || [];
        const plIndex = playlists.findIndex(pl => pl.id === currentOpenedPlaylistId);

        if (plIndex > -1) {
            if (!playlists[plIndex].songs) {
                playlists[plIndex].songs = [];
            }
            
            playlists[plIndex].songs.push(track);
            localStorage.setItem('my_custom_playlists', JSON.stringify(playlists));
            
            openPlaylistDetails(playlists[plIndex]);
        }
    }

    function renderRecommendedSongs() {
        const recList = document.getElementById('recommendation-list');
        const searchInput = document.getElementById('playlist-search-add');
        if(!recList) return;

        recList.innerHTML = '';
        
        const allTracks = getAllAvailableTracks();
        
        const query = searchInput.value.toLowerCase();
        let displayTracks = allTracks;

        if (query) {
            displayTracks = allTracks.filter(t => t.name.toLowerCase().includes(query) || (t.artistName && t.artistName.toLowerCase().includes(query)));
        } else {
            displayTracks = allTracks.slice(0, 5); 
        }

        displayTracks.forEach(track => {
            const div = document.createElement('div');
            div.className = 'add-song-row';
            div.innerHTML = `
                <div style="display:flex; align-items: center; gap: 10px; flex: 1;">
                    <img src="${track.image}" style="width: 40px; height: 40px; border-radius: 4px;">
                    <div>
                        <div style="color: white; font-weight: 500;">${track.name}</div>
                        <div style="color: #b3b3b3; font-size: 12px;">${track.artistName || track.artists || "Artista"}</div>
                    </div>
                </div>
                <button class="btn-add-song">Adicionar</button>
            `;
            
            div.querySelector('.btn-add-song').addEventListener('click', () => addSongToCurrentPlaylist(track));
            recList.appendChild(div);
        });
    }

    const plSearchInput = document.getElementById('playlist-search-add');
    if (plSearchInput) {
        plSearchInput.addEventListener('input', renderRecommendedSongs);
    }

    function openPlaylistDetails(playlist) {
    const savedPlaylists = JSON.parse(localStorage.getItem('my_custom_playlists')) || [];
    const updatedPlaylist = savedPlaylists.find(p => p.id === playlist.id) || playlist;

    currentOpenedPlaylistId = updatedPlaylist.id;

    document.getElementById('playlist-detail-title').innerText = updatedPlaylist.name;
    document.getElementById('playlist-detail-desc').innerText = updatedPlaylist.desc || "";

    const colors = ['#535353', '#782b2b', '#2b4e78', '#2b7856', '#70782b', '#4e2b78', '#782b4e'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    playlistDetailsPage.style.background = `linear-gradient(to bottom, ${randomColor} 0%, #121212 400px)`;

    const songsList = document.getElementById('playlist-songs-list');
    const songCountEl = document.getElementById('playlist-detail-stats');

    if (updatedPlaylist.songs && updatedPlaylist.songs.length > 0) {
        songsList.innerHTML = '';
        songCountEl.innerText = `${updatedPlaylist.songs.length} músicas`;

        updatedPlaylist.songs.forEach((track, i) => {
            const row = document.createElement('div');
            row.className = 'song-row album-track-row';
            row.dataset.uid = track.name + (track.artists || track.artistName || "");

            row.innerHTML = `
                <div class="song-index-container">
                    <span class="song-num">${i + 1}</span>
                    <i class="fa-solid fa-play play-icon-row"></i>
                </div>
                <div class="song-info-wrapper">
                     <img src="${track.image}" style="width:40px; height:40px; border-radius:4px;">
                    <div class="song-title-group">
                        <span class="song-title" style="font-size: 15px;">${track.name}</span>
                        <span class="song-artist-mini">${track.artists || track.artistName}</span>
                    </div>
                </div>
                <span class="song-plays"></span>
                <div style="display: flex; align-items: center; justify-content: flex-end; gap: 15px;">
                    <span class="song-duration">3:30</span>
                    <i class="fa-regular fa-trash-can btn-remove-song" style="cursor: pointer;" title="Remover da playlist"></i>
                </div>
            `;
            row.style.gridTemplateColumns = "35px 4fr 1fr 1fr";

            row.addEventListener('click', () => playTrack(i, updatedPlaylist.songs, row));

            // Botão remover música
            const btnRemove = row.querySelector('.btn-remove-song');
            btnRemove.addEventListener('click', (e) => {
                e.stopPropagation();
                removeSongFromPlaylist(updatedPlaylist.id, i);
            });

            songsList.appendChild(row);
        });

        const mainPlPlay = playlistDetailsPage.querySelector('.play-main-btn');
        if (mainPlPlay) {
            mainPlPlay.onclick = () => {
                playTrack(0, updatedPlaylist.songs, null);
            };
        }

    } else {
        songsList.innerHTML = `
            <p>Esta playlist ainda está vazia.</p>
            <p style="font-size: 13px; margin-top: 10px;">Adicione músicas para começar a ouvir.</p>
        `;
        songCountEl.innerText = `0 músicas`;
    }

    renderRecommendedSongs();
    showOnly(playlistDetailsPage);
}

function removeSongFromPlaylist(playlistId, songIndex) {
    let playlists = JSON.parse(localStorage.getItem('my_custom_playlists')) || [];
    const plIndex = playlists.findIndex(pl => pl.id === playlistId);

    if (plIndex > -1) {
        playlists[plIndex].songs.splice(songIndex, 1);
        localStorage.setItem('my_custom_playlists', JSON.stringify(playlists));
        openPlaylistDetails(playlists[plIndex]);
    }
}

function renderSavedPlaylists() {
    const playlists = JSON.parse(localStorage.getItem('my_custom_playlists')) || [];
    const container = document.getElementById('playlists-container');
    const emptyMsg = document.getElementById('empty-playlist-msg');

    if (!container) return;

    if (playlists.length > 0) {
        if (emptyMsg) emptyMsg.style.display = 'none';
        container.style.display = 'block';
        container.innerHTML = '';

        playlists.forEach(pl => {
            const plElement = document.createElement('div');
            plElement.className = 'playlist-item-sidebar';
            plElement.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px; cursor: pointer; padding: 8px; border-radius: 4px;" class="playlist-row-hover">
                    <div style="width: 48px; height: 48px; background: #282828; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                        <i class="fa-solid fa-music" style="color: #b3b3b3;"></i>
                    </div>
                    <div style="overflow: hidden;">
                        <p style="margin: 0; font-size: 14px; font-weight: bold; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">${pl.name}</p>
                        <p style="margin: 0; font-size: 12px; color: #b3b3b3;">Playlist • Você</p>
                    </div>
                </div>
            `;
            plElement.addEventListener('click', () => openPlaylistDetails(pl));
            container.appendChild(plElement);
        });
    } else {
        if (emptyMsg) emptyMsg.style.display = 'block';
        container.style.display = 'none';
    }
}

const btnDeletePl = document.getElementById('btn-delete-playlist');
if (btnDeletePl) {
    btnDeletePl.addEventListener('click', () => {
        if (currentOpenedPlaylistId) {
            const confirmDelete = confirm("Tem certeza que deseja excluir esta playlist?");
            if (confirmDelete) {
                let playlists = JSON.parse(localStorage.getItem('my_custom_playlists')) || [];
                playlists = playlists.filter(pl => pl.id !== currentOpenedPlaylistId);
                localStorage.setItem('my_custom_playlists', JSON.stringify(playlists));

                renderSavedPlaylists();
                showOnly(mainSection);
                currentOpenedPlaylistId = null;
            }
        }
    });
}

const btnSave = document.getElementById('btn-save-playlist');
if (btnSave) {
    btnSave.addEventListener('click', () => {
        const nameInput = document.getElementById('pl-name-input');
        const descInput = document.getElementById('pl-desc-input');

        if (!nameInput || nameInput.value.trim() === "") {
            alert("Por favor, adicione um nome.");
            return;
        }

        const newPlaylist = {
            id: Date.now(),
            name: nameInput.value,
            desc: descInput ? descInput.value : "",
            songs: []
        };

        const savedPlaylists = JSON.parse(localStorage.getItem('my_custom_playlists')) || [];
        savedPlaylists.push(newPlaylist);
        localStorage.setItem('my_custom_playlists', JSON.stringify(savedPlaylists));

        nameInput.value = "";
        if (descInput) descInput.value = "";

        renderSavedPlaylists();
        openPlaylistDetails(newPlaylist);
    });
}

renderSavedPlaylists();
loadSettings();
loadProfileImage();
if(typeof updateVolumeUI === "function") updateVolumeUI(volumeSlider.value);
});