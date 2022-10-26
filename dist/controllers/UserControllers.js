"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Users = require('../users.json');
/**
 * Use o conteúdo da variável `Users` para desenvolver os métodos necessários
 */
exports.default = {
    async listar(request, response) {
        return response.json(Users).status(200);
    },
    async buscarId(request, response) {
        let { id } = request.params;
        let user = Users.filter(u => u.id == id);
        if (user.length == 0)
            return response.send({ erro: true, message: 'usuário não encontrado' }).status(400);
        user = user[0];
        user = { nome: user.nome, sobrenome: user.sobrenome, id: user.id };
        return response.send(user).status(200);
    },
    async buscarIdade(request, response) {
        let { idade } = request.body;
        if (!idade)
            return response.send({ error: true, message: 'request inválida' }).status(201);
        let users = Users.filter(user => user.idade > idade);
        if (!users || users.length == 0)
            return response.send({ error: true, message: 'não há usuários para esse filtro' }).status(400);
        let usersFilter = [];
        users.forEach(users => {
            usersFilter.push({ nome: users.nome, sobrenome: users.sobrenome, idade });
        });
        return response.json({ users: usersFilter });
    },
    async buscarSexo(request, response) {
        let { sexo } = request.body;
        if (!sexo)
            return response.send({ error: true, message: 'request inválida' }).status(201);
        let users = Users.filter(user => user.sexo.toLowerCase() == sexo.toLowerCase());
        if (!users || users.length == 0)
            return response.send({ error: true, message: 'não há usuários para esse filtro' }).status(400);
        let usersFilter = [];
        users.forEach(users => {
            usersFilter.push({ nome: users.nome, sobrenome: users.sobrenome, sexo });
        });
        return response.json({ users: usersFilter });
    }
};
