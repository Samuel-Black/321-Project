import { Routes, Route } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import Game1 from '../../pages/Game1';
import Game2 from '../../pages/Game2';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export default function LevelRoutes() {

    return( 
    <Routes>
        <Route path="/" element={<LevelNavIndex />} />
        <DndProvider backend={HTML5Backend}>
            <Route path="Game1" element={<Game1 />} />
        </DndProvider>
        <DndProvider backend={HTML5Backend}>
            <Route path="Game2" element={<Game2 />} />
        </DndProvider>
    </Routes>
    );

}