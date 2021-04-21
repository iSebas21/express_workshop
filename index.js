const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon.js');
const user = require('./routes/user.js')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
    return res.status(200).json({code:1, message: "Bienvenido a la Pokedex"});
});

app.use("/pokemon", pokemon);
app.use("/user", user)

app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "URL inexistente"});
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});