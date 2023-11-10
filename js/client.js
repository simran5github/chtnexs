const socket = io('https://nexusnode.onrender.com/');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
const namlist = document.querySelector("#col1");
var audio = new Audio('ting.mp3');

const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    
    var currentdate = new Date(); 
    var datetime = ":" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " at "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const mestim = document.createElement('div');
    mestim.innerText = datetime;
    mestim.classList.add('tim');
    messageElement.append(mestim);

    if(position=='left'){
        audio.play();
    }
}
const appendinnam = (n)=>{
    const mesnam = document.createElement('div');
    mesnam.innerText = `${n} joined`;
    namlist.append(mesnam);    
}
const leftinnam = (n)=>{
    const mesnam = document.createElement('div');
    mesnam.innerText = `${n} left`;
    namlist.append(mesnam);    
}
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value='';
})
const nam = prompt("Enter your name to join");
socket.emit('new-user-joined',nam)

socket.on('user-joined',nam => {
    append(`${nam} joined the chat`,'right')
    appendinnam(nam);
})

socket.on('receive',data => {
    append(`${data.nam}: ${data.message}`,'left')
})

socket.on('left',nam => {
    append(`${nam} left the chat`,'left')
    leftinnam(nam);
})