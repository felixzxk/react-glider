/**
 * Created by felix on 2016/10/17.
 */
import React from 'react';
class Item extends React.Component {
    render() {
        return (
            <div className = "RGItem">item</div>
        )
    }
}
class ReactGlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            style: this.props.style
        }
    }

    componentWillMount() {
    }

    pageUp() {
    }

    pageDown() {

    }

    componentDidMount() {
        const wrap = this.refs.wrap;
        console.log('wrap', wrap.children, typeof wrap.children);
        for (let i = 0; i < wrap.children.length; i++) {
            if (wrap.children[i].className == 'RGItem') {
                console.log(wrap.children[i])
            }
        }
    }

    render() {
        const mainWrapStyle = {
            height: '100%',
            width: '100%'
        };
        return (
            <div
                id = {this.state.id}
                style = {mainWrapStyle}
            >
                <div
                    ref = 'wrap'
                >
                    {this.props.children}
                </div>
            </div>
        )
    }
}
ReactGlider.Item = Item;
export default ReactGlider
