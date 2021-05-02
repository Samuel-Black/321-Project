import { MonsterImages } from '../components/images/Monster-Images'

let gameClassName = "game"

export const Levels = [
    {
        id: 1,
        name: "Kick",
        to: "Kick", // used as the link for routes
        numLevels: 10,
        monster: MonsterImages[0].default,
        className: gameClassName
    },     
    {
        id: 2,
        name: "Jump",
        to: "Jump", // used as the link for routes
        numLevels: 7,
        monster: MonsterImages[1].default,
        className: gameClassName
    },   
    {
        id: 3,
        name: "Balance",
        to: "Balance", // used as the link for routes
        numLevels: 6,
        monster: MonsterImages[5].default,
        className: gameClassName
    },   
    {
        id: 4,
        name: "Run",
        to: "Run", // used as the link for routes
        numLevels: 7,
        monster: MonsterImages[2].default,
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
        numLevels: 10,
        monster: MonsterImages[0].default,
        className: gameClassName
    },   
    {
        id: 7,
        name: "Catch",
        to: "Catch", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[3].default,
        className: gameClassName
    },   
    {
        id: 8,
        name: "Slide",
        to: "Slide", // used as the link for routes
        numLevels: 7,
        monster: MonsterImages[6].default,
        className: gameClassName
    },   
    {
        id: 9,
        name: "Underhand-Roll",
        to: "Underhand-Roll", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[8].default,
        className: gameClassName
    },   
    {
        id: 10,
        name: "Leap",
        to: "Leap", // used as the link for routes
        numLevels: 4,
        monster: MonsterImages[9].default,
        className: gameClassName
    },   
    {
        id: 11,
        name: "Strike",
        to: "Strike", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[10].default,
        className: gameClassName
    },   
    {
        id: 12,
        name: "Gallop",
        to: "Gallop", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[0].default,
        className: gameClassName
    }  
];

export const KickLevels = [
    {
        id: 1,
        name: "Kick-Eyes",
        to: "Kick-Eyes", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[0].default,
        gameType: 'Cards',
        gameInstructions: 'Select the card where Orbi is looking at the ball!',
        className: gameClassName
    },     
    {
        id: 2,
        name: "Kick-Foot",
        to: "Kick-Foot", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[1].default,
        gameType: 'Cards',
        gameInstructions: 'Select the card that shows the best spot on your foot to use to kick a ball!',
        className: gameClassName
    },   
    {
        id: 3,
        name: "Kick-Legs",
        to: "Kick-Legs", // used as the link for routes
        numLevels: 6,
        monster: MonsterImages[5].default,
        gameType: 'Cards',
        gameInstructions: 'Select the card where Orbi is in the proper position to kick the ball!',
        className: gameClassName
    }
];

export const BalanceLevels = [
    {
        id: 1,
        name: "Balance-Eyes",
        to: "Balance-Eyes", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[0].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Orbi's eyes are in the best position for her to hold her balance!",
        className: gameClassName
    },     
    {
        id: 2,
        name: "Balance-Legs",
        to: "Balance-Legs", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[1].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Puff's legs are in the best position for him to hold his balance!",
        className: gameClassName
    },   
    {
        id: 3,
        name: "Balance-Arms",
        to: "Balance-Arms", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[5].default,
        gameType: 'Mix & Match',
        gameInstructions: [
                            "Select the card where Orbi's arms are in the best position for him to hold his balance!", 
                            "Drag the sliders to match the cards where Orbi's arms are in the best position for him to hold his balance!",
                        ],
        className: gameClassName
    }
];

export const HopLevels = [
    {
        id: 1,
        name: "Hop-Eyes",
        to: "Hop-Eyes", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[0].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Spike's eyes are in the best position for him to balance while hopping!",
        className: gameClassName
    },     
    {
        id: 2,
        name: "Hop-Legs",
        to: "Hop-Legs", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[1].default,
        gameType: 'Mix & Match',
        gameInstructions: [
                            "Select the card where Puff's legs are in the best position for him to hop!", 
                            "Drag the sliders to match the cards where Puff's legs are in the best position for him to hop!",
                        ],
        className: gameClassName
    },     
    {
        id: 3,
        name: "Hop-Arms",
        to: "Hop-Arms", // used as the link for routes
        numLevels: 4,
        monster: MonsterImages[1].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Spike, bowling-ball, Orbi, and Puff's arms are in the best position for them to hop!",
        className: gameClassName
    }
];

