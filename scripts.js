
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
                    const categoriaMatch = filtroCategoria === '' || magia.categoria === filtroCategoria;
                    return nomeMatch && categoriaMatch;
                })
                .forEach(magia => {
                    const linha = `
                        <tr>
                            <td>${magia.nome}</td>
                            <td>${magia.categoria}</td>
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
