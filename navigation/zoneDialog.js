const { By } = require('selenium-webdriver');

module.exports = {
    /**
     * Dialog elements.
     */
    ZONE_NAME: By.id('zone_name'),
    DOMAIN_NAME: By.id('domain_name_zone'),
    ADD_DOMAIN: By.id('add_another_domain'),
    REMOVE_DOMAIN: By.id('remove_domain'),
    CANCEL_BUTTON: By.id('cancel_button'),
    SUBMIT: By.id('submit'),
    UPDATE: By.id('update'),
    /**
     * Data for forms.
     */
    ZONE_CHANGE: 'szczecin',
    ZONE_CHANGED: 'koszalin',
    DOMAIN_CHANGE: 'domain.to.change'
};
