        const gameList = document.getElementById("game-list");
        const loadMoreBtn = document.getElementById("load-more");
        let currentPage = 1;
        const pageSize = 24;
        const apiKey = "4a72485820c84ef3b6bf7ffdbfa7e79c";


        async function loadGames() {
            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games?key=${apiKey}&page=${currentPage}&page_size=${pageSize}`
                );
                const data = await response.json();

                data.results.forEach(game => {
                    const card = document.createElement("div");
                    card.className = "game-card";
                    card.innerHTML = `
                        <img src="${game.background_image}" alt="${game.name}" />
                        <div class="game-info">
                            <h3>${game.name}</h3>
                            <p>${game.genres.map(g => g.name).join(", ")}</p>
                        </div>
                    `;
                    gameList.appendChild(card);
                });


                if (!data.next) {
                    loadMoreBtn.style.display = "none";
                }

                currentPage++;
            } catch (err) {
                console.error("Fout bij het laden van games:", err);
            }
        }


        


        loadGames();


        loadMoreBtn.addEventListener("click", loadGames);
