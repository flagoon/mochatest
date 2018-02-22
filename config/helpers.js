const Constants = require("./Constants");
const { until } = require("selenium-webdriver");
const { driver } = require("./driver");

exports.waitForElement = (locator, timeout = Constants.DEFAULT_TIMEOUT) =>
  driver.wait(until.elementLocated(locator), timeout);
