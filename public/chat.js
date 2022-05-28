const socket = io();

window.addEventListener('load', () => {
    const currentName = getCurrentName();
    title.innerHTML = `Bem vindo, ${currentName}!`;
    currentName === "" || currentName == null  ? window.location.href = `login.html` : loadContent(currentName);
})

const getCurrentName = () => {
    const getParamsUrl = new URLSearchParams(window.location.search);
    const getNameParam = getParamsUrl.get('name');
    return getNameParam;
}


document.getElementById("sendMessage")
.addEventListener("keypress", (event) => {
    const currentName = getCurrentName();
    const currentMessage = document.getElementById("sendMessage").value
    if(event.key === 'Enter'){
        sendMessage(currentName,currentMessage);
    }
});

const sendMessage = (name, message) => {
    socket.emit("message", {name, message});
    document.getElementById("sendMessage").value = "";
};

const loadContent = (name) =>{
    socket.emit("name",{name},(response) => {
        response.forEach(data => { 
            insertIntoChat(data.name,data.message);
        });
    scrollToEnd("contentChat");
})};


const scrollToEnd = (elementId) => {
    document.getElementById(elementId).scrollTop = document.getElementById(elementId).scrollHeight;
}

const insertIntoChat = (name,message) => {
    name === getCurrentName() ? 
    contentChat.innerHTML += `<li class = "user-message">${message}</li>` :
    contentChat.innerHTML += `<li style = "padding: 0px"><b>${name}:</b> ${message}</li>`
}

/*Listening if message arrived*/
socket.on("message", data =>{
    insertIntoChat(data.name,data.message);
    scrollToEnd("contentChat");
})