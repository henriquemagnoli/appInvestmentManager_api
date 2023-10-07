// Arquivo de rotas(Endpoints) da API
const express = require('express');
const routes = express.Router();

// Endpoints

// Login
routes.get('/login', (req,res) => {res.send("Efetuando Login")})

// Usuario
routes.get('/usuarios', (req,res) => {res.send("Retornando usuarios")})
routes.post('/usuarios', (req, res) => {res.send("Criando usuarios")})
routes.delete('/usuarios', (req,res) => {res.send("Deletando usuarios")})
routes.put('/usuarios', (req,res) => {res.send("Atualizando usuarios")})

// Ações
routes.get('/ativos', (req,res) => {res.send("Retornando ativos")})
routes.post('/ativos', (req, res) => {res.send("Criando ativos")})
routes.delete('/ativos', (req,res) => {res.send("Deletando ativos")})
routes.put('/ativos', (req,res) => {res.send("Atualizando ativos")})

module.exports = routes;