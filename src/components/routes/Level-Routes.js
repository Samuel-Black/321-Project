import { Routes } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import { KickLevels, BalanceLevels, HopLevels, JumpLevels, LeapLevels, SlideLevels, RunLevels, ThrowLevels } from '../../components/Level-List'
import SkillNavigationPage from '../../pages/SkillNavigationPage';
import Game1 from '../../pages/games/Game1';
import CardsGame from '../../pages/games/CardsGame';
import MixAndMatch from '../../pages/games/MixAndMatch';
import ThrowEyes from '../../pages/games/Throw-Eyes';
import { MaMBalanceArms, MaMJumpArms, MaMLeapLegs, MaMRunArms, MaMRunKnees, MaMHopLegs } from '../../components/images/MixAndMatchImages'
import { CardsBalanceEyes, CardsBalanceLegs, CardsHopEyes, CardsJumpFeet, CardsJumpKnees, CardsKickEyes, CardsKickFoot, CardsKickLegs, CardsLeapEyes, CardsRunEyes, CardsSlideFeet, } from '../../components/images/CardsGameImages'
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
                    <AppRoute path={`Kick/${KickLevels[0].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsKickEyes} numLevels={KickLevels[0].numLevels} SkillName="Kick" GameName={KickLevels[0].name} />
                    <AppRoute path={`Kick/${KickLevels[1].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsKickFoot} numLevels={KickLevels[1].numLevels} SkillName="Kick" GameName={KickLevels[1].name} />
                    <AppRoute path={`Kick/${KickLevels[2].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsKickLegs} numLevels={KickLevels[2].numLevels} SkillName="Kick" GameName={KickLevels[2].name} />

                <AppRoute path="Jump/" component={SkillNavigationPage} Levels={JumpLevels} SkillName={'Jump'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path={`Jump/${JumpLevels[2].to}`} component={MixAndMatch} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMJumpArms} numLevels={JumpLevels[2].numLevels} SkillName="Jump" GameName={JumpLevels[2].name} />
                    </DndProvider>
                    <AppRoute path={`Jump/${JumpLevels[0].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsJumpFeet} numLevels={JumpLevels[0].numLevels} SkillName="Jump" GameName={JumpLevels[0].name} />
                    <AppRoute path={`Jump/${JumpLevels[1].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsJumpKnees} numLevels={JumpLevels[1].numLevels} SkillName="Jump" GameName={JumpLevels[1].name} />

                <AppRoute path="Balance/" component={SkillNavigationPage} Levels={BalanceLevels} SkillName={'Balance'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path={`Balance/${BalanceLevels[2].to}`} component={MixAndMatch} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMBalanceArms} SkillName="Balance" GameName={BalanceLevels[2].name} />
                    </DndProvider>
                    <AppRoute path={`Balance/${BalanceLevels[0].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsBalanceEyes} numLevels={BalanceLevels[0].numLevels} SkillName="Balance" GameName={BalanceLevels[0].name} />
                    <AppRoute path={`Balance/${BalanceLevels[1].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsBalanceLegs} numLevels={BalanceLevels[1].numLevels} SkillName="Balance" GameName={BalanceLevels[1].name} />

                <AppRoute path="Run/" component={SkillNavigationPage} Levels={RunLevels} SkillName={'Run'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path={`Run/${RunLevels[1].to}`} component={MixAndMatch} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMRunArms} SkillName="Run" GameName={RunLevels[1].name} />
                    </DndProvider>
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path={`Run/${RunLevels[2].to}`} component={MixAndMatch} vertical isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMRunKnees} SkillName="Run" GameName={RunLevels[2].name} />
                    </DndProvider>
                    <AppRoute path={`Run/${RunLevels[0].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsRunEyes} numLevels={RunLevels[0].numLevels} SkillName="Run" GameName={RunLevels[0].name} />
                    
                <AppRoute path="Throw/" component={SkillNavigationPage} Levels={ThrowLevels} SkillName={'Throw'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Throw/${ThrowLevels[0].to}`} component={ThrowEyes} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={HotSpotThrowEyes} SkillName="Throw" GameName={ThrowLevels[0].name} /> 
            
                <AppRoute path="Hop/" component={SkillNavigationPage} Levels={HopLevels} SkillName={'Hop'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path={`Hop/${HopLevels[1].to}`} component={MixAndMatch} vertical isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMHopLegs} numLevels={HopLevels[1].numLevels} SkillName="Hop" GameName={HopLevels[1].name} />
                    </DndProvider>
                    <AppRoute path={`Hop/${HopLevels[0].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsHopEyes} numLevels={HopLevels[0].numLevels} SkillName="Hop" GameName={HopLevels[0].name} />

                <AppRoute path="Catch/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Catch'} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Slide/" component={SkillNavigationPage} Levels={SlideLevels} SkillName={'Slide'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Slide/${SlideLevels[0].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsSlideFeet} numLevels={SlideLevels[0].numLevels} SkillName="Slide" GameName={SlideLevels[0].name} />

                <AppRoute path="Underhand-Roll/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Underhand-Roll'} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Leap/" component={SkillNavigationPage} Levels={LeapLevels} SkillName={'Leap'} isPrivate={true} requiresPlayer={true} />
                    <DndProvider backend={HTML5Backend}>
                        <AppRoute path={`Leap/${LeapLevels[1].to}`} component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMLeapLegs} numLevels={LeapLevels[1].numLevels} SkillName="Leap" GameName={LeapLevels[1].name} />
                    </DndProvider>
                    <AppRoute path={`Leap/${LeapLevels[0].to}`} component={CardsGame} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsLeapEyes} numLevels={LeapLevels[0].numLevels} SkillName="Leap" GameName={LeapLevels[0].name} />

                <AppRoute path="Strike/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Strike'} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Gallop/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Gallop'} isPrivate={true} requiresPlayer={true} />
        </Routes>
    );

}
