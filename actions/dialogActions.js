const dialog = require('../navigation/zoneDialog');
const { clickWebElement } = require('../config/helpers');

exports.clickSubmit = async driver => {
    clickWebElement(dialog.SUBMIT, driver, 'Submit was clicked', "Couldn't find submit button");
};
