// Adapted Selenium script for Node.js
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function PB_Compras() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the website
        await driver.get("http://localhost:5173/");
        await driver.manage().window().setRect({ width: 1936, height: 1048 });

        // Start shopping
        await driver.findElement(By.linkText("Start now !")).click()
    await driver.findElement(By.css("#men\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(1) .\\_addButton_1egr8_84")).click()
    await driver.findElement(By.css("#men\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(2) .\\_addButton_1egr8_84 path")).click()
    {
      const element = await driver.findElement(By.css("#men\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(2) .\\_addButton_1egr8_84 path"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#men\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(3) .\\_addButton_1egr8_84")).click()
    {
      const element = await driver.findElement(By.css("#men\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(3) .\\_addButton_1egr8_84"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#men\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(4) .\\_addButton_1egr8_84 > svg")).click()
    {
      const element = await driver.findElement(By.css("#men\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(4) .\\_addButton_1egr8_84 > svg"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#women\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(1) .\\_addButton_1egr8_84")).click()
    {
      const element = await driver.findElement(By.css("#women\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(1) .\\_addButton_1egr8_84"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#women\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(2) .\\_addButton_1egr8_84")).click()
    await driver.findElement(By.css("#women\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(3) .\\_addButton_1egr8_84 > svg")).click()
    await driver.findElement(By.css("#women\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(4) .\\_addButton_1egr8_84 > svg")).click()
    await driver.findElement(By.css("#women\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(5) .\\_addButton_1egr8_84 > svg")).click()
    {
      const element = await driver.findElement(By.css("#women\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(5) .\\_addButton_1egr8_84 > svg"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#women\\\'s\\ clothing .\\_boxProduct_1egr8_1:nth-child(6) .\\_addButton_1egr8_84")).click()
    await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(1) .\\_addButton_1egr8_84 > svg")).click()
    {
      const element = await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(1) .\\_addButton_1egr8_84 > svg"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(2) .\\_addButton_1egr8_84 > svg")).click()
    await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(3) .\\_addButton_1egr8_84")).click()
    await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(4) .\\_addButton_1egr8_84 > svg")).click()
    {
      const element = await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(4) .\\_addButton_1egr8_84 > svg"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(5) .\\_addButton_1egr8_84 > svg")).click()
    await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(6) .\\_addButton_1egr8_84")).click()
    {
      const element = await driver.findElement(By.css("#electronics .\\_boxProduct_1egr8_1:nth-child(6) .\\_addButton_1egr8_84"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#jewelery .\\_boxProduct_1egr8_1:nth-child(1) .\\_addButton_1egr8_84")).click()
    await driver.findElement(By.css("#jewelery .\\_boxProduct_1egr8_1:nth-child(2) .\\_addButton_1egr8_84 > svg")).click()
    await driver.findElement(By.css("#jewelery .\\_boxProduct_1egr8_1:nth-child(3) .\\_addButton_1egr8_84")).click()
    {
      const element = await driver.findElement(By.css("#jewelery .\\_boxProduct_1egr8_1:nth-child(3) .\\_addButton_1egr8_84"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#jewelery .\\_boxProduct_1egr8_1:nth-child(4) .\\_addButton_1egr8_84 > svg")).click()
    {
      const element = await driver.findElement(By.css("#jewelery .\\_boxProduct_1egr8_1:nth-child(4) .\\_addButton_1egr8_84 > svg"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css(".\\_quantityProducts_j1xjm_65")).click()
    await driver.findElement(By.css(".\\_buyButton_1e7nd_84")).click()
    await driver.findElement(By.name("email")).click()
    await driver.findElement(By.name("email")).sendKeys("Prueba@gmail.com")
    await driver.findElement(By.name("firstName")).sendKeys("Daniel")
    await driver.findElement(By.name("lastName")).sendKeys("Ramos")
    await driver.findElement(By.name("dni")).sendKeys("78856612")
    await driver.findElement(By.name("cellPhone")).click()
    await driver.findElement(By.name("cellPhone")).sendKeys("101010101")
    await driver.findElement(By.css("section:nth-child(1)")).click()
    await driver.findElement(By.name("country")).click()
    {
      const dropdown = await driver.findElement(By.name("country"))
      await dropdown.findElement(By.xpath("//option[. = 'Perú']")).click()
    }
    {
      const element = await driver.findElement(By.name("address"))
      await driver.actions({ bridge: true }).moveToElement(element).clickAndHold().perform()
    }
    {
      const element = await driver.findElement(By.css("section:nth-child(2)"))
      await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    }
    await driver.findElement(By.css("section:nth-child(2)")).click()
    await driver.findElement(By.name("address")).click()
    {
      const element = await driver.findElement(By.name("department"))
      await driver.actions({ bridge: true }).moveToElement(element).clickAndHold().perform()
    }
    {
      const element = await driver.findElement(By.css("section:nth-child(2) > .\\_inputBox_bnhk9_1:nth-child(4)"))
      await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    }
    await driver.findElement(By.css("section:nth-child(2)")).click()
    {
      const dropdown = await driver.findElement(By.name("department"))
      await dropdown.findElement(By.xpath("//option[. = 'Lima']")).click()
    }
    await driver.findElement(By.name("province")).click()
    {
      const dropdown = await driver.findElement(By.name("province"))
      await dropdown.findElement(By.xpath("//option[. = 'Callao']")).click()
    }
    await driver.findElement(By.name("district")).click()
    {
      const dropdown = await driver.findElement(By.name("district"))
      await dropdown.findElement(By.xpath("//option[. = 'Ventanilla']")).click()
    }
    await driver.findElement(By.name("address")).click()
    await driver.findElement(By.name("address")).sendKeys("CasaEjemplo")
    await driver.findElement(By.css("section:nth-child(2)")).click()
    await driver.findElement(By.css("div:nth-child(3) .\\_optionText_t638d_33")).click()
    await driver.findElement(By.css(".\\_finalizeOrderButton_tp2fd_62")).click()
    await driver.executeScript("window.scrollTo(0,0)")
    await driver.findElement(By.linkText("Return to the store")).click()

    } catch (error) {
        console.error("Test encountered an error:", error);
    } finally {
        await driver.quit();
    }
})();
