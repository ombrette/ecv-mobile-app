/**
 * Created by hemalambert on 27/03/2018.
 */
import { TabNavigator, StackNavigator, SwitchNavigator } from "react-navigation";

import Home from "../features/home";
import Login from "../features/auth/login";
import Signup from "../features/auth/signup";
import AuthLoadingScreen from "../features/auth";
import Search from "../features/search";
import Account from "../features/account";
import Quiz from "../features/quiz";
import Reason from "../features/quiz/reason.js";
import Genre from "../features/quiz/genre.js";
import Result from "../features/quiz/result.js";
import Single from "../features/single";

import { Icon } from 'react-native-elements'

export const QuizPages = StackNavigator({ 
    Home: Home,
    Quiz: Quiz,
    Reason: Reason,
    Genre: Genre,
    Result: Result,
    Single: Single,
});

export const AppStack = TabNavigator(
{
    Spotter: {
        screen: QuizPages,
        navigationOptions: {
            tabBarLabel: 'Spotter',
            tabBarIcon: ({ tintColor }) => <Icon name='movie' size={35} color={tintColor} />,
        }
    },
    Search: {
        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Recherche',
            tabBarIcon: ({ tintColor }) => <Icon name='movie' size={35} color={tintColor} />,
        }
    },
    Account: {
        screen: Account,
        navigationOptions: {
            tabBarLabel: 'Mon profil',
            tabBarIcon: ({ tintColor }) => <Icon name='account-circle' size={35} color={tintColor} />,
        }
    }
}, 
{
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#fff',
        inactiveTintColor:'#D3D3D3',
        style: {
            backgroundColor: '#750e13',
        },
        indicatorStyle: {
            backgroundColor: 'transparent',
        },
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