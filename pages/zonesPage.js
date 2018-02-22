const { By } = require("../config/driver");

module.exports = {
  /**
   * Website elements
   */
  HEADER_LOGO: By.className("header__logo"),
  ZONES_PANEL: By.id("zones_panel"),
  ZONES_COLLAPSE: By.id("zone-collapse"),
  ZONES_ADD_NEW_ZONE: By.id("zone_add"),
  ZONES_DROP_CHANGE: By.id("name_to_change_drop"),
  ZONES_DROP_CHANGE_EDIT: By.id("name_to_change_drop_edit"),
  ERROR: By.id("ERROR")
};
