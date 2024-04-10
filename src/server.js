const express = require('express');
const path = require('path');
const app = express();

const desktopPath = path.join(__dirname, '..', 'src'); // Assuming your desktop is at the default location

app.use(express.static(desktopPath));

app.get('/redirect', (req, res) => {
    res.redirect('/studreg.html');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(desktopPath, 'hello.html'));
});

app.get('/trial', (req, res) => {
    res.sendFile(path.join(desktopPath, 'studreg.html'));
});

app.listen(8080, () => {
    console.log('Server is listening on port 8080');
});

