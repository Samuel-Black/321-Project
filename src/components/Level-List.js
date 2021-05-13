/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { MonsterImages } from '../components/images/Monster-Images'
import { 
            BalanceArms, 
            JumpArms, 
            LeapLegs, 
            RunArms, 
            RunKnees, 
            HopLegs 
        } from './images/Mix-And-Match-Images'
import { 
            BalanceEyes, 
            BalanceLegs, 
            HopEyes, 
            JumpFeet, 
            JumpKnees, 
            KickEyes, 
            KickFoot, 
            KickLegs, 
            LeapEyes, 
            RunEyes, 
            SlideFeet, 
            HopArms, 
        } from './images/Cards-Game-Images'
import { ThrowEyes } from './images/Throw-Eyes-Images'

const importedImages = {
                        BalanceArms, 
                        JumpArms, 
                        LeapLegs, 
                        RunArms, 
                        RunKnees, 
                        HopLegs,
                        BalanceEyes, 
                        BalanceLegs, 
                        HopEyes, 
                        JumpFeet, 
                        JumpKnees, 
                        KickEyes, 
                        KickFoot, 
                        KickLegs, 
                        LeapEyes, 
                        RunEyes, 
                        SlideFeet, 
                        HopArms, 
                        ThrowEyes,
                    };

let gameClassName = "game"

