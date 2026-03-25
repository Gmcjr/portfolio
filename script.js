document.addEventListener('DOMContentLoaded', () => {
  // Hex grid canvas
  const canvas = document.getElementById('hex-bg');
  const ctx = canvas.getContext('2d');
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let time = 0.5;

  window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function drawHexagon(x, y, size, brightness) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i);
    points.push({
      x: x + size * Math.cos(angle),
      y: y + size * Math.sin(angle)
    });
  }

  // Draw dim base outline
  ctx.beginPath();
  points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.closePath();
  ctx.strokeStyle = `rgba(200, 150, 255, ${Math.min(brightness * 1.3, 2)})`;
  ctx.lineWidth = 1;
  ctx.shadowBlur = 22;
  ctx.stroke();

  // Draw flowing bright segment
  if (brightness > 0.6) {
    const phase = (time + x * 0.03 + y * 0.03) % (Math.PI * 1.5);
    const segmentLength = 4;
    const totalEdges = 6;
    const currentEdge = Math.floor((phase / (Math.PI * 2)) * totalEdges);
    const nextEdge = (currentEdge + 1) % totalEdges;
    const edgeProgress = ((phase / (Math.PI * 2)) * totalEdges) % 1;

    const startPoint = points[currentEdge];
    const endPoint = points[nextEdge];

    const sx = startPoint.x + (endPoint.x - startPoint.x) * edgeProgress;
    const sy = startPoint.y + (endPoint.y - startPoint.y) * edgeProgress;
    const ex = startPoint.x + (endPoint.x - startPoint.x) * Math.min(edgeProgress + 0.8, 1);
    const ey = startPoint.y + (endPoint.y - startPoint.y) * Math.min(edgeProgress + 0.8, 1);

    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = `rgba(200, 100, 255, ${Math.min(brightness * 3, 9)})`;
    ctx.shadowColor = 'rgba(157, 78, 221, 1)';
    ctx.shadowBlur = 50;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 80;
  }
}

  function drawHexGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const size = 55;
  const hexWidth = size * 1.9;
  const hexHeight = Math.sqrt(3) * size;
  const horizSpacing = hexWidth * 0.75;
  const maxDist = 100;

  for (let col = -1; col < Math.ceil(canvas.width / horizSpacing) + 2; col++) {
    for (let row = -1; row < Math.ceil(canvas.height / hexHeight) + 2; row++) {
      const x = col * horizSpacing;
      const y = row * hexHeight + (col % 2 !== 0 ? hexHeight / 2 : 0);

      const dist = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2);
      if (dist < maxDist) {
        const base = 1 - dist / maxDist;
        const flicker = Math.sin(time + x * 0.05 + y * 0.05) * 0.6 + Math.random() * 0.3;
        const brightness = 0.07 + base * 0.7 + flicker * base;
        drawHexagon(x, y, size, brightness);
      } else {
        drawHexagon(x, y, size, 0.07);
      }
    }
  }
}

  function animate() {
    time += 0.03;
    drawHexGrid();
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
  });

  resize();
  animate();

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