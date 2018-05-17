import React from 'react';
import { Dimensions, View, ScrollView, Text, TextInput } from 'react-native';

export class EditText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            lines: '1',
            linesNum: 1,
            selectionStart: 0,
            selectionEnd: 0,
            contentLoaded: false,
            minContentHight: 0,
            minContentWidth: 0
        };
    }

    render() {
        return (
            <ScrollView
                ref = 'content'
                style = {{ backgroundColor:'#424242' }}
                onLayout = {this.onContentLayout.bind(this)}
                overScrollMode = {'never'}
            >
                <View
                    style = {{ flexDirection: 'row' }}
                >
                    { this.state.contentLoaded &&
                        <Text
                            style = {{
                                backgroundColor: '#383838',
                                color: 'gray',
                                minWidth: 40,
                                margin: 0,
                                padding: 0,
                                paddingTop: 2.8,
                                paddingLeft: 4,
                                paddingRight: 4,
                                textAlign: 'right',
                                lineHeight: 20,
                                fontFamily: 'VeraMono',
                            }}
                            onLayout = {this.onNumLineLayout.bind(this)}
                        >
                            {this.state.lines}
                        </Text>
                    }
                    <ScrollView
                        style = {{ flex: 1 }}
                        horizontal = {true}
                        overScrollMode = {'never'}
                    >
                        <TextInput
                            ref = {(ref) => this._textInput = ref}
                            style = {{
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                fontFamily: "VeraMono",
                                color: '#f2f2f2', 
                                margin: 0,
                                padding: 0,
                                paddingTop: 2.4,
                                paddingLeft: 4,
                                paddingRight: 30,
                                paddingBottom: 38,
                                lineHeight: 20
                            }}
                            multiline
                            disableFullscreenUI = {true}
                            minHeight = {this.state.minContentHeight}
                            minWidth = {this.state.minContentWidth}
                            underlineColorAndroid = 'Color.rgba(0,0,0,0)'
                            onChangeText = {(text) => this.setState({text})}
                            onContentSizeChange = {this.onChangeSize.bind(this)}
                            onSelectionChange = {this.onSelectionChange.bind(this)}
                        >

                        </TextInput>
                    </ScrollView>
                </View>
            </ScrollView>
        );
    }
    
    blur() { this._textInput.blur() }

    onContentLayout(event) {
        this.setState({
            contentLoaded: true,
            minContentHeight: event.nativeEvent.layout.height
        })
    }

    onNumLineLayout(event) {
        this.setState({
            minContentWidth: Dimensions.get('window').width - event.nativeEvent.layout.width
        })
    }

    onSelectionChange(event) {
        this.setState({
            selectionStart: event.nativeEvent.selection.start,
            selectionEnd:  event.nativeEvent.selection.end
        })
    }

    onChangeSize(event) {
        const ln = this.state.text.split('\n').length
        if(ln != this.state.linesNum) {
            const str = Array.from(new Array(ln),(v,i)=>i+1).join('\n')

            this.setState({
                linesNum: ln,
                lines: str,
            })
        }
    }
}