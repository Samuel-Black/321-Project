import { Routes, Route } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import Game1 from '../../pages/games/Game1';
import MixAndMatch from '../../pages/games/MixAndMatch';
import ThrowEyes from '../../pages/games/Throw-Eyes';
import { MaMBalanceArms } from '../../components/images/MixAndMatchImages'
import { HotSpotThrowEyes } from '../../components/images/ThrowEyesImages'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function LevelRoutes() {

    return( 
    <Routes>
        <Route path="/" element={<LevelNavIndex />} />
        <Route path="Game1" element={<Game1 />} />
        <DndProvider backend={HTML5Backend}>
            <Route path="Game2" element={<MixAndMatch shuffledImages={MaMBalanceArms} />} />
        </DndProvider>
        <Route path="Game3" element={<ThrowEyes shuffledImages={HotSpotThrowEyes} />} />
    </Routes>
    );

}