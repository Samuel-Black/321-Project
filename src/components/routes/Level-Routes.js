import { Routes } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import { KickLevels, BalanceLevels, HopLevels, JumpLevels, LeapLevels, SlideLevels, RunLevels, ThrowLevels } from '../../components/Level-List'
import SkillNavigationPage from '../../pages/SkillNavigationPage';
import GameWrapper from '../Game-Wrapper';
import CardsGame from '../../pages/games/CardsGame';
import CardsGameZoom from '../../pages/games/CardGameZoom';
import HopArms from '../../pages/games/Hop-Arms';
import MixAndMatch from '../../pages/games/MixAndMatch';
import ThrowEyes from '../../pages/games/Throw-Eyes';
import { MaMBalanceArms, MaMJumpArms, MaMLeapLegs, MaMRunArms, MaMRunKnees, MaMHopLegs } from '../../components/images/MixAndMatchImages'
import { CardsBalanceEyes, CardsBalanceLegs, CardsHopEyes, CardsJumpFeet, CardsJumpKnees, CardsKickEyes, CardsKickFoot, CardsKickLegs, CardsLeapEyes, CardsRunEyes, CardsSlideFeet, CardsHopArms, } from '../../components/images/CardsGameImages'
import { HotSpotThrowEyes } from '../../components/images/ThrowEyesImages'
import BackButton from '../../components/Back-Button'
import AppRoute from './AuthenticatedRoute'

