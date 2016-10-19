/**
 * Created by felix on 2016/10/17.
 */
const _assign = function () {
    const args = arguments;
    let _finalObj = {};
    for (let i = 0; i < args.length; i++) {
        if (!!args[i] && typeof args[i] === 'object') {
            for (let o in args[i]) {
                if (args[i].hasOwnProperty(o)) {
                    _finalObj[o] = args[i][o]
                }
            }
        }
    }
    return _finalObj
};
const _dataset = (ctx, dataName) => {
    if (dataName) {
        return ctx.getAttribute('data-' + dataName)
    } else {
        const __data__ = {
            length: 0
        };
        for (let a = 0; a < ctx.attributes.length; a++) {
            const _t = ctx.attributes[a],
                reg = /^data-/;
            if (reg.test(ctx.attributes[a].nodeName)) {
                __data__.length++;
                __data__[_t.name.replace(reg, '')] = _t.value
            }
        }
        return __data__
    }
};
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
            id: this.props.id,
            style: this.props.style,
            height: this.props.height || 0,
            width: this.props.width,
            active: 0,
            defaultActive: this.props.defaultActive || 0,
            length: 0,
            during: this.props.during || 0.5,
            showIndexIco: this.props.showIndexIco !== false,
            type: this.props.type !== 'x' ? 'y' : 'x'
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

    pageTurn(n) {
        if (n) {
            const cur = this.state.active || 0,
                len = this.state.length,
                during = this.state.during * 1000,
                nextPage = n + cur;
            if (nextPage >= 0 && nextPage < len) {
                let stopTurn = false;
                if (typeof this.props.beforeTurn === 'function') {
                    stopTurn = (this.props.beforeTurn(cur, nextPage) === false)
                }
                if (!stopTurn) {
                    this.setState({
                        active: nextPage
                    }, function () {
                        const _this = this;
                        if (typeof this.props.finishTurn === 'function') {
                            setTimeout(function () {
                                _this.props.finishTurn(cur, nextPage)
                            }, during)
                        }
                    })
                }
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
            type = this.state.type,
            itemW = this.state.width,
            itemH = this.state.height;
        console.log('type',type)
        if(type === 'y'){
            wrap.style.height = itemH + 'px';
            for (let i = 0; i < items.children.length; i++) {
                const _item = items.children[i];
                if (_item.className !== 'RGItem') {
                    items.removeChild(_item)
                } else {
                    _item.style.height = itemH + 'px';
                }
            }
        }else{

        }
        this.setState({
            length: items.children.length
        })
    }

    renderIndexIco() {
        const len = this.state.length,
            active = this.state.active,
            type = this.state.type,
            marginBack = (len * 20 + 20) / (-2);
        if (len > 0) {
            const icoStyle = {
                    borderRadius: '50%',
                    width: '10px',
                    height: '10px',
                    display: 'block',
                    margin: '10px 0 ',
                    cursor: 'pointer'
                },
                wrapStyle = {
                    position: 'absolute',
                    zIndex: 11,
                    padding: '5px 10px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                },
                wrapStyleY = {
                    right: '10px',
                    top: '50%',
                    marginTop: marginBack,
                },
                wrapStyleX = {
                    transform: 'rotate(-90deg)',
                    bottom: '10px',
                    left: '50%',
                    marginLeft: marginBack,
                };
            let finalStyle;
            if (type === 'y') {
                finalStyle = _assign(wrapStyle, wrapStyleY);
            } else {
                finalStyle = _assign(wrapStyle, wrapStyleX)
            }
            const icos = [];
            let on = false;
            for (let i = 0; i < len; i++) {
                let bgc = '';
                if (active === i) {
                    bgc = '#eee';
                    on = true
                } else {
                    bgc = '#ccc';
                    on = false
                }
                let ico = (<span
                    className = {on ? 'on' : ''}
                    key = {`indexIco${i}`}
                    style = {{
                        ...icoStyle,
                        backgroundColor: bgc
                    }}
                    onClick = {this.goto.bind(this, i)}
                />);
                icos.push(ico)
            }
            return (
                <div style = {finalStyle}>
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
            itemsStyle = {
                transition: this.state.during + 's',
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

                {indexIco}
            </div>
        )
    }
}
ReactGlider.Item = Item;
export {ReactGlider}
