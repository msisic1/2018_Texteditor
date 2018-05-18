import React from 'react';
import { View } from 'react-native';

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
                
                {/* statusbar */}<Header style = {{ backgroundColor:'#303030', height:24 }} />

                <Header
                    style = {{
                        backgroundColor:'#303030',
                        height:45,
                        paddingLeft:0,
                        paddingRight:0
                    }}    
                    androidStatusBarColor="#2a2a2a"
                >
                    <Button transparent onPress = {this.state.onPressMenu}>
                        <Icon name="menu" />
                    </Button>

                    <View style = {{ flex: 1, backgroundColor:this.state.tabColor }}>

                    </View>

                    <Button transparent onPress = {this.state.onPressMore}>
                        <Icon name="more" />
                    </Button>
                </Header>
            </View>
        );
    }
}