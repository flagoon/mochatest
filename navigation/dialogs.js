const { By } = require('selenium-webdriver');

module.exports = {
    BUTTON_ERROR: By.id('swal2-title'),
    BUTTON_CONFIRM: By.className('swal2-confirm'),
    BUTTON_CANCEL: By.className('swal2-cancel')
};
