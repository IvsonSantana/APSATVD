function consultarNome(event) {
    event.preventDefault(); 

    let nome = document.querySelector('#pesquisa').value; 
    let url = `https://digi-api.com/api/v1/digimon/${nome}`; 
    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Erro na resposta da rede'); 
            }
            return response.json(); 
        })
        .then(function(data) {
            console.log(data); 
            document.querySelector('#Nome').textContent = data.name;

            if (data.images && data.images[0]) { 
                document.querySelector('#Imagem').src = data.images[0].href; 
                document.querySelector('#Imagem').alt = data.name; 
            } else {
                document.querySelector('#Imagem').src = ''; 
                document.querySelector('#Imagem').alt = 'Imagem não encontrada'; 
            }
        })
        .catch(function(error) {
            console.error('Ocorreu um problema com a operação de fetch:', error);
        });
}
