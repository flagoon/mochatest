const { By } = require('../config/driver');

module.exports = {
    /**
     * Website elements
     */
    LICENSE_BUTTON: By.className('button__license'),
    AVID_LOGIN: By.name('avid-login'),
    AVID_PASSWORD: By.name('avid-password'),
    LOGIN_BUTTON: By.className('button__login'),
    /**
     * Values for form.
     */
    LOGIN_VALUE: 'avid',
    PASSWORD_VALUE: 'Avid123'
};
