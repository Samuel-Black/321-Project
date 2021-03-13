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

/*
// function to add Authenticated user to Database or do nothing if already present; 
// UserName is unique and indexed in the Database to help speed up lookups however, 
// there may still be a better way of doing this, such as a custom lambda trigger after a user completes authentication
app.post('/api/verifyuser', (req, res) => { 
    const UserName = req.body.UserName      
    const sqlSelect = "INSERT INTO Player (UserName) VALUES (?) ON DUPLICATE KEY UPDATE UserName = UserName;"
    connection.query(sqlSelect, [UserName], (err, result) => {
        res.send(result);
    })
})
*/

app.post('/api/insertlevel', (req, res) => {
    const SkillName = req.body.SkillName   
    const LevelNumber = req.body.LevelNumber   
    const UserName = req.body.UserName  
    const NickName = req.body.NickName       
    const sqlSelect = "INSERT INTO Level (SkillName, LevelNumber, UserName, NickName) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE SkillName = SkillName;"
    connection.query(sqlSelect, [SkillName, LevelNumber, UserName, NickName], (err, result) => {
        res.send(result);
        if(err !== null) {
            console.log(err);
        }
    })
})

app.post('/api/createattempt', (req, res) => {
    const GameName = req.body.GameName   
    const LevelNumber = req.body.LevelNumber   
    const UserName = req.body.UserName  
    const NickName = req.body.NickName
    const Succesful = req.body.Succesful  
    const TimeTaken = req.body.TimeTaken      
    const sqlSelect = "INSERT INTO Attempt (UserName, NickName, LevelNumber, GameName, Succesful, TimeTaken) VALUES (?,?,?,?,?,?);"
    connection.query(sqlSelect, [UserName, NickName, LevelNumber, GameName, Succesful, TimeTaken], (err, result) => {
        res.send(result);
        if(err !== null) {
            console.log(err);
        }
    })
})

app.post('/api/levelcomplete', (req, res) => {
    const SkillName = req.body.SkillName   
    const LevelNumber = req.body.LevelNumber   
    const UserName = req.body.UserName  
    const NickName = req.body.NickName       
    const sqlSelect = "UPDATE Level SET completed = 'True' WHERE UserName = ? AND NickName = ? AND SkillName = ? AND LevelNumber = ?;"
    connection.query(sqlSelect, [UserName, NickName, SkillName, LevelNumber], (err, result) => {
        res.send(result);
        if(err !== null) {
            console.log(err);
        }
    })
})

app.post('/api/getplayers', (req, res) => {
    const UserName = req.body.UserName
    const sqlSelect = "SELECT NickName, ProfilePicture FROM Player WHERE ? = Player.UserName;"
    connection.query(sqlSelect, [UserName], (err, result) => {
        res.send(result);
    })
})

app.post('/api/gettotalprogress', (req, res) => {
    const UserName = req.body.UserName
    const NickName = req.body.NickName
    const sqlSelect =   `SELECT Game.SkillName, COUNT(distinct LevelNumber) AS LevelsCompleted
                        FROM Attempt 
                        JOIN Game ON Attempt.GameName = Game.GameName
                        WHERE Attempt.UserName = ?
                        AND Attempt.NickName = ?
                        AND Attempt.Succesful = 'True'
                        GROUP BY Attempt.GameName, Game.SkillName;`
    connection.query(sqlSelect, [UserName, NickName], (err, result) => {
        res.send(result);
    })
})

app.post('/api/getlevelprogress', (req, res) => {
    const UserName = req.body.UserName
    const NickName = req.body.NickName
    const SkillName = req.body.SkillName
    const sqlSelect =   `SELECT Attempt.GameName, COUNT(distinct LevelNumber) AS LevelsCompleted
                        FROM Attempt 
                        JOIN Game ON Attempt.GameName = Game.GameName
                        WHERE Attempt.UserName = ?
                        AND Attempt.NickName = ?
                        AND Game.SkillName = ?
                        AND Attempt.Succesful = 'True'
                        GROUP BY Attempt.GameName, Game.SkillName;`
    connection.query(sqlSelect, [UserName, NickName, SkillName], (err, result) => {
        res.send(result);
    })
})

app.post('/api/createplayer', (req, res) => {
    const UserName = req.body.UserName
    const nickname = req.body.nickname
    const birthday = req.body.birthday
    const profilepicture = req.body.profileImage
    const sqlInsert = "INSERT INTO Player(UserName, NickName, ProfilePicture, BirthDay) VALUES(?, ?, ?, Date(?));"
    connection.query(sqlInsert, [UserName, nickname, profilepicture, birthday], (err, result) => {
        res.send(result);
    })
})

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT Player FROM Player WHERE User.UserName = Player.UserName;"
    connection.query(sqlSelect, (err, result) => {
        res.send(result);
    })
})

app.listen(3001, () => {
    console.log("running on port 3001")
})
