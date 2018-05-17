import React from "react";
import { 
    View, 
    Text, 
    ScrollView,
    StyleSheet 
} from "react-native";

import Container from '../common/container';
import Button from '../common/button';

const styles = StyleSheet.create({
});

export default class Home extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <ScrollView style={styles.scroll}>
                        <Text>Bienvenu sur MovieSpotter l'application qui vous propose un film en fonction de vos envies et de vos humeurs!</Text>
                        <Container>
                            <Button 
                                label="Trouve moi un film"
                                styles={{button: styles.primaryButton, label: styles.buttonWhiteText}} 
                                onPress={() => this.props.navigation.navigate('Quiz')} />
                        </Container>
                    </ScrollView>
                </View>
            </View>
        );
    }
}