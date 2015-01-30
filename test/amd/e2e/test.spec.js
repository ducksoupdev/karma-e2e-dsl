define(['browser', 'input', 'element', 'drop-down-list', 'dsl', 'assertions/expectations'], function (browser, input, element, dropdownlist, dsl, expect) {

    describe('karma e2e dsl', function () {

        this.timeout(15000);

        beforeEach(dsl(function () {
            browser.navigateTo('/app/index.html');
        }));

        describe('#pause and #resume', function () {

            var selector = '[name="textbox"]';

            it('could resume the pause', dsl(function () {
                // browser.pause();
                input(selector).val('');

                // jasmine style expect
                expect(input(selector).val()).toEqual('');
            }));

        });

        describe('#attr', function () {

            it('could get attribute value of element', dsl(function () {
                // jasmine style expect
                expect(input('input[name="textbox"]').attr('name')).toBe('textbox');
            }));

        });

        describe('#css', function () {

            it('could return css value of element as per css property', dsl(function () {
                // jasmine style expect
                expect(input('input[name="textbox"]').css('font-family')).toEqual('verdana');
            }));

        });

        describe('#html', function () {

            it('could return inner html of element', dsl(function () {
                // jasmine style expect
                expect(element('form').html()).toContain('<legend>Form Elements Test</legend>');
            }));

        });

        describe('#delay', function () {

            var selector = '[name="textbox"]';

            it('could delay the dsl', dsl(function () {
                browser.delay(function () {
                    input(selector).val(function (val) {
                        // jasmine style expect
                        expect(val).toEqual('hello world');
                    });
                }, 20);

                browser.delay(function () {
                    input(selector).enter('hello world!');
                }, 30);

                browser.delay(function () {
                    input(selector).val(function (val) {
                        // jasmine style expect
                        expect(val).toEqual('hello world!');
                    });
                }, 40);

                input(selector).enter('hello world');
            }));


            it('could delay the dsl in nested loop', dsl(function () {
                browser.delay(function () {
                    input(selector).enter('hello world!');

                    browser.delay(function () {
                        input(selector).enter('hello world!!');
                    }, 10);

                }, 20);

                browser.delay(function () {
                    input(selector).val(function (val) {
                        // jasmine style expect
                        expect(val).toEqual('hello world!');
                    });
                }, 25);

                browser.delay(function () {
                    input(selector).val(function (val) {
                        // jasmine style expect
                        expect(val).toEqual('hello world!!');
                    });
                }, 40);

                input(selector).enter('hello world');

            }));

        });

        describe('#sleep', function () {

            var selector = '[name="textbox"]';

            it('could sleep for a while', dsl(function () {
                browser.sleep(200);
                input(selector).enter('hello world!');
                input(selector).val(function (val) {
                    // jasmine style expect
                    expect(val).toEqual('hello world!');
                });
            }));

        });

        describe('input[name="textbox"]', function () {

            var selector = '[name="textbox"]';

            it('could enter text', dsl(function () {
                input(selector).enter('hello world!');
                input(selector).val(function (val) {
                    // jasmine style expect
                    expect(val).toEqual('hello world!');
                });
            }));
        });

        describe('input[name="checkbox"]', function () {

            var selector = '[name="checkbox"]';

            it('could be checked', dsl(function () {
                input(selector).check();
                input(selector).isChecked(function (isChecked) {
                    // jasmine style expect
                    expect(isChecked).toBeTruthy();
                });
            }));

            it('could be unchecked', dsl(function () {
                input(selector).check();
                input(selector).uncheck();
                input(selector).isChecked(function (isChecked) {
                    // jasmine style expect
                    expect(isChecked).toBeFalsy();
                });
            }));

        });

        describe('input[name="radio"]', function () {

            var selectorA = '[name="radio"]:first';
            var selectorB = '[name="radio"]:last';
            var selector = '[name="radio"]';

            it('could be selected', dsl(function () {
                input(selectorA).select();
                input(selectorA).isSelected(function (selected) {
                    // jasmine style expect
                    expect(selected).toBeTruthy();
                });
            }));

            it('could be unselected by value seleting another radio with same name', dsl(function () {
                input(selectorA).select();
                input(selectorB).select();
                input(selectorA).isSelected(function (selected) {
                    // jasmine style expect
                    expect(selected).toBeFalsy();
                });
            }));

            it('could be selected by given value', dsl(function () {
                input(selector).select("1");
                input(selectorA).isSelected(function (selected) {
                    // jasmine style expect
                    expect(selected).toBeTruthy();
                });
            }));

        });

        describe('input[name="button"]', function () {

            it('could be clicked', dsl(function () {
                input('#btn').click();
                element('body').text(function (text) {
                    // jasmine style expect
                    expect(text).toEqual('button clicked!!');
                });
            }));

        });

        describe('input#disabled-btn[name="button"]', function () {

            it('should not be enabled', dsl(function () {
                input('input#disabled-btn[name="button"]').isDisabled(function (disabled) {
                    // jasmine style expect
                    expect(disabled).toBeTruthy();
                });
            }));
        });

        describe('input[type="submit"]', function () {

            it('should not be enabled', dsl(function () {
                input('[type="submit"]').click();
                browser.waitForPageLoad();

                // jasmine style expect
                expect(browser.window.href()).toContain('dropdownlist=1');
                //});
            }));
        });

        describe('select[name="dropdownlist"]', function () {

            var selector = '[name="dropdownlist"]';

            it('could be set to the correct option as per assigned value', dsl(function () {
                dropdownlist(selector).option('2');
                dropdownlist(selector).option(function (value) {
                    // jasmine style expect
                    expect(value).toEqual('2');
                });
            }));

        });

        describe('select[name="multi-select-dropdownlist"]', function () {

            var selector = '[name="multi-select-dropdownlist"]';

            it('could be set to the correct option as per assigned value', dsl(function () {
                dropdownlist(selector).options('1', '4');

                // jasmine style expect
                expect(dropdownlist(selector).options()).toContain('1');

                // jasmine style expect
                expect(dropdownlist(selector).options()).toContain('4');
            }));

        });

        describe('link', function () {

            it('could find the link by normal selector', dsl(function () {
                element('#link').click();
                element('body').text(function (text) {
                    // jasmine style expect
                    expect(text).toContain('this is a demo page !');
                });
            }));

        });

        describe('elements', function () {

            it('could get count of matched elements', dsl(function () {
                element('a').count(function (count) {
                    // jasmine style expect
                    expect(count).toEqual(2);
                });

                element('a').count(function (count) {
                    // jasmine style expect
                    expect(count).toBeLessThan(3);
                });

                element('a').count(function (count) {
                    // jasmine style expect
                    expect(count).toBeGreaterThan(1);
                });
            }));

            describe('get elements inside', function () {

                it('could get elements inside', dsl(function () {
                    element('a').query(function (selectedElements) {
                        // jasmine style expect
                        expect(selectedElements.size()).toEqual(2);
                        expect(selectedElements.eq(0).text()).toEqual('Go to demo');
                    });
                }));
            });
        });

        describe('#browser', function () {

            describe('#navigateTo', function () {
                it('could navigate to target path', dsl(function () {
                    // jasmine style expect
                    expect(browser.window.path()).toMatch(/^\/app\/index.html$/);
                }));
            });

            describe('#window', function () {

                describe('#href', dsl(function () {

                    it('could get the href of page', dsl(function (done) {
                        browser.window.href(function (href) {
                            // jasmine style expect
                            expect(href).toEqual('http://localhost:9876/app/index.html');
                        });
                    }));

                }));

                describe('#path', dsl(function () {

                    it('could get the path of page', dsl(function (done) {
                        browser.navigateTo('/app/index.html?#hello-world');
                        browser.window.path(function (path) {
                            // jasmine style expect
                            expect(path).toEqual('/app/index.html');
                        });
                    }));

                }));

                describe('#hash', dsl(function () {

                    it('could get the hash of page', dsl(function (done) {
                        browser.navigateTo('/app/index.html?#hello-world');
                        browser.window.hash(function (hash) {
                            // jasmine style expect
                            expect(hash).toEqual('#hello-world');
                        });
                    }));

                }));

                describe('#search', dsl(function () {

                    it('could get the search of page', dsl(function (done) {
                        browser.navigateTo('/app/index.html?a=1');
                        browser.window.search(function (search) {
                            // jasmine style expect
                            expect(search).toEqual('?a=1');
                        });
                    }));

                }));

                describe('#reload', function () {

                    it('could reload current page', dsl(function () {
                        browser.reload();
                        browser.window.path(function (path) {
                            // jasmine style expect
                            expect(path).toEqual('/app/index.html');
                        });
                    }));

                });
            });

        });
    });

});