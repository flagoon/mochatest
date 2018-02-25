const dialog = require('../navigation/zoneDialog');
const zonePage = require('../navigation/zonesPage');
const { clickWebElement, waitForElement, chalkError, chalkInfo } = require('../config/helpers');

exports.createZone = async driver => {
    await driver.findElement(zonePage.ZONES_ADD_NEW_ZONE).click();
    await waitForElement(dialog.ZDIALOG_ZONE_NAME, driver, 10000).sendKeys(dialog.ZDIALOG_ZONE_CHANGE);
    await waitForElement(dialog.ZDIALOG_DOMAIN_NAME, driver, 10000).sendKeys(dialog.ZDIALOG_DOMAIN_CHANGE);
    await waitForElement(dialog.ZDIALOG_SUBMIT, driver).click();
    return Promise.resolve(); // TODO: check if it's needed.
};

exports.deleteZone = async driver => {
    await waitForElement(zonePage.ZONES_DROP_CHANGE_REMOVE, driver).click();
    await waitForElement(dialog.BUTTON_CONFIRM, driver, 2000).click();
    return Promise.resolve(); // TODO: check if it's needed.
};

exports.showZonePane = async driver => {
    await waitForElement(zonePage.ZONES_PANEL, driver)
        .then(element => {
            element.click();
            console.log(chalkInfo(`Zones should be clicked.`));
        })
        .catch(error => console.log(chalkError(`Zones were not pressed/found - ${error}`)));
};

exports.checkIfElementExists = async (locator, driver) => {
    await driver
        .findElement(locator)
        .then(() => false)
        .catch(() => true);
};

exports.clickZoneOptions = async driver => {
    clickWebElement(zonePage.ZONES_DROP_CHANGE, driver, 'Found element to delete.', 'No zone to delete.');
};
exports.clickAddNewZone = async driver => {
    await clickWebElement(
        zonePage.ZONES_ADD_NEW_ZONE,
        driver,
        'Clicked add new zone button',
        'Add new zone button is not clickable'
    );
};
