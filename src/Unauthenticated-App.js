import { useNavigate } from 'react-router-dom';
import LoginPage from './pages/account/LogInPage'

export default function UnauthenticatedApp(props) {
    const navigate = useNavigate();
    
    return (
        <LoginPage />
    )
}