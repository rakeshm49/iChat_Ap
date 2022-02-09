const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const massageInput = document.getElementById('massageInp');
const massageContainer = document.querySelector('.container');

var audio = new Audio('pkachuss.mp3');


const append = (massage,position) =>{
    const massageElement = document.createElement('div');
    massageElement.innerText = massage;
    massageElement.classList.add('massage');
    massageElement.classList.add(position);
    massageContainer.append(massageElement);
    if(position=='left'){
        audio.play();
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const massage = massageInput.value;
    append(`You: ${massage}`,'right');
    socket.emit('send',massage);
    massageInput.value = '';
})

let nam = prompt("enter your name to join");

socket.emit('new-user-joined', nam)

socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'right');
})
socket.on('recieve', data =>{
    append(`${data.name}: ${data.massage}`,'left');
})
socket.on('left', name =>{
    append(`${name} left the chat`,'left');
})