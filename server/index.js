const express = require('express')
const app = express()
const mysql = require('mysql')

//app.use(express.json());

const db = mysql.createPool({
    host: 'jumpstartdb.cqfqbotvheno.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'AsNCodfDG45vLHVZLX4f',
    database: 'Jump_Start'
})

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT Player FROM Player JOIN User ON Player.UserName = User.UserName WHERE User.Username = Player.UserName;"
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.post("/api/insert", (req, res) => {
    const sqlInsert = "SELECT Player FROM Player JOIN User ON Player.UserName = User.UserName WHERE User.Username = Player.UserName;"
    db.query(sqlSelect, (err, result) => {

    })
})


app.listen(3001, () => {
    console.log("running on port 3001")
})