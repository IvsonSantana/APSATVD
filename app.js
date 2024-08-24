function consultarNome(event) {
    event.preventDefault();

    let nome = document.querySelector('#pesquisa').value.trim();
    if (!nome) {
        return;
    }

    let url = `https://digi-api.com/api/v1/digimon/${nome}`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            
            const nomeDigimon = document.querySelector('#nome-digimon');
            const imagemDigimon = document.querySelector('#imagem-digimon');
            const levelDigimon = document.querySelector('#level-digimon');
            const tipoDigimon = document.querySelector('#tipo-digimon');
            const atributoDigimon = document.querySelector('#atributo-digimon');

            if (nomeDigimon) nomeDigimon.textContent = data.name;

            if (imagemDigimon) {
                if (data.images && data.images[0]) {
                    imagemDigimon.src = data.images[0].href;
                    imagemDigimon.alt = data.name;
                } else {
                    imagemDigimon.src = '';
                    imagemDigimon.alt = 'Imagem não encontrada';
                }
            }

            if (levelDigimon) {
                const level = data.levels.length ? data.levels[0].level : 'N/A';
                levelDigimon.textContent = `Level: ${level}`;
            }

            if (tipoDigimon) {
                const type = data.types.length ? data.types[0].type : 'N/A';
                tipoDigimon.textContent = `Tipo: ${type}`;
            }

            if (atributoDigimon) {
                const attributes = data.attributes.map(attr => attr.attribute).join(', ');
                atributoDigimon.textContent = `Atributos: ${attributes}`;
            }

            
            const resultadoDigimon = document.querySelector('#resultado-digimon');
            if (resultadoDigimon) resultadoDigimon.style.display = 'block';

            
            const evolucaoAnteriorContainer = document.querySelector('#resultado-evolucao-anterior');
            if (evolucaoAnteriorContainer) {
                evolucaoAnteriorContainer.innerHTML = ''; 
                if (data.priorEvolutions && data.priorEvolutions.length > 0) {
                    data.priorEvolutions.forEach(evolucao => {
                        const evolucaoDiv = document.createElement('div');
                        evolucaoDiv.classList.add('evolucao');

                        const img = document.createElement('img');
                        img.src = evolucao.image;
                        img.alt = evolucao.digimon;

                        const nome = document.createElement('h2');
                        nome.textContent = evolucao.digimon;

                        const condicao = document.createElement('p');
                        condicao.textContent = evolucao.condition || 'Nenhuma condição especificada';

                        evolucaoDiv.appendChild(img);
                        evolucaoDiv.appendChild(nome);
                        evolucaoDiv.appendChild(condicao);

                        evolucaoAnteriorContainer.appendChild(evolucaoDiv);
                    });

                    evolucaoAnteriorContainer.style.display = 'block';
                } else {
                    evolucaoAnteriorContainer.style.display = 'none';
                }
            }

            
            const evolucoesPossiveisContainer = document.querySelector('#resultado-evolucoes-possiveis');
            if (evolucoesPossiveisContainer) {
                evolucoesPossiveisContainer.innerHTML = ''; 
                if (data.nextEvolutions && data.nextEvolutions.length > 0) {
                    data.nextEvolutions.forEach(evolucao => {
                        const evolucaoDiv = document.createElement('div');
                        evolucaoDiv.classList.add('evolucao');

                        const img = document.createElement('img');
                        img.src = evolucao.image;
                        img.alt = evolucao.digimon;

                        const nome = document.createElement('h2');
                        nome.textContent = evolucao.digimon;

                        const condicao = document.createElement('p');
                        condicao.textContent = evolucao.condition || 'Nenhuma condição especificada';

                        evolucaoDiv.appendChild(img);
                        evolucaoDiv.appendChild(nome);
                        evolucaoDiv.appendChild(condicao);

                        evolucoesPossiveisContainer.appendChild(evolucaoDiv);
                    });

                    evolucoesPossiveisContainer.style.display = 'block';
                } else {
                    evolucoesPossiveisContainer.style.display = 'none';
                }
            }
        })
        .catch((error) => {
            console.error('Ocorreu um problema com a operação de fetch:', error);
            const nomeDigimon = document.querySelector('#nome-digimon');
            const imagemDigimon = document.querySelector('#imagem-digimon');
            if (nomeDigimon) nomeDigimon.textContent = 'Erro ao buscar Digimon';
            if (imagemDigimon) {
                imagemDigimon.src = '';
                imagemDigimon.alt = 'Imagem não encontrada';
            }
            const resultadoDigimon = document.querySelector('#resultado-digimon');
            if (resultadoDigimon) resultadoDigimon.style.display = 'block';
        });
}
