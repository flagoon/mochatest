const { By, driver, Key, Browser, until } = require("../config/driver");
const { it, describe, afterEach, before } = require("mocha");

describe("Work on google page", function() {
  this.timeout(15000);
  describe("should search for some stuff", function() {
    it("motherfucker", () => {
      driver.get("http://google.pl");
      driver
        .findElement(By.name("b"))
        .then(element => {
          console.log(element);
          if (element) {
            driver.findElement(By.name("q")).sendKeys("Hello World");
          } else {
            driver.findElement(By.name("q")).sendKeys("Dupa Blada");
          }
        })
        .catch(error => {
          if (error.message && error.message.startsWith("no such element")) {
            driver.findElement(By.name("q")).sendKeys("Hurra");
            driver.sleep(10000).then(() => {
              driver.findElement(By.name("q")).sendKeys("huhuhu");
            });
          } else {
            console.log(`---${error.message}---`);
          }
        });
    });
  });
});
