fetch('magias.json')
    .then(response => response.json())
    .then(data => {
        const tabela = document.getElementById('tabela-magias');
        const search = document.getElementById('search');
        const categoria = document.getElementById('categoria');

        function renderizarTabela(filtroNome = '', filtroCategoria = '') {
            tabela.innerHTML = '';
            data
                .filter(magia => {
                    const nomeMatch = magia.nome.toLowerCase().includes(filtroNome.toLowerCase());
                    const categorias = Array.isArray(magia.categoria) ? magia.categoria : [magia.categoria];
                    const categoriaMatch = filtroCategoria === '' || categorias.includes(filtroCategoria);
                    return nomeMatch && categoriaMatch;
                })
                .forEach(magia => {
                    const categoriasFormatadas = Array.isArray(magia.categoria)
                        ? magia.categoria.join(' / ')
                        : magia.categoria;

                    const linha = `
                        <tr>
                            <td>${magia.nome}</td>
                            <td>${categoriasFormatadas}</td>
                            <td>${magia.tipo}</td>
                            <td>${magia.custo}</td>
                            <td>${magia.alcance}</td>
                            <td>${magia.tempo_conjuracao}</td>
                            <td>${magia.duracao}</td>
                            <td>${magia.descricao}</td>
                        </tr>`;
                    tabela.innerHTML += linha;
                });
        }

        search.addEventListener('input', () => {
            renderizarTabela(search.value, categoria.value);
        });

        categoria.addEventListener('change', () => {
            renderizarTabela(search.value, categoria.value);
        });

        renderizarTabela();
    });

