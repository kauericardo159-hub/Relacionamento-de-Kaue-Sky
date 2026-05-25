document.addEventListener("DOMContentLoaded", () => {
    fetch('1texto.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Não foi possível carregar o arquivo txt.');
            }
            return response.text();
        })
        .then(textoCompleto => {
            // Expressão regular para encontrar o padrão >qualquer coisa<
            const regexTitulo = />([^<]+)</;
            const correspondencia = textoCompleto.match(regexTitulo);

            let tituloExtraido = "";
            let textoFiltrado = textoCompleto;

            if (correspondencia) {
                tituloExtraido = correspondencia[1].trim(); // Pega o texto isolado sem o > e <
                // Remove a linha do título para que ela não se repita no corpo do texto
                textoFiltrado = textoCompleto.replace(correspondencia[0], '').trim();
            }

            const elementoTitulo = document.getElementById('titulo-txt');
            const elementoConteudo = document.getElementById('conteudo-txt');

            // Se encontrou o título, exibe e preenche. Se não, o h2 continua invisível.
            if (tituloExtraido) {
                elementoTitulo.innerText = tituloExtraido;
                elementoTitulo.style.display = 'block';
            }

            // Exibe o restante do texto purificado
            elementoConteudo.innerText = textoFiltrado;
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('conteudo-txt').innerText = "Erro ao carregar o arquivo '1texto.txt'. Verifique se ele está na mesma pasta.";
        });
});
