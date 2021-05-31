require("dotenv").config();
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  await page.goto("https://unsplash.com/", {
    waitUntil: "networkidle2",
  });

  // - Acessa a página de login
  await page.click('[href="/login"]');

  // Troque os valores de process.env.UNSPLASH_EMAIL e process.env.UNSPLASH_PASS pelo seu login e senha :)
  await page.type('[name="user[email]"]', process.env.EMAIL, { delay: 200 });
  await page.type("#user_password", process.env.PASSWORD, { delay: 200 });

  await page.click('[type="submit"]');

  await page.waitForNavigation();

  await page.type('[type="search"]', "jungle", { delay: 100 });

  await page.waitForSelector('[title="Search Unsplash"]');

  await page.click('[title="Search Unsplash"]');

  await page.waitForSelector('[class="_2UpQX"]');

  // ACESSAR essa pagina
  await page.goto("https://unsplash.com/photos/jqgsM3B9Fpo");

  // Like nessa coisa
  await page.click('[title="Like photo"]')

  await page.screenshot({ path: "img_print.png" });

  // await browser.close();
})();
