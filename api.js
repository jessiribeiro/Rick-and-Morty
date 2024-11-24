const apiBase = "https://rickandmortyapi.com/api/";

// Função para obter os personagens
async function getCharacters(page = 1) {
    const response = await fetch(`${apiBase}character?page=${page}`);
    const data = await response.json();
    return data;
}

// Função para obter um personagem específico
async function getCharacterDetails(id) {
    const response = await fetch(`${apiBase}character/${id}`);
    const data = await response.json();
    return data;
}
