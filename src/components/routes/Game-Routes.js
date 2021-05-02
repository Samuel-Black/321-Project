import { Routes } from 'react-router-dom';
import BackButton from '../../components/Back-Button'
import AppRoute from './AuthenticatedRoute'

//('Balance-Eyes', 'Balance-Legs','Hop-Eyes','Jump-Feet','Jump-Knees','Kick-Eyes','Kick-Foot','Kick-Legs','Leap-Eyes','Run-Eyes','Slide-Feet',
//'Hop-Arms','Leap-Legs','Slide-Eyes','Throw-Eyes','Balance-Arms','Hop-Legs','Jump-Arms','Run-Arms','Run-Knees','Slide-Hips&Shoulders'),

export default function LevelRoutes() {
    
    return( 
        <Routes>
            <AppRoute path="/" component={LevelNavIndex} isPrivate={true} requiresPlayer={true} />
                <AppRoute path="/Balance" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMBalanceArms} />
                <AppRoute path="/Jump" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMJumpArms} />
                <AppRoute path="/Leap" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMLeapLegs} />
                <AppRoute path="/Run" component={MixAndMatch} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={MaMRunArms} />
            <AppRoute path="/Throw" component={ThrowEyes} isPrivate={true} requiresPlayer={true}  backButton={<BackButton />} shuffledImages={HotSpotThrowEyes} SkillName="Throw" GameName="Throw-Eyes" /> 
        </Routes>
    );

}