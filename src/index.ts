import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get('/', (req, res) => {
    console.log('GET request is there');
});

app.get('/api', (req, res) => {
    console.log('GET request is there');
    res.json({message: "Hello from the server"});
});

app.post('/cv-style', (req, res) => {
    console.log(req);
    console.log(req.body);
    // res.json({message: "Hello there!"})
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
