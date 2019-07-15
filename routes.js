const bodyparser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const mongoClient = require('mongodb')
const uri = ('mongodb+srv://Admin:admin@cluster0-5qx6e.mongodb.net/test?retryWrites=true&w=majority')
const app = express();
const ObjectId = require('mongodb').ObjectId
const nfe = require('nfe-io')('w4Fe4OOtw82ErQYiqqpKykCE0HyEGuN1xuibdP9ALsB9aPCkMWHS9mAKZOsxUxt4oEF')

app.use(express.static(__dirname + '/views'));

//BD
mongoose.set('useCreateIndex', true);
mongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    // ... start the server
    if (err) return console.log(err)
    db = client.db('Project0')
})


//Roteamento da API

//midleware 
//extraindo informações do formulário <form> (./views/index.ejs)  e adicionando a propriedade body no objeto request
app.use(bodyparser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index.ejs')

})

app.get('/', (req, res) => {
    var cursor = db.collection('data').find
})

//Inserindo valores no BD
app.post('/show', (req, res) => {

    db.collection('data').save(req.body, (err, results) => {
        if (err) return console.log(err)

        console.log('Salvo no banco de dados')
        res.redirect('/show')

    })
})

//Mostrando valores do BD
app.get('/show', (req, res) => {
    db.collection('data').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('show.ejs', { data: results })
    })
})

//Update no BD
app.route('/edit/:id')
    //Armazenando em id o id passando no params vindo da view 
    .get((req, res) => {
        var id = req.params.id
        //Encontrando objeto com .find
        db.collection('data').find(ObjectId(id)).toArray((err, result) => {
            if (err) return res.send(err)
            res.render('edit.ejs', { data: result })
        })
    })
    .post((req, res) => {
        var id = req.params.id
        var name = req.body.name
        var surname = req.body.surname

        db.collection('data').updateOne({ _id: ObjectId(id) }, {
            $set: {
                name: name,
                surname: surname
            }
        }, (err, result) => {
            if (err) return res.send(err)
            res.redirect('/show')
            console.log('Atualizado no BD')
        })
    })

//DELETE

app.route('/delete/:id')
    .get((req, res) => {
        var id = req.params.id
        db.collection('data').deleteOne({ _id: ObjectId(id) }, (err, result) => {
            if (err) return res.send(500, err)
            console.log('Deletado do banco de Dados')
            res.redirect('/show')
        })
    })
app.get('/', (req, res) => {
    let cursor = bd.collection('data').find()
})


module.exports = app;