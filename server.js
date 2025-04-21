const express = require('express')
const app = express()
const PORT = 3000

app.use(express.urlencoded({extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    
})
/
app.post('/addTodo', (req,res) => {
    console.log(req.body)
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log(`This server is running on port ${PORT} go catch it`)

})