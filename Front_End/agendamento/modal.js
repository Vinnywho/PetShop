function criarGerenciadorModal(modalId) {
    const modal = document.getElementById(modalId);
    const botaoFechar = modal.querySelector('.fechar-modal');
    const botaoCancelar = modal.querySelector('.botao-cancelar');
    const formulario = modal.querySelector('form');
    const save = document.querySelector('.botao-salvar')

    const abrir = () => {
        modal.classList.add('ativo');
        formulario.reset();
    };

    const fechar = () => {
        modal.classList.remove('ativo');
    };

    const manipularEnvio = (e) => {
        e.preventDefault();
        const dados = {};
        const campos = formulario.querySelectorAll('input, textarea');
        campos.forEach(campo => {
            dados[campo.id] = campo.value;
        });
        console.log('Dados do formulário:', dados);
    };


    const inicializar = () => {
        botaoFechar.addEventListener('click', fechar);
        botaoCancelar.addEventListener('click', fechar);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) fechar();
        });


        save.addEventListener('submit', (e) => {
            manipularEnvio(e);
        });
    };

    return { abrir, inicializar };
}

document.addEventListener('DOMContentLoaded', () => {
    const modalManager = criarGerenciadorModal('modal');
    modalManager.inicializar();
    
    document.querySelectorAll('.agendar').forEach(botao => {
        botao.addEventListener('click', () => {
            modalManager.abrir();
        });
    });
});

