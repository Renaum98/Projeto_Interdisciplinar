const opc1 = document.querySelector('#opc1');
const opc2 = document.querySelector('#opc2');
const opc3 = document.querySelector('#opc3');
const opc4 = document.querySelector('#opc4');
const opc5 = document.querySelector('#opc5');
const quantidade = document.querySelectorAll('.qtde')
const caixaComAQuantidade = document.querySelectorAll('span')
const btSelecionarTodos = document.getElementById('bt-selecionar-todos');
const btResetar = document.getElementById('bt-resetar');
const btEnviar = document.getElementById('bt-enviar');
const inputCheckbox = document.querySelectorAll('input[type="checkbox"]');
const exibicaoEmailTela = document.querySelector('#email_exibicao');


quantidade.forEach((el, index) => {
    if (parseInt(el.textContent) <= 0) {
        caixaComAQuantidade[index].style.backgroundColor = '#D71946'; 
    }
});

function mudarEmailNaTela(opc) {
    exibicaoEmailTela.innerHTML = `<p><strong>${opc.textContent}</strong></p>`;
}

btSelecionarTodos.addEventListener('click', () => {
    inputCheckbox.forEach(checkbox => {
        checkbox.checked = true; // Marca todas as checkboxes
    });
});

btResetar.addEventListener('click', () => {
    inputCheckbox.forEach(checkbox => {
        checkbox.checked = false; // Desmarca todas as checkboxes
    });
});
