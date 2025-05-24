import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/dicky', (req, res) => {
    res.send("Hello Dicky");
});

app.listen(3000, () => {
    console.info("Server started on port 3000");
});
