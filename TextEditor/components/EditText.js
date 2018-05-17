import React from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';

export class EditText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lines: '1\n2',
            linesNum: 2,
            selectionStart: 0,
            selectionEnd: 0,
            contentLoaded: false,
            minContentHight: 0,
            minContentWidth: 0
        };

        var scrollWidth = 0
    }

    render() {
        return (
            <ScrollView ref='content' onLayout={this.onContentLayout.bind(this)} overScrollMode={'never'} style={{backgroundColor:'#424242'}}>
                <View style={{flexDirection: 'row'}}>
                    { this.state.contentLoaded &&
                    <Text onLayout={this.onNumLineLayout.bind(this)} style={{
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
                        }}>
                            {this.state.lines}
                    </Text>}
                    <ScrollView horizontal={true} overScrollMode={'never'} style={{flex: 1}}>
                        <TextInput style={{
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

                            ref={(ref) => this._code = ref}
                            disableFullscreenUI={true}
                            minHeight = {this.state.minContentHeight}
                            minWidth = {this.state.minContentWidth}
                            underlineColorAndroid='Color.rgba(0,0,0,0)'
                            multiline
                            onChangeText={this.props.onChangeText}
                            value = {this.props.text}
                            //onSelectionChange={(event) => alert(event.nativeEvent.selection)}

                            //onContentSizeChange={this.onChangeSize.bind(this)}
                            //onSelectionChange={this.onSelectionChange.bind(this)}
                        >

                        </TextInput>
                    </ScrollView>
                </View>
            </ScrollView>
        );
    }

    onContentLayout(event) {
        this.scrollWidth = event.nativeEvent.layout.width

        this.setState({
            contentLoaded: true,
            minContentHeight: event.nativeEvent.layout.height
        })
    }

    onNumLineLayout(event) {
        this.setState({
            minContentWidth: this.scrollWidth -  event.nativeEvent.layout.width
        })
    }

    onSelectionChange(event) {
        this.setState({
            selectionStart: event.nativeEvent.selection.start,
            selectionEnd:  event.nativeEvent.selection.end
        })
    }

    onChangeSize(event){
        const ln = this.state.text.split('\n').length + 1
        if(ln != this.state.linesNum) {
            const str = Array.from(new Array(ln),(v,i)=>i+1).join('\n')

            this.setState({
                linesNum: ln,
                lines: str,
            })
        }
    }
}
