define(['jquery'], function($) {
    return function deferred(fn) {
        return function () {
            var defer = $.Deferred();
            fn && fn.apply(this, [defer].concat([].slice.call(arguments)));
            return defer.promise();
        };
    }
});