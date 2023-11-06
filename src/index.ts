import express from 'express';
// import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
    res.json({message: "Hello from the server"});
});

app.post('/cv-style', (req, res) => {
    // console.log(req);
    console.log(req.body);
    // res.json({message: "Hello there!"})
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
