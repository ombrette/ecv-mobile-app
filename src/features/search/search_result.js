import React from "react";
import { 
    FlatList,
    ActivityIndicator,
    View, 
    Text, 
    ScrollView,
    StyleSheet,
    Image
} from "react-native";

import Container from '../common/container';
import Button from '../common/button';
import { Main } from '../common/view';
import { Question, Answer } from '../common/text';
import { AnswerContainer } from '../common/touchable';

import { API_URL } from '../../../api_url.js';

export default class Search_Result extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true
        }
    }

    componentDidMount(){
        // Ici on récupère d'abord les paramètres envoyés par le component Genre et on va chercher les films correspondants aux genres
        const { navigation } = this.props;
        var movies = navigation.getParam('movies');

        this.setState({
            isLoading: false,
            movies: movies,
        });
    }

    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        // On affiche ici la liste des films
        return(
            <Main>
                <FlatList
                    data={this.state.movies}
                    renderItem={({item}) => 
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <AnswerContainer 
                              onPress={() => {
                                this.props.navigation.navigate('Single', {
                                  single_movie: item.id,
                                });
                              }}>
                                <Answer>{item.title}</Answer>
                            </AnswerContainer>
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </Main>
        );
    }
}