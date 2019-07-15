const express = require('express')
const mongoClient = require('mongodb')
const uri = ('mongodb+srv://Admin:admin@cluster0-5qx6e.mongodb.net/test?retryWrites=true&w=majority')
const app = express();
const server = require('http').Server(app)

app.use(express.static(__dirname + '/views'));

app.set('view engine', 'ejs')

mongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    // ... start the server
    if (err) return console.log(err)
    db = client.db('Project0')
})

/*mongoose.connect('mongodb+srv://Admin:admin@cluster0-5qx6e.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})
*/
app.use(require('./routes'))

server.listen(8000)