export const Levels = [
    {
        id: 0,
        name: "Hop-Arms",
        to: "Hop-Arms", // used as the link for routes
        numLevels: 4,
        monster: MonsterImages[8].default, // monster image to displayed to user in the link
        gameType: 'HopArm', // type of the game, e.g. cards or Mix & Match
        skillName: 'Hop',
        gameDescription : "When hopping, you should keep both of you arms to your side and bend them up like you're holding a ball.",
        gameInstructions: "Select the card where Spike, Pod, Orbi, and Puff's arms are in the best position for them to hop!",
        gameSuccess: " where to keep your arms when hopping!",
        className: gameClassName,
        images: null,
    },
    {
        id: 1,
        name: "Kick-Eyes",
        to: "Kick-Eyes", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[8].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Kick',
        gameDescription : "You should always keep your eyes on the ball when kicking.",
        gameInstructions: "Select the card where Orbi is looking at the ball!",
        gameSuccess: " where to keep your eyes when kicking!",
        className: gameClassName,
        images: null,
    },  
    {
        id: 2,
        name: "Kick-Foot",
        to: "Kick-Foot", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[8].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Kick',
        gameDescription : "When passing the ball to a friend you should use the inside of your foot.",
        gameInstructions: 'Select the card that shows the best spot on your foot when kicking a ball!',
        gameSuccess: " where to keep your feet when kicking!",
        className: gameClassName,
        images: null,
    },   
    {
        id: 3,
        name: "Kick-Legs",
        to: "Kick-Legs", // used as the link for routes
        numLevels: 6,
        monster: MonsterImages[8].default, // monster image to displayed to user in the link
        gameType: 'CardsZoom', // type of the game, e.g. cards or Mix & Match
        skillName: 'Kick',
        gameDescription : "Before you kick a ball you should make sure It's lined up with your other foot.",
        gameInstructions: "Select the card where Orbi is in the proper position to kick the ball!",
        gameSuccess: " where to keep your legs when kicking!",
        className: gameClassName,
        images: null,
    },
    {
        id: 4,
        name: "Balance-Eyes",
        to: "Balance-Eyes", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[8].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Balance',
        gameDescription : 'When trying to hold your balance, you should always look straight ahead.',
        gameInstructions: "Select the card where Orbi's eyes are in the best position for her to hold her balance!",
        gameSuccess: " where to keep your eyes when balancing!",
        className: gameClassName,
        images: null,
    },     
    {
        id: 5,
        name: "Balance-Legs",
        to: "Balance-Legs", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[5].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Balance',
        gameDescription : 'When trying to hold your balance on one leg, you should have your other leg behind you and slightly bent at the knee.',
        gameInstructions: "Select the card where Puff's legs are in the best position for him to hold his balance!",
        gameSuccess: " where to keep your legs when balancing!",
        className: gameClassName,
        images: null,
    },   
    {
        id: 6,
        name: "Hop-Eyes",
        to: "Hop-Eyes", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[2].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Hop',
        gameDescription : 'When hopping, you should always look straight ahead to help keep your balance.',
        gameInstructions: "Select the card where Spike's eyes are in the best position for him to balance while hopping!",
        gameSuccess: " where to keep your eyes when hopping!",
        className: gameClassName,
        images: null,
    },   
    {
        id: 7,
        name: "Jump-Feet",
        to: "Jump-Feet", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[8].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Jump',
        gameDescription : "When jumping, you should make sure that both of your feet are touching the ground.",
        gameInstructions: "Select the card where Orbi's feet are in the best position for her to jump!",
        gameSuccess: " where to keep your feet when jumping!",
        className: gameClassName,
        images: null,
    },     
    {
        id: 8,
        name: "Jump-Knees",
        to: "Jump-Knees", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[2].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Jump',
        gameDescription : "When jumping, you should bend your knees. But don't go down too far!",
        gameInstructions: "Select the card where Spike's knees are in the best position for him to jump!",
        gameSuccess: " where to keep your knees when jumping!",
        className: gameClassName,
        images: null,
    },  
    {
        id: 9,
        name: "Leap-Eyes",
        to: "Leap-Eyes", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[4].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Leap',
        gameDescription : "When leaping, you should always look where you're going.",
        gameInstructions: "Select the card where Grunt's eye is in the best position for him to leap!",
        gameSuccess: " where to keep your eyes when leaping!",
        className: gameClassName,
        images: null,
    },   
    {
        id: 10,
        name: "Slide-Feet",
        to: "Slide-Feet", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[9].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Slide',
        gameDescription : "When sliding, your leading foot should be flat on the ground, and your other foot should be sliding on it's tip-toes.",
        gameInstructions: "Select the card where Grunt's feet are in the best position for him to slide!",
        gameSuccess: " where to keep your feet when sliding!",
        className: gameClassName,
        images: null,
    },  
    {
        id: 11,
        name: "Run-Eyes",
        to: "Run-Eyes", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[2].default, // monster image to displayed to user in the link
        gameType: 'Cards', // type of the game, e.g. cards or Mix & Match
        skillName: 'Run',
        gameDescription : "When running, you should always look where you're going.",
        gameInstructions: "Select the card where Spike's eyes are in the best position for him to run!",
        gameSuccess: " where to keep your eyes when running!",
        className: gameClassName,
        images: null,
    },      
    {
        id: 12,
        name: "Balance-Arms",
        to: "Balance-Arms", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[9].default, // monster image to displayed to user in the link
        gameType: 'Mix & Match', // type of the game, e.g. cards or Mix & Match
        skillName: 'Balance',
        gameDescription : 'When trying to hold your balance, you should keep your arms out and hold them straight.',
        gameInstructions: [
                            "Select the card where Orbi's arms are in the best position for him to hold his balance!", 
                            "Drag the sliders to match the cards where Orbi's arms are in the best position for him to hold his balance!",
                        ],
        gameSuccess: " where to keep your arms when balancing!",
        className: gameClassName,
        images: null,
        vertical: false, // used for Mix & Match games, whether or not matching the 2 or three card parts is done horizontally or vertically
    },    
    {
        id: 13,
        name: "Hop-Legs",
        to: "Hop-Legs", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[6].default, // monster image to displayed to user in the link
        gameType: 'Mix & Match', // type of the game, e.g. cards or Mix & Match
        skillName: 'Hop', 
        gameDescription : 'When hopping, you should keep one leg behind you and slightly bent at the knee.',
        gameInstructions: [
                            "Select the card where Puff's legs are in the best position for him to hop!", 
                            "Drag the sliders to match the cards where Puff's legs are in the best position for him to hop!",
                        ],
        gameSuccess: " where to keep your legs when hopping!",
        className: gameClassName,
        images: null,
        vertical: true, // used for Mix & Match games, whether or not matching the 2 or three card parts is done horizontally or vertically
    },   
    {
        id: 14,
        name: "Jump-Arms",
        to: "Jump-Arms", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[2].default, // monster image to displayed to user in the link
        gameType: 'Mix & Match', // type of the game, e.g. cards or Mix & Match
        skillName: 'Jump',
        gameDescription : "When jumping, you should swing your arms back and slightly bend your elbows",
        gameInstructions: [
                            "Select the card where Spike's arms are in the best position for him to jump!", 
                            "Drag the sliders to match the cards where Spike's arms are in the best position for him to jump!",
                        ],
        gameSuccess: " where to keep your arms when jumping!",
        className: gameClassName,
        images: null,
        vertical: false, // used for Mix & Match games, whether or not matching the 2 or three card parts is done horizontally or vertically
    },
    {
        id: 15,
        name: "Leap-Legs",
        to: "Leap-Legs", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[10].default, // monster image to displayed to user in the link
        gameType: 'Mix & Match', // type of the game, e.g. cards or Mix & Match
        skillName: 'Leap',
        gameDescription : "When leaping, your front and back leg should be spread apart and slightly bent at the knee.",
        gameInstructions: [
                            "Select the card where Peanut's legs are in the best position for her to leap!",
                            "Drag the sliders to match the cards where Peanut's legs are in the best position for her to leap!",
                        ],
        gameSuccess: " where to keep your legs when leaping!",
        className: gameClassName,
        images: null,
        vertical: false, // used for Mix & Match games, whether or not matching the 2 or three card parts is done horizontally or vertically
    },      
    {
        id: 16,
        name: "Run-Arms",
        to: "Run-Arms", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[6].default, // monster image to displayed to user in the link
        gameType: 'Mix & Match', // type of the game, e.g. cards or Mix & Match
        skillName: 'Run',
        gameDescription : "When running, you should have both arms bent up to your sides, one arm swings forward, while the other swings back.",
        gameInstructions: [
                            "Select the card where Puff's arms are in the best position for him to run!",
                            "Drag the sliders to match the cards where Puff's arms are in the best position for him to run!",
                        ],
        gameSuccess: " where to keep your arms when running!",
        className: gameClassName,
        images: null,
        vertical: false, // used for Mix & Match games, whether or not matching the 2 or three card parts is done horizontally or vertically
    },     
    {
        id: 17,
        name: "Run-Knees",
        to: "Run-Knees", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[9].default, // monster image to displayed to user in the link
        gameType: 'Mix & Match', // type of the game, e.g. cards or Mix & Match
        skillName: 'Run',
        gameDescription : "When running, you should always have one foot on the ground slightly bent at the knee, and the other behind your front foot bent up into the air.",
        gameInstructions: [
                            "Select the card where Pod's knees are in the best position for him to run!",
                            "Drag the sliders to match the cards where Pod's knees are in the best position for him to run!",
                        ],
        gameSuccess: " where to keep your knees when running!", 
        className: gameClassName,
        images: null,
        vertical: true, // used for Mix & Match games, whether or not matching the 2 or three card parts is done horizontally or vertically
    },
    {
        id: 18,
        name: "Throw-Eyes",
        to: "Throw-Eyes", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[4].default, // monster image to displayed to user in the link
        gameType: 'Targets', // type of the game, e.g. cards or Mix & Match
        skillName: 'Throw', 
        gameDescription : "When throwing something, you should always look where you want to throw.",
        gameInstructions: "Select the target that Grunt is looking at!", 
        gameSuccess: " where to keep your eyes when throwing!",
        className: gameClassName,
        images: null, 
    }
];

