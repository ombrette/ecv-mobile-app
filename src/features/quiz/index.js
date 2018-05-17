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

export default class Quiz extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.row}>
                    <ScrollView style={styles.scroll}>
                        <Text>Bienvenu sur MovieSpotter !</Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
}