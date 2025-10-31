import puppeteer from "puppeteer";
import { click, fillInput, scrollDownUp, sleep } from "./actions.js";

async function run() {
  const baseUrl = process.env.FRONT_BASE_URL || "http://localhost:5173";
  console.log(`E2E: lancement du navigateur → ${baseUrl}`);

  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  const headlessEnv = process.env.HEADLESS;
  const slowMoEnv = process.env.SLOWMO;
  const headless = headlessEnv ? headlessEnv === "true" : "new";
  const slowMo = slowMoEnv ? parseInt(slowMoEnv, 10) : 0;

  const launchOptions = {
    headless,
    slowMo,
    devtools: headless === false,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized"],
    defaultViewport: null,
    channel: executablePath ? undefined : "chrome",
    executablePath: executablePath || undefined,
  };

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();
  page.setDefaultTimeout(20000);

  try {
    // 1) Accueil
    await page.goto(baseUrl, { waitUntil: "networkidle0" });
    await page.waitForSelector(".page-title");
    const titleText = await page.$eval(".page-title", (el) =>
      el.textContent?.trim()
    );
    if (!titleText || !titleText.includes("Catalogue Monster")) {
      throw new Error(`Titre inattendu: ${titleText}`);
    }

    // 1.0) Scroll bas/haut deux cycles
    await scrollDownUp(page, 2, 500, 5);

    // 2) Aller au Catalogue depuis le header
    await click(page, "nav .nav__link", "Catalogue");
    await page.waitForFunction(
      () =>
        !!document.querySelector("h1") &&
        document
          .querySelector("h1")
          ?.textContent?.includes("Catalogue Monster Energy")
    );

    // 3) Cliquer sur 4-5 catégories puis revenir à Catalogue entre chaque
    for (let i = 0; i < 2; i++) {
      const links = await page.$$("main .container ul li a, ul li a");
      if (!links || links.length === 0) {
        console.warn("Aucun type trouvé dans le catalogue");
        break;
      }
      const idx = Math.min(i, links.length - 1);
      const typeText = await page.evaluate(
        (el) => el.textContent?.trim() || "",
        links[idx]
      );
      await click(page, "main .container ul li a, ul li a", typeText);
      await page.waitForFunction(
        (t) => {
          const h1 = document.querySelector("h1");
          return !!h1 && h1.textContent?.includes(`Monsters de type: ${t}`);
        },
        {},
        typeText
      );
      await page.waitForSelector(
        "article.monster, section > div > article.monster"
      );
      // Faire défiler pour voir les produits
      await scrollDownUp(page, 1, 400, 5);

      // Retour à Catalogue via header
      await click(page, "nav .nav__link", "Catalogue");
      await page.waitForFunction(() =>
        document
          .querySelector("h1")
          ?.textContent?.includes("Catalogue Monster Energy")
      );
    }

    // 4) Retour accueil via logo/brand
    await click(page, ".brand", "Monster Front");
    await page.waitForSelector(".page-title");

    // 5) Recherche par nom et par type
    const firstName = await page
      .$eval(
        "article.monster .monster__title",
        (el) => el.textContent?.trim() || ""
      )
      .catch(() => "");
    if (firstName) {
      await fillInput(page, ".search__input", firstName, "Recherche par nom");
      await sleep(300);
    }
    // Nettoyer
    await fillInput(page, ".search__input", "", "Reset recherche");
    // Recherche par type: lire depuis la première carte visible si dispo
    const firstType = await page
      .$eval(
        "article.monster .monster__type",
        (el) => el.textContent?.trim() || ""
      )
      .catch(() => "");
    if (firstType) {
      await fillInput(
        page,
        ".search__input",
        firstType,
        "Recherche par type (champ unique)"
      );
      await sleep(300);
    }

    console.log("E2E: OK ");
    await browser.close();
    process.exit(0);
  } catch (err) {
    console.error("E2E: ÉCHEC ", err);
    await browser.close();
    process.exit(1);
  }
}

run();
