const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const { hash } = require('bcryptjs');




class UsersControllers {
    async create(req, res) {
        const { name, email, password} = req.body;
    
        const database = await sqliteConnection();
        const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    
        if(checkUserExists){
          throw new AppError("Este e-mail já está em uso!");
        }
        
        const hashedPassword = await hash(password, 8);
    
        await database.run(
          "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword]
        );
        return res.status(201).json();
      }

}

module.exports = UsersControllers;