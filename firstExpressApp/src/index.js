const express = require('express');

const app = express();


//routing
app.get('/home', (req, res) => {
    res.send('Hello Home!');
});

const port = 3000;
app.listen(port, ()=> {
    console.log("express server started listening ",port);
})