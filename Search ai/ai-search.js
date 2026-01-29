import { GoogleGenAI, Type } from "@google/genai";

// Tenta pegar a chave do ambiente ou usa a manual (ex: GitHub Pages)
const MANUAL_KEY_FOR_GITHUB_PAGES = "AIzaSyBQnyBTcgRZQxlvo8LD9FK-WsPw3IzRQy4"; 

if (typeof window !== "undefined") {
    if (typeof window.process === "undefined") {
        window.process = { env: {} };
    }
    if (!window.process.env) {
        window.process.env = {};
    }
    // Define fallback se não existir
    if (!window.process.env.API_KEY) {
        window.process.env.API_KEY = MANUAL_KEY_FOR_GITHUB_PAGES;
    }
}

const API_KEY = typeof process !== "undefined" && process.env ? process.env.API_KEY : MANUAL_KEY_FOR_GITHUB_PAGES;

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('main-search-input');
    const artistsGrid = document.querySelector('.artists-grid');
    const albumsGrid = document.querySelector('.albums-grid');
    const songsGrid = document.querySelector('.songs-grid');
    
    const artistsTitle = document.getElementById('title-artists');
    const albumsTitle = document.getElementById('title-albums');
    const songsTitle = document.getElementById('title-songs');

    let ai = null;
    if (API_KEY) {
        try {
            ai = new GoogleGenAI({ apiKey: API_KEY });
            console.log("✨ IA Gemini Inicializada");
        } catch (error) {
            console.error("Erro ao configurar IA:", error);
            ai = null; // Garante que é null se falhar
        }
    } else {
        console.warn("⚠️ API Key não detectada. Modo Offline ativado.");
    }

    // Botão de limpar busca
    let clearBtn = document.querySelector('.clear-search-btn');
    if (!clearBtn && searchInput) {
        clearBtn = document.createElement('i');
        clearBtn.className = 'fa-solid fa-xmark clear-search-btn';
        // FIXED: Force explicit hide on creation to prevent flashing on load
        clearBtn.style.display = 'none'; 
        
        if (searchInput.parentElement) {
            searchInput.parentElement.appendChild(clearBtn);
        }

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            resetInterface();
            searchInput.focus();
        });
    }

    function getAllTracks() {
        const lang = document.getElementById('language-select') ? document.getElementById('language-select').value : 'pt-BR';
        let tracks = [];
        
        if (window.artistsData && window.getArtistTracks) {
            window.artistsData.forEach(artist => {
                tracks.push(...window.getArtistTracks(artist, lang));
            });
        }
        
        if (window.albumsData && window.getAlbumTracks) {
            window.albumsData.forEach(album => {
                tracks.push(...window.getAlbumTracks(album, lang));
            });
        }
        return tracks;
    }

    async function searchWithGemini(query) {
        if (!ai) return null;

        const allArtists = window.artistsData || [];
        const allAlbums = window.albumsData || [];
        const allTracks = getAllTracks();

        // Dados reduzidos para contexto da IA
        const context = {
            artists: allArtists.map(a => a.name),
            albums: allAlbums.map(a => `${a.name} (${a.artists})`),
            songs_sample: allTracks.slice(0, 30).map(t => `${t.name} - ${t.artistName || t.artists}`)
        };

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash', // Modelo mais estável
                contents: `
                Você é um DJ assistente do Spotify.
                CONTEXTO DE DADOS: ${JSON.stringify(context)}
                USUÁRIO BUSCOU: "${query}"
                
                Se a busca for sobre sentimentos ou genérica (ex: "triste", "rock"), sugira baseando-se no contexto.
                Se for específica (ex: "Henrique"), retorne matches exatos.
                
                Responda APENAS em JSON seguindo este schema:
                {
                    "matched_artists": ["nome exato do artista"],
                    "matched_albums": ["nome exato do album"],
                    "matched_songs": ["nome da musica"],
                    "ai_message": "Uma frase curta e divertida sobre a busca.",
                    "tags": ["Tag1", "Tag2"]
                }
                `,
                config: {
                    responseMimeType: "application/json"
                }
            });

            if (response.text) {
                return JSON.parse(response.text);
            }
        } catch (error) {
            console.warn("Falha na IA (possivelmente bloqueio ou erro de rede). Usando busca local.", error);
            return null; // Retorna null para ativar o fallback local
        }
        return null;
    }

    function localSearch(query) {
        const lowerQ = query.toLowerCase().trim();
        const allArtists = window.artistsData || [];
        const allAlbums = window.albumsData || [];
        const allTracks = getAllTracks();

        // Busca Local Robusta (Simulando "Busca por ID/Nome")
        const artists = allArtists.filter(a => a.name.toLowerCase().includes(lowerQ));
        const albums = allAlbums.filter(a => a.name.toLowerCase().includes(lowerQ) || a.artists.toLowerCase().includes(lowerQ));
        const songs = allTracks.filter(t => t.name.toLowerCase().includes(lowerQ) || (t.artistName && t.artistName.toLowerCase().includes(lowerQ)));

        return {
            artists: artists,
            albums: albums,
            songs: songs,
            message: `Resultados locais para "${query}"`,
        };
    }

    async function performSearch(query) {
        if (!query.trim()) {
            resetInterface();
            return;
        }

        showLoading();

        const allArtists = window.artistsData || [];
        const allAlbums = window.albumsData || [];
        const allTracks = getAllTracks();
        
        let results = {
            artists: [],
            albums: [],
            songs: [],
            message: null,
            tags: []
        };

        let usedAI = false;

        // Tenta usar IA primeiro
        if (ai) {
            const aiResponse = await searchWithGemini(query);
            
            if (aiResponse) {
                // Filtra os dados reais baseados no retorno da IA
                results.artists = allArtists.filter(a => aiResponse.matched_artists && aiResponse.matched_artists.some(ma => a.name.toLowerCase().includes(ma.toLowerCase()) || ma.toLowerCase().includes(a.name.toLowerCase())));
                
                results.albums = allAlbums.filter(a => aiResponse.matched_albums && aiResponse.matched_albums.some(ma => {
                    const cleanName = ma.split('(')[0].trim().toLowerCase();
                    return a.name.toLowerCase().includes(cleanName);
                }));

                results.songs = allTracks.filter(t => aiResponse.matched_songs && aiResponse.matched_songs.some(ms => {
                    const cleanName = ms.split('(')[0].trim().toLowerCase();
                    return t.name.toLowerCase().includes(cleanName);
                }));

                results.message = aiResponse.ai_message;
                results.tags = aiResponse.tags || ["IA Gemini"];
                usedAI = true;
            }
        }

        // FALLBACK: Se a IA falhou, retornou null, ou não encontrou nada, usa a busca Local
        if (!usedAI || (results.artists.length === 0 && results.albums.length === 0 && results.songs.length === 0)) {
            console.log("Acionando busca local (Fallback)...");
            const localResults = localSearch(query);
            results.artists = localResults.artists;
            results.albums = localResults.albums;
            results.songs = localResults.songs;
            results.tags = localResults.tags;
            results.message = localResults.message;
        }

        // Se ainda assim nada, exibe mensagem
        if (results.artists.length === 0 && results.albums.length === 0 && results.songs.length === 0) {
             results.message = `Nenhum resultado encontrado para "${query}".`;
        }

        renderResults(results);
    }

    function renderResults(data) {
        hideLoading();
        
        if (artistsGrid) artistsGrid.innerHTML = '';
        if (albumsGrid) albumsGrid.innerHTML = '';
        if (songsGrid) songsGrid.innerHTML = '';

        const oldSuggestion = document.querySelector('.ai-suggestion-box');
        if(oldSuggestion) oldSuggestion.remove();

        // Renderiza Box de Sugestão/Status
        if (data.message) {
            const suggestionBox = document.createElement('div');
            suggestionBox.className = 'ai-suggestion-box fade-in';
            
            const isOffline = data.tags && data.tags[0].includes("Offline");
            const iconClass = isOffline ? 'fa-solid fa-wifi' : 'fa-solid fa-wand-magic-sparkles';
            const titleText = isOffline ? 'Busca Local' : 'Gemini AI';
            
            suggestionBox.innerHTML = `
                <div class="ai-header">
                    <i class="${iconClass}"></i>
                    <span>${titleText}</span>
                </div>
                <p>${data.message}</p>
                <div class="ai-tags">
                    ${(data.tags || []).map(tag => `<span>${tag}</span>`).join('')}
                </div>
            `;
            const mainContent = document.getElementById('main-content');
            if(mainContent) mainContent.insertBefore(suggestionBox, mainContent.firstChild);
        }

        let hasResults = false;

        // Render Músicas
        if (data.songs.length > 0) {
            hasResults = true;
            if(songsTitle) songsTitle.style.display = 'block';
            if(songsGrid) {
                data.songs.forEach(song => {
                    songsGrid.appendChild(createCard(song, 'song'));
                });
            }
        } else {
            if(songsTitle) songsTitle.style.display = 'none';
        }

        // Render Artistas
        if (data.artists.length > 0) {
            hasResults = true;
            if(artistsTitle) artistsTitle.style.display = 'block';
            if(artistsGrid) {
                data.artists.forEach(artist => {
                    artistsGrid.appendChild(createCard(artist, 'artist'));
                });
            }
        } else {
            if(artistsTitle) artistsTitle.style.display = 'none';
        }

        // Render Álbuns
        if (data.albums.length > 0) {
            hasResults = true;
            if(albumsTitle) albumsTitle.style.display = 'block';
            if(albumsGrid) {
                data.albums.forEach(album => {
                    albumsGrid.appendChild(createCard(album, 'album'));
                });
            }
        } else {
            if(albumsTitle) albumsTitle.style.display = 'none';
        }

        if (!hasResults && !data.message) {
             if(artistsGrid) artistsGrid.innerHTML = '<p style="color: #b3b3b3; padding: 20px;">Nada encontrado.</p>';
        }
    }

    function createCard(item, type) {
        const div = document.createElement('div');
        div.className = type === 'artist' ? 'artist-card' : (type === 'album' ? 'album-card' : 'song-card');
        
        let subTitle = '';
        if (type === 'artist') subTitle = 'Artista';
        else if (type === 'album') subTitle = item.artists || 'Álbum';
        else subTitle = item.artistName || item.artists || 'Música';

        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${subTitle}</p>
            <div class="play-button"><i class="fa-solid fa-play"></i></div>
        `;

        div.addEventListener('click', () => {
            if (type === 'artist' && window.openArtistDetails) window.openArtistDetails(item);
            if (type === 'album' && window.openAlbumDetails) window.openAlbumDetails(item);
            if (type === 'song' && window.playTrack) window.playTrack(0, [item], null);
        });

        const btn = div.querySelector('.play-button');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.playTrack) {
                if (type === 'song') {
                    window.playTrack(0, [item], null);
                } else if (type === 'artist' && window.getArtistTracks) {
                    const tracks = window.getArtistTracks(item, 'pt-BR');
                    window.playTrack(0, tracks, null);
                } else if (type === 'album' && window.getAlbumTracks) {
                    const tracks = window.getAlbumTracks(item, 'pt-BR');
                    window.playTrack(0, tracks, null);
                }
            }
        });

        return div;
    }

    function resetInterface() {
        hideLoading();
        
        const oldSuggestion = document.querySelector('.ai-suggestion-box');
        if(oldSuggestion) oldSuggestion.remove();
        
        if(songsTitle) songsTitle.style.display = 'none';
        if(songsGrid) songsGrid.innerHTML = '';
        
        if (window.artistsData && artistsGrid) {
            artistsGrid.innerHTML = '';
            if(artistsTitle) {
                artistsTitle.style.display = 'block';
                artistsTitle.textContent = "Artistas Populares";
            }
            window.artistsData.forEach(a => artistsGrid.appendChild(createCard(a, 'artist')));
        }
        if (window.albumsData && albumsGrid) {
            albumsGrid.innerHTML = '';
            if(albumsTitle) {
                albumsTitle.style.display = 'block';
                albumsTitle.textContent = "Álbuns Populares";
            }
            window.albumsData.forEach(a => albumsGrid.appendChild(createCard(a, 'album')));
        }
    }

    function showLoading() {
        const oldLoader = document.querySelector('.ai-search-loader');
        if(oldLoader) oldLoader.remove();

        const loader = document.createElement('div');
        loader.className = 'ai-search-loader';
        loader.innerHTML = `
            <div class="spinner"></div>
            <span>Pesquisando...</span>
        `;
        
        const mainContent = document.getElementById('main-content');
        if(mainContent) mainContent.insertBefore(loader, mainContent.firstChild);
    }

    function hideLoading() {
        const loader = document.querySelector('.ai-search-loader');
        if (loader) loader.remove();
    }

    let timeout;
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            const val = e.target.value;
            
            if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';

            if (!val.trim()) {
                resetInterface();
                return;
            }

            // Debounce para não chamar a API a cada tecla
            timeout = setTimeout(() => {
                performSearch(val);
            }, 800); 
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(timeout);
                performSearch(searchInput.value);
            }
        });
    }
});