export const Skills = [
    {
        id: 1,
        name: "Kick",
        to: "Kick", // used as the link for routes
        numLevels: 10, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[8].default, // monster image to displayed to user in the link
        className: gameClassName
    },     
    {
        id: 2,
        name: "Jump",
        to: "Jump", // used as the link for routes
        numLevels: 7, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[2].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 3,
        name: "Balance",
        to: "Balance", // used as the link for routes
        numLevels: 6, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[5].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 4,
        name: "Run",
        to: "Run", // used as the link for routes
        numLevels: 7, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[2].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 5,
        name: "Throw",
        to: "Throw", // used as the link for routes
        numLevels: 3, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[4].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 6,
        name: "Hop",
        to: "Hop", // used as the link for routes
        numLevels: 10, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[6].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 7,
        name: "Catch",
        to: "Catch", // used as the link for routes
        numLevels: 3, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[3].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 8,
        name: "Slide",
        to: "Slide", // used as the link for routes
        numLevels: 2, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[9].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 9,
        name: "Underhand-Roll",
        to: "Underhand-Roll", // used as the link for routes
        numLevels: 3, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[8].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 10,
        name: "Leap",
        to: "Leap", // used as the link for routes
        numLevels: 4, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[10].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 11,
        name: "Strike",
        to: "Strike", // used as the link for routes
        numLevels: 3, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[10].default, // monster image to displayed to user in the link
        className: gameClassName
    },   
    {
        id: 12,
        name: "Gallop",
        to: "Gallop", // used as the link for routes
        numLevels: 3, // number of games for a skill
        levels: [  ], // populated on App.js component mount from Levels
        monster: MonsterImages[0].default, // monster image to displayed to user in the link
        className: gameClassName
    }  
];

// add levels to the skills list in their respective skill and their required images, e.g. put the required images in kick-legs then put the kick-legs level inside the kick skill
export function setLevels() {
    for(let i = 0; i < Levels.length; i++) {
        
        let split = Levels[i].name.split('-');
        const importName = split[0] + split[1]; 
        Levels[i].images = importedImages[importName];

        for(let j = 0; j < Skills.length; j++) {
            if(Skills[j].name === Levels[i].skillName) {
                if(!Skills[j].levels.includes(Levels[i])) {
                    Skills[j].levels.push(Levels[i])
                }
            }
        }
    }
}
