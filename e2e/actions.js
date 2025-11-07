export async function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function click(page, selector, description = "") {
  await page.waitForSelector(selector);
  const elements = await page.$$(selector);
  if (!elements || elements.length === 0) {
    throw new Error(`Aucun élément trouvé pour ${selector}`);
  }

  let target = null;
  if (description) {
    for (const el of elements) {
      const text = await page.evaluate((n) => n.textContent?.trim() || "", el);
      if (text.includes(description)) {
        target = el;
        break;
      }
    }
  }
  if (!target) target = elements[0];

  await page.evaluate((el) => {
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
    if (el && typeof el.click === "function") {
      el.click();
    }
  }, target);
}

export async function fillInput(page, selector, value, description = "") {
  await page.waitForSelector(selector);
  await page.evaluate(
    (sel, val) => {
      const inp = document.querySelector(sel);
      if (!inp) return;
      if (typeof inp.focus === "function") inp.focus();
      inp.value = val;
      inp.dispatchEvent(new Event("input", { bubbles: true }));
    },
    selector,
    value
  );
}

export async function scrollDownUp(page, cycles = 2, step = 400, delay = 10) {
  for (let c = 0; c < cycles; c++) {
    // vers le bas
    await page.evaluate(
      async (s, d) => {
        const total = document.body.scrollHeight;
        let y = 0;
        while (y < total - window.innerHeight) {
          y = Math.min(y + s, total);
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, d));
        }
      },
      step,
      delay
    );

    // vers le haut
    await page.evaluate(
      async (s, d) => {
        let y = window.scrollY;
        while (y > 0) {
          y = Math.max(y - s, 0);
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, d));
        }
      },
      step,
      delay
    );
  }
}

export async function getElementsCount(page, selector) {
  await page.waitForSelector(selector);
  const count = await page.$$eval(selector, (els) => els.length);
  return count;
}

export async function clickByIndex(page, selector, index) {
  await page.waitForSelector(selector);
  const handles = await page.$$(selector);
  const handle = handles[index];
  if (!handle) throw new Error(`Aucun élément à l'index ${index} pour ${selector}`);
  await page.evaluate((el) => {
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
    }
    if (el && typeof el.click === "function") {
      el.click();
    }
  }, handle);
}

export function randomInt(min, max) {
  const a = Math.ceil(min);
  const b = Math.floor(max);
  return Math.floor(Math.random() * (b - a + 1)) + a;
}

export async function clearInput(page, selector) {
  await page.evaluate((sel) => {
    const input = document.querySelector(sel);
    if (input) {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  }, selector);
}

export async function clickByText(page, selector, text) {
  const handle = await page.evaluateHandle(
    (sel, txt) => {
      const elements = Array.from(document.querySelectorAll(sel));
      return (
        elements.find(
          (el) => el.textContent && el.textContent.trim().includes(txt)
        ) || null
      );
    },
    selector,
    text
  );
  if (handle) {
    const element = handle.asElement();
    if (element) {
      await element.click();
      await handle.dispose();
      return true;
    }
  }
  await handle.dispose();
  return false;
}