export default function LevelRoutes() {
    //vertical
    return( 
        <Routes>
            <AppRoute path="/" component={LevelNavIndex} isPrivate={true} requiresPlayer={true} />

                <AppRoute path="Kick/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Kick'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Kick/${KickLevels[0].to}`} component={GameWrapper} Game={CardsGame} gameType={KickLevels[0].gameType} gameInstructions={KickLevels[0].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsKickEyes} numLevels={KickLevels[0].numLevels} SkillName="Kick" GameName={KickLevels[0].name} />
                    <AppRoute path={`Kick/${KickLevels[1].to}`} component={GameWrapper} Game={CardsGame} gameType={KickLevels[1].gameType} gameInstructions={KickLevels[1].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsKickFoot} numLevels={KickLevels[1].numLevels} SkillName="Kick" GameName={KickLevels[1].name} />
                    <AppRoute path={`Kick/${KickLevels[2].to}`} component={GameWrapper} Game={CardsGameZoom} gameType={KickLevels[2].gameType} gameInstructions={KickLevels[2].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsKickLegs} numLevels={KickLevels[2].numLevels} SkillName="Kick" GameName={KickLevels[2].name} />

                <AppRoute path="Jump/" component={SkillNavigationPage} Levels={JumpLevels} SkillName={'Jump'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Jump/${JumpLevels[0].to}`} component={GameWrapper} Game={CardsGame} gameType={JumpLevels[0].gameType} gameInstructions={JumpLevels[0].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsJumpFeet} numLevels={JumpLevels[0].numLevels} SkillName="Jump" GameName={JumpLevels[0].name} />
                    <AppRoute path={`Jump/${JumpLevels[1].to}`} component={GameWrapper} Game={CardsGame} gameType={JumpLevels[1].gameType} gameInstructions={JumpLevels[1].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsJumpKnees} numLevels={JumpLevels[1].numLevels} SkillName="Jump" GameName={JumpLevels[1].name} />
                    <AppRoute path={`Jump/${JumpLevels[2].to}`} component={GameWrapper} Game={MixAndMatch} gameType={JumpLevels[2].gameType} gameInstructions={JumpLevels[2].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMJumpArms} numLevels={JumpLevels[2].numLevels} SkillName="Jump" GameName={JumpLevels[2].name} />

                <AppRoute path="Balance/" component={SkillNavigationPage} Levels={BalanceLevels} SkillName={'Balance'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Balance/${BalanceLevels[0].to}`} component={GameWrapper} Game={CardsGame} gameType={BalanceLevels[0].gameType} gameInstructions={BalanceLevels[0].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsBalanceEyes} numLevels={BalanceLevels[0].numLevels} SkillName="Balance" GameName={BalanceLevels[0].name} />
                    <AppRoute path={`Balance/${BalanceLevels[1].to}`} component={GameWrapper} Game={CardsGame} gameType={BalanceLevels[1].gameType} gameInstructions={BalanceLevels[1].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsBalanceLegs} numLevels={BalanceLevels[1].numLevels} SkillName="Balance" GameName={BalanceLevels[1].name} />
                    <AppRoute path={`Balance/${BalanceLevels[2].to}`} component={GameWrapper} Game={MixAndMatch} gameType={BalanceLevels[2].gameType} gameInstructions={BalanceLevels[2].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMBalanceArms} numLevels={BalanceLevels[2].numLevels} SkillName="Balance" GameName={BalanceLevels[2].name} />

                <AppRoute path="Run/" component={SkillNavigationPage} Levels={RunLevels} SkillName={'Run'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Run/${RunLevels[0].to}`} component={GameWrapper} Game={CardsGame} gameType={RunLevels[0].gameType} gameInstructions={RunLevels[0].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsRunEyes} numLevels={RunLevels[0].numLevels} SkillName="Run" GameName={RunLevels[0].name} />
                    <AppRoute path={`Run/${RunLevels[1].to}`} component={GameWrapper} Game={MixAndMatch} gameType={RunLevels[1].gameType} gameInstructions={RunLevels[1].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMRunArms} numLevels={RunLevels[1].numLevels} SkillName="Run" GameName={RunLevels[1].name} />
                    <AppRoute path={`Run/${RunLevels[2].to}`} component={GameWrapper} Game={MixAndMatch} gameType={RunLevels[2].gameType} gameInstructions={RunLevels[2].gameInstructions} vertical isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMRunKnees} numLevels={RunLevels[2].numLevels} SkillName="Run" GameName={RunLevels[2].name} />
                    
                <AppRoute path="Throw/" component={SkillNavigationPage} Levels={ThrowLevels} SkillName={'Throw'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Throw/${ThrowLevels[0].to}`} component={GameWrapper} Game={ThrowEyes} gameType={ThrowLevels[0].gameType} gameInstructions={ThrowLevels[0].gameInstructions} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={HotSpotThrowEyes} numLevels={ThrowLevels[0].numLevels} SkillName="Throw" GameName={ThrowLevels[0].name} /> 
            
                <AppRoute path="Hop/" component={SkillNavigationPage} Levels={HopLevels} SkillName={'Hop'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Hop/${HopLevels[0].to}`} component={GameWrapper} Game={CardsGame} gameType={HopLevels[0].gameType} gameInstructions={HopLevels[0].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsHopEyes} numLevels={HopLevels[0].numLevels} SkillName="Hop" GameName={HopLevels[0].name} />
                    <AppRoute path={`Hop/${HopLevels[1].to}`} component={GameWrapper} Game={MixAndMatch} gameType={HopLevels[1].gameType} gameInstructions={HopLevels[1].gameInstructions} vertical isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={MaMHopLegs} numLevels={HopLevels[1].numLevels} SkillName="Hop" GameName={HopLevels[1].name} />
                    <AppRoute path={`Hop/${HopLevels[2].to}`} component={GameWrapper} Game={HopArms} gameType={HopLevels[2].gameType} gameInstructions={HopLevels[2].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsHopArms} numLevels={HopLevels[2].numLevels} SkillName="Hop" GameName={HopLevels[2].name} />

                <AppRoute path="Catch/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Catch'} isPrivate={true} requiresPlayer={true} contentLocked={true} />

                <AppRoute path="Slide/" component={SkillNavigationPage} Levels={SlideLevels} SkillName={'Slide'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Slide/${SlideLevels[0].to}`} component={GameWrapper} Game={CardsGame} gameType={SlideLevels[0].gameType} gameInstructions={SlideLevels[0].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsSlideFeet} numLevels={SlideLevels[0].numLevels} SkillName="Slide" GameName={SlideLevels[0].name} />

                <AppRoute path="Underhand-Roll/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Underhand-Roll'} isPrivate={true} requiresPlayer={true} contentLocked={true} />

                <AppRoute path="Leap/" component={SkillNavigationPage} Levels={LeapLevels} SkillName={'Leap'} isPrivate={true} requiresPlayer={true} />
                    <AppRoute path={`Leap/${LeapLevels[0].to}`} component={GameWrapper} Game={CardsGame} gameType={LeapLevels[0].gameType} gameInstructions={LeapLevels[0].gameInstructions} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} shuffledImages={CardsLeapEyes} numLevels={LeapLevels[0].numLevels} SkillName="Leap" GameName={LeapLevels[0].name} />
                    <AppRoute path={`Leap/${LeapLevels[1].to}`} component={GameWrapper} Game={MixAndMatch} gameType={LeapLevels[1].gameType} gameInstructions={LeapLevels[1].gameInstructions} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMLeapLegs} numLevels={LeapLevels[1].numLevels} SkillName="Leap" GameName={LeapLevels[1].name} />

                <AppRoute path="Strike/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Strike'} isPrivate={true} requiresPlayer={true} contentLocked={true} />

                <AppRoute path="Gallop/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Gallop'} isPrivate={true} requiresPlayer={true} contentLocked={true} />
        </Routes>
    );

}
