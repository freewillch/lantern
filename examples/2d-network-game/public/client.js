const socket = io();

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const players = {};
let myId = null;

socket.on('connect', () => {
  myId = socket.id;
});

socket.on('currentPlayers', (serverPlayers) => {
  for (const id in serverPlayers) {
    players[id] = serverPlayers[id];
  }
  draw();
});

socket.on('newPlayer', (player) => {
  players[player.id] = { x: player.x, y: player.y };
  draw();
});

socket.on('playerMoved', (player) => {
  if (players[player.id]) {
    players[player.id].x = player.x;
    players[player.id].y = player.y;
    draw();
  }
});

socket.on('playerDisconnected', (id) => {
  delete players[id];
  draw();
});

const speed = 5;

document.addEventListener('keydown', (e) => {
  if (!myId || !players[myId]) return;
  switch (e.key) {
    case 'ArrowUp': players[myId].y -= speed; break;
    case 'ArrowDown': players[myId].y += speed; break;
    case 'ArrowLeft': players[myId].x -= speed; break;
    case 'ArrowRight': players[myId].x += speed; break;
    default: return;
  }
  socket.emit('move', players[myId]);
  draw();
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const id in players) {
    const p = players[id];
    ctx.fillStyle = id === myId ? 'blue' : 'red';
    ctx.fillRect(p.x, p.y, 20, 20);
  }
}
