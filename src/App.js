import './App.scss';
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App">
      <AmplifySignOut />
      <div class="container">

        <div id="Home-Title" class="row justify-content-md-center title">
          <h1>JumpStart</h1>
        </div>
        <div id="Home-Button" class="row justify-content-md-center">
          <Link to="/LevelNavigation">
            <button type="button" class="btn btn-primary"><FaPlay size={125} /></button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default withAuthenticator(App);
