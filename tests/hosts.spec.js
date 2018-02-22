const { describe, it, afterEach, beforeEach } = require('mocha');

describe('Tests on hosts', function hosts() {
    this.timeout(15000);

    /**
     * Should add new host. Work on Burlington zone.
     * Checks if hosts is present.
     */
    it.skip('Should add new host', async () => {
        // open hosts.
        // check if host exists, if not, continue, if yes, delete host :(
        // add new host.
        // In dialog fill correct data
        // submit
        // check if exists
    });

    /**
     * Should delete the host.
     */
    it.skip('Should delete a host', async () => {
        // open hosts.
        // check if host exists. If no, create one, if yes, continue
        // choose delete host.
        // choose OK
        // check if doesn't exists.
    });
});
