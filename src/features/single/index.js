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

const styles = StyleSheet.create({
 
MainContainer :{
 
    justifyContent: 'center',
    flex:1,
    margin: 5,
    marginTop: 20,
 
},
 
textView: {
 
    width:'100%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
}
});

export default class Single extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        const { type } = this.state;
        var genres = navigation.getParam('genre_ids', '35');
    }

    render(){
        return(
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.state.movies}
                    renderItem={({item}) => 
                        <View style={{flex:1, flexDirection: 'row'}}>
        
                          <Image source = {{ uri: "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + item.poster_path }} />
                        
                          <Text style={styles.textView} >{item.title}</Text>
             
                        </View>
                    }
                    keyExtractor={(item, index) => index}
                />
            </View>
        );
    }
}