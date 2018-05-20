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
import { Intro } from '../common/text';

const styles = StyleSheet.create({
});

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    render(){
        return(
            <Main>
                <View style={styles.row}>
                    <ScrollView style={styles.scroll}>
                        <Intro>Bienvenu sur MovieSpotter!!! 
                               {"\n"}Voici l'application qui te propose un film en fonction de tes envies et de tes humeurs!</Intro>
                        <Container>
                            <Button 
                                label="Trouve moi un film"
                                styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                                onPress={() => this.props.navigation.navigate('Quiz')} />
                        </Container>
                    </ScrollView>
                </View>
            </Main>
        );
    }
}