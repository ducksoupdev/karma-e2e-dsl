define(['jquery', 'deferred', 'navigate-to'], function($, deferred, navigateTo) {

    var dslList = [];
    var ifr = $('#context');

    function doc() {
        return $(ifr.prop('contentDocument'));
    }

    function win() {
        return $(ifr.prop('contentWindow'));
    }

    function basename(path) {
        var arr = path.split('/');
        return arr[arr.length - 1];
    }

    function dirname(path) {
        var name = basename(path);
        return path.substring(0, path.length - name.length);
    }

    function findElement(selector) {
        return function () {
            var defer = $.Deferred();
            defer.resolve(doc().find(selector));
            return defer.promise();
        };
    }

    function construct(setValueHandler, getValueHandler, valueOrHandler) {
        return function ($elem) {
            var defer = $.Deferred();
            var type = typeof valueOrHandler;
            if (type !== 'undefined' && type !== 'function') {
                setValueHandler($elem);
                defer.resolve($elem);
            } else {
                defer.then(valueOrHandler);
                defer.resolve(getValueHandler($elem));
            }
            return defer.promise();
        };
    }

    function elementBehavior(methodName, propName, valueOrHandler) {
        return construct(function ($elem) {
            $elem[methodName](propName, valueOrHandler);
        }, function ($elem) {
            return $elem[methodName](propName);
        }, valueOrHandler);
    }

    function attr(propName, valueOrHandler) {
        return elementBehavior('attr', propName, valueOrHandler);
    }

    function prop(propName, valueOrHandler) {
        return elementBehavior('prop', propName, valueOrHandler);
    }

    function methodBehavior(methodName, valueOrHandler) {
        return construct(function ($elem) {
            $elem[methodName](valueOrHandler);
        }, function ($elem) {
            return $elem[methodName]();
        }, valueOrHandler);
    }

    function option(valuesOrHandler) {
        return construct(function ($elem) {
            var values = valuesOrHandler.length !== undefined ? valuesOrHandler : [valuesOrHandler];
            $elem.find('option').each(function (idx, element) {
                if (valuesOrHandler.indexOf($(this).val()) != -1) {
                    $(this).prop('selected', true);
                }
            });
        }, function ($elem) {
            var values = [];
            $elem.find('option:selected').each(function () {
                values.push($(this).val());
            });
            return values.length > 1 ? values : values[0];
        }, valuesOrHandler);
    }

    function query(selectedElementsHandler) {
        return deferred(function (defer, $elems) {
            defer.then(selectedElementsHandler);
            defer.resolve($elems);
        });
    }

    function select(value) {
        if (typeof(value) === 'undefined') {
            return prop('checked', true);
        } else {
            return deferred(function (defer, $elems) {
                $elems.each(function (idx, element) {
                    if ($(element).val() == value) {
                        $(element).prop('checked', true);
                    }
                });
                defer.resolve();
            });
        }
    }

    function eventBehavior(eventName) {
        return function ($elem) {
            if ($elem.prop('tagName') === 'A' && eventName === 'click') {
                var currentPathname = win().prop('location').pathname;
                var target = resolve(dirname(currentPathname), $elem.attr('href'));
                return navigateTo(target)();
            } else {
                var defer = $.Deferred();
                $elem.trigger(eventName);
                defer.resolve();
                return defer.promise();
            }
        }
    }

    var prototype = {
        constructor: element,
        enter: function (value) {
            dslList.push(attr('value', value));
        },
        check: function () {
            dslList.push(prop('checked', true));
        },
        uncheck: function () {
            dslList.push(prop('checked', false));
        },
        select: function (value) {
            dslList.push(select(value));
        },
        click: function () {
            dslList.push(eventBehavior('click'));
        },
        isChecked: function (checkedHandler) {
            dslList.push(prop('checked', checkedHandler));
        },
        isSelected: function (selectedHandler) {
            dslList.push(prop('checked', selectedHandler));
        },
        isDisabled: function (disabledHandler) {
            dslList.push(prop('disabled', disabledHandler));
        },
        option: function (valueOrHandler) {
            dslList.push(option(valueOrHandler));
        },
        options: function () {
            var args = [].slice.call(arguments);
            dslList.push(option(args.length > 1 ? args : args[0]));
        },
        query: function (selectedElementsHandler) {
            dslList.push(query(selectedElementsHandler));
        }
    };

    $(['attr', 'prop', 'css']).each(function (idx, methodName) {
        prototype[methodName] = function (propName, propOrHandler) {
            dslList.push(elementBehavior(methodName, propName, propOrHandler));
        };
    });

    $(['val', 'text', 'count#size', 'html',
        'height', 'innerHeight', 'outerHeight',
        'width', 'innerWidth', 'outerWidth',
        'position', 'scrollLeft', 'scrollTop', 'offset']).each(function (idx, methodName) {
        var names = methodName.split('#');
        prototype[names[0]] = function (valueOrHandler) {
            dslList.push(methodBehavior(names[1] || names[0], valueOrHandler));
        };
    });

    function element(selector) {
        if (this && this.constructor == element) {
            dslList.push(findElement(selector));
        } else {
            return new element(selector);
        }
    }

    element.prototype = prototype;

    return element;
});