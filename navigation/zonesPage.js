const { By } = require('../config/driver');

module.exports = {
    /**
     * Website elements
     */
    ZONES_PANEL: By.id('zones_panel'),
    ZONES_COLLAPSE: By.id('zone-collapse'),
    ZONES_ADD_NEW_ZONE: By.id('zone_add'),
    ZONES_DROP_CHANGE: By.id('szczecin_drop'),
    ZONES_DROP_CHANGE_EDIT: By.id('szczecin_drop_edit'),
    ZONES_DROP_CHANGE_REMOVE: By.id('szczecin_drop_delete'),
    ZONES_CREATED_ZONE: By.xpath(
        `//div[contains(@class, 'zone-title') and contains(., 'szczecin')]`
    ),
    ERROR: By.id('ERROR')
};
