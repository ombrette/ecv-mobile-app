import React from "react";
import { 
    View, 
    Text, 
    ScrollView,
    StyleSheet 
} from "react-native";

import Container from '../common/container';
import Button from '../common/button';
import { Main } from '../common/view';
import { Intro, Home_Subitle, Question, Answer } from '../common/text';
import { AnswerContainer } from '../common/touchable';

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    render(){
        return(
            <Main>
                <View>
                    <ScrollView>
                        <Intro>Bienvenu sur MovieSpotter!!! 
                               {"\n"}Voici l'application qui te propose un film en fonction de tes envies et de tes humeurs!</Intro>
                        <Container>
                            <Button 
                                label="Trouve moi un film"
                                styles="" 
                                onPress={() => this.props.navigation.navigate('Quiz')} />
                        </Container>
                        <Home_Subitle>Ou choisissez ci-dessous une humeur</Home_Subitle>
                        <AnswerContainer 
                              onPress={() => {
                                this.props.navigation.navigate('Result', {
                                  genre_ids: [{ id: '10749'}, { id: '14'}],
                                });
                              }}>
                            <Answer>In a magical love</Answer>
                        </AnswerContainer>
                        <AnswerContainer 
                              onPress={() => {
                                this.props.navigation.navigate('Result', {
                                  genre_ids: [{ id: ''}],
                                });
                              }}>
                            <Answer>Je ne sais pas ce que je ressens</Answer>
                        </AnswerContainer>
                    </ScrollView>
                </View>
            </Main>
        );
    }
}