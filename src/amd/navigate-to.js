define(['jquery','deferred'], function($, deferred) {

    var ifr = $('#context');

    return function navigateTo(path) {
        return deferred(function (defer) {
            ifr.one('load', function () {
                defer.resolve();
            });
            ifr.attr('src', path);
        });
    }

});