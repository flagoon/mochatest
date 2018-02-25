const { until } = require('selenium-webdriver');
const Constants = require('../config/Constants');

const chalk = require('chalk');

const chalkError = chalk.bgRed.white.bold;
const chalkInfo = chalk.bgWhite.blue;

const waitForElement = function(locator, driver, timeout = Constants.DEFAULT_TIMEOUT) {
    try {
        return driver.wait(until.elementLocated(locator), timeout);
    } catch (error) {
        console.log(chalkError(`No such locotar - ${locator}`));
    }
};

exports.waitForElement = waitForElement;

exports.clickWebElement = async function(locator, driver, success, error) {
    await waitForElement(locator, driver)
        .then(async element => {
            await element.click();
            console.log(chalkInfo(success));
        })
        .catch(() => {
            throw new Error(chalkError(error));
        });
};

exports.chalkError = chalk.bgRed.white.bold;
exports.chalkInfo = chalk.bgWhite.blue;
