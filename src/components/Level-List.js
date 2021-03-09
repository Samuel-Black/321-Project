import { MonsterImages } from '../components/images/Monster-Images'

let gameClassName = "game";

export const Levels = [
    {
        id: 1,
        name: "Kick",
        to: "Kick", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[0].default,
        className: gameClassName
    },     
    {
        id: 2,
        name: "Jump",
        to: "Jump", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[1].default,
        className: gameClassName
    },   
    {
        id: 3,
        name: "Balance",
        to: "Balance", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[2].default,
        className: gameClassName
    },   
    {
        id: 4,
        name: "Run",
        to: "Run", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[3].default,
        className: gameClassName
    },   
    {
        id: 5,
        name: "Throw",
        to: "Throw", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[4].default,
        className: gameClassName
    },   
    {
        id: 6,
        name: "Hop",
        to: "Hop", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[5].default,
        className: gameClassName
    },   
    {
        id: 7,
        name: "Catch",
        to: "Catch", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[6].default,
        className: gameClassName
    },   
    {
        id: 8,
        name: "Slide",
        to: "Slide", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[7].default,
        className: gameClassName
    },   
    {
        id: 9,
        name: "Underhand-Roll",
        to: "Underhand-Roll", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[0].default,
        className: gameClassName
    },   
    {
        id: 10,
        name: "Leap",
        to: "Leap", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[1].default,
        className: gameClassName
    },   
    {
        id: 11,
        name: "Strike",
        to: "Strike", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[2].default,
        className: gameClassName
    },   
    {
        id: 12,
        name: "Gallop",
        to: "Gallop", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[3].default,
        className: gameClassName
    }  
];

export default {
    Levels
}
