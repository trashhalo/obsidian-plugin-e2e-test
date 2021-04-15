const Application = require("spectron").Application;
const { assert } = require("chai");
const fs = require("fs");

describe("Plugin", function () {
  this.timeout(10000);

  beforeEach(async function () {
    let path = process.env.OBSIDIAN_PATH;
    if (!path) {
      path = "/obsidian/obsidian";
    }
    this.app = new Application({ path });
    await this.app.start();
    const client = this.app.client;

    // Open the vault. Webdriver hates file picker dialogs.
    await client.execute(
      "require('electron').ipcRenderer.sendSync('vaultOpen', 'test/empty_vault', false)"
    );
    await client.windowByIndex(1);
    await (await client.$(".empty-state-title")).waitForExist();
    // Disable safemode and turn on our plugin
    await client.execute(
      "app.plugins.setEnable(true);app.plugins.enablePlugin('obsidian-sample-plugin')"
    );
    // Dismiss warning model and get out of settings
    await (await client.$(".modal-button-container button:last-child")).click();
    await (await client.$(".modal-close-button")).click();
  });

  afterEach(function () {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it("adds command", async function () {
    const client = this.app.client;
    await (
      await client.$(
        '.side-dock-ribbon-action[aria-label="Open command palette"]'
      )
    ).click();
    await (await client.$(".prompt-input")).keys("Sample Plugin");
    await (await client.$(".suggestion-item")).click();
    await (await client.$('//*[text()="Woah!"]')).isExisting();
  });
});
