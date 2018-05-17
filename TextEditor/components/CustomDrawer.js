import React from 'react';
import { View, Text } from 'react-native';

import Drawer from 'react-native-drawer'

export class CustomDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: props.content,
            onOpen: props.onOpen,
            onClose: props.onClose
        };
    }

    render() {
        return (
            <Drawer
                type="overlay"
                ref={(ref) => this._drawer = ref}
                content={this.state.content}
                
                elevation={10}
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panOpenMask={0.15}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    mainOverlay: { backgroundColor:'black', opacity:ratio/3.6 }
                })}
                tweenDuration={100}

                onOpen={this.props.onOpen}
                onClose={this.props.onClose}
            >
                {this.props.children}   
            </Drawer>
        );
    }

    open() {
        this._drawer.open()
    }

    close() {
        this._drawer.close()
    }
}