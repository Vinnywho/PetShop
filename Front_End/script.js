function cadastrarUsuario(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('password-repeat').value;

    if (password !== passwordRepeat) {
        alert('As senhas não coincidem!');
        return;
    }

    fetch('http://localhost:3000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw err; });
        }
        return response.json();
    })
    .then(data => {
        console.log('Sucesso:', data);
        alert(data.message || 'Cadastro realizado com sucesso!');
        window.location.href = 'login1.html';
    })
    .catch(error => {
        console.error('Erro detalhado:', error);
        alert(error.error || 'Erro no cadastro!');
    });
}

let servico = '';

document.getElementById('agendar-banho')?.addEventListener('click', () => servico = 'Banho');
document.getElementById('agendar-tosa')?.addEventListener('click', () => servico = 'Tosa');
document.getElementById('agendar-banhoTosa')?.addEventListener('click', () => servico = 'Banho + Tosa');


async function enviarAgendamento(event) {
    event.preventDefault();
    
    const nomePet = document.getElementById('nomePet').value;
    const raca = document.getElementById('raca').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('time').value;
    const observacoes = document.getElementById('obs').value;
    const inputImagem = document.getElementById('image');
    const file = inputImagem.files[0];

    try {

        let imageData = null;
        if (file) {
            if (!file.type.match('image.*')) {
                throw new Error('Apenas arquivos de imagem (JPEG, PNG, etc.) são permitidos!');
            }

            const formData = new FormData();
            formData.append('image', file);

            const imageId = document.getElementById('imageId')?.value;
            const url = imageId 
                ? `http://localhost:3000/api/images/${imageId}` 
                : 'http://localhost:3000/api/images';
            const method = imageId ? 'PUT' : 'POST';

            const imageResponse = await fetch(url, { 
                method, 
                body: formData 
            });
            
            if (!imageResponse.ok) {
                throw new Error('Falha ao enviar imagem');
            }
            
            imageData = await imageResponse.json();
        }

        
        const response = await fetch('http://localhost:3000/api/agendamentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                servico,
                nome: nomePet,
                raca,
                data,
                horario,
                observacoes,
                imagemId: imageData?.id
            })
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || "Erro desconhecido");
        }

        alert(result.message);
        
        document.querySelector('.fechar-modal').click();
        event.target.reset();
        document.getElementById('uploadForm').reset();

        await loadImages();

    } catch (error) {
        console.error('Falha no agendamento:', error);
        alert(error.message || "Erro ao agendar. Verifique os dados e tente novamente.");
    }
}

const formAgendamento = document.getElementById('formAgendamento');
if (formAgendamento) {
    formAgendamento.addEventListener('submit', enviarAgendamento);
}


async function logar(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    if (!email || !password) {
        showError(messageElement, 'Email e senha são obrigatórios');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Resposta inválida do servidor');
        }

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Credenciais inválidas');
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = 'agendamentos.html';

    } catch (error) {
        console.error('Erro no login:', error);
        showError(messageElement, error.message);
    }
}

function showError(element, message) {
    if (element) {
        element.textContent = message;
        element.style.color = 'red';
        element.style.display = 'block';
    } else {
        alert('Erro: ' + message);
    }
}

function logout(){
    localStorage.removeItem('token')
    window.location.href = 'login1.html'
}

const API_URL = "http://localhost:3000/api/images"

async function loadImages() {
    const galeria = document.getElementById('galeria');
    if (!galeria) return;
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
        
        const images = await res.json();
        galeria.innerHTML = '';

        images.forEach(img => {
            const container = document.createElement('div');
            container.style.display = "inline-block";
            container.style.margin = "10px";
            container.innerHTML = `
                <img src="../Back_End/uploads/${img.filename}" alt="${img.filename}" id="fotinho" style="width:150px; display:block;">
                <button onclick="editImage(${img.id})" id="edit">Editar</button>
                <button onclick="deleteImage(${img.id})" id="delete">Excluir</button>
            `;
            galeria.appendChild(container);
        });
    } catch (error) {
        console.error("Erro ao carregar imagens:", error);
    }
}

async function editImage(id) {
    document.getElementById('imageId').value = id
    alert("Selecione uma nova imagem para substituir a atual e clique em 'Enviar Imagem'.")
}

async function deleteImage(id) {
    if (!confirm("Deseja realmente excluir esta imagem?")) return
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    loadImages()
}

loadImages()




function criarAgendamentoElement(agendamento) {
    const galeria = document.getElementById('galeria');

    const agendamentosDiv = document.createElement('div');
    agendamentosDiv.className = 'agendamentos';
    agendamentosDiv.id = `agendamento-${agendamento.id}`;

    const cabecalho = document.createElement('div');
    cabecalho.className = 'cabecalho';

    const titulo = document.createElement('h1');
    titulo.className = 'titulo';
    titulo.textContent = agendamento.servico || 'Serviço';

    const foto = document.createElement('div');
    foto.className = 'foto';

    foto.appendChild(galeria)

    cabecalho.appendChild(titulo);
    cabecalho.appendChild(foto);

    const campos = [
        { label: 'Nome', value: agendamento.nome},
        { label: 'Data', value: formatarData(agendamento.data)},
        { label: 'Horário', value: agendamento.horario}
    ];

    agendamentosDiv.appendChild(cabecalho);
    

    campos.forEach(campo => {
        const label = document.createElement('label');
        label.textContent = campo.label;

        const div = document.createElement('div');
        div.className = campo.id;

        const p = document.createElement('p');
        p.textContent = campo.value;

        div.appendChild(p);
        agendamentosDiv.appendChild(label);
        agendamentosDiv.appendChild(div);
    });

    const del = document.createElement('button');
    del.id = 'apagar'
    del.innerText = 'Apagar agendamento'
    
    del.addEventListener('click', function() {
        deleteAgendamento(agendamento.id);
    });

    agendamentosDiv.appendChild(del)
    return agendamentosDiv;
}

function formatarData(dataString) {
    if (!dataString) return '';
    const date = new Date(dataString);
    return date.toLocaleDateString('pt-BR');
}


async function carregarAgendamentos() {
    const varios = document.getElementById('varios');
    
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:3000/api/agendamentos', {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        });

        const agendamentos = await response.json();

        varios.innerHTML = '';
        agendamentos.forEach(agendamento => {
            const agendamentoElement = criarAgendamentoElement(agendamento);
            varios.appendChild(agendamentoElement);
        });

    } catch (error) {
        console.error('Erro ao carregar agendamentos:', error);
        
        if (error.message.includes('Acesso negado') || error.message.includes('403')) {
            setTimeout(() => window.location.href = 'login1.html', 2000);
        }
    }
}

const URL = "http://localhost:3000/api/agendamentos"

async function deleteAgendamento(id) {
    if (!confirm("Deseja realmente excluir este agendamento?")) return
    await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('varios')) {
        carregarAgendamentos();
    }
    if (document.getElementById('galeria')) {
        loadImages();
    }
});