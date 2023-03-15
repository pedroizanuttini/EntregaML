const path = require('path');
const fs = require('fs');

class UserContainer{

    filePath;

    constructor(file){
        this.filePath = path.join(__dirname, `../data/${file}`);
        console.log('filePath: ', this.filePath)
    }

    async getAllUsers(){
        try{
            const data = await fs.promises.readFile(this.filePath, 'utf-8');
            const users = await JSON.parse(data); //convierto el Json a objeto literal.
            return users;
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async createUser(newUser){
        try{
            const users= await this.getAllUsers();
            console.log('in create user: ', users)
            newUser.id=users.length+1;
            users.push(newUser);
            await fs.promises.writeFile(this.filePath, JSON.stringify(users)); //escribo en el archivo Json
            return newUser;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async getUserByEmail(email){  //esta funcion me trae el usuario por email ingresado.

        try{
            const users = await this.getAllUsers();
            const result = users.find( user => user.email === email );

            return result;

        }catch(error){
            console.log(error);
            return null;
    }


    }
}

module.exports = {
    UserContainer
}