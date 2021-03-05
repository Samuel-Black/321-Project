const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded( { extended: true } ))

const connection = mysql.createPool({
    host: 'jumpstartdb.cqfqbotvheno.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'AsNCodfDG45vLHVZLX4f',
    database: 'Jump_Start',
    port: 3306
})

// function to add Authenticated user to Database or do nothing if already present; 
// UserName is unique and indexed in the Database to help speed up lookups however, 
// there may still be a better way of doing this, such as a custom lambda trigger after a user completes authentication
app.post('/api/verifyuser', (req, res) => { 
    const UserName = req.body.UserName      
    const sqlSelect = "INSERT INTO User (UserName) VALUES (?) ON DUPLICATE KEY UPDATE UserName = UserName;"
    connection.query(sqlSelect, [UserName], (err, result) => {
        res.send(result);
    })
})

app.post('/api/getplayers', (req, res) => {
    const UserName = req.body.UserName
    const sqlSelect = "SELECT NickName, ProfilePicture FROM Player JOIN User ON Player.UserName = User.UserName WHERE ? = Player.UserName;"
    connection.query(sqlSelect, [UserName], (err, result) => {
        res.send(result);
    })
})

app.post('/api/createplayer', (req, res) => {
    const UserName = req.body.UserName
    const nickname = req.body.nickname
    const birthday = req.body.birthday
    const sqlInsert = "INSERT INTO Player(NickName, Birthday, UserName) VALUES(?, Date(?), ?);"
    connection.query(sqlInsert, [nickname, birthday, UserName], (err, result) => {
        res.send(result);
    })
})

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT Player FROM Player JOIN User ON Player.UserName = User.UserName WHERE User.UserName = Player.UserName;"
    connection.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.listen(3001, () => {
    console.log("running on port 3001")
})
