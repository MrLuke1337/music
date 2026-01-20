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
        { name: "White Noise", artists: "Sleepy john", year: "2023", image: "./img/album-white-noise.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
        { name: "O céu explica Tudo", artists: "Henrique & Juliano", year: "2017", image: "./img/album-ceu-explica.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
        { name: "Nada como um dia...", artists: "Racionais", year: "2002", image: "./img/album-vida-loka.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
        { name: "HIT ME HARD AND SOFT", artists: "Billie Eilish", year: "2024", image: "./img/album-hit-me.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
        { name: "CAJU", artists: "Liniker", year: "2024", image: "./img/album-caju.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" },
        { name: "Escândalo íntimo", artists: "Luisa Sonza", year: "2023", image: "./img/album-escandalo.jpg", audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3" },
    ];

    let currentAudio = new Audio();
    let isPlaying = false;
    let currentPlaylist = [];
    let currentTrackIndex = 0;
    let lastVolume = 1;
    let currentlyPlayingRow = null; 

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

    const timeSwitch = document.getElementById('time-format-switch');
    const languageSelect = document.getElementById('language-select');

    playerBar.classList.add('player-bar-hidden');

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

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
            profileStats: "0 Playlists • 0 Seguidores", profileTitle: "Seu Perfil",
            changePic: "Alterar", removePic: "Remover",
            legal: "Legal", privacyCenter: "Centro de Privacidade", privacyPolicy: "Política de Privacidade",
            cookies: "Cookies", ads: "Sobre anúncios", accessibility: "Acessibilidade",
            notifTitle: "O que há de novo",
            notifItemTitle: "Novos Lançamentos", notifItemDesc: "Henrique & Juliano acabaram de lançar um novo álbum.",
            artistVerified: "Artista Verificado", artistFollow: "Seguir", artistPopular: "Populares",
            trackSuccess: "Sucesso 1", trackLive: "Ao Vivo", trackAcoustic: "Acústico", trackRemix: "Remix", trackFeat: "Ft. Convidado",
            albumType: "Álbum", albumSongs: "músicas", albumTrackPrefix: "Faixa do Álbum", thTitle: "Título"
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
            albumType: "Album", albumSongs: "songs", albumTrackPrefix: "Album Track", thTitle: "Title"
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
            albumType: "Álbum", albumSongs: "canciones", albumTrackPrefix: "Pista del Álbum", thTitle: "Título"
        }
    };

    function getTranslations(lang) {
        return translations[lang] || translations["pt-BR"];
    }

    function getArtistTracks(artist, lang) {
        const t = getTranslations(lang);
        return [
            {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackSuccess}`, plays: "350.234.111", audio: artist.audio},
            {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackLive}`, plays: "120.500.222", audio: artist.audio},
            {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackAcoustic}`, plays: "90.100.500", audio: artist.audio},
            {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackRemix}`, plays: "45.200.000", audio: artist.audio},
            {...artist, artistName: artist.name, name: `${artist.name} - ${t.trackFeat}`, plays: "12.854.123", audio: artist.audio}
        ];
    }

    function getAlbumTracks(album, lang) {
         const t = getTranslations(lang);
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
            currentAudio.play();
            isPlaying = true;

            playerTitle.innerText = track.name;
            playerArtist.innerText = track.artists || track.artistName || "Artista";
            playerImg.src = track.image;
            
            playerBar.classList.remove('player-bar-hidden');
            playerBar.classList.remove('player-bar-minimized');
        }

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
        [mainSection, settingsSection, notifPage, profilePage, artistDetailsPage, albumDetailsPage].forEach(s => {
            if(s) s.style.display = 'none';
        });
        section.style.display = 'block';
        setTimeout(updateRowUI, 50); 
    }

    document.getElementById('config-nav-btn').addEventListener('click', () => showOnly(settingsSection));
    document.getElementById('home-nav-btn').addEventListener('click', (e) => { e.preventDefault(); showOnly(mainSection); });
    document.getElementById('notif-nav-btn').addEventListener('click', () => showOnly(notifPage));
    document.getElementById('profile-nav-btn').addEventListener('click', () => showOnly(profilePage));

    [document.getElementById('back-home-notif'), 
     document.getElementById('back-home-profile'),
     document.getElementById('back-home-artist'),
     document.getElementById('back-home-album')].forEach(btn => {
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

        const mockTracks = getArtistTracks(artist, lang);

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
        
        // Translate static parts
        document.getElementById('album-type-label').innerText = t.albumType;
        document.getElementById('th-title').innerText = t.thTitle;
        document.getElementById('back-home-album').innerText = "< " + t.back;

        const songsList = document.getElementById('album-songs-list');
        songsList.innerHTML = '';

        const mockAlbumTracks = getAlbumTracks(album, lang);
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
            const tracks = getArtistTracks(artist, languageSelect.value);
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
            const tracks = getAlbumTracks(album, languageSelect.value);
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

    loadSettings();
    loadProfileImage();
    updateVolumeUI(volumeSlider.value);
});