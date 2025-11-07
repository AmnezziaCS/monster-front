import puppeteer from "puppeteer";
import {
  click,
  clearInput,
  scrollDownUp,
  sleep,
  getElementsCount,
  clickByIndex,
  randomInt,
  clickByText,
} from "./actions.js";



async function run() {
  const baseUrl = process.env.FRONT_BASE_URL || "http://localhost:5173";

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
  page.setDefaultTimeout(15000);

  try {
    // 1) Accueil
    await page.goto(baseUrl, { waitUntil: "networkidle0" });
    await page.waitForFunction(() =>
      document.body.textContent.includes("Catalogue Monster")
    );

    // 1.0) Scroll bas/haut deux cycles
    await scrollDownUp(page, 1, 500, 5);

    // 2) Aller au Catalogue via texte du lien
    const clickedCatalogue = await clickByText(page, "nav a", "Catalogue");
    if (!clickedCatalogue) throw new Error("Lien 'Catalogue' introuvable");
    await page.waitForFunction(() =>
      document.body.textContent.includes("Catalogue Monster Energy")
    );

    // 3) Cliquer sur quelques catégories puis revenir à Catalogue
    for (let i = 0; i < 3; i++) {
      const typeHandles = await page.$$(
        "main ul li a, main .container ul li a, ul li a"
      );
      if (!typeHandles || typeHandles.length === 0) {
        console.warn("⚠️ Aucun type trouvé dans le catalogue");
        break;
      }
      const idx = Math.min(i, typeHandles.length - 1);
      const typeText = await page.evaluate(
        (el) => el.textContent?.trim() || "",
        typeHandles[idx]
      );
      await typeHandles[idx].click();

      await page.waitForFunction(
        (t) => document.body.textContent.includes(`Monsters de type: ${t}`),
        {},
        typeText
      );

      await scrollDownUp(page, 1, 400, 5);

      // retour catalogue
      await clickByText(page, "nav a", "Catalogue");
      await page.waitForFunction(() =>
        document.body.textContent.includes("Catalogue Monster Energy")
      );
    }

    // 4) Retour accueil via texte du logo / brand
    await clickByText(page, "a", "Monster Front");
    await page.waitForFunction(() =>
      document.body.textContent.includes("Catalogue Monster")
    );

    // 4.1) Cliquer sur 1 ou 2 monsters aléatoires
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
        await sleep(300);
        await clickByText(page, "a", "Monster Front");
        await page.waitForFunction(() =>
          document.body.textContent.includes("Catalogue Monster")
        );
      }
    }

    // 5) Recherche par nom et type
    await clickByText(page, "a", "Monster Front");
    await page.waitForFunction(() =>
      document.body.textContent.includes("Catalogue Monster")
    );

    const monsterHandles = await page.$$("article.monster");
    if (monsterHandles.length === 0) {
      console.warn("⚠️ Aucun monstre trouvé pour la recherche");
    } else {
      const randomIndex = randomInt(0, monsterHandles.length - 1);
      const monsterHandle = monsterHandles[randomIndex];

      const { name, type } = await page.evaluate((el) => {
        const nameEl = el.querySelector(".monster__title");
        const typeEl = el.querySelector(".monster__type");
        return {
          name: nameEl?.textContent?.trim() || "",
          type: typeEl?.textContent?.trim() || "",
        };
      }, monsterHandle);


      const searchInput =
        (await page.$("input[type='text']")) ||
        (await page.$("input[type='search']")) ||
        (await page.$("input[placeholder*='Rechercher']"));

      if (!searchInput) {
        console.warn("⚠️ Aucun champ de recherche trouvé, on saute cette étape.");
      } else {
        const inputSelector = await page.evaluateHandle((el) => el, searchInput);
        if (name) {
          await inputSelector.asElement().click();
          await page.evaluate((el) => (el.value = ""), inputSelector);
          await page.type("input", name, { delay: 50 });
          await sleep(800);
        }
        await clearInput(page, "input");

        if (type) {
          await page.type("input", type, { delay: 50 });
          await sleep(800);
        }
        await clearInput(page, "input");
      }
    }

    // 6) Footer : clic sur tous les liens
    await scrollDownUp(page, 1, 500, 5);
    const footerLinks = await page.$$("footer a");

    for (const link of footerLinks) {
      const text = await page.evaluate(
        (el) => el.textContent?.trim() || "",
        link
      );
      if (text) {
        try {
          await link.click();
          await sleep(500); // petite pause pour éviter conflit navigation
          await clickByText(page, "a", "Monster Front");
          await page.waitForFunction(() =>
            document.body.textContent.includes("Catalogue Monster")
          );
        } catch (e) {
          console.warn(`⚠️ Erreur sur clic footer "${text}": ${e.message}`);
        }
      }
    }

    //  Pause avant fermeture pour s'assurer que tout est fini
    await sleep(1500);

    await browser.close();
  } catch (err) {
    console.error("E2E: ÉCHEC ", err);
    try {
      await browser.close();
    } catch {}
    process.exit(1);
  }
}

run();
