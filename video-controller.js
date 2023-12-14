
// const socket = new WebSocket('ws://192.168.14.226:8765');
const socket = new WebSocket('ws://localhost:8765');

socket.onopen = function(event) {
  console.log('WebSocket connection opened'); // Log when the WebSocket connection is established
};

socket.onerror = function(error) {
  console.error('WebSocket error:', error); // Log any WebSocket connection errors
};

socket.onmessage = function(event) {
  const message = event.data;
  console.log(`Received new message from Python: ${message}`);
  // Rest of your message handling logic...
  if (message === 'play') {
    playVideo();
  } else if (message === 'pause') {
    pauseVideo();
  } else if(message == 'full_screen') {
    toggleFullscreen();
  } else if(message == 'exit_full_screen') {
    exitFullscreen();
  } else if (message == 'skip_10') {
    skipForward(10);
  } else if (message == 'back_10') {
    skipBackward(10);
  }
};

socket.onclose = function(event) {
  console.log('WebSocket connection closed by user'); // Log when the WebSocket connection is closed
};

function playVideo() {
  console.log('Inside playVideo function');
  if (player && player.playVideo) {
    console.log('Attempting to play video');
    player.playVideo();
  } else {
    console.log('Player object or playVideo method not available');
  }
}

function pauseVideo() {
  console.log(`pause video called`);
  if (player && player.pauseVideo) {
    player.pauseVideo();
  }
}

// Function to toggle fullscreen mode for the video player
function toggleFullscreen() {
  console.log(`Toggle full screen called`);
  if(player && player.getPlayerState() !== -1) {
    const playerElement = player.getIframe();
    if(playerElement.requestFullscreen) {
      playerElement.requestFullscreen();
    } 
  }
}

// Function to skip forward in the video by specified seconds
function skipForward(seconds) {
  if (player && player.getCurrentTime && player.seekTo) {
    const currentTime = player.getCurrentTime();
    player.seekTo(currentTime + seconds, true);
  }
}

// Function to skip backward in the video by specified seconds
function skipBackward(seconds) {
  if (player && player.getCurrentTime && player.seekTo) {
    const currentTime = player.getCurrentTime();
    player.seekTo(currentTime - seconds, true);
  }
}

function exitFullscreen() {
  if(player && player.exitFullscreen) {
    player.exitFullscreen();
  }
}