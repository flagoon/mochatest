const { Builder, By, until, Key, Browser } = require("selenium-webdriver");
const webdriver = require("selenium-webdriver");
const chai = require("chai");
const chaiWebdriver = require("chai-webdriver");
const chromeCapabilities = webdriver.Capabilities.chrome();
const chromeOptions = {
  args: [
    "--test-type",
    "--start-maximized",
    "--disable-web-security",
    "--ignore-certificate-errors"
  ]
};
chromeCapabilities.set("chromeOptions", chromeOptions);
const driver = new Builder().withCapabilities(chromeCapabilities).build();
chai.use(chaiWebdriver(driver));

exports.chai = chai;
exports.driver = driver;
exports.By = By;
exports.until = until;
exports.Key = Key;
