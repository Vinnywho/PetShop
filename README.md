 <p align="center">
<img src="https://github.com/user-attachments/assets/b59d9aca-c697-4ada-af75-25e601640194" alt="logo" border="0" align="center" id="logo"><br>
<h1 align="center">MIAU-AU PETSHOP</h1> 
</p>

## Desenvolvedor: <a href="https://www.linkedin.com/in/vinicius-cardoso-de-lima-a9a918227/">Vinicius Cardoso de Lima</a>

## Descrição
<p>Criação do projeto desenvolvido para a matéria de Desenvolvimento Web Full Stack pelos alunos da FECAP (Fundação Escola e Comércio Alvares Penteado) do curso de Análise e Desenvolvimento de sistema. Um site de um Petshop que realiza cadastro de usuáios, login, cadastro de pets e agendamento de serviços contando com foto de identificação, com a parte do front-end desenvolvida em HTML, CSS e JavaScript, e o back-end em JavaScript com a criação de uma api simples, Nodejs, MySQL Workbench e Postman.<br>
O usuário pode escolher na landing page se quer se registrar ou fazer login caso não possua uma conta, na qual, ao logar é gerado um token que permite o cliente manter a sessão no site por até uma hora sem precisar se logar novamente. Ao entrar no site o usuário pode visualizar os serviços disponíveis e agendar um deles para seu Pet, fornecendo os dados necessários, que poderão ser visualizados na aba de Agendamentos, na qual o próprio usuário pode apagar ou editar a foto enviada, bem como apagar o agendamento em si.</p>

<p align="center">
<img src="https://github.com/user-attachments/assets/1a4a1ce0-cd4f-4084-abc9-3694f2cdb74c" alt="Página" border="0" id="página">
  Landing page, por <a href="https://www.linkedin.com/in/vinicius-cardoso-de-lima-a9a918227/">Vinicius Cardoso de Lima</a>
</p>

</br>

## 🛠 Estrutura de pastas

-Raiz<br>
|<br>
|-->Back_End<br>
    &emsp;|-->node_moduless<br>
    &emsp;|-->routes<br>
    &emsp;&emsp;|-->authRoutes.js<br>
    &emsp;|-->uploads<br>
    &emsp;|-->.env<br>
    &emsp;|-->db.js<br>
    &emsp;|-->package-look.json<br>
    &emsp;|-->package.json<br>
    &emsp;|-->routes.js<br>
    &emsp;|-->server.js<br>
    &emsp;|-->uploadconfig.js<br>
|-->Front_End<br>
  &emsp;|-->agendamento<br>
  &emsp;&emsp;|-->agendamento.css<br>
  &emsp;&emsp;|-->historico.css<br>
  &emsp;&emsp;|-->modal.js<br>
  &emsp;|-->cadastro<br>
  &emsp;&emsp;|-->cadastro.css<br>
  &emsp;&emsp;|-->cadastro.css<br>
  &emsp;|-->images<br>
  &emsp;|-->login1<br>
  &emsp;&emsp;|-->login.css<br>
  &emsp;&emsp;|-->password.css<br>
  &emsp;|-->uploads<br>
  &emsp;|-->agendamentos.html<br>
  &emsp;|-->cadastro.html<br>
  &emsp;|-->historico.html<br>
  &emsp;|-->index.html<br>
  &emsp;|-->login1.html<br>
  &emsp;|-->script.js<br>
  &emsp;|-->style.css<br>
|README.md<br>
|banco_petshop.sql<br>

## 🛠 Requisitos da instalação

Para executar a aplicação é necessário possuir o Node instalado no aparelho<br>
Caso você não possua, <a href="https://nodejs.org/en/">clique aqui para instalar o Node</a><br>
<br>
Também é necessário possuir o MySQL Workbench<br>
Caso você não possua, <a href="https://dev.mysql.com/downloads/windows/installer/8.0.html">clique aqui para instalar o MySQL Workbench</a><br>
<br>
Por fim, é necessário possuir o VS Code<br>
Caso você não possua, <a href="https://code.visualstudio.com/download">clique aqui para instalar o MySQL Workbench</a><br>

## 🛠 Instalação

Faça o download do arquivo PetShop.zip no seu desktop.<br>
Extraia os arquivos.<br>
Abra o VS Code, e logo em seguida abra a pasta contendo o código.<br>
No arquivo ```.env``` no campo "DB_PASSWORD" insira a senha usada para acessar o seu usuário local<br>
Abra o terminal do VS Code e digite ```npx nodemon server.js```
Baixe a extensão ```Live Server```.<br>
Abra o arquivo:  ```index.html``` e execute a extensão.<br>

## 📋 Licença/License
<p xmlns:cc="http://creativecommons.org/ns#" >Este trabalho está licenciado sob <a href="https://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-SA 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""><img style="altura:22px!importante;margem-esquerda:3px;alinhamento-vertical:bottom-do-texto;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1" alt=""></a></p>
