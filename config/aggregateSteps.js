const { until } = require('selenium-webdriver');
const chalk = require('chalk');
const chalkShould = chalk.blue.bgWhite;
const chalkError = chalk.red.bgWhite;
const Constants = require('./Constants');
const dialog = require('../navigation/dialogs');
const loginPage = require('../navigation/loginPage');
const zonePage = require('../navigation/zonesPage');
const zoneDialog = require('../navigation/zoneDialog');

const waitForElement = function(
    locator,
    driver,
    timeout = Constants.DEFAULT_TIMEOUT
) {
    try {
        return driver.wait(until.elementLocated(locator), timeout);
    } catch (error) {
        console.log(chalkError(`${error} - ${locator}`));
    }
};

exports.waitForElement = waitForElement;

exports.loginToESD = async driver => {
    await driver.get('localhost:9000');
    await waitForElement(loginPage.LICENSE_BUTTON, driver).click();
    await waitForElement(loginPage.AVID_LOGIN, driver).sendKeys(
        loginPage.LOGIN_VALUE
    );
    await driver
        .findElement(loginPage.AVID_PASSWORD)
        .sendKeys(loginPage.PASSWORD_VALUE);
    await driver.findElement(loginPage.LOGIN_BUTTON).click();
};

exports.createZone = async driver => {
    await driver.findElement(zonePage.ZONES_ADD_NEW_ZONE).click();
    await waitForElement(zoneDialog.ZDIALOG_ZONE_NAME, driver, 10000).sendKeys(
        zoneDialog.ZDIALOG_ZONE_CHANGE
    );
    await waitForElement(
        zoneDialog.ZDIALOG_DOMAIN_NAME,
        driver,
        10000
    ).sendKeys(zoneDialog.ZDIALOG_DOMAIN_CHANGE);
    await waitForElement(zoneDialog.ZDIALOG_SUBMIT, driver).click();
    return Promise.resolve();
};

exports.deleteZone = async driver => {
    await waitForElement(zonePage.ZONES_DROP_CHANGE_REMOVE, driver).click();
    await waitForElement(dialog.BUTTON_CONFIRM, driver, 2000).click();
    return Promise.resolve();
};
