/*
Author: Samuel Black
https://github.com/Samuel-Black
*/

import { Routes } from 'react-router-dom';
import SkillNavigationIndex from '../../pages/Skill-Navigation-Page';
import { Skills, Levels } from '../../components/Level-List';
import GameNavigationPage from '../../pages/Game-Navigation-Wrapper';
import GameWrapper from '../Game-Wrapper';
import CardsGame from '../../pages/games/Cards-Game';
import CardsGameZoom from '../../pages/games/Card-Game-Zoom';
import HopArms from '../../pages/games/Hop-Arms';
import MixAndMatch from '../../pages/games/Mix-And-Match';
import ThrowEyes from '../../pages/games/Throw-Eyes';
import BackButton from '../../components/Back-Button';
import AppRoute from './Authenticated-Route';

export default function LevelRoutes() {

    // return the game type for creating Routes in a map
    function getGameType(gameType) {
        if(gameType === 'Cards') {
            return CardsGame;
        }
        if (gameType === 'Mix & Match') {
            return MixAndMatch;
        }
        if (gameType === 'CardsZoom') {
            return CardsGameZoom;
        }
        if(gameType === 'Targets') {
            return ThrowEyes;
        }
        if(gameType === 'HopArm') {
            return HopArms;
        }
        return null;
    }

    return( 
        <Routes>
            {/* default route */}
            <AppRoute path="/" component={SkillNavigationIndex} isPrivate={true} requiresPlayer={true} />

            {/* map skills to Routes e.g. Kick, Throw, Hop etc.*/}
            {Skills.map((skill) => {
                return(
                    <AppRoute 
                        key={skill.name} 
                        path={`${skill.to}/`} 
                        component={GameNavigationPage} 
                        Levels={skill.levels} 
                        SkillName={skill.name} 
                        isPrivate={true} 
                        requiresPlayer={true} 
                    />
                );
            })}

            {/* map levels to Routes e.g. Kick-Legs, Hop-Arms, Balance-Arms, Throw-Eyes etc.*/}
            {Levels.map((level) => {
                return(
                    <AppRoute 
                        key={level.skillName}
                        path={`${level.skillName}/${level.to}`} 
                        component={GameWrapper} 
                        Game={getGameType(level.gameType)} 
                        vertical={level.gameType === 'Mix & Match' ? level.vertical : ''} 
                        gameType={level.gameType} 
                        gameDescription={level.gameDescription} 
                        gameInstructions={level.gameInstructions} 
                        gameSuccess={level.gameSuccess} 
                        isPrivate={true} requiresPlayer={true} 
                        backButton={<BackButton />} 
                        shuffledImages={level.images} 
                        numLevels={level.numLevels} 
                        SkillName={level.skillName} 
                        GameName={level.name} 
                    />
                );
            })}

        </Routes>
    );

}
