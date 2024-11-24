# Projeto Rick and Morty - Lista de Personagens

## Descrição do Projeto

Este projeto é uma aplicação web que consome a API pública da série "Rick and Morty" para listar e exibir detalhes dos personagens. O objetivo é permitir que os usuários naveguem pelos personagens, vejam informações básicas, pesquisem por nome e acessem detalhes individuais de cada personagem.

## Funcionalidades

- **Listagem de Personagens**: Exibe uma lista paginada de personagens com imagem, nome, status e espécie.
- **Pesquisa Dinâmica**: Permite buscar personagens pelo nome com atualização em tempo real.
- **Detalhes do Personagem**: Página dedicada que mostra informações detalhadas, incluindo origem e localização.
- **Paginação Simples**: Navegação entre páginas com botões "Anterior" e "Próximo".
- **Contadores no Rodapé**: Exibe o total de personagens, localizações e episódios disponíveis na API.

## Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript**
- **Bootstrap **
- **API Rick and Morty**

## Como Executar o Projeto

1. **Clone o repositório ou faça o download dos arquivos**.
2. **Abra o arquivo `index.html` em um navegador web moderno**.
3. **Navegue pela lista de personagens** utilizando a paginação e a barra de pesquisa.
4. **Clique em "Ver Detalhes"** em qualquer personagem para ver informações adicionais.

## Itens de Avaliação e Implementação dos Requisitos

A seguir, estão listados os requisitos do projeto e como cada um foi atendido:

### 1. Estrutura de Arquivos

- **1 página HTML para listar os personagens**
  - **Arquivo**: `index.html`
  - **Implementação**: Contém a estrutura para listar todos os personagens com suas informações básicas e a barra de pesquisa.

- **1 página HTML ou Modal para mostrar os detalhes de um personagem**
  - **Arquivo**: `personagens.html`
  - **Implementação**: Página dedicada que exibe detalhes completos do personagem selecionado.

- **1 ou mais arquivos CSS para estilização dos elementos**
  - **Arquivo**: `style.css`
  - **Implementação**: Inclui todo o estilo personalizado do projeto, incluindo cores, tipografia, layout e animações.

- **1 ou mais arquivos JavaScript para tornar as páginas dinâmicas**
  - **Arquivo**: `script.js`
  - **Implementação**: Contém toda a lógica para consumir a API, manipular o DOM, implementar a busca, paginação e exibir detalhes dos personagens.

### 2. Lista de Personagens Deve Ter

- **Informações básicas de cada personagem (nome, status e espécie)**
  - **Implementação**: Cada cartão na listagem exibe o nome, status e espécie obtidos da API.

- **A imagem de cada personagem**
  - **Implementação**: As imagens são carregadas dinamicamente e exibidas em cada cartão.

- **Link para abrir a página de detalhes de cada personagem**
  - **Implementação**: Botão "Ver Detalhes" em cada cartão que direciona para `personagens.html` com o ID do personagem na URL.

- **Paginação**
  - **Implementação**: Botões "Anterior" e "Próximo" permitem navegar entre as páginas, carregando novos personagens.

### 3. Página de Cada Personagem Deve Ser Dinâmica e Possuir

- **Imagem e informações básicas do personagem (nome, status e espécie)**
  - **Implementação**: A página de detalhes exibe a imagem em alta resolução e informações básicas do personagem selecionado.

- **Informações sobre a localização do personagem**
  - **Implementação**: Exibe a origem e a localização atual do personagem, conforme fornecido pela API.

- **Um botão para voltar à tela da lista**
  - **Implementação**: Botão "Voltar à lista" que retorna o usuário para a página principal.

### 4. Uso de Elementos do Bootstrap

- **Grid System**
  - **Implementação**: Utilização das classes de grid (`row`, `col-md-3`, `col-sm-6`, etc.) para organizar os cartões de personagens de forma responsiva.

- **Utility Classes**
  - **Implementação**: Uso de classes como `text-center`, `py-4`, `d-flex`, `justify-content-center`, `mt-3`, etc., para estilização e posicionamento dos elementos.

- **Componentes (Buttons, alerts, modais, formulários, pagination, etc.)**
  - **Implementação**:
    - **Buttons**: Botões estilizados com classes do Bootstrap para ações como "Ver Detalhes" e "Voltar à lista".
    - **Alerts**: Utilização de alertas para exibir mensagens de erro ou avisos ao usuário.
    - **Formulários**: Campo de pesquisa estilizado com classes como `form-control`.
    - **Pagination**: Implementação de botões de paginação utilizando classes do Bootstrap.

### 5. Construída com Flexbox

- **Grid System do Bootstrap e/ou display: flex**
  - **Implementação**:
    - **Grid System**: Aproveitamento do sistema de grid do Bootstrap que utiliza Flexbox internamente para o layout responsivo.
    - **Display: flex**: Uso de `display: flex` em elementos personalizados, como o container dos cartões (`#characters-list`) e na paginação.

### 6. Conter Animações

- **Pelo menos 3 animações**
  - **Implementação**:
    - **Animação de Fade-In**: Aplicada aos cartões de personagens quando carregam na tela.
    - **Animação de Zoom**: Aplicada aos botões ao passar o mouse, criando um efeito de ampliação.
    - **Animação de Pulso na Borda**: Aplicada aos cartões ao passar o mouse, fazendo a borda pulsar com efeito neon.

- **@keyframes com diferentes pontos de parada**
  - **Implementação**: As animações são definidas com `@keyframes` e possuem múltiplos keyframes para criar efeitos suaves e contínuos.

- **Uso de easings e do cubic-bezier**
  - **Implementação**: As transições e animações utilizam funções de timing como `ease-out`, `ease-in-out` e `cubic-bezier` para controlar a aceleração e desaceleração dos efeitos.


## Autor

Desenvolvido por **Jéssica Ribeiro** - 2024.

---