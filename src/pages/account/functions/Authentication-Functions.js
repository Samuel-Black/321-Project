import { Auth } from 'aws-amplify';

useEffect(() => {
        onLoad();
    }, []);
  
    async function onLoad() {
        try {
            await Auth.currentSession();
            userHasAuthenticated(true);
        }
    catch(e) {
        if (e !== 'No current user') {
            alert(e);
        }
    }
  
    setIsAuthenticating(false);
}
