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
          // @ts-ignore
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

