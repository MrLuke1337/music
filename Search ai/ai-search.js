import { GoogleGenAI, Type } from "@google/genai";

const MANUAL_KEY_FOR_GITHUB_PAGES = "AIzaSyBQnyBTcgRZQxlvo8LD9FK-WsPw3IzRQy4"; 

if (typeof window !== "undefined") {
    if (typeof window.process === "undefined") {
        window.process = { env: {} };
    }
    if (!window.process.env) {
        window.process.env = {};
    }
    window.process.env.API_KEY = MANUAL_KEY_FOR_GITHUB_PAGES;
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
            console.log("✨ IA Gemini Conectada");
        } catch (error) {
            console.error("Erro ao configurar IA:", error);
        }
    } else {
        console.warn("⚠️ API Key não detectada. Adicione-a na variável MANUAL_KEY_FOR_GITHUB_PAGES em javascript/ai-search.js para a IA funcionar.");
    }

    let clearBtn = document.querySelector('.clear-search-btn');
    if (!clearBtn && searchInput) {
        clearBtn = document.createElement('i');
        clearBtn.className = 'fa-solid fa-xmark clear-search-btn';
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

        const context = {
            data_atual: new Date().toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' }),
            artists: allArtists.map(a => a.name),
            albums: allAlbums.map(a => `${a.name} (de ${a.artists})`),
            songs_detailed: allTracks.slice(0, 60).map(t => `${t.name} (Artista: ${t.artistName || t.artists})`) 
        };

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `
                Você é uma IA Híbrida: Atua como DJ especialista em música E como assistente pessoal útil.
                
                CONTEXTO ATUAL (Informações Reais):
                ${JSON.stringify(context)}
                
                O USUÁRIO DISSE: "${query}"
                
                INSTRUÇÕES:
                1. ANALISE A INTENÇÃO:
                   - É uma pergunta geral (ex: "Que dia é hoje?", "Conte uma piada", "Quem é o presidente?", "Resuma tal coisa")?
                   - OU é uma busca por música/vibe (ex: "Toca algo triste", "Sertanejo", "Músicas do Luan")?

                2. SE FOR PERGUNTA GERAL:
                   - Responda a pergunta diretamente e com simpatia no campo 'ai_message'.
                   - Use a 'data_atual' do contexto se perguntarem sobre tempo/dia.
                   - Deixe os arrays de música vazios.

                3. SE FOR BUSCA MUSICAL:
                   - Gere um comentário de DJ divertido no 'ai_message'.
                   - Preencha os arrays com os nomes EXATOS que encontrar no contexto.

                4. FORMATO:
                   - Seja amigável e use emojis.
                   - Responda sempre em JSON.
                `,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            matched_artists: { type: Type.ARRAY, items: { type: Type.STRING } },
                            matched_albums: { type: Type.ARRAY, items: { type: Type.STRING } },
                            matched_songs: { type: Type.ARRAY, items: { type: Type.STRING } },
                            ai_message: { type: Type.STRING, description: "A resposta da IA para o usuário" },
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
            tags: ["Resultados Locais"]
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

        if (ai) {
            const aiResponse = await searchWithGemini(query);
            if (aiResponse) {
                results.artists = allArtists.filter(a => aiResponse.matched_artists && aiResponse.matched_artists.some(ma => a.name.includes(ma) || ma.includes(a.name)));
                
                results.albums = allAlbums.filter(a => aiResponse.matched_albums && aiResponse.matched_albums.some(ma => {
                    const cleanName = ma.split('(')[0].trim();
                    return a.name.includes(cleanName) || cleanName.includes(a.name);
                }));

                results.songs = allTracks.filter(t => aiResponse.matched_songs && aiResponse.matched_songs.some(ms => {
                    const cleanName = ms.split('(')[0].trim();
                    return t.name.includes(cleanName) || cleanName.includes(t.name);
                }));

                results.message = aiResponse.ai_message;
                results.tags = aiResponse.tags || ["IA"];
                
                usedAI = true;
            }
        }

        if (!usedAI) {
            const localResults = localSearch(query);
            results.artists = localResults.artists;
            results.albums = localResults.albums;
            results.songs = localResults.songs;
            results.tags = localResults.tags;
            
            if (!ai) {
                 results.message = "Resultados offline.";
            } else {
                 results.message = results.artists.length + results.albums.length + results.songs.length > 0 ? 
                    `Resultados para "${query}"` : "Nenhum resultado encontrado.";
            }
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

        if (data.message) {
            const suggestionBox = document.createElement('div');
            suggestionBox.className = 'ai-suggestion-box fade-in';
            
            const isAI = !!ai && (data.tags && !data.tags.includes("Resultados Locais"));
            const iconClass = isAI ? 'fa-solid fa-wand-magic-sparkles' : 'fa-solid fa-magnifying-glass';
            const titleText = isAI ? 'Gemini AI' : 'Busca';
            
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

        if (data.songs.length > 0) {
            hasResults = true;
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

        if (data.artists.length > 0) {
            hasResults = true;
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

        if (data.albums.length > 0) {
            hasResults = true;
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

        if (!hasResults && !data.message) {
             if(artistsGrid) artistsGrid.innerHTML = '<p style="color: #b3b3b3; padding: 20px;">Nada encontrado.</p>';
             if(artistsTitle) artistsTitle.style.display = 'block';
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
            <span>Busca Inteligente...</span>
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