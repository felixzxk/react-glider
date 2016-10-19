/**
 * Created by zhaoxk on 2016/10/12.
 */
//require('core-js');
import React from 'react';
import ReactDOM from 'react-dom';
//import ReactGlider from 'react-glider'
import {ReactGlider} from './react-glider';
const Item = ReactGlider.Item,
    setSize = ReactGlider.setSize;
class MainApp extends React.Component {
    constructor(props) {
        super(props);
        const size = setSize();
        this.state = {
            visible: true,
            height: size.h,
            width: size.w
        }
    }

    componentDidMount() {
        const _this = this;
        window.onresize = function () {
            const size = setSize();
            _this.setState({
                height: size.h,
                width: size.w
            })
        }
    }

    render() {
        const commonStyle = {
            width: '100%',
            height: '100%'
        };
        return (
            <div id = '_w'>
                <ReactGlider
                    id = 'test'
                    width = {this.state.width}
                    height = {this.state.height}
                >
                    <Item>
                        <div
                            style = {{
                                ...commonStyle,
                                backgroundColor: '#eee'
                            }}
                        >1</div>
                    </Item>
                    <Item>
                        <div
                            style = {{
                                ...commonStyle,
                                backgroundColor: '#ddd'
                            }}
                        >2</div>
                    </Item>
                    <Item>
                        <div
                            style = {{
                                ...commonStyle,
                                backgroundColor: '#ccc'
                            }}
                        >3</div>
                    </Item>
                    <div>adfadfaf</div>
                </ReactGlider>
            </div>
        )
    }
}
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<MainApp />, root);