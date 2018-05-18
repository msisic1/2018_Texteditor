import React from 'react';
import { Dimensions, View, ScrollView, Text, TextInput } from 'react-native';

export class EditText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text : '',
            lines: '1',
            linesNum: 1,
            selectionStart: 0,
            selectionEnd: 0,
            contentLoaded: false,
            minContentHight: 0,
            minContentWidth: 0,
            textChanged: false
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
                    style = {{ flexDirection: 'row', flex: 1 }}
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
                                lineHeight: 20,
                                //width: 
                            }}
                            controlled={true}
                            multiline
                            disableFullscreenUI = {true}
                            minHeight = {this.state.minContentHeight}
                            minWidth = {this.state.minContentWidth}
                            underlineColorAndroid='Color.rgba(0,0,0,0)'
                            onChangeText = {(text) => this.setState({text})}
                            selection= {{start: this.state.selectionStart, end: this.state.selectionEnd}}

                            value = {this.state.newText}

                            //onSelectionChange={(event) => alert(event.nativeEvent.selection)}
                            //onContentSizeChange = {this.onChangeSize.bind(this)}
                            onSelectionChange = {this.onSelectionChange.bind(this)}
                            onContentSizeChange={this.onChangeSize.bind(this)}
                            //onSelectionChange={this.onSelectionChange.bind(this)}
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
        tmp = Dimensions.get('window').width - event.nativeEvent.layout.width
        this.setState({
            minContentWidth: tmp
        })
    }

    onSelectionChange(event) {
        this.setState({
            selectionStart: event.nativeEvent.selection.start,
            selectionEnd:  event.nativeEvent.selection.end
        })
    }

    setSelection(selectionStart, selectionEnd) {
        //this._textInput.focus()
        this.setState({ selectionStart: selectionStart, selectionEnd: selectionEnd })
    }

    onChangeSize(event) {
      //this.setState({text: this.props.text})
        //this.setState({contentWidth: event.nativeEvent.contentSize.width + 50})

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
