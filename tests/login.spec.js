const { driver } = require("../config/driver");
const { it, describe, after } = require("mocha");
const { waitForElement } = require("../config/helpers");
const loginPage = require("../pages/loginPage");
const zonePage = require("../pages/zonesPage");

describe.skip("Login to service", () => {
  // timeout for mocha.
  this.timeout(15000);

  after(() => {
    driver.quit();
  });

  it("Should open the website and login to ESD", async () => {
    await driver.get("localhost:9000");
    waitForElement(loginPage.LICENSE_BUTTON).click();
    await waitForElement(loginPage.AVID_LOGIN).sendKeys(loginPage.LOGIN_VALUE);
    await driver
      .findElement(loginPage.AVID_PASSWORD)
      .sendKeys(loginPage.PASSWORD_VALUE);
    await driver.findElement(loginPage.LOGIN_BUTTON).click();
    // after login, AVID logo should be visible.
    await waitForElement(zonePage.HEADER_LOGO);
  });
});
