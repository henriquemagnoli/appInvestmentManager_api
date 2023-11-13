// Arquivo de rotas(Endpoints) da API
const express = require('express');
const routes = express.Router();

// Controllers
const controllerLogin = require('./controller/loginController');
const controllerUsuario = require('./controller/usuarioController');
const controllerAtivo = require('./controller/ativoController');
const controllerHistorico = require('./controller/historicoController');
const controllerBolsaValores = require('./controller/bolsavaloresController');

// Endpoints
// Login
routes.post('/login', controllerLogin.validarLogin) // Valida o login

// Usuarios
routes.get('/usuarios', controllerUsuario.listarUsuario)         // Lista Usuarios
routes.post('/usuarios', controllerUsuario.criarUsuario)         // Cria Usuarios 
routes.delete('/usuarios/:id', controllerUsuario.excluirUsuario) // Deleta Usuarios
routes.put('/usuarios/:id', controllerUsuario.alterarUsuario)    // Altera Usuarios

// Ações
routes.get('/ativos/:idUsuario', controllerAtivo.listarAtivos)                  // Lista Ativos
routes.get('/ativos/:codigoativo/:idUsuario', controllerAtivo.listarAtivosNome) // Lista atraves do filtro o ativo
routes.post('/ativos/:idUsuario', controllerAtivo.criarAtivo)                   // Cria Ativos
routes.delete('/ativos/:id', controllerAtivo.excluirAtivo)                      // Deleta Ativos
routes.put('/ativos/:id', controllerAtivo.alterarAtivo)                         // Altera Ativos

// Histórico
routes.get('/historico/:idUsuario', controllerHistorico.listarHistorico) // Lista Histórico
routes.get('/historico/:codigoativo/:idUsuario', controllerHistorico.listarHistoricoNome)

// B3
routes.get('/bolsavalores/:acao', controllerBolsaValores.listarAcaoNome)
routes.get('/bolsavalores', controllerBolsaValores.listarAcoes)

module.exports = routes;