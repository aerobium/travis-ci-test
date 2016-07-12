function Spy(target, method) {
    var s = {count: 0},
        func = target[method];
    target[method] = function () {
        s.count++;
        return func.apply(target, arguments);
    };
    return s;
}

module.exports = Spy;