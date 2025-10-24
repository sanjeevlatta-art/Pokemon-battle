const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');

const app = express();

app.get('/battle', async (req, res) => {
  const { left = "rowlet", right = "oshawott" } = req.query;
  const canvas = createCanvas(400, 200);
  const ctx = canvas.getContext('2d');

  try {
    const leftImg = await loadImage(path.join(__dirname, 'assets', `${left}.png`));
    const rightImg = await loadImage(path.join(__dirname, 'assets', `${right}.png`));
    const vsImg = await loadImage(path.join(__dirname, 'assets', 'vs.png'));

    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(0, 0, 400, 200);
    ctx.drawImage(leftImg, 20, 50, 100, 100);
    ctx.drawImage(rightImg, 280, 50, 100, 100);
    ctx.drawImage(vsImg, 150, 80, 100, 40);

    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer());
  } catch (err) {
    res.status(500).send("Error loading images");
  }
});

app.listen(3000, () => console.log('Battle image server running'));
