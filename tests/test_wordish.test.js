const { Builder, By, Key, until } = require("selenium-webdriver");
require("chromedriver");
const assert = require("assert");
PORT = 3500;
describe("Wordish App", function () {
  this.timeout(30000); // increase timeout for webdriver

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("Loads the homepage", async function () {
    await driver.get(`http://localhost:${PORT}`);
    const title = await driver.getTitle();
    assert.ok(title.includes("Wordish"));
  });

  it("Allows entering a word", async function () {
    await driver.get(`http://localhost:${PORT}`);

    // example: press buttons for CRANE
    for (const letter of "CRANE") {
      let letter_button = await driver.findElement(By.id(letter));
      await letter_button.click();
    }

    const ent_button = await driver.findElement(By.id("entButton"));
    await ent_button.click();

    // wait for some UI change - adapt selector to your app
    const guessRow = await driver.wait(
      until.elementLocated(By.id("guess1")),
      5000
    );

    result = "";
    let tiles = await guessRow.findElements(By.className("tile"));
    for (let tile of tiles) {
      result += await tile.getText();
    }
    assert.ok(result === "CRANE");
  });

  it("Rejects invalid words", async function () {
    await driver.get(`http://localhost:${PORT}`);

    for (const letter of "ADRES") {
      let letter_button = await driver.findElement(By.id(letter));
      await letter_button.click();
    }

    const ent_button = await driver.findElement(By.id("entButton"));
    await ent_button.click();

    await driver.wait(until.alertIsPresent());
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    await alert.accept();

    assert.equal(alertText, "ADRES is not a word ='(");
  });

  it("Correctly resets game after refresh", async function () {
    await driver.get(`http://localhost:${PORT}`);

    const t_button = await driver.findElement(By.id("T"));
    const actions = driver.actions({ async: true });
    await actions.move({ origin: t_button }).perform();
    for (const letter of "CRANE") {
      let letter_button = await driver.findElement(By.id(letter));
      await letter_button.click();
    }

    const ent_button = await driver.findElement(By.id("entButton"));
    await ent_button.click();

    let guessRow = await driver.wait(
      until.elementLocated(By.id("guess1")),
      5000
    );

    await driver.navigate().refresh();

    guessRow = await driver.findElement(By.id("guess1"));

    result = "";
    let tiles = await guessRow.findElements(By.className("tile"));
    for (let tile of tiles) {
      result += await tile.getText();
    }

    assert.equal(result, "");
  });

  it("Dark mode setting", async function () {
    await driver.get(`http://localhost:${PORT}`);

    const dark_switch = await driver.findElement(By.name("darkmode"));
    await dark_switch.click();

    let body = await driver.wait(until.elementLocated(By.css("body")));
    let body_class = await body.getAttribute("class");
    assert.equal(body_class, "dark");
  });

  it("Light mode setting", async function () {
    await driver.get(`http://localhost:${PORT}`);

    const dark_switch = await driver.findElement(By.name("darkmode"));
    await dark_switch.click();

    body = await driver.wait(until.elementLocated(By.css("body")));
    body_class = await body.getAttribute("class");
    assert.equal(body_class, "");
  });
});
