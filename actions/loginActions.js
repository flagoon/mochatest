const { waitForElement } = require('../config/helpers');
const loginPage = require('../navigation/loginPage');

exports.loginToESD = async driver => {
    await driver.get('localhost:9000');
    await waitForElement(loginPage.LICENSE_BUTTON, driver).click();
    await waitForElement(loginPage.AVID_LOGIN, driver).sendKeys(loginPage.LOGIN_VALUE);
    await driver.findElement(loginPage.AVID_PASSWORD).sendKeys(loginPage.PASSWORD_VALUE);
    await driver.findElement(loginPage.LOGIN_BUTTON).click();
};
