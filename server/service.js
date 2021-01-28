const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;
const app = express();
const multiparty = require('connect-multiparty');

const MultipartyMiddleware = multiparty({ uploadDir: './images' });
app.use(bodyparser.urlencoded({ extended: true }));

app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Testing our Server"
    })
})


app.post('/uploads', MultipartyMiddleware, (req, res) => {
    console.log(req.files.file);
})

app.listen(PORT, console.log(`Listening at ${PORT}`))