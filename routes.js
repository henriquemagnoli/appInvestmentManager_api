// Arquivo de rotas(Endpoints) da API
const express = require('express');
const routes = express.Router();
const controller = require('./controller/usuarioController');

// Endpoints

// Login
routes.get('/login', (req,res) => {res.send("Efetuando Login")}) // Valida o login

// Usuario
routes.get('/usuarios', (req, res) => {controller.listarUsuario(req,res)})        // Lista Usuarios
routes.post('/usuarios', (req, res) => {controller.criarUsuario(req,res)})        // Cria Usuarios 
routes.delete('/usuarios/:id', (req,res) => {controller.excluirUsuario(req,res)}) // Deleta Usuarios
routes.put('/usuarios/:id', (req,res) => { controller.alterarUsuario(req, res)})  // Altera Usuarios

// Ações
routes.get('/ativos', (req,res) => {res.send("Retornando ativos")})   // Lista Ativos
routes.post('/ativos', (req, res) => {res.send("Criando ativos")})    // Cria Ativos
routes.delete('/ativos', (req,res) => {res.send("Deletando ativos")}) // Deleta Ativos
routes.put('/ativos', (req,res) => {res.send("Atualizando ativos")})  // Altera Ativos

module.exports = routes;