/**
 * Created by hemalambert on 27/03/2018.
 */
import { TabNavigator, StackNavigator, SwitchNavigator } from "react-navigation";

import Home from "../features/home";
import Login from "../features/auth/login";
import Signup from "../features/auth/signup";
import AuthLoadingScreen from "../features/auth";
import Movies from "../features/movies";

const AppStack = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    Movies: {
        screen: Movies,
        navigationOptions: {
            header: null
        }
    }
});

const AuthStack = StackNavigator({ 
    Login: Login,
    Signup: Signup,
});

export default SwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);