const socket = io('http://192.168.29.205:8000', {
    withCredentials: true,
    extraHeaders: {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "http://192.168.29.205:8000"
    }
});

const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector('.container');

var audio = new Audio('../sources/ping.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    };
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter Your Name");
console.log(name);
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat.`, 'center');
})

socket.on('recieve', data =>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name=>{
    append(`${name} left the chat.`, 'center')
})