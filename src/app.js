//importar express
const express = require('express');
const db = require("./utils/database")
const initModels = require("./models/init.model");
const Users = require('./models/users.model');
const Todos = require('./models/todos.models');

//crear uns instancia de express
const app = express();

app.use(express.json());

const PORT = 8000;

db.authenticate()
.then(() => console.log('Autenticacion exitosa'))
.catch((error) => console.error(error))

initModels();

db.sync({force: false})
.then(() => console.log('Base de datos sincronizada'))
.catch((error) => console.error(error))


app.get('/', (req, res) => {
    res.status(200).json({message: "Bienvenido al servidor"})
});

// buscar un usuario

app.get('/Users', async (req, res) => {
   try {
    const result = await Users.findAll();
    res.status(200).json(result);
   } catch (error) {
    console.log(error)
   }
})

app.get('/Users/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const result = await Users.findByPk(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
     }
    
})

app.get('/Users/username/:username', async (req, res) =>{
    try {
        const { username } = req.params;
        const result = await Users.findOne({where:{username}});
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
     }
    
})

// crear un usuario

app.post('/Users', async (req, res) =>{
    try {
        const user = req.body
        const result = await Users.create(user);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error)
     }
    
})


// actualizar un usuario

app.put('/Users/:id', async (req, res) =>{
    try {
       const {id} =req.params;
       const field = req.body;
       const result = Users.update(field, {
        where: {id}
        
    });
     res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
        }
    
})

//eliminar un usuario

app.delete('/Users/:id', async (req, res) =>{
    try {
       const {id} =req.params;
       const result = Users.destroy({
        where: {id}
        
    });
     res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
        }
    
})

 //obtener todas las tareas

app.get('/Todos', async (req, res) => {
    try {
     const result = await Todos.findAll();
     res.status(200).json(result);
    } catch (error) {
     console.log(error)
    }
 })

 // obtener tarea por id
 app.get('/Todos/:id', async (req, res) =>{
    try {
        const { id } = req.params;
        const result = await Todos.findByPk(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error)
     }
    
})

// crear una tarea

app.post('/Todos', async (req, res) =>{
    try {
        const todo = req.body
        const result = await Todos.create(todo);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error.message);
        console.log(error)
     }
    
})

//actualizar estado de una tarea
app.put('/Todos/:id', async (req, res) =>{
    try {
       const {id} =req.params;
       const field = req.body;
       const {title, description,userId, ...restOfProperties} = data
       const result = Todos.update({restOfProperties, isComplete}, {
        where: {id}
        
    });
     res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
        }
    
})

//eliminar una tarea
app.delete('/Todos/:id', async (req, res) =>{
    try {
       const {id} =req.params;
       const result = Todos.destroy({
        where: {id}
        
    });
     res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error.message);
        }
    
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)

})