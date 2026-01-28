import { GoogleGenAI, Type } from "@google/genai";

// Recupera a chave de API do ambiente (process.env.API_KEY)
const getApiKey = () => {
    try {
        if (typeof process !== "undefined" && process.env && process.env.API_KEY) {
            return process.env.API_KEY;
        }
    } catch (e) {
        // Ignora erro de referência se process não estiver definido
    }
    return null;
};

const API_KEY = getApiKey();

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('main-search-input');
    const artistsGrid = document.querySelector('.artists-grid');
    const albumsGrid = document.querySelector('.albums-grid');
    const songsGrid = document.querySelector('.songs-grid');
    
    // Elementos de Título
    const artistsTitle = document.getElementById('title-artists');
    const albumsTitle = document.getElementById('title-albums');
    const songsTitle = document.getElementById('title-songs');

    // Inicializa IA se a chave existir
    let ai = null;
    if (API_KEY) {
        try {
            ai = new GoogleGenAI({ apiKey: API_KEY });
            console.log("✨ IA Gemini Conectada");
        } catch (error) {
            console.error("Erro ao configurar IA:", error);
        }
    } else {
        console.warn("⚠️ Chave da API não encontrada. A busca funcionará apenas no modo local.");
    }

    // Configuração do Botão Limpar (X)
    let clearBtn = document.querySelector('.clear-search-btn');
    if (!clearBtn && searchInput) {
        clearBtn = document.createElement('i');
        clearBtn.className = 'fa-solid fa-xmark clear-search-btn';
        if (searchInput.parentElement) {
            searchInput.parentElement.appendChild(clearBtn);
            // CSS deve posicionar isso absolute dentro do pai relative
        }

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.style.display = 'none';
            resetInterface();
            searchInput.focus();
        });
    }

    // Função auxiliar para coletar todas as músicas disponíveis nos dados globais
    function getAllTracks() {
        const lang = document.getElementById('language-select') ? document.getElementById('language-select').value : 'pt-BR';
        let tracks = [];
        
        // Coleta de Artistas
        if (window.artistsData && window.getArtistTracks) {
            window.artistsData.forEach(artist => {
                tracks.push(...window.getArtistTracks(artist, lang));
            });
        }
        
        // Coleta de Álbuns
        if (window.albumsData && window.getAlbumTracks) {
            window.albumsData.forEach(album => {
                tracks.push(...window.getAlbumTracks(album, lang));
            });
        }
        return tracks;
    }

    // Função que chama a IA do Google
    async function searchWithGemini(query) {
        if (!ai) return null;

        const allArtists = window.artistsData || [];
        const allAlbums = window.albumsData || [];
        const allTracks = getAllTracks();

        // Contexto simplificado
        const context = {
            artists: allArtists.map(a => a.name),
            albums: allAlbums.map(a => a.name),
            songs_sample: allTracks.slice(0, 30).map(t => t.name) // Amostra menor
        };

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `
                Você é o motor de busca do Spotify Clone.
                CONTEXTO DE DADOS: ${JSON.stringify(context)}
                USUÁRIO BUSCOU: "${query}"
                
                Instruções:
                1. Identifique se a busca corresponde a Artistas, Álbuns ou Músicas da lista.
                2. Seja tolerante com erros de digitação (ex: "Jorje" -> "Jorge & Mateus").
                3. Retorne arrays de strings com os NOMES EXATOS encontrados no contexto.
                4. Crie uma mensagem curta e divertida sobre a busca.
                5. Gere 2 tags de gênero musical relacionadas.
                `,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            matched_artists: { type: Type.ARRAY, items: { type: Type.STRING } },
                            matched_albums: { type: Type.ARRAY, items: { type: Type.STRING } },
                            matched_songs: { type: Type.ARRAY, items: { type: Type.STRING } },
                            ai_message: { type: Type.STRING },
                            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
                        }
                    }
                }
            });

            if (response.text) {
                return JSON.parse(response.text);
            }
        } catch (error) {
            console.error("Erro na busca IA:", error);
            return null;
        }
        return null;
    }

    // Busca Local (Fallback)
    function localSearch(query) {
        const lowerQ = query.toLowerCase();
        const allArtists = window.artistsData || [];
        const allAlbums = window.albumsData || [];
        const allTracks = getAllTracks();

        return {
            artists: allArtists.filter(a => a.name.toLowerCase().includes(lowerQ)),
            albums: allAlbums.filter(a => a.name.toLowerCase().includes(lowerQ)),
            songs: allTracks.filter(t => t.name.toLowerCase().includes(lowerQ)),
            message: null,
            tags: []
        };
    }

    // Função de Busca Principal
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

        // 1. Tenta Busca com IA
        if (ai) {
            const aiResponse = await searchWithGemini(query);
            if (aiResponse) {
                results.artists = allArtists.filter(a => aiResponse.matched_artists.includes(a.name));
                results.albums = allAlbums.filter(a => aiResponse.matched_albums.includes(a.name));
                results.songs = allTracks.filter(t => aiResponse.matched_songs.includes(t.name));
                results.message = aiResponse.ai_message;
                results.tags = aiResponse.tags;
                usedAI = true;
            }
        }

        // 2. Fallback ou Complemento Local
        // Se a IA não retornou nada relevante ou não está ativa, fazemos a busca exata
        if (!usedAI || (results.artists.length === 0 && results.albums.length === 0 && results.songs.length === 0)) {
            const localResults = localSearch(query);
            // Só sobrescreve se a IA não achou nada
            if (results.artists.length === 0) results.artists = localResults.artists;
            if (results.albums.length === 0) results.albums = localResults.albums;
            if (results.songs.length === 0) results.songs = localResults.songs;
            
            if (!results.message) {
                 results.message = `Resultados para "${query}"`;
            }
        }

        renderResults(results);
    }

    function renderResults(data) {
        hideLoading();
        
        // Limpa grids
        if (artistsGrid) artistsGrid.innerHTML = '';
        if (albumsGrid) albumsGrid.innerHTML = '';
        if (songsGrid) songsGrid.innerHTML = '';

        // Remove sugestão anterior
        const oldSuggestion = document.querySelector('.ai-suggestion-box');
        if(oldSuggestion) oldSuggestion.remove();

        // 1. Renderiza Mensagem (IA ou Local)
        if (data.message) {
            const suggestionBox = document.createElement('div');
            suggestionBox.className = 'ai-suggestion-box fade-in';
            
            const isAI = !!ai && (data.tags && data.tags.length > 0);
            
            suggestionBox.innerHTML = `
                <div class="ai-header">
                    <i class="${isAI ? 'fa-solid fa-wand-magic-sparkles' : 'fa-solid fa-magnifying-glass'}"></i>
                    <span>${isAI ? 'IA Insight' : 'Busca Inteligente'}</span>
                </div>
                <p>${data.message}</p>
                <div class="ai-tags">
                    ${(data.tags || []).map(tag => `<span>${tag}</span>`).join('')}
                </div>
            `;
            const mainContent = document.getElementById('main-content');
            if(mainContent) mainContent.insertBefore(suggestionBox, mainContent.firstChild);
        }

        // 2. Músicas
        if (data.songs.length > 0) {
            if(songsTitle) songsTitle.style.display = 'block';
            if(songsTitle) songsTitle.textContent = "Músicas";
            if(songsGrid) {
                data.songs.forEach(song => {
                    const card = createCard(song, 'song');
                    songsGrid.appendChild(card);
                });
            }
        } else {
            if(songsTitle) songsTitle.style.display = 'none';
        }

        // 3. Artistas
        if (data.artists.length > 0) {
            if(artistsTitle) artistsTitle.style.display = 'block';
            if(artistsTitle) artistsTitle.textContent = "Artistas";
            if(artistsGrid) {
                data.artists.forEach(artist => {
                    const card = createCard(artist, 'artist');
                    artistsGrid.appendChild(card);
                });
            }
        } else {
            if(artistsTitle) artistsTitle.style.display = 'none';
        }

        // 4. Álbuns
        if (data.albums.length > 0) {
            if(albumsTitle) albumsTitle.style.display = 'block';
            if(albumsTitle) albumsTitle.textContent = "Álbuns";
            if(albumsGrid) {
                data.albums.forEach(album => {
                    const card = createCard(album, 'album');
                    albumsGrid.appendChild(card);
                });
            }
        } else {
            if(albumsTitle) albumsTitle.style.display = 'none';
        }

        // Caso vazio
        if (data.artists.length === 0 && data.albums.length === 0 && data.songs.length === 0) {
            if(artistsGrid) {
                artistsGrid.innerHTML = '<p style="color: #b3b3b3; grid-column: 1/-1; padding: 20px;">Nenhum resultado encontrado. Tente buscar por artista, música ou álbum.</p>';
            }
            if(artistsTitle) artistsTitle.style.display = 'block';
            if(artistsTitle) artistsTitle.textContent = "Resultados";
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
        
        // Restaura grid original
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
            <span>Buscando...</span>
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

            // Delay para evitar muitas requisições
            timeout = setTimeout(() => {
                performSearch(val);
            }, 500); 
        });

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                clearTimeout(timeout);
                performSearch(searchInput.value);
            }
        });
    }
});