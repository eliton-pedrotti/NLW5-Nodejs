import express from 'express';

const app = express();


app.get('/', (req, res) => {
    return res.json({ message: 'Hello world!' });
});

app.post("/users", (req, res) => {
    return res.json({
        message: 'User save success!'
    });
});

app.listen(3333, () => {
    console.log('Server is running!');
});