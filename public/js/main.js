const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages')
const roomName = document.querySelector('#room-name')
const usersList = document.querySelector('#users')

// get username and room from 
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

// console.log(username, room);

const socket = io()

// join hatroom
socket.emit('joinRoom', { username, room })

// get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room)
  outputUsers(users)
})

// message from server
socket.on('message', message => {
  outputMessage(message)

  // scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight
})

// message submit
chatForm.addEventListener('submit', (event) => {
  event.preventDefault()

  // get message text
  const msg = event.target.elements.msg.value

  // emit message to server
  socket.emit('chatMessage', msg)

  //   // clear input
  event.target.elements.msg.value = ''
  event.target.elements.msg.focus()
})

// output message to DOM
function outputMessage(message) {
  const div = document.createElement('div')
  div.classList.add('message')
  div.innerHTML = `<p class='meta'>${message.username} <span>${message.time}</span></p>
  <p class='text'>${message.text}</p>`
  document.querySelector('.chat-messages').appendChild(div)
}

// add roomname to DOM
function outputRoomName(room) {
  roomName.innerText = room
}

// add users list to DOM
function outputUsers(users) {
  usersList.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join('')}
  `
}
