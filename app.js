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
            document.querySelector('#Nome').textContent = data.name;

            if (data.images && data.images[0]) {
                document.querySelector('#Imagem').src = data.images[0].href;
                document.querySelector('#Imagem').alt = data.name;
            } else {
                document.querySelector('#Imagem').src = '';
                document.querySelector('#Imagem').alt = 'Imagem não encontrada';
            }

            document.querySelector('#resultado').style.display = 'block';
        })
        .catch((error) => {
            console.error('Ocorreu um problema com a operação de fetch:', error);
            document.querySelector('#Nome').textContent = 'Erro ao buscar Digimon';
            document.querySelector('#Imagem').src = '';
            document.querySelector('#Imagem').alt = 'Imagem não encontrada';
        });
}

