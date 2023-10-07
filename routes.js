// Arquivo de rotas(Endpoints) da API
const express = require('express');
const routes = express.Router();

// Controllers
const controllerUsuario = require('./controller/usuarioController');
const controllerAtivo = require('./controller/ativoController');

// Endpoints
// Login
routes.get('/login', (req,res) => {res.send("Efetuando Login")}) // Valida o login

// Usuarios
routes.get('/usuarios', (req, res) => {controllerUsuario.listarUsuario(req,res)})        // Lista Usuarios
routes.post('/usuarios', (req, res) => {controllerUsuario.criarUsuario(req,res)})        // Cria Usuarios 
routes.delete('/usuarios/:id', (req,res) => {controllerUsuario.excluirUsuario(req,res)}) // Deleta Usuarios
routes.put('/usuarios/:id', (req,res) => { controllerUsuario.alterarUsuario(req, res)})  // Altera Usuarios

// Ações
routes.get('/ativos', (req,res) => {controllerAtivo.listarAtivos(req,res)})   // Lista Ativos
routes.post('/ativos', (req, res) => {controllerAtivo.criarAtivo(req,res)})    // Cria Ativos
routes.delete('/ativos/:id', (req,res) => {controllerAtivo.excluirAtivo(req,res)}) // Deleta Ativos
routes.put('/ativos/:id', (req,res) => {controllerAtivo.alterarAtivo(req,res)})  // Altera Ativos

module.exports = routes;