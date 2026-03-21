document.addEventListener('DOMContentLoaded', () => {
// Hex grid canvas
const canvas = document.getElementById('hex-bg');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawHexGrid();
}

function drawHexagon(x, y, size) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i);
    const px = x + size * Math.cos(angle);
    const py = y + size * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.strokeStyle = 'rgba(157, 78, 221, 0.25)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawHexGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const size = 40;
  const hexWidth = size * 2;
  const hexHeight = Math.sqrt(3) * size;
  const horizSpacing = hexWidth * 0.75;

  for (let col = -1; col < Math.ceil(canvas.width / horizSpacing) + 2; col++) {
    for (let row = -1; row < Math.ceil(canvas.height / hexHeight) + 2; row++) {
      const x = col * horizSpacing;
      const y = row * hexHeight + (col % 2 !== 0 ? hexHeight / 2 : 0);
      drawHexagon(x, y, size);
    }
  }
}

window.addEventListener('resize', resize);
resize();

// Filter functionality
document.querySelectorAll('.filters button').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.filters button').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    document.querySelectorAll('.project-card').forEach(card => {
      if (filter === 'all' || filter === card.dataset.category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
});