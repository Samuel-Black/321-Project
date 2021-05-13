/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded( { extended: true } ));

// establish connection to database
const connection = mysql.createPool({
    host: 'jumpstartdb.cqfqbotvheno.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'AsNCodfDG45vLHVZLX4f',
    database: 'Jump_Start',
    port: 3306
});

// when a level is completed insert the details into the DBMS
app.post('/api/createattempt', (req, res) => {
    const GameName = req.body.GameName;   
    const LevelNumber = req.body.LevelNumber;   
    const UserName = req.body.UserName;  
    const NickName = req.body.NickName;
    const Succesful = req.body.Succesful; 
    const TimeTaken = req.body.TimeTaken;   
    const sqlInsert = `INSERT INTO Attempt (UserName, NickName, BirthDay, LevelNumber, GameName, Succesful, TimeTaken)
                                            VALUES(
                                                    ?, 
                                                    ?, 
                                                    (SELECT BirthDay
                                                    FROM Player
                                                    WHERE Player.UserName = ?
                                                    AND Player.NickName = ?), 
                                                    ?, 
                                                    ?, 
                                                    ?, 
                                                    ?);`
    connection.query(sqlInsert, [UserName, NickName, UserName, NickName, LevelNumber, GameName, Succesful, TimeTaken], (err, result) => {
        res.send(result);
        if(err !== null) {
            console.log(err);
        }
    });
});

// when a level is completed but the user is played without an authenticated account insert the details into the DBMS
app.post('/api/createlocalattempt', (req, res) => {
    const GameName = req.body.GameName;   
    const LevelNumber = req.body.LevelNumber;   
    const NickName = req.body.NickName;
    const BirthDay = req.body.BirthDay;
    const Succesful = req.body.Succesful;  
    const TimeTaken = req.body.TimeTaken;      
    const sqlInsert = 'INSERT INTO Attempt (NickName, BirthDay, LevelNumber, GameName, Succesful, TimeTaken) VALUES(?, Date(?), ?, ?, ?, ?);'
    connection.query(sqlInsert, [NickName, BirthDay, LevelNumber, GameName, Succesful, TimeTaken], (err, result) => {
        res.send(result);
        if(err !== null) {
            console.log(err);
        }
    });
});

// get all players associated with an authenticated account
app.post('/api/getplayers', (req, res) => {
    const UserName = req.body.UserName;
    const sqlSelect = "SELECT NickName, ProfilePicture FROM Player WHERE ? = Player.UserName;"
    connection.query(sqlSelect, [UserName], (err, result) => {
        res.send(result);
    });
});

// get progress for a player for all skills
app.post('/api/gettotalprogress', (req, res) => {
    const UserName = req.body.UserName;
    const NickName = req.body.NickName;
    const sqlSelect =   `SELECT Game.SkillName, COUNT(distinct LevelNumber) AS LevelsCompleted
                        FROM Attempt 
                        JOIN Game ON Attempt.GameName = Game.GameName
                        WHERE Attempt.UserName = ?
                        AND Attempt.NickName = ?
                        AND Attempt.Succesful = 'True'
                        GROUP BY Attempt.GameName, Game.SkillName;`
    connection.query(sqlSelect, [UserName, NickName], (err, result) => {
        res.send(result);
    });
});

// get progress for a player for a particular skill
app.post('/api/getlevelprogress', (req, res) => {
    const UserName = req.body.UserName;
    const NickName = req.body.NickName;
    const SkillName = req.body.SkillName;
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
    });
});

// insert a created player into the DBMS for an authenticated user
app.post('/api/createplayer', (req, res) => {
    const UserName = req.body.UserName;
    const nickname = req.body.nickname;
    const birthday = req.body.birthday;
    const profilepicture = req.body.profileImage;
    const sqlInsert = "INSERT INTO Player(UserName, NickName, ProfilePicture, BirthDay) VALUES(?, ?, ?, Date(?));"
    connection.query(sqlInsert, [UserName, nickname, profilepicture, birthday], (err, result) => {
        res.send(result);
        if(err !== null) {
            console.log(err);
        }
    })
});
