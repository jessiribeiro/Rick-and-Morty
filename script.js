// Variáveis Globais
let allCharacters = [];
let currentPage = 1;
const charactersPerPage = 6;
let totalPages = 1;

// Função para mostrar carregamento
function showLoading(show = true) {
    let spinner = document.getElementById('loading-spinner');
    if (!spinner) {
        spinner = document.createElement('div');
        spinner.id = 'loading-spinner';
        spinner.className = 'd-flex justify-content-center my-5';
        spinner.innerHTML = `
            <div class="spinner-border text-success" role="status">
                <span class="visually-hidden">Carregando...</span>
            </div>
        `;
    }
    spinner.style.display = show ? 'flex' : 'none';
}

// Função para buscar todas as páginas de personagens da API
async function fetchAllCharacters() {
    let page = 1;
    let characters = [];
    let totalPagesAPI = 1;

    try {
        while (page <= totalPagesAPI) {
            console.log(`Buscando página ${page}...`);
            const url = `https://rickandmortyapi.com/api/character?page=${page}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar personagens.');
            }
            const data = await response.json();
            characters = characters.concat(data.results);
            totalPagesAPI = data.info.pages;
            page++;
        }
        console.log(`Total de personagens buscados: ${characters.length}`);
        return characters;
    } catch (error) {
        console.error(error);
        showAlert(error.message);
        return [];
    }
}

// Função para exibir personagens na página principal
function displayCharacters(characters) {
    const charactersList = document.getElementById('characters-list');
    charactersList.innerHTML = ''; // Limpar a lista atual
    
    if (characters.length === 0) {
        charactersList.innerHTML = `
            <p class="text-center">Nenhum personagem encontrado.</p>
        `;
        return;
    }
    
    characters.forEach(character => {
        const statusClass = character.status.toLowerCase(); // status dos personagens
        
        const card = document.createElement('div');
        card.className = 'col-md-3 col-sm-6 mb-4'; // Bootstrap Grid ajustado para 3 colunas em desktops
        
        card.innerHTML = `
            <div class="card">
                <img src="${character.image}" class="img-fluid" alt="${character.name}">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">
                        <strong>Status:</strong> <span class="status-value ${statusClass}">${character.status}</span>
                    </p>
                    <p class="card-text">
                        <strong>Espécie:</strong> <span class="species-value">${character.species}</span>
                    </p>
                    <a href="personagens.html?id=${character.id}" class="btn btn-primary">Ver Detalhes</a>
                </div>
            </div>
        `;
        
        charactersList.appendChild(card);
    });
}

// Função para configurar a paginação
function setupPagination(current, total) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Limpar paginação atual

    // Botão de Anterior
    const prevButton = document.createElement('button');
    prevButton.className = 'btn btn-secondary me-2';
    prevButton.textContent = 'Anterior';
    prevButton.disabled = current === 1; // Desabilita se estiver na primeira página
    prevButton.addEventListener('click', () => {
        if (current > 1) {
            loadCharacters(current - 1);
        }
    });
    pagination.appendChild(prevButton);

    // Botão de Próximo
    const nextButton = document.createElement('button');
    nextButton.className = 'btn btn-secondary';
    nextButton.textContent = 'Próximo';
    nextButton.disabled = current === total; // Desabilita se estiver na última página
    nextButton.addEventListener('click', () => {
        if (current < total) {
            loadCharacters(current + 1);
        }
    });
    pagination.appendChild(nextButton);
}

// Função principal para carregar personagens na página principal
function loadCharacters(page = 1, query = '') {
    let filteredCharacters = allCharacters;

    if (query) {
        filteredCharacters = allCharacters.filter(character =>
            character.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    totalPages = Math.ceil(filteredCharacters.length / charactersPerPage);
    currentPage = page;

    const startIndex = (currentPage - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    const charactersToDisplay = filteredCharacters.slice(startIndex, endIndex);

    console.log(`Exibindo página ${currentPage} de ${totalPages}`);
    displayCharacters(charactersToDisplay);
    setupPagination(currentPage, totalPages);
}

// Função para inicializar eventos de busca
let debounceTimeout;
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.trim();
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                loadCharacters(1, query);
            }, 500); // Delay
        });
    }
}

// Função para obter o ID do personagem da URL
function getCharacterIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função para buscar detalhes de um personagem
async function fetchCharacterDetails(id) {
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Personagem não encontrado.');
            }
            throw new Error('Erro ao buscar detalhes do personagem.');
        }
        const character = await response.json();
        return character;
    } catch (error) {
        console.error(error);
        showAlert(error.message);
        return null;
    }
}

// Função para exibir detalhes do personagem na página de detalhes
function displayCharacterDetails(character) {
    const characterDetail = document.getElementById('character-detail');
    
    if (!character) {
        characterDetail.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Erro!</strong> Personagem não encontrado.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <a href="index.html" class="btn btn-primary mt-3">Voltar à lista</a>
        `;
        return;
    }
    
    const statusClass = character.status.toLowerCase();
    
    characterDetail.innerHTML = `
        <img src="${character.image}" alt="${character.name}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text">
                <strong>Status:</strong> <span class="status-value ${statusClass}">${character.status}</span>
            </p>
            <p class="card-text">
                <strong>Espécie:</strong> <span class="species-value">${character.species}</span>
            </p>
            <p class="card-text">
                <strong>Gênero:</strong> <span class="gender-value">${character.gender}</span>
            </p>
            <p class="card-text">
                <strong>Origem:</strong> <span class="origin-value">${character.origin.name}</span>
            </p>
            <p class="card-text">
                <strong>Localização:</strong> <span class="location-value">${character.location.name}</span>
            </p>
            <a href="index.html" class="btn btn-primary mt-3">Voltar à lista</a>
        </div>
    `;
}

// Função para carregar detalhes do personagem na página de detalhes
async function loadCharacterDetails() {
    const id = getCharacterIdFromURL();
    if (!id) {
        showAlert('Nenhum ID de personagem especificado.');
        const characterDetail = document.getElementById('character-detail');
        characterDetail.innerHTML = `
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Aviso!</strong> Nenhum personagem especificado.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <a href="index.html" class="btn btn-primary mt-3">Voltar à lista</a>
        `;
        return;
    }
    
    const character = await fetchCharacterDetails(id);
    displayCharacterDetails(character);
}

// Função para atualizar o rodapé com contagens
async function updateFooter() {
    try {
        const [charactersData, locationsData, episodesData] = await Promise.all([
            fetch('https://rickandmortyapi.com/api/character').then(res => res.json()),
            fetch('https://rickandmortyapi.com/api/location').then(res => res.json()),
            fetch('https://rickandmortyapi.com/api/episode').then(res => res.json()),
        ]);
        
        const footer = document.querySelector('footer');
        footer.innerHTML = `
            Personagens: ${charactersData.info.count} | Localizações: ${locationsData.info.count} | Episódios: ${episodesData.info.count}
            <br> Desenvolvido por <strong>Jéssica Ribeiro</strong> - 2024
        `;
    } catch (error) {
        console.error('Erro ao atualizar o rodapé:', error);
        const footer = document.querySelector('footer');
        footer.innerHTML = `
            Personagens: -- | Localizações: -- | Episódios: --
            <br> Desenvolvido por <strong>Jéssica Ribeiro</strong> - 2024
        `;
    }
}

// Função para inicializar toda a lógica
async function initializeApp() {
    document.addEventListener('DOMContentLoaded', async () => {
        // Atualizar o rodapé com as contagens
        updateFooter();
        
        // Verificar se estamos na página de listagem ou detalhes
        if (document.getElementById('characters-list')) {
            // Página principal (index.html)
            // Mostrar um spinner de carregamento
            showLoading(true);
            // Buscar todos os personagens
            allCharacters = await fetchAllCharacters();
            // Carregar a primeira página
            loadCharacters();
            // Inicializar a busca
            initializeSearch();
            // Esconder o spinner
            showLoading(false);
        } else if (document.getElementById('character-detail')) {
            // Página de detalhes (personagens.html)
            loadCharacterDetails();
        }
    });
}

// Inicializar o aplicativo
initializeApp();
