import puppeteer from "puppeteer";
import {
  click,
  clearInput,
  scrollDownUp,
  sleep,
  getElementsCount,
  clickByIndex,
  randomInt,
} from "./actions.js";

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

    // 3) Cliquer sur n catégories puis revenir à Catalogue entre chaque
    for (let i = 0; i < 3; i++) {
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

    // 4.1) Sur la page d'accueil, cliquer sur 1 ou 2 monsters aléatoires
    // Essaye d'abord les liens à l'intérieur des cartes
    const cardLinkSelector = "article.monster a, .monster a";
    const cardSelectorFallback = "article.monster";
    let count = 0;
    try {
      count = await getElementsCount(page, cardLinkSelector);
    } catch {
      count = 0;
    }
    if (count === 0) {
      try {
        count = await getElementsCount(page, cardSelectorFallback);
      } catch {
        count = 0;
      }
    }
    if (count > 0) {
      const toClick = randomInt(1, Math.min(2, count));
      for (let k = 0; k < toClick; k++) {
        const idx = randomInt(0, count - 1);
        if (await getElementsCount(page, cardLinkSelector).catch(() => 0)) {
          await clickByIndex(page, cardLinkSelector, idx);
        } else {
          await clickByIndex(page, cardSelectorFallback, idx);
        }
        // petite attente et retour à l'accueil
        await sleep(300);
        await click(page, ".brand", "Monster Front");
        await page.waitForSelector(".page-title");
      }
    }
    // 5) Recherche par nom et par type (aléatoire + scroll entre les deux)

   // const isMac = process.platform === "darwin";
   // const modifierKey = isMac ? "Meta" : "Control";

    // Récupère la liste de tous les monstres visibles sur la page
    const monsterHandles = await page.$$("article.monster");

    if (monsterHandles.length > 0) {
      // Choisit un monstre aléatoire
      const randomIndex = randomInt(0, monsterHandles.length - 1);
      const monsterHandle = monsterHandles[randomIndex];

      // Extrait son nom et son type depuis le DOM
      const { name, type } = await page.evaluate((el) => {
        const nameEl = el.querySelector(".monster__title");
        const typeEl = el.querySelector(".monster__type");
        return {
          name: nameEl?.textContent?.trim() || "",
          type: typeEl?.textContent?.trim() || "",
        };
      }, monsterHandle);

      console.log(`E2E: recherche aléatoire avec "${name}" (${type})`);

      // Recherche par nom
      if (name) {
        console.log(`E2E: recherche par nom → ${name}`);
        await page.click(".search__input");
        await page.type(".search__input", name, { delay: 50 });
        await sleep(800); 
      }

     //clear input 
     await clearInput(page,".search__input");
      // Recherche par type
      if (type) {
        console.log(`E2E: recherche par type → ${type}`);
        await page.click(".search__input");
        await page.type(".search__input", type, { delay: 50 });
        await sleep(800);
      }
      await clearInput(page,".search__input");

    } else {
      console.warn(
        "Aucun monstre trouvé sur la page pour effectuer les recherches"
      );
    }

    // 6) Footer: cliquer tous les liens cliquables
    await scrollDownUp(page, 1, 500, 5);
    const footerLinkHandles = await page.$$("footer a");
    for (const link of footerLinkHandles) {
      const text = await page.evaluate(
        (el) => el.textContent?.trim() || "",
        link
      );
      await click(page, "footer a", text);
      await sleep(100);
      // revenir à l'accueil si route changée
      await click(page, ".brand", "Monster Front");
      await page.waitForSelector(".page-title");
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
