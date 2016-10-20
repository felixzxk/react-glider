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
            width: this.props.width || 0,
            sideDis: this.props.sideDis || '10px',
            defaultActive: this.props.defaultActive || 0,
            length: 0,
            during: this.props.during || 0.5,
            showIndexIco: this.props.showIndexIco !== false,
            indexDir: this.props.indexDir,
            active: 0,
            type: this.props.type !== 'x' ? 'y' : 'x',
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProp) {
        this.setState({
            height: nextProp.height || 0,
            width: nextProp.width || 0,
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
            children = items.children,
            wrap = this.refs.wrap,
            type = this.state.type,
            itemW = this.state.width,
            itemH = this.state.height;
        let len = children.length;

        wrap.style.height = itemH + 'px';
        wrap.style.width = itemW + 'px';

        for (let i = 0; i < len; i++) {
            const _item = children[i];
            if (_item.className !== 'RGItem') {
                items.removeChild(_item);
                len--
            } else {
                _item.style.height = itemH + 'px';
                _item.style.width = itemW + 'px';
                if (type === 'x') {
                    items.style.width = itemW * len + 'px';
                    items.style.overflow = 'hidden';
                    _item.style.float = 'left';
                }
            }
        }
        this.setState({
            length: len
        })
    }

    renderIndexIco() {
        const len = this.state.length,
            active = this.state.active,
            dist = this.state.sideDis,
            type = this.state.type,
            dir = this.state.indexDir,
            marginBack = (len * 20 + 20) / (-2) + 'px';
        if (len > 0) {
            const itemIco = {
                    display: 'block',
                    width: '20px',
                    padding: '5px 0',
                    lineHeight: '20px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    float: 'left'
                },
                icoStyle = {
                    borderRadius: '50%',
                    width: '10px',
                    height: '10px',
                    display: 'block',
                    margin: '0 auto'
                },
                wrapStyle = {
                    position: 'absolute',
                    zIndex: 11,
                    borderRadius: '20px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    overflow: 'hidden'
                },
                dirStyle = (() => {
                    let _style = {},
                        _sX = (d) => {
                            _style[d] = dist;
                            _style.left = '50%';
                            _style.padding = '0 10px';
                            _style.marginLeft = marginBack;
                        },
                        _sY = (d) => {
                            _style[d] = dist;
                            _style.top = '50%';
                            _style.padding = '10px 0';
                            _style.width = '20px';
                            _style.marginTop = marginBack;
                        };
                    if (dir === 'top' || dir === 'bottom') {
                        _sX(dir)
                    } else if (dir === 'left' || dir === 'right') {
                        _sY(dir)
                    } else {
                        if (type === 'x') {
                            _sX('bottom')
                        } else {
                            _sY('right')
                        }
                    }
                    return _style
                })();
            let finalStyle;
            finalStyle = _assign(wrapStyle, dirStyle);
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
                    onClick = {this.goto.bind(this, i)}
                    style = {itemIco}
                >
                    <i
                        style = {{
                            ...icoStyle,
                            backgroundColor: bgc
                        }}
                    />
                </span>);
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
            type = this.state.type,
            active = this.state.active,
            height = this.state.height,
            width = this.state.width,
            top = ((-1) * active) * height + 'px',
            left = ((-1) * active) * width + 'px',
            itemsStyle = {
                transition: this.state.during + 's',
                position: 'relative'
            };
        if (type === 'x') {
            itemsStyle.left = left
        } else {
            itemsStyle.top = top
        }
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
