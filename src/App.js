import './App.scss';
import { FaPlay } from 'react-icons/fa';

export default function App() {
  return (
    <div className="App">
      <div class="container">

        <div id="Home-Title" class="row justify-content-md-center title">
          <h1>JumpStart</h1>
        </div>
        <div id="Home-Button" class="row justify-content-md-center">
          <a href="/LevelSelect">
            <button type="button" class="btn btn-primary"><FaPlay size={125} /></button>
          </a>
        </div>

      </div>
    </div>
  );
}
