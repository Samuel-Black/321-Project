import { Routes } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import { KickLevels, BalanceLevels, HopLevels, JumpLevels, LeapLevels, SlideLevels, RunLevels, ThrowLevels } from '../../components/Level-List'
import SkillNavigationPage from '../../pages/SkillNavigationPage';
import Game1 from '../../pages/games/Game1';
import CardsGame from '../../pages/games/CardsGame';
import MixAndMatch from '../../pages/games/MixAndMatch';
import ThrowEyes from '../../pages/games/Throw-Eyes';
import { MaMBalanceArms, MaMJumpArms, MaMLeapLegs, MaMRunArms, MaMRunKnees, MaMHopLegs } from '../../components/images/MixAndMatchImages'
import { CardsBalanceEyes } from '../../components/images/CardsGameImages'
import { HotSpotThrowEyes } from '../../components/images/ThrowEyesImages'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BackButton from '../../components/Back-Button'
import AppRoute from './AuthenticatedRoute'

export default function LevelRoutes() {
    //vertical
    return( 
        <Routes>
            <AppRoute path="/" component={LevelNavIndex} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Kick/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Kick'} isPrivate={true} requiresPlayer={true} />
            
                <AppRoute path="Jump/" component={SkillNavigationPage} Levels={JumpLevels} SkillName={'Jump'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path="Jump/Jump-Arms" component={MixAndMatch} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMJumpArms} />
                    </DndProvider>

                <AppRoute path="Balance/" component={SkillNavigationPage} Levels={BalanceLevels} SkillName={'Balance'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path="Balance/Balance-Arms" component={MixAndMatch} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMBalanceArms} />
                    </DndProvider>
                    <AppRoute path={`Balance/${BalanceLevels[0].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsBalanceEyes} numLevels={BalanceLevels[0].numLevels} />

                <AppRoute path="Run/" component={SkillNavigationPage} Levels={RunLevels} SkillName={'Run'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path="Run/Run-Arms" component={MixAndMatch} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMRunArms} />
                    </DndProvider>
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path="Run/Run-Knees" component={MixAndMatch} vertical isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMRunKnees} />
                    </DndProvider>
                    
                <AppRoute path="Throw/" component={SkillNavigationPage} Levels={ThrowLevels} SkillName={'Throw'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path="Throw/Throw-Eyes" component={ThrowEyes} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={HotSpotThrowEyes} SkillName="Throw" GameName="Throw-Eyes" /> 
            
                <AppRoute path="Hop/" component={SkillNavigationPage} Levels={HopLevels} SkillName={'Hop'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path="Hop/Hop-Legs" component={MixAndMatch} vertical isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMHopLegs} />
                    </DndProvider>

                <AppRoute path="Catch/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Catch'} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Slide/" component={SkillNavigationPage} Levels={SlideLevels} SkillName={'Slide'} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Underhand-Roll/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Underhand-Roll'} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Leap/" component={SkillNavigationPage} Levels={LeapLevels} SkillName={'Leap'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path="Leap/Leag-Legs" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMLeapLegs} />
                    </DndProvider>

                <AppRoute path="Strike/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Strike'} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Gallop/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Gallop'} isPrivate={true} requiresPlayer={true} />
        </Routes>
    );

}

/*  bug with importing these images for some reason
    <DndProvider backend={HTML5Backend}>
        <AppRoute path="Hop/Hop-Legs" component={MixAndMatch} vertical isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMHopLegs} />
    </DndProvider>
    */
