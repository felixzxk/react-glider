/**
 * Created by felix on 2016/10/17.
 */
import React from 'react';
class Item extends React.Component {
    static mainStyle = {
        overflow: 'hidden'
    };

    render() {
        return (
            <div
                style = {Item.mainStyle}
                className = "RGItem"
            >
                {this.props.children}
            </div>
        )
    }
}
class ReactGlider extends React.Component {
    static setSize = (node) => {
        const w = window.innerWidth,
            h = window.innerHeight;
        console.log('setSize', w, h)
        if (node && node.nodeType) {
            node.style.width = w + 'px';
            node.style.height = h + 'px';
        }
        return {
            w,
            h
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
            ,
            style: this.props.style
            ,
            height: this.props.height || 0
            ,
            width: this.props.width
            ,
            active: 0
            ,
            defaultActive: this.props.defaultActive || 0
            ,
            length: 0
            ,
            during: this.props.during || '0.5s'
            ,
            showIndexIco: this.props.showIndexIco !== false
            //,type: this.props.type || 'y'
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            height: nextProp.height
        }, function () {
            this.onResize()
        })
    }

    pageUp(e) {
        e.preventDefault();
        this.pageTurn(-1)
    }

    pageDown(e) {
        e.preventDefault();
        this.pageTurn(1)
    }

    pageTurn(n) {
        if (n) {
            const cur = this.state.active || 0,
                len = this.state.length,
                nextPage = n + cur;
            if (nextPage >= 0 && nextPage < len) {
                this.setState({
                    active: nextPage
                })
            }
        }
    }

    goto(next) {
        const len = this.state.length,
            active = this.state.active;
        if (next >= 0 && next < len) {
            const turnCount = next - active;
            this.pageTurn(turnCount)
        }
    }

    onResize() {
        const items = this.refs.items,
            wrap = this.refs.wrap,
            itemH = this.state.height;
        wrap.style.height = itemH + 'px';
        for (let i = 0; i < items.children.length; i++) {
            const _item = items.children[i];
            if (_item.className !== 'RGItem') {
                items.removeChild(_item)
            } else {
                _item.style.height = itemH + 'px';
            }
        }
        this.setState({
            length: items.children.length
        })
    }

    renderIndexIco() {
        const len = this.state.length,
            active = this.state.active;
        if (len > 0) {
            const icoStyle = {
                    borderRadius: '50%',
                    width: '10px',
                    height: '10px',
                    display: 'block',
                    cursor: 'pointer'
                },
                icoStyleOn = {
                    backgroundColor: '#999'
                },
                wrapStyle = {
                    position: 'fixed',
                    zIndex: 11,
                    right: '10px',
                    top: '10px',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                };
            const icos = [];
            let on = false;
            for (let i = 0; i < len; i++) {
                if (active === i) {
                    on = true
                } else {
                    on = false
                }
                let ico = (<span
                    className = {on ? 'on' : ''}
                    key = {`indexIco${i}`}
                    style = {icoStyle}
                    onClick = {this.goto.bind(this,i)}
                />);
                icos.push(ico)
            }
            return (
                <div style = {wrapStyle}>
                    {icos}
                </div>
            )
        }
    }

    componentDidMount() {
        const bs = document.body.style;
        bs.padding = '0';
        bs.margin = '0';
        this.onResize()
    }

    render() {
        const mainWrapStyle = {
                overflow: 'hidden',
                padding: '0',
                margin: '0',
                position: 'relative'
            },
            top = ((-1) * this.state.active) * this.state.height + 'px',
            testBtnStyle = {
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: 10
            },
            itemsStyle = {
                transition: this.state.during,
                position: 'relative',
                top: top
            };
        let indexIco = null;
        if (this.state.showIndexIco) {
            indexIco = this.renderIndexIco()
        }
        return (
            <div
                id = {this.state.id}
                style = {mainWrapStyle}
                ref = 'wrap'
            >
                <div
                    ref = 'items'
                    style = {itemsStyle}
                >
                    {this.props.children}
                </div>
                <div style = {testBtnStyle}>
                    {indexIco}
                    <a href = "#" onClick = {this.pageUp.bind(this)}>upupup</a>
                    <a href = "#" onClick = {this.pageDown.bind(this)}>downdown</a>
                </div>
            </div>
        )
    }
}
ReactGlider.Item = Item;
export {ReactGlider}
