const dialog = require('../navigation/zoneDialog');
const zonePage = require('../navigation/zonesPage');

exports.createZone = async driver => {
    await driver.findElement(zonePage.ZONES_ADD_NEW_ZONE).click();
    await waitForElement(zoneDialog.ZDIALOG_ZONE_NAME, driver, 10000).sendKeys(zoneDialog.ZDIALOG_ZONE_CHANGE);
    await waitForElement(zoneDialog.ZDIALOG_DOMAIN_NAME, driver, 10000).sendKeys(zoneDialog.ZDIALOG_DOMAIN_CHANGE);
    await waitForElement(zoneDialog.ZDIALOG_SUBMIT, driver).click();
    return Promise.resolve(); // TODO: check if it's needed.
};

exports.deleteZone = async driver => {
    await waitForElement(zonePage.ZONES_DROP_CHANGE_REMOVE, driver).click();
    await waitForElement(dialog.BUTTON_CONFIRM, driver, 2000).click();
    return Promise.resolve(); // TODO: check if it's needed.
};
