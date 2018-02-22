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
    /**
     * Data for forms.
     */
    ZDIALOG_ZONE_CHANGE: 'name_to_change',
    ZDIALOG_ZONE_CHANGED: 'name_changed',
    ZDIALOG_DOMAIN_CHANGE: 'domain.to.change',
    ZDIALOG_DOMAIN_CHANGED: 'domain_change'
};
