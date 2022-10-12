const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 8080;

app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

app.get('/', (req, res) => {
    res.status(200);
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

module.exports = app;
