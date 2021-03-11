import { Routes } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import Game1 from '../../pages/games/Game1';
import MixAndMatch from '../../pages/games/MixAndMatch';
import ThrowEyes from '../../pages/games/Throw-Eyes';
import { MaMBalanceArms, MaMJumpArms, MaMLeapLegs, MaMRunArms } from '../../components/images/MixAndMatchImages'
import { HotSpotThrowEyes } from '../../components/images/ThrowEyesImages'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BackButton from '../../components/Back-Button'
import AppRoute from './AuthenticatedRoute'

export default function LevelRoutes() {
    
    return( 
        <Routes>
            <AppRoute path="/" component={LevelNavIndex} isPrivate={true} requiresPlayer={true} />
            <AppRoute path="/Game1" component={Game1} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} />
            <DndProvider backend={HTML5Backend}>
                <AppRoute path="/Balance" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMBalanceArms} />
            </DndProvider>
            <DndProvider backend={HTML5Backend}>
                <AppRoute path="/Jump" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMJumpArms} />
            </DndProvider>
            <DndProvider backend={HTML5Backend}>
                <AppRoute path="/Leap" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMLeapLegs} />
            </DndProvider>
            <DndProvider backend={HTML5Backend}>
                <AppRoute path="/Run" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMRunArms} />
            </DndProvider>
            <AppRoute path="/Throw" component={ThrowEyes} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={HotSpotThrowEyes} SkillName="Throw" GameName="Throw-Eyes" /> 
        </Routes>
    );

}