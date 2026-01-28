import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "YOUR_API_KEY_HERE"; 

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('main-search-input');
    const searchIcon = document.querySelector('.search-bar i');
    const artistsGrid = document.querySelector('.artists-grid');
    const albumsGrid = document.querySelector('.albums-grid');

    let genAI;
    let model;
    
    if (API_KEY && API_KEY !== "YOUR_API_KEY_HERE") {
        try {
            genAI = new GoogleGenerativeAI(API_KEY);
            model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            console.log("Gemini AI Initialized");
        } catch (error) {
            console.error("Error initializing Gemini:", error);
        }
    } else {
        console.warn("API Key não configurada em javascript/ai-search.js");
    }

    async function getAIResponse(query, dataContext) {
        if (!model) return null;

        const prompt = `
        You are a smart music assistant for a Spotify clone.
        
        CONTEXT DATA:
        Artists: ${JSON.stringify(dataContext.artists.map(a => a.name))}
        Albums: ${JSON.stringify(dataContext.albums.map(a => ({ name: a.name, artist: a.artists })))}
        
        USER QUERY: "${query}"
        
        TASK:
        1. Find artists from the Context Data that match the query (fuzzy match, genre match, vibe match).
        2. Find albums from the Context Data that match the query.
        3. Generate a "smart suggestion" (text) explaining why you found these or giving a fun fact about the genre/artist requested.
        4. Provide 3 recommendations of related genres or artists (strings).
        
        OUTPUT FORMAT (JSON ONLY):
        {
            "matched_artists": ["Exact Name 1", "Exact Name 2"],
            "matched_albums": ["Exact Album Name 1"],
            "ai_message": "Short friendly text here...",
            "recommendations": ["Rock", "Pop", "Jazz"]
        }
        `;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("AI Generation Error:", error);
            return null;
        }
    }

    async function intelligentSearch(query) {
        const lowerQuery = query.toLowerCase().trim();
        const allArtists = window.artistsData || [];
        const allAlbums = window.albumsData || [];

        if (!lowerQuery) {
            return {
                artists: allArtists,
                albums: allAlbums,
                suggestions: []
            };
        }

        showLoadingState();

        let aiResults = null;
        
        if (model) {
            aiResults = await getAIResponse(query, { artists: allArtists, albums: allAlbums });
        }

        let matchedArtists = [];
        let matchedAlbums = [];
        let suggestions = [];

        if (aiResults) {
            matchedArtists = allArtists.filter(a => aiResults.matched_artists.includes(a.name));
            matchedAlbums = allAlbums.filter(a => aiResults.matched_albums.includes(a.name));
            
            if (matchedArtists.length === 0 && matchedAlbums.length === 0) {
                 matchedArtists = allArtists.filter(artist => artist.name.toLowerCase().includes(lowerQuery));
                 matchedAlbums = allAlbums.filter(album => album.name.toLowerCase().includes(lowerQuery));
            }

            suggestions.push({
                type: "ai_summary",
                title: "✨ Resposta da IA",
                content: aiResults.ai_message,
                recommendations: aiResults.recommendations
            });

        } else {

            matchedArtists = allArtists.filter(artist => artist.name.toLowerCase().includes(lowerQuery));
            matchedAlbums = allAlbums.filter(album => album.name.toLowerCase().includes(lowerQuery));
            
           suggestions.push({
                type: "local_info",
                title: "Busca Inteligente",
                content: "Busque por suas músicas desejadas ultilizando a busca inteligente.",
                recommendations: []
            });
        }

        return {
            artists: matchedArtists,
            albums: matchedAlbums,
            suggestions: suggestions
        };
    }

    function showLoadingState() {
        const container = document.querySelector('.ai-suggestions-container');
        if (container) container.remove();
        
        const loader = document.createElement('div');
        loader.className = 'ai-loading';
        loader.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Pensando...';
        loader.style.cssText = "color: #1db954; padding: 20px; text-align: center; font-size: 18px;";
        
        const albumsSection = document.querySelector('#title-albums').parentElement;

        const ref = document.querySelector('.artists-grid');
        ref.parentNode.insertBefore(loader, ref);
    }

    function removeLoadingState() {
        const loader = document.querySelector('.ai-loading');
        if (loader) loader.remove();
    }

    function renderSearchResults(results) {
        removeLoadingState();
        
        artistsGrid.innerHTML = '';
        albumsGrid.innerHTML = '';

        const artistsTitle = document.getElementById('title-artists');
        const albumsTitle = document.getElementById('title-albums');

        if (results.artists.length > 0) {
            artistsTitle.textContent = `Artistas encontrados (${results.artists.length})`;
            results.artists.forEach(artist => {
                const artistCard = document.createElement("div");
                artistCard.className = "artist-card";
                artistCard.innerHTML = `
                    <img src="${artist.image}" alt="artista">
                    <h3>${artist.name}</h3>
                    <p>Artista</p>
                    <div class="play-button"><i class="fa-solid fa-play"></i></div>
                `;
                
                artistCard.addEventListener('click', () => {
                    if (window.openArtistDetails) window.openArtistDetails(artist);
                });
                
                artistCard.querySelector('.play-button').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (window.playTrack) {
                        const tracks = window.getArtistTracks ? 
                            window.getArtistTracks(artist, document.getElementById('language-select').value) : [];
                        if (tracks.length > 0) window.playTrack(0, tracks, null);
                    }
                });
                artistsGrid.appendChild(artistCard);
            });
        } else {
            artistsTitle.textContent = "Nenhum artista encontrado";
        }

        if (results.albums.length > 0) {
            albumsTitle.textContent = `Álbuns encontrados (${results.albums.length})`;
            results.albums.forEach(album => {
                const albumCard = document.createElement("div");
                albumCard.className = "album-card";
                albumCard.innerHTML = `
                    <img src="${album.image}" alt="album">
                    <h3>${album.name}</h3>
                    <p>${album.artists}</p>
                    <div class="play-button"><i class="fa-solid fa-play"></i></div>
                `;
                
                albumCard.addEventListener('click', () => {
                    if (window.openAlbumDetails) window.openAlbumDetails(album);
                });
                
                albumCard.querySelector('.play-button').addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (window.playTrack) {
                        const tracks = window.getAlbumTracks ? 
                            window.getAlbumTracks(album, document.getElementById('language-select').value) : [];
                        if (tracks.length > 0) window.playTrack(0, tracks, null);
                    }
                });
                albumsGrid.appendChild(albumCard);
            });
        } else {
            albumsTitle.textContent = "Nenhum álbum encontrado";
        }

        if (results.suggestions.length > 0) {
            showAISuggestions(results.suggestions);
        } else {
             const existingSuggestions = document.querySelector('.ai-suggestions-container');
             if (existingSuggestions) existingSuggestions.remove();
        }
    }

    function showAISuggestions(suggestions) {
        const existingSuggestions = document.querySelector('.ai-suggestions-container');
        if (existingSuggestions) existingSuggestions.remove();

        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'ai-suggestions-container';
        
        suggestions.forEach(suggestion => {
            const suggestionDiv = document.createElement('div');
            suggestionDiv.className = 'ai-suggestion';
            
            let content = `
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <i class="fa-solid fa-wand-magic-sparkles" style="color: #1db954;"></i>
                    <h4 style="color: white; margin: 0;">${suggestion.title}</h4>
                </div>
            `;
            
            if (suggestion.content) {
                content += `<p style="color: #e0e0e0; font-size: 14px; line-height: 1.5; margin-bottom: 15px;">${suggestion.content}</p>`;
            }

            if (suggestion.recommendations && suggestion.recommendations.length > 0) {
                content += `<div style="display: flex; gap: 10px; flex-wrap: wrap;">
                    ${suggestion.recommendations.map(rec => 
                        `<span style="background: rgba(255,255,255,0.1); color: #fff; padding: 5px 12px; border-radius: 15px; font-size: 12px; border: 1px solid rgba(255,255,255,0.2);">
                            ${rec}
                        </span>`
                    ).join('')}
                </div>`;
            }

            suggestionDiv.innerHTML = content;
            suggestionsContainer.appendChild(suggestionDiv);
        });

        const mainContent = document.getElementById('main-content');
        mainContent.insertBefore(suggestionsContainer, mainContent.firstChild);
    }

    let searchTimeout;
    function debouncedSearch() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(async () => {
            const query = searchInput.value;
            const results = await intelligentSearch(query);
            renderSearchResults(results);
        }, 600);
    }

    searchInput.addEventListener('input', debouncedSearch);
    
    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            clearTimeout(searchTimeout);
            const query = searchInput.value;
            const results = await intelligentSearch(query);
            renderSearchResults(results);
        }
    });

    const existingClearBtn = searchInput.parentElement.querySelector('.clear-search-btn');
    if (!existingClearBtn) {
        const clearSearchBtn = document.createElement('button');
        clearSearchBtn.className = 'clear-search-btn';
        clearSearchBtn.innerHTML = '<i class="fa-solid fa-times"></i>';
        clearSearchBtn.style.cssText = `
            background: transparent;
            border: none;
            color: #ff5555;
            cursor: pointer;
            position: absolute;
            right: 10px;
            display: none;
            padding: 5px;
        `;
        
        searchInput.parentElement.style.position = 'relative';
        searchInput.parentElement.appendChild(clearSearchBtn);
        
        searchInput.addEventListener('input', function() {
            clearSearchBtn.style.display = this.value ? 'block' : 'none';
        });
        
        clearSearchBtn.addEventListener('click', async () => {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            const results = await intelligentSearch('');
            renderSearchResults(results);
            searchInput.focus();
        });
    }
});