define(['jquery', 'deferred', 'run', 'navigate-to'], function($, deferred, run, navigateTo) {
    var dslList = [];
    var pauseDefer = null;
    var ifr = $('#context');
    var delayCount = 0;

    function reload() {
        return deferred(function (defer) {
            ifr.one('load', function () {
                defer.resolve();
            });
            win().prop('location').reload();
        });
    }

    function win() {
        return $(ifr.prop('contentWindow'));
    }

    function delay(callback, duration) {
        delayCount++;
        setTimeout(function () {
            var d = dslList.pop();
            callback();
            dslList.push(d);
            if (--delayCount == 0) {
                run(dslList);
            }
        }, duration);
    }

    function argsPassingThrough(_arguments) {
        return [].slice.call(_arguments, 1);
    }

    function waitForPageLoad() {
        return deferred(function (defer) {
            var args = argsPassingThrough(arguments);
            ifr.one('load', function () {
                defer.resolve.apply(defer, args);
            });
        });
    }

    function locationProp(propName, handler) {
        return deferred(function (defer) {
            defer.done(handler);
            defer.resolve(win().prop('location')[propName]);
        });
    }

    function sleep(duration) {
        return deferred(function (defer) {
            var args = argsPassingThrough(arguments);
            setTimeout(function () {
                defer.resolve.apply(defer, args);
            }, duration);
        });
    }

    var browser = {
        navigateTo: function (path) {
            dslList.push(navigateTo(path));
        },
        reload: function () {
            dslList.push(reload());
        },
        delay: function (callback, duration) {
            delay(callback, duration);
        },
        sleep: function (duration) {
            dslList.push(sleep(duration));
        },
        pause: function () {
            dslList.push(function () {
                pauseDefer = $.Deferred();
                return pauseDefer.promise();
            });
        },
        resume: function () {
            pauseDefer.resolve();
            pauseDefer = null;
        },
        waitForPageLoad: function () {
            dslList.push(waitForPageLoad());
        },
        window: {
            path: function (pathHandler) {
                dslList.push(locationProp('pathname', pathHandler));
            },
            href: function (hrefHandler) {
                dslList.push(locationProp('href', hrefHandler));
            },
            hash: function (hashHandler) {
                dslList.push(locationProp('hash', hashHandler));
            },
            search: function (searchHandler) {
                dslList.push(locationProp('search', searchHandler));
            }
        }
    };

    return browser;
});