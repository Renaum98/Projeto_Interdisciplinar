const boxMenu = document.querySelector("header");
const boxMenuBt = document.querySelector("#menu-icon");
const mainContent = document.querySelector("main");

boxMenuBt.addEventListener("click", (evento) => {
    evento.preventDefault();

    // Verifica se o menu está recolhido
    if (boxMenu.style.transform === "translateX(-100%)" || !boxMenu.style.transform) {
        // Mostra o menu
        boxMenu.style.transform = "translateX(0)";
        mainContent.style.marginLeft = "200px"; // Ajusta a margem do conteúdo principal
    } else {
        // Recolhe o menu
        boxMenu.style.transform = "translateX(-100%)";
        mainContent.style.marginLeft = "0"; // Remove a margem do conteúdo principal
    }

    // Adiciona transição suave
    boxMenu.style.transition = "transform 0.5s ease-in-out";
    mainContent.style.transition = "margin-left 0.5s ease-in-out";
});

function botaoEnviar() {
    // Capturar valores dos campos
    const usuario = document.getElementById('id-us').value;
    const equipamento = document.getElementById('id-eq').value;
    const data = document.getElementById('id-data').value;

    // Verificar se todos os campos estão preenchidos
    if (!usuario || !equipamento || !data) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Formatar a data para DD/MM/AAAA
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR');

    // Criar objeto com os dados
    const registro = {
        usuario: usuario,
        equipamento: equipamento,
        data: dataFormatada
    };

    // Salvar no localStorage
    let historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.push(registro);
    localStorage.setItem('historico', JSON.stringify(historico));

    // Limpar formulário (opcional)
    document.getElementById('form').reset();

    // Exibir mensagem de confirmação
    alert('Solicitação enviada com sucesso!');
}

function carregarHistorico(){
    
    const tbody = document.querySelector('tbody');
    const historico = JSON.parse(localStorage.getItem('historico')) || [];

    tbody.innerHTML = '';

    historico.forEach(item => {
        const novaLinha = `
        <tr>
            <td>${item.usuario}</td>
            <td>${item.equipamento}</td>
            <td>${item.data}</td>
        </tr>
        `;
        tbody.innerHTML += novaLinha;
    })
}

if (window.location.pathname.includes('historico.html')){
    carregarHistorico()
}





