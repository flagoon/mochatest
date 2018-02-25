const { Builder, By, until, Key } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

exports.buildDriver = () => {
    const chromeCapabilities = webdriver.Capabilities.chrome();
    const chromeOptions = {
        args: ['--test-type', '--start-maximized', '--disable-web-security', '--ignore-certificate-errors']
    };
    chromeCapabilities.set('chromeOptions', chromeOptions);
    return new Builder().withCapabilities(chromeCapabilities).build();
};
exports.By = By;
exports.until = until;
exports.Key = Key;