export const JumpLevels = [
    {
        id: 1,
        name: "Jump-Feet",
        to: "Jump-Feet", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[0].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Orbi's feet are in the best position for her to jump!",
        className: gameClassName
    },     
    {
        id: 2,
        name: "Jump-Knees",
        to: "Jump-Knees", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[1].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Spike's knees are in the best position for him to jump!",
        className: gameClassName
    },     
    {
        id: 3,
        name: "Jump-Arms",
        to: "Jump-Arms", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[1].default,
        gameType: 'Mix & Match',
        gameInstructions: [
                            "Select the card where Spike's arms are in the best position for him to jump!", 
                            "Drag the sliders to match the cards where Spike's arms are in the best position for him to jump!",
                        ],
        className: gameClassName
    }
];

export const LeapLevels = [
    {
        id: 1,
        name: "Leap-Eyes",
        to: "Leap-Eyes", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[0].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Blocky's eye is in the best position for him to leap!",
        className: gameClassName
    },     
    {
        id: 2,
        name: "Leap-Legs",
        to: "Leap-Legs", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[1].default,
        gameType: 'Mix & Match',
        gameInstructions: [
                            "Select the card where Mrs Doubtfire's legs are in the best position for her to leap!",
                            "Drag the sliders to match the cards where Mrs Doubtfire's legs are in the best position for her to leap!",
                        ],
        className: gameClassName
    }
];

export const SlideLevels = [
    {
        id: 1,
        name: "Slide-Feet",
        to: "Slide-Feet", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[0].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Blocky's feet are in the best position for him to slide!",
        className: gameClassName
    },     
    {
        id: 2,
        name: "Slide-Eyes",
        to: "Slide-Eyes", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[1].default,
        className: gameClassName
    },     
    {
        id: 3,
        name: "Slide-HipsShoulders",
        to: "Slide-HipsShoulders", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[1].default,
        className: gameClassName
    }
];

export const RunLevels = [
    {
        id: 1,
        name: "Run-Eyes",
        to: "Run-Eyes", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[0].default,
        gameType: 'Cards',
        gameInstructions: "Select the card where Spike's eyes are in the best position for him to run!",
        className: gameClassName
    },     
    {
        id: 2,
        name: "Run-Arms",
        to: "Run-Arms", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[1].default,
        gameType: 'Mix & Match',
        gameInstructions: [
                            "Select the card where Puff's arms are in the best position for him to run!",
                            "Drag the sliders to match the cards where Puff's arms are in the best position for him to run!",
                        ],
        className: gameClassName
    },     
    {
        id: 3,
        name: "Run-Knees",
        to: "Run-Knees", // used as the link for routes
        numLevels: 2,
        monster: MonsterImages[1].default,
        gameType: 'Mix & Match',
        gameInstructions: [
                            "Select the card where Pod's knees are in the best position for him to run!",
                            "Drag the sliders to match the cards where Pod's knees are in the best position for him to run!",
                        ],
        className: gameClassName
    }
];

export const ThrowLevels = [
    {
        id: 1,
        name: "Throw-Eyes",
        to: "Throw-Eyes", // used as the link for routes
        numLevels: 3,
        monster: MonsterImages[0].default,
        gameType: 'Targets',
        gameInstructions: "Select the target that Purple is looking at!",
        className: gameClassName    
    }
];

export const StrikeLevels = [
    {
        
    }
];

export const CatchLevels = [
    {

    }
];

export const GallopLevels = [
    {
        
    }
];

export const UnderhandRollLevels = [
    {
        
    }
];

/*
export {
    Levels,
    KickLevels,
    BalanceLevels,
    HopLevels,
    JumpLevels,
    LeapLevels,
    SlideLevels,
    RunLevels,
    ThrowLevels,
    StrikeLevels,
    CatchLevels,
    GallopLevels,
    UnderhandRollLevels
}
*/