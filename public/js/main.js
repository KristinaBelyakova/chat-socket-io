const chatForm = document.querySelector('#chat-form')
const chatMessages = document.querySelector('.chat-messages')

const socket = io()

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
