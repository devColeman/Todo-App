const express = require('express')
const app = express()
const PORT = 3000


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    
})

app.post('/addTodo', (req,res) => {
    console.log('post worked')
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`This server is running on ${PORT} go catch it`)

})