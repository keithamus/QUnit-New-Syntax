QUnit.testCase = function (modname, testObj) {
    var oldMethod, key, subTestObj;
    
    //  If first arg is string, then start a module
    if (typeof modname === 'string') {
        QUnit.module(modname, {
            setup: testObj.setup || function (){},
            teardown: testObj.teardown || function (){}
        });
    } else {
        testObj = modname;
    }

    // Loop through testObj to get all tests.
    for (testName in testObj) {
        subTestObj = testObj[testName];

        // Ignore setup/teardown, we've dealt with them.
        if (testName == 'setup' || testName == 'teardown') continue;

        // If it is a function, run it as a tests.
        if (typeof subTestObj === 'function') {
            QUnit.test(testName, subTestObj);

        // If it is an object, run it as a sub-test-case
        } else if(typeof subTestObj === 'object' && subTestObj.constructor === Object) {
            
            // Double check it is an object (ripped from jQuery)
            for (key in subTestObj) {}
            if (key !== undefined && Object.prototype.hasOwnProperty.call(subTestObj, key)) {

                // Override the setup methods to include the parents setup method, so 
                // we can have submodules that inherit their parent modules setups
                (function (newSetup, oldSetup, testObject) {
                    testObject.setup = function () {
                        oldSetup && oldSetup.call(this, arguments);
                        newSetup && newSetup.call(this, arguments);
                    };
                })(subTestObj.setup, testObj.setup, subTestObj);

                (function (newTeardown, oldTeardown, testObject) {
                    testObject.teardown = function () {
                        oldTeardown && oldTeardown.call(this, arguments);
                        newTeardown && newTeardown.call(this, arguments);
                    };
                })(subTestObj.teardown, testObj.teardown, subTestObj);

                // Finally, recurse bitches!
                QUnit.testCase(modname + ': ' + testName, subTestObj);
            }

        }
    }
};
