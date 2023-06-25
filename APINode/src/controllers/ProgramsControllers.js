const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");
const { sign } = require("jsonwebtoken");
const authConfig = require("../configs/auth");



class ProgramsControllers{
    async create(req, res) {
        const { name, food, time, power, instruction, caracter } = req.body;
        const user_id = req.user.id;
      
        const database = await sqliteConnection();
        
        if (!name) {
            throw new AppError("Campo nome é obrigatório.");
        }
        if (!food) {
            throw new AppError("Campo alimento é obrigatório.");
        }
        if (!time) {
            throw new AppError("Campo tempo é obrigatório.");
        }
        if (!power) {
            throw new AppError("Campo potência é obrigatório.");
        }
        if (!caracter) {
            throw new AppError("Campo caracter é obrigatório.");
        }
          
        const checkCaracterExistsQuery = await database.get("SELECT COUNT(*) as count FROM programs WHERE caracter = ?", [caracter]);
        const allowedCaracters = ['.', '!', '@', '#', '$', '%'];

        if (checkCaracterExistsQuery.count > 0 || allowedCaracters.includes(caracter)) {
        throw new AppError("Este caracter já está em uso!");
        }

        const [programs_id] = await knex("programs").insert({
            user_id,
            name,
            food,
            time,
            power,
            instruction,
            caracter,
          });
          
        res.json();
        res.status(201).json({ message: "Novo pograma de pré-aquecimento cadastro com sucesso!" });
      }
      
    async show(req, res) {
        const { id } = req.params;

        const programs = await knex("programs").select()
        
        return res.json(programs)
    }
    
}

module.exports = ProgramsControllers

