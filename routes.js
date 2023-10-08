// Arquivo de rotas(Endpoints) da API
const express = require('express');
const routes = express.Router();

// Controllers
const controllerLogin = require('./controller/loginController');
const controllerUsuario = require('./controller/usuarioController');
const controllerAtivo = require('./controller/ativoController');

// Endpoints
// Login
routes.get('/login', controllerLogin.validarLogin) // Valida o login

// Usuarios
routes.get('/usuarios', controllerUsuario.listarUsuario)         // Lista Usuarios
routes.post('/usuarios', controllerUsuario.criarUsuario)         // Cria Usuarios 
routes.delete('/usuarios/:id', controllerUsuario.excluirUsuario) // Deleta Usuarios
routes.put('/usuarios/:id', controllerUsuario.alterarUsuario)    // Altera Usuarios

// Ações
routes.get('/ativos', controllerAtivo.listarAtivos)        // Lista Ativos
routes.post('/ativos', controllerAtivo.criarAtivo)         // Cria Ativos
routes.delete('/ativos/:id', controllerAtivo.excluirAtivo) // Deleta Ativos
routes.put('/ativos/:id', controllerAtivo.alterarAtivo)    // Altera Ativos

module.exports = routes;