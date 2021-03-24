const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');

pokemon.post("/",(req, res ,next) =>{
    return res.status(200).send(req.body);
});

pokemon.get("/",async(req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
})

pokemon.get('/:id([0-9]{1,3})',async(req, res, next) =>{
    const id = req.params.id -1;
    const pkmn = await db.query("SELECT * FROM pokemon");
    if (id >= 0 && id <= 721) {
        return res.status(200).json(pkmn[req.params.id -1]);
    }
    return  res.status(404).send("Pokemon no encontrado");
});

pokemon.get('/:name([A-Za-z]+)', async(req, res ,next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon");
    const pkmon = pkmn.filter((p) => {
       return (p.pok_name.toUpperCase() == name.toUpperCase()) && p;
    });

    if(pkmon.length>0) {
        return res.status(200).json(pkmon)
    }
    return res.status(404).send("Pokemon no encontrado");
});

module.exports = pokemon;