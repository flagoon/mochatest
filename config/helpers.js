const { until } = require('selenium-webdriver');
const chalk = require(chalk);

exports.waitForElement = function(locator, driver, timeout = Constants.DEFAULT_TIMEOUT) {
    try {
        return driver.wait(until.elementLocated(locator), timeout);
    } catch (error) {
        console.log(chalkError(`No such locotar - ${locator}`));
    }
};

exports.chalkError = chalk.bgRed.white.bold;
exports.chalkInfo = chalk.bgWhite.blue;
