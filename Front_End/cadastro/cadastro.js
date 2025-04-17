const inputSenha = document.getElementById("password");
const inputSenhaRepetir = document.getElementById("password-repeat");
const form = document.getElementById("registro-container");

document.querySelector(".viewPassword").addEventListener("click", function() {
    const toggleIcon = this.querySelector("img");

    if (inputSenha.type === "password") {
        inputSenha.type = "text";
        toggleIcon.src = "images/eye-svgrepo-com.png";
        toggleIcon.className = "eyeopen";
    } else {
        inputSenha.type = "password";
        toggleIcon.src = "images/eye-close-svgrepo-com.png";
        toggleIcon.className = "eyeclosed";
    }
});


document.querySelector(".viewPassword1").addEventListener("click", function() {
    const toggleIcon = this.querySelector("img");

    if (inputSenhaRepetir.type === "password") {
        inputSenhaRepetir.type = "text";
        toggleIcon.src = "images/eye-svgrepo-com.png";
        toggleIcon.className = "eyeopen";
    } else {
        inputSenhaRepetir.type = "password";
        toggleIcon.src = "images/eye-close-svgrepo-com.png";
        toggleIcon.className = "eyeclosed";
    }
});

form.addEventListener("submit", function(event) {  
    if (inputSenha.value !== inputSenhaRepetir.value) {
        alert("As senhas estão diferentes! ❌");
        event.preventDefault();
    }
});