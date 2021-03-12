import { Routes } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import { KickLevels, BalanceLevels, HopLevels, JumpLevels, LeapLevels, SlideLevels, RunLevels, ThrowLevels } from '../../components/Level-List'
import SkillNavigationPage from '../../pages/SkillNavigationPage';
import Game1 from '../../pages/games/Game1';
import MixAndMatch from '../../pages/games/MixAndMatch';
import ThrowEyes from '../../pages/games/Throw-Eyes';
import { MaMBalanceArms, MaMJumpArms, MaMLeapLegs, MaMRunArms } from '../../components/images/MixAndMatchImages'
import { HotSpotThrowEyes } from '../../components/images/ThrowEyesImages'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BackButton from '../../components/Back-Button'
import AppRoute from './AuthenticatedRoute'

//SkillName ENUM('Kick', 'Jump', 'Balance', 'Run', 'Throw', 'Hop', 'Catch', 'Slide', 'Underhand-Roll', 'Leap', 'Strike', 'Gallop'),

export default function LevelRoutes() {
    
    return( 
        <Routes>
            <AppRoute path="/" component={LevelNavIndex} isPrivate={true} requiresPlayer={true} />

            <AppRoute path="/Kick" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Kick/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Kick'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />
            
            <AppRoute path="/Jump" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Jump/" component={SkillNavigationPage} Levels={JumpLevels} SkillName={'Jump'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />
            
            <AppRoute path="/Balance" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Balance/" component={SkillNavigationPage} Levels={BalanceLevels} SkillName={'Balance'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />
            
            <AppRoute path="/Run" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Run/" component={SkillNavigationPage} Levels={RunLevels} SkillName={'Run'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />
            
            <AppRoute path="/Throw" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Throw/" component={SkillNavigationPage} Levels={ThrowLevels} SkillName={'Throw'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />
            
            <AppRoute path="/Hop" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Hop/" component={SkillNavigationPage} Levels={HopLevels} SkillName={'Hop'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />

            <AppRoute path="/Catch" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Catch/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Catch'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />

            <AppRoute path="/Slide" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Slide/" component={SkillNavigationPage} Levels={SlideLevels} SkillName={'Slide'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />

            <AppRoute path="/Underhand-Roll" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Underhand-Roll/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Underhand-Roll'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />

            <AppRoute path="/Leap" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Leap/" component={SkillNavigationPage} Levels={LeapLevels} SkillName={'Leap'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />

            <AppRoute path="/Strike" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Strike/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Strike'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />

            <AppRoute path="/Gallop" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
                <AppRoute path="Gallop/" component={SkillNavigationPage} Levels={KickLevels} SkillName={'Gallop'} isPrivate={true} requiresPlayer={true} backButton={<BackButton />} />
        </Routes>
    );

}
/*
<AppRoute path="/Throw" component={ThrowEyes} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={HotSpotThrowEyes} SkillName="Throw" GameName="Throw-Eyes" /> 
            <DndProvider backend={HTML5Backend}>
<AppRoute path="/Leap" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMLeapLegs} />
</DndProvider>

<DndProvider backend={HTML5Backend}>
<AppRoute path="/Run" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMRunArms} />
</DndProvider>
<DndProvider backend={HTML5Backend}>
                <AppRoute path="/Jump" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMJumpArms} />
            </DndProvider>
            <DndProvider backend={HTML5Backend}>
                <AppRoute path="/Balance" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMBalanceArms} />
            </DndProvider>
*/
