const { By } = require('selenium-webdriver');

module.exports = {
    /**
     * Dialog elements.
     */
    ZDIALOG_ZONE_NAME: By.id('zone_name'),
    ZDIALOG_DOMAIN_NAME: By.id('domain_name_zone'),
    ZDIALOG_ADD_DOMAIN: By.id('add_another_domain'),
    ZDIALOG_REMOVE_DOMAIN: By.id('remove_domain'),
    ZDIALOG_CANCEL_BUTTON: By.id('cancel_button'),
    ZDIALOG_SUBMIT: By.id('submit'),
    ZDIALOG_UPDATE: By.id('update'),
    /**
     * Data for forms.
     */
    ZDIALOG_ZONE_CHANGE: 'szczecin',
    ZDIALOG_ZONE_CHANGED: 'koszalin',
    ZDIALOG_DOMAIN_CHANGE: 'domain.to.change'
};
