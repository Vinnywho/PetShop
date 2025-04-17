document.querySelector(".viewPassword").addEventListener("click", function() {
    const inputSenha = document.getElementById("password");
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
