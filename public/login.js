const enterChat = () => {
    let name = document.getElementById("name").value;
    name === "" ? alert("Nome é obrigatorio!") : window.location.href = `chat.html?name=${name}`
}

