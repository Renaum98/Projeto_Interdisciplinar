const opc1 = document.querySelector('#opc1');
const opc2 = document.querySelector('#opc2');
const opc3 = document.querySelector('#opc3');
const opc4 = document.querySelector('#opc4');
const opc5 = document.querySelector('#opc5');
const quantidade = document.querySelectorAll('.qtde');
const caixaComAQuantidade = document.querySelectorAll('.caixa_quantidade');
const btSelecionarTodos = document.getElementById('bt-selecionar-todos');
const btResetar = document.getElementById('bt-resetar');
const btEnviar = document.getElementById('bt-enviar');
const inputCheckbox = document.querySelectorAll('input[type="checkbox"]');
const exibicaoEmailTela = document.querySelector('#email_exibicao');
const menu = document.querySelector('header');
const iconeMenu = document.getElementById('menu-icon');

//Refiz o menu lateral
iconeMenu.addEventListener("click", () => {
    if (menu.style.transform === "translateX(-100%)" || !menu.style.transform) {
        menu.style.transform = "translateX(0)";
    } else {
        menu.style.transform = "translateX(-100%)";
    }
    menu.style.transition = "transform 0.5s ease-in-out";
});

document.addEventListener("click", (event) => {
    // Verifica se o clique foi fora do menu ou do ícone
    if (!menu.contains(event.target) && !iconeMenu.contains(event.target)) {
        menu.style.transform = "translateX(-100%)"; // Fecha o menu
    }
});

// Alterando a cor da caixa com base na quantidade
quantidade.forEach((el, index) => {
    if (parseInt(el.textContent) <= 0) {
        caixaComAQuantidade[index].style.backgroundColor = '#D71946';
    }
});

// Função para mudar o email na tela
function mudarEmailNaTela(opc) {
    exibicaoEmailTela.innerHTML = `<p><strong>${opc.textContent}</strong></p>`;
}

// Selecionar todos os checkboxes
btSelecionarTodos.addEventListener('click', () => {
    inputCheckbox.forEach(checkbox => {
        checkbox.checked = true; // Marca todas as checkboxes
    });
});

// Resetar todos os checkboxes
btResetar.addEventListener('click', () => {
    inputCheckbox.forEach(checkbox => {
        checkbox.checked = false; // Desmarca todas as checkboxes
    });
});

// Enviar os dados ao clicar em "Enviar"
btEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.querySelector('#email_exibicao strong')?.textContent.trim() || ''; // Pega o email
    const checkboxesMarcados = document.querySelectorAll("#caixa_lista_itens input[type='checkbox']:checked");
    let itensSelecionados = [];

    checkboxesMarcados.forEach(checkbox => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            itensSelecionados.push(label.innerText.trim());
        }
    });

    // Validando se email e itens foram selecionados
    if (!email || itensSelecionados.length === 0) {
        alert("Preencha o email e selecione pelo menos um item.");
        return;
    }

    const dataSimples = new Date().toLocaleDateString("pt-BR");

    // Salvando os dados em um objeto
    const registro = {
        usuario: email,
        items: itensSelecionados,
        data: dataSimples
    };
    console.log(registro);

    let historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.push(registro);

    // Salvando o novo histórico no localStorage
    localStorage.setItem('historico', JSON.stringify(historico));

    alert('Solicitação enviada com sucesso!');
});


// Função para carregar o histórico na página
function carregarHistorico() {
    const tbody = document.querySelector('tbody');
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    tbody.innerHTML = ''; // Limpar a tabela

    // Se houver histórico, exibe
    if (historico.length === 0) {
        const linha = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.innerText = "Nenhuma solicitação encontrada.";
        linha.appendChild(td);
        tbody.appendChild(linha);
    } else {
        // Exibe o histórico de solicitações
        historico.forEach(item => {
            const linha = document.createElement('tr');

            const tdEmail = document.createElement('td');
            tdEmail.innerText = item.usuario;
            linha.appendChild(tdEmail);

            const tdItens = document.createElement('td');
            tdItens.innerText = item.items.length > 0 ? item.items.join(', ') : '-';
            linha.appendChild(tdItens);

            const tdData = document.createElement('td');
            tdData.innerText = item.data;
            linha.appendChild(tdData);

            linha.innerHTML += `
                <td>-</td>
                <td>Solicitado</td>
                <td>-</td>
            `;

            tbody.appendChild(linha);
        });
    }
}

// Carregar o histórico na página de histórico
if (window.location.pathname.includes('tela4.html')) {
    carregarHistorico();
}
