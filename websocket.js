import { io } from "./http.js";

const onlineUser = [];

const userMessage = [];

io.on("connection", socket => {

    socket.on("name", (data, returnMessage) => {
        const currentUser = onlineUser.find( user => user.name === data.name);
        currentUser ? currentUser.id = socket.id :  onlineUser.push({id: socket.id,name: data.name})
        
        returnMessage(userMessage);
    });

    socket.on("message", data =>{
        userMessage.push({id: socket.id, name: data.name, message: data.message, createdAt: new Date()})
        io.emit("message",data);
    });
});

