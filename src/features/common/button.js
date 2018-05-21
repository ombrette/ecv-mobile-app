import React, { Component } from 'react';
import { Goto } from '../common/text';
 
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
 
const Button = (props) => {
     
    function getContent(){
        if(props.children){
            return props.children;
        }
        return <Goto style={props.styles.label}>{props.label}</Goto>
    }
 
    return (
        <TouchableHighlight 
            underlayColor="#ccc"
            onPress={props.onPress} 
            style={[
                props.noDefaultStyles ? '' : styles.button, 
                props.styles ? props.styles.button : '']}
        >
            { getContent() }
        </TouchableHighlight>
    );
}
 
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
});
 
export default Button;