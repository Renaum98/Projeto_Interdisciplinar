const opc1 = document.querySelector('#opc1');
const opc2 = document.querySelector('#opc2');
const opc3 = document.querySelector('#opc3');
const opc4 = document.querySelector('#opc4');
const opc5 = document.querySelector('#opc5');
const opc6 = document.querySelector('#opc6');
const opc7 = document.querySelector('#opc7');
const opc8 = document.querySelector('#opc8');



const quantidade = document.querySelectorAll('.qtde');
const caixaComAQuantidade = document.querySelectorAll('.caixa_quantidade');
const btSelecionarTodos = document.getElementById('bt-selecionar-todos');
const btResetar = document.getElementById('bt-resetar');
const btEnviar = document.getElementById('bt-enviar');
let inputCheckbox = document.querySelectorAll('input[type="checkbox"]');
const exibicaoEmailTela = document.querySelector('#email_exibicao');
const menu = document.querySelector('header');
const iconeMenu = document.getElementById('menu-icon');

//Refiz o menu lateral
// Abre o menu ao passar o mouse sobre o ícone
iconeMenu.addEventListener("mouseenter", () => {
    menu.style.transform = "translateX(0)";  // Ação para mostrar o menu
    menu.style.transition = "transform 0.5s ease-in-out";  // Efeito de transição suave
});

// Fecha o menu ao retirar o mouse do menu
menu.addEventListener("mouseleave", () => {
    menu.style.transform = "translateX(-100%)";  
    menu.style.transition = "transform 0.5s ease-in-out";  
});

// Alternando o menu lateral com o ícone (ao clicar)
iconeMenu.addEventListener("click", () => {
    if (menu.style.transform === "translateX(-100%)" || !menu.style.transform) {
        menu.style.transform = "translateX(0)";  // Abre o menu
    } else {
        menu.style.transform = "translateX(-100%)";  // Fecha o menu
    }
    menu.style.transition = "transform 0.5s ease-in-out";  // Efeito de transição suave
});

// Fechar o menu ao clicar fora dele (se o menu estiver aberto)
document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !iconeMenu.contains(event.target)) {
        menu.style.transform = "translateX(-100%)";  // Fecha o menu
    }
});

if (window.location.pathname.includes('index.html')) {

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
    btSelecionarTodos.addEventListener("click", () => {
        inputCheckbox.forEach(checkbox => {
            checkbox.checked = true; // Marca todas as checkboxes
        });
    });

    // Resetar todos os checkboxes
    btResetar.addEventListener("click", () => {
        inputCheckbox.forEach(checkbox => {
            checkbox.checked = false; // Desmarca todas as checkboxes
        });
    });

    // Enviar os dados ao clicar em "Enviar"
    btEnviar.addEventListener('click', (e) => {
        e.preventDefault();

        let itemIndisponivel = false;
        quantidade.forEach((el) => {
            if (parseInt(el.textContent) <= 0) {
                itemIndisponivel = true;
            }
        });
        if (itemIndisponivel) {
            alert('Um dos itens selecionado não esta disponivel!');
            return;
        } //esta verificando se algum dos itens esta zerado
    
        let email = document.querySelector('#email_exibicao strong')?.textContent.trim() || '';
        const checkboxesMarcados = document.querySelectorAll("#caixa_lista_itens input[type='checkbox']:checked");
        let itensSelecionados = [];
        let listaNomes = [];
        let dataFinal = [];
    
        const dataSimples = new Date();
        const dataRetirada = new Date();
        dataRetirada.setDate(dataSimples.getDate() + 5);
        const dataFormatada = dataRetirada.toLocaleDateString("pt-BR");
        console.log(dataFormatada, dataSimples)
    
        checkboxesMarcados.forEach(checkbox => {
            const label = document.querySelector(`label[for="${checkbox.id}"]`);
            if (label) {
                // Agora estamos realmente garantindo que `listaNomes` seja um array de e-mails
                listaNomes.push(email); 
                itensSelecionados.push(label.innerText.trim());
                dataFinal.push(dataFormatada)
            }
        });
    
        if (!email || itensSelecionados.length === 0) {
            alert("Preencha o e-mail e selecione pelo menos um item.");
            return;
        }
    
        const registro = {
            usuario: listaNomes,  // Isso deve ser um array de e-mails, sempre.
            items: itensSelecionados,
            data: dataFinal
        };
    
        console.log(registro);
    
        let historico = JSON.parse(localStorage.getItem('historico')) || [];
        historico.push(registro);
    
        localStorage.setItem('historico', JSON.stringify(historico));
    
        alert('Solicitação enviada com sucesso!');
    });    
    
}


// Função para carregar o histórico na página
function carregarHistorico() {
    const tbody = document.querySelector('tbody');
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    tbody.innerHTML = ''; // Limpar a tabela

    if (historico.length === 0) {
        const linha = document.createElement('tr');
        const td = document.createElement('td');
        td.colSpan = 7;
        td.innerText = "Nenhuma solicitação encontrada.";
        td.style.textAlign = 'center';
        linha.appendChild(td);
        tbody.appendChild(linha);
    } else {
        historico.forEach(item => {
            // Vamos iterar sobre os itens para exibir cada um em uma linha separada
            item.items.forEach((itemNome, index) => {
                let linha = document.createElement('tr');

                // Exibe o e-mail do usuário
                const tdEmail = document.createElement('td');
                tdEmail.innerText = item.usuario[index];  // Agora o e-mail será associado ao item correto
                linha.appendChild(tdEmail);

                linha.innerHTML += `
                    <td>marcos.paulo@empresa.com</td>
                `;

                // Exibe o item selecionado
                const tdItens = document.createElement('td');
                tdItens.innerText = itemNome; // Exibindo o nome do item
                linha.appendChild(tdItens);

                // Exibe a data de retirada
                const tdData = document.createElement('td');
                tdData.innerText = item.data[index]; // Exibindo a data associada ao item
                linha.appendChild(tdData);

                // Adiciona as outras células
                linha.innerHTML += `
                    <td>-</td>
                    <td>Solicitado</td>
                    <td>-</td>
                `;

                tbody.appendChild(linha);
            });
        });
    }
}

// Carregar o histórico na página de histórico
if (window.location.pathname.includes('tela4.html')) {
    carregarHistorico();
}
