import { Routes } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import { Skills, Levels } from '../../components/Level-List'
import SkillNavigationPage from '../../pages/SkillNavigationPage';
import GameWrapper from '../Game-Wrapper';
import CardsGame from '../../pages/games/CardsGame';
import CardsGameZoom from '../../pages/games/CardGameZoom';
import HopArms from '../../pages/games/Hop-Arms';
import MixAndMatch from '../../pages/games/MixAndMatch';
import ThrowEyes from '../../pages/games/Throw-Eyes';
import BackButton from '../../components/Back-Button'
import AppRoute from './AuthenticatedRoute'

export default function LevelRoutes() {

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
            return HopArms
        }
        return null;
    }

    return( 
        <Routes>
            <AppRoute path="/" component={LevelNavIndex} isPrivate={true} requiresPlayer={true} />

            {Skills.map((skill) => {
                return(
                    <AppRoute 
                        key={skill.name} 
                        path={`${skill.to}/`} 
                        component={SkillNavigationPage} 
                        Levels={skill.levels} 
                        SkillName={skill.name} 
                        isPrivate={true} 
                        requiresPlayer={true} 
                    />
                );
            })}

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
