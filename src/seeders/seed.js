const db = require('../utils/database');
const Users = require('../models/users.model');
const Todos = require('../models/todos.models');

const users = [
    {username: 'sebas', email: 'sebas@gmail.com', password: '1234'},
    {username: 'santi', email: 'santi@gmail.com', password: '1234'},
    {username: 'marce', email: 'marce@gmail.com', password: '1234'},
    {username: 'luis', email: 'luis@gmail.com', password: '1234'},
];

const todos = [
    {title: 'Tarea 1', description: 'una descripcion', userId: 1},
    {title: 'Tarea 2', description: 'una descripcion', userId: 1},
    {title: 'Tarea 3', description: 'una descripcion', userId: 2},
    {title: 'Tarea 4', description: 'una descripcion', userId: 3}
];

const categories = [

];

const todosCategories = [];

db.sync({force: true })
.then(()=>{
    console.log("Iniciando con el sembrado malicioso");
    users.forEach((user) => Users.create(user));
   setTimeout(() => {
     todos.forEach((todo) => Todos.create(todo));
   },100)

})
.catch((error) => console.log(error))