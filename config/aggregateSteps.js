const { driver } = require('./driver');
const { waitForElement } = require('./helpers');
const loginPage = require('../pages/loginPage');
const zonePage = require('../pages/zonesPage');
const zoneDialog = require('../pages/zoneDialog');

exports.loginToESD = async function() {
    await driver.get('localhost:9000');
    await waitForElement(loginPage.LICENSE_BUTTON).click();
    await waitForElement(loginPage.AVID_LOGIN).sendKeys(loginPage.LOGIN_VALUE);
    await driver.findElement(loginPage.AVID_PASSWORD).sendKeys(loginPage.PASSWORD_VALUE);
    await driver.findElement(loginPage.LOGIN_BUTTON).click();
    // after login, AVID logo should be visible.
    await waitForElement(zonePage.HEADER_LOGO);
};

exports.createZone = async function() {
    //await waitForElement(zonePage.ZONES_PANEL).click();
    driver.findElement(zonePage.ZONES_ADD_NEW_ZONE).click();
    await waitForElement(zoneDialog.ZDIALOG_ZONE_NAME, 10000).sendKeys(zoneDialog.ZDIALOG_ZONE_CHANGE);
    waitForElement(zoneDialog.ZDIALOG_DOMAIN_NAME, 10000).sendKeys(zoneDialog.ZDIALOG_DOMAIN_CHANGE);
    waitForElement(zoneDialog.ZDIALOG_SUBMIT).click();
    await driver.sleep(2000);
};
