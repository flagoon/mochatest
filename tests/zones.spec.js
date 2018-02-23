const { it, describe, afterEach, beforeEach, addContex } = require('mocha');
const chalk = require('chalk');
const chalkShould = chalk.bgWhite.blue;
const chalkExpected = chalk.yellow;
const chalkError = chalk.red;
const chalkInfo = chalk.white.bgYellow;
const { buildDriver } = require('../config/driver');
const { waitForElement } = require('../config/aggregateSteps');
const zonePage = require('../navigation/zonesPage');
const dialog = require('../navigation/dialogs');
const {
    loginToESD,
    deleteZone,
    createZone
} = require('../config/aggregateSteps');
const zoneDialog = require('../navigation/zoneDialog');
let driver;

describe('Working on Zones', function() {
    // timeout for mocha.
    this.timeout(50000);
    beforeEach(async function() {
        driver = buildDriver();
        loginToESD(driver);
    });

    it('Should create new Zone', async () => {
        await waitForElement(zonePage.ZONES_PANEL, driver)
            .then(element => {
                element.click();
                console.log(chalkShould(`Zones should be clicked.`));
            })
            .catch(error =>
                console.log(
                    chalkError(`Zones were not pressed/found - ${error}`)
                )
            );
        await waitForElement(zonePage.ZONES_DROP_CHANGE, driver)
            .then(async element => {
                await element.click();
                console.log(chalkShould('Drop icon should be pressed.'));
                deleteZone(driver);
            })
            .catch(() => console.log(chalkShould(`No zone to delete`)));
        await waitForElement(zonePage.ZONES_ADD_NEW_ZONE, driver)
            .then(async element => {
                console.log(chalkShould('Add new zone found'));
                await driver.sleep(2000); // delay for new zone button.
                element.click();
            })
            .catch(error =>
                console.log(chalkError(`New zone is not clickable - ${error}`))
            );
        await waitForElement(
            zoneDialog.ZDIALOG_ZONE_NAME,
            driver,
            10000
        ).sendKeys(zoneDialog.ZDIALOG_ZONE_CHANGE);
        await waitForElement(
            zoneDialog.ZDIALOG_DOMAIN_NAME,
            driver,
            10000
        ).sendKeys(zoneDialog.ZDIALOG_DOMAIN_CHANGE);
        await waitForElement(zoneDialog.ZDIALOG_SUBMIT, driver).then(
            element => {
                console.log(chalkShould('submit'));
                element.click();
                console.log(chalk.yellow('Zone created'));
            }
        );
        await driver.sleep(2000);

        await driver
            .findElement(zonePage.ZONES_CREATED_ZONE)
            .then(() => console.log(chalk.blue('Correctly created!')))
            .catch(error => {
                console.log(
                    chalk.red.bgWhite(`Zone was not created - ${error}`)
                );
                throw new Error();
            });
        driver.quit();
    });

    it.skip('Should edit a zone', async () => {
        await waitForElement(zonePage.ZONES_PANEL, driver).click();

        await waitForElement(zonePage.ZONES_DROP_CHANGE, driver).click();
        await waitForElement(zonePage.ZONES_DROP_CHANGE_EDIT, driver).click();
        await waitForElement(zoneDialog.ZDIALOG_DOMAIN_NAME, driver).clear();
        waitForElement(zonePage.ERROR, driver, 5000)
            .then(() => console.log('none!'))
            .catch(error => console.log(`HUEHUEHUE ${error}`));
        await waitForElement(zoneDialog.ZDIALOG_ZONE_NAME, driver).clear();
        await waitForElement(zoneDialog.ZDIALOG_UPDATE, driver).click();
    });

    it.only('Should delete a zone', async function() {
        await waitForElement(zonePage.ZONES_PANEL, driver)
            .then(element => {
                element.click();
                console.log(chalkShould(`Zones should be clicked.`));
            })
            .catch(error =>
                console.log(
                    chalkError(`Zones were not pressed/found - ${error}`)
                )
            );

        await waitForElement(zonePage.ZONES_DROP_CHANGE, driver, 2000)
            .then(() => {
                console.log(chalkShould(`Checking if zone can be deleted.`));
            })
            .catch(async () => {
                console.log(chalkShould('Creating zone'));
                await createZone(driver);
                console.log(chalkShould('Zone created'));
            });

        await waitForElement(zonePage.ZONES_DROP_CHANGE, driver, 2000)
            .then(async element => {
                await element.click().then(() => {
                    console.log(chalkShould('Trying to delete'));
                    deleteZone(driver);
                    console.log(chalkShould('Deleted the zone'));
                });
            })
            .catch(error => {
                throw new Error(
                    chalkError(`There is no zone to delete - ${error}`)
                );
            });

        await driver
            .findElements(zonePage.ZONES_DROP_CHANGE, driver, 5000)
            .then(() => {
                throw new Error(chalkError('Zone is still visible in DOM.'));
            })
            .catch(() => {
                console.log(chalkInfo(`There is no zone in DOM.`));
            });
    });

    /**
     * It should delete the zone, if not present, create one first.
     * Check if zone is present. If no, then correct, if yes, then throw new Error().
     */
    it.skip('Should delte a zone', async () => {
        // check if zone is present.
        await driver
            .findElements(/ *xpath to removed domain */)
            .then(async () => {
                // No elements with that xpath. May be error.
                throw new Error(`Element was not deleted!`);
            })
            .catch(async () => {
                console.log(chalkInfo(`Element deleted correctly.`));
            });
    });

    /**
     * Add another domain to zone. Working on domain created before.
     * Open zones, open created zone, press plus, put new domain, save.
     * Burlington should have 2 domains! One to keep, one to change. Third to create/delete.
     * Check if domain is present.
     */
    it.skip('Should add another domain to zone', async () => {
        // steps to show zones.

        await waitForElement(/* link to new zone */)
            .then(element => {
                element.click(); // open dialog.
            })
            .catch(error => {
                console.log(chalkError(`Edit for zone not avaible - ${error}`));
                throw new Error();
            });

        // check how many domain are in this zone.
        await driver
            .findElements(/* id: trash button, or className */)
            .then(elements => {
                const elementsLength = elements.length;
                if (elementsLength > 2) {
                    for (let i = elementsLength; i > 2; i--) {
                        // trash bin elements
                        elements[i].click(); // should remove trash! Maybe dialog with confiramtion needed.
                    }
                }
            })
            .catch(error => {
                throw new Error(`No domains present! - ${error}`);
            });
        // only one domain should be present.
        await waitForElement(dialog.ZDIALOG_ADD_DOMAIN)
            .then(element => {
                console.log(chalkShould('Add domain should be clicked'));
                element.click();
            })
            .catch(error => {
                throw new Error(`No plus sign present = ${error}`);
            });
        await waitForElement(/* new Input window to add domain */)
            .then(element => {
                element.sendKeys(dialog.ZONE_NEW_DOMAIN);
                console.log(chalkShould(`New domain should be inputed.`));
            })
            .catch(error => {
                throw new Error(`No new input present - ${error}`);
            });
        await waitForElement(dialog.ZDIALOG_UPDATE).then(async element => {
            element.click();
            console.log(`Update button should be clicked.`);
            // if asked for confirmation, give one.

            await driver
                .findElement(/* xpath to new domain */)
                .then(() =>
                    console.log(chalkShould(`New domain present in zone.`))
                )
                .catch(error => {
                    throw new Error(
                        `Domain is not present in zones. - ${error}`
                    );
                });
        });
    });

    /**
     * Creating zone with same name should not be possible.
     * Checks if error window occurs.
     */
    it.skip('Should throw error when zone with same name is created', async () => {
        // open zones,
        // create new Zone with same name as Burlington.
        // after submit:
        await waitForElement(/* className to swal2 */)
            .then(() => console.log(chalkShould(`Error occured as planed.`)))
            .catch(error => {
                throw new Error(`There was no error dialog! - ${error}`);
            });
    });

    /**
     * Pressing cancel after submitin new Zone should not throw error.
     * Check if error window presents. If yes, throw error.
     */
    it.skip('Should not show error dialog after cancelig creating new Zone', async () => {
        // it's easier to work on completly new zone
        // create new zone, insted of submitting, press cancel
        // there should be no error present.
        await waitForElement(/* className to swal2 */)
            .then(() => {
                throw new Error(
                    `There is an error dialog after canceling action.`
                );
            })
            .catch(() => console.log(chalkInfo(`There is no error `))); // correct.
    });

    /**
     * Removing domain will not show errors.
     */
    it.skip('Should delete domains correctly', async () => {
        // open Burlington
        // add domain
        // check if domain present
        // open Burlingon
        // delete last domain
        // check if domain present, if no then OK.
    });

    /**
     * Changing domains should not produce errors.
     */
    it.skip('Should change domain without problem', async () => {
        // open Burlington
        await waitForElement(/* path to domain in second input */)
            .then(element => {
                element.sendKeys(/* put second domain */);
                console.log(chalkShould('Domain should be changed.'));
            })
            .catch(async () => {
                // if there is other domain in second input, place there other domain.
                await driver
                    .findElement(/* input to other domain */)
                    .then(element => {
                        element.sendKeys(/* first domain */);
                        console.log(chalkShould('Domain changed'));
                    })
                    .catch(error => {
                        throw new Error(`No known domain present. - ${error}`);
                    });
            })
            .finally(async () => {
                await waitForElement(dialog.ZDIALOG_UPDATE).then(element => {
                    element.click();
                    console.log(chalkShould('Update should be clicked'));
                    driver.sleep(2000);
                });
            });
        await waitForElement(/* xpath to one domain */)
            .then(() => driver.quit())
            .catch(async () => {
                await waitForElement(/* xpath to other domain */)
                    .then(() => driver.quit())
                    .catch(error => {
                        throw new Error(`No domain created - ${error.message}`);
                    });
            });
    });
});
