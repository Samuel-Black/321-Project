import { Routes, Route } from 'react-router-dom';
import LevelNavIndex from '../../pages/LevelNavigationIndex';
import Game1 from '../../pages/Game1';

export default function LevelRoutes() {

    return( 
    <Routes>
        <Route path="/" element={<LevelNavIndex />} />
        <Route path="Game1" element={<Game1 />} />
    </Routes>
    );

}