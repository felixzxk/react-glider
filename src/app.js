/**
 * Created by zhaoxk on 2016/10/12.
 */
//require('core-js');
import React from 'react';
import ReactDOM from 'react-dom';
//import ReactGlider from 'react-glider'
import ReactGlider from './react-glider';
const Item = ReactGlider.Item;
class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }
    render() {
        return (
            <ReactGlider>
                <Item />
                <Item />
                <Item />
                <div>adfadfaf</div>
            </ReactGlider>
        )
    }
}
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<MainApp />, root);