import React from 'react';
import { View, Image } from 'react-native';

import { Header, Button, Icon } from 'native-base'

export class Actionbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onPressMenu: props.onPressMenu,
            onPressMore: props.onPressMore
        };
    }

    render() {
        return (
            <View>
                <Header
                    style = {{
                        backgroundColor:'#303030',
                        height:45,
                        paddingLeft:0,
                        paddingRight:0
                    }}    
                    androidStatusBarColor="#2a2a2a"
                >
                    <Button transparent onPress = {this.state.onPressMenu} width={50}>
                        <Image source={require('../res/images/menu.png')} style={{width: 30, height: 30}}/>
                    </Button>

                    <View style = {{ flex: 1, backgroundColor:this.state.tabColor }}>

                    </View>

                    <Button transparent onPress = {this.state.onPressMore} width={50}>
                    <Image source={require('../res/images/more.png')} style={{width: 30, height: 30}}/>
                    </Button>
                </Header>
            </View>
        );
    }
}