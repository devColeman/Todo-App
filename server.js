const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

const path = require('path');


app.use(express.static('public'))
app.use(express.urlencoded({extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
// we are trying to get public js to work


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.get('/',async (req, res) => {
    const todoItems = await db.collection('todos').find().toArray()
    const test = await db.collection('todos').find()
    res.render('index.ejs', { items: todoItems, completed: test})
})
/
app.post('/addTodo', (req,res) => {
    db.collection('todos').insertOne({thing: req.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
    
})

app.delete('/deleteItems', (request, response) => {
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    .then(result => {
        console.log('Todo Deleted')
        console.log(`${request.body.itemFromJS}`)
        response.json('Todo Deleted')
    })
    .catch(error => console.error(error))

})

app.put('/markDone', (req, res) => {
    db.collection('todos').updateOne({thing: req.body.itemFromJS},{
        $set: {
            completed: true
          }
              
    })
    res.json('Marked Complete')
})

app.put('/unmarkDone', (req, res) => {
    db.collection('todos').updateOne({thing: req.body.itemFromJS},{
        $set: {
            completed: false
          }
              
    })
    res.json('Marked not Done')
})
app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT} go catch it`)

})