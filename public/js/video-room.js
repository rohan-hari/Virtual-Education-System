const socket = io('/')

const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    socket.on('user-connected', (userId, roomId) => {
        console.log(`UserConnected <br> User Id: ${userId} <br> Room ID: ${roomId}`)
    })
})

socket.emit('join-room', ROOM_ID, USER_ID)

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}