define(['jquery', 'run'], function($, run) {

    var dslList = [];
    var delayCount = 0;

    function doneBlock(done) {
        return function () {
            var defer = $.Deferred();
            defer.then(done);
            defer.resolve();
            return defer.promise();
        };
    }

    function refreshDoneBlock(dsls, done) {
        if (typeof(done) !== 'undefined') {
            if (dsls.loadedDone) {
                dsls.pop();
            }
            dsls.push(doneBlock(done));
            dsls.loadedDone = true;
        }
        return dsls;
    }

    return function dsl(loadCases) {
        return function (done) {
            dslList = [];
            loadCases();
            refreshDoneBlock(dslList, done);
            if (delayCount == 0) {
                run(dslList);
            }
        };
    }

});