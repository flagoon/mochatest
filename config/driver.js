const { Builder, By, until, Key } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chai = require('chai');

exports.buildDriver = () => {
    const chromeCapabilities = webdriver.Capabilities.chrome();
    const chromeOptions = {
        args: [
            '--test-type',
            '--start-maximized',
            '--disable-web-security',
            '--ignore-certificate-errors'
        ]
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    return new Builder().withCapabilities(chromeCapabilities).build();
};

exports.chai = chai;
exports.By = By;
exports.until = until;
exports.Key = Key;
