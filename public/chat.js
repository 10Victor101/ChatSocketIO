const socket = io();

window.addEventListener('load', () => {
    const currentName = getCurrentName();
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
            contentChat.innerHTML += 
                    `
                    <div>${data.name}: ${data.message}</div>
                    `
                });
    scrollToEnd("contentChat");
})};


const scrollToEnd = (elementId) => {
    document.getElementById(elementId).scrollTop = document.getElementById(elementId).scrollHeight;
}

/*Listening if message arrived*/
socket.on("message", data =>{
    const contentChat = document.getElementById("contentChat");
    contentChat.innerHTML += 
    `
    <div>${data.name}: ${data.message}</div>
    `
    scrollToEnd("contentChat");
})