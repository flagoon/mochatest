const { driver } = require('../config/driver');
const { it, describe, after, before } = require('mocha');
const chalk = require('chalk');
const { waitForElement } = require('../config/helpers');
const { loginToESD } = require('../config/aggregateSteps');
const dialog = require('../pages/zoneDialog');

const chalkShould = chalk.blue.bgWhite;
const chalkError = chalk.red.bgWhite;
const chalkInfo = chalk.yellow.bgRed;

describe('Working on Zones', function zones() {
    // timeout for mocha.
    this.timeout(15000);
    before(async () => {
        loginToESD();
    });

    after(() => {
        driver.quit();
    });

    /**
     * It should create the zone, when already present, it should delete it.
     * Check if zone is present. If yes, then OK, if not, then throw new Error().
     */
    it.skip('Should create new Zone', async () => {});

    /**
     * It should edit the value and it should be true.
     * Check if new name is present. If not, throw Error.
     */
    it.skip('Should edit a zone', async () => {});

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
                .then(() => console.log(chalkShould(`New domain present in zone.`)))
                .catch(error => {
                    throw new Error(`Domain is not present in zones. - ${error}`);
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
                throw new Error(`There is an error dialog after canceling action.`);
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
