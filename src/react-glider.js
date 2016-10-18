var React = require('react');
var _assign = function () {
    var args = arguments;
    var _finalObj = {};
    for (var i = 0; i < args.length; i++) {
        if (!!args[i] && typeof args[i] === 'object') {
            for (var o in args[i]) {
                if (args[i].hasOwnProperty(o)) {
                    _finalObj[o] = args[i][o]
                }
            }
        }
    }
    return _finalObj
};
var _dataset = function (ctx, dataName) {
    if (dataName) {
        return ctx.getAttribute('data-' + dataName)
    } else {
        var __data__ = {
            length: 0
        };
        for (var a = 0; a < ctx.attributes.length; a++) {
            var _t = ctx.attributes[a],
                reg = /^data-/;
            if (reg.test(ctx.attributes[a].nodeName)) {
                __data__.length++;
                __data__[_t.name.replace(reg, '')] = _t.value
            }
        }
        return __data__
    }
};
export class ReactGlider extends React.Component{
    render(){
        return (
            <div>ReactGlider</div>
        )
    }
}