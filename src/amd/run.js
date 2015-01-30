define(['jquery'], function($) {

    return function run(arr, idx) {
        var defer = $.Deferred();
        var i = idx || 0;
        var task = arr[i];
        var args = [].slice.call(arguments, 2);

        if (task) {
            task.apply(task, args).then(function () {
                var args = [].slice.call(arguments);
                run.apply(this, [arr, ++i].concat(args));
            });
        } else {
            defer.resolve();
        }

        return defer.promise();
    };

});