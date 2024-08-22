import assert from "assert";
import './booking.tests.js';
import './post.tests.js';
import './users.tests.js';
import './review.tests.js'


describe("behind-the-veil-siteroot", function () {
  it("package.json has correct name", async function () {
    const { name } = await import("../package.json");
    assert.strictEqual(name, "behind-the-veil-siteroot");
  });

  if (Meteor.isClient) {
    it("client is not server", function () {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it("server is not client", function () {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
