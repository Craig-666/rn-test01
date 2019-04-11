
<script src="http://localhost:8097"/>
import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation'
import List from './find'
import Detail from './find/detail'

export default createStackNavigator(
    {
        Home: List,
        Detail: Detail
    },
    {
        initialRouteName: 'Home',
        /* The header config from HomeScreen is now here */
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerTitleContainerStyle:{
                justifyContent:'center'
            },
            headerTintColor: '#f4511e',
            // headerTitleStyle: {
            //     fontWeight: 'bold',
            // },
        },
    }
)