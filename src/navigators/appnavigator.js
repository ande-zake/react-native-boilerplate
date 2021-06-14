import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from '../screens/Auth/loading';
import LoginScreen from '../screens/Auth';
import App from './Main';

const Navigator = createSwitchNavigator(
  {
    // For authentication
    Auth: LoginScreen,
    // For fetching and validating session
    Loading: AuthLoadingScreen,
    // Main app
    Main: App,
  },
  {
    initialRouteName: 'Loading'
  } 
);

export default createAppContainer(Navigator);