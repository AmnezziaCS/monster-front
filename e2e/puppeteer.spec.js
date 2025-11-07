import puppeteer from 'puppeteer'
import {
    clearInput,
    scrollDownUp,
    sleep,
    getElementsCount,
    clickByIndex,
    randomInt,
    clickByText,
} from './actions.js'

async function run() {
    console.log('=== Lancement du script Puppeteer ===')

    const baseUrl = process.env.FRONT_BASE_URL || 'http://localhost:5173'
    console.log('baseUrl =', baseUrl)

    const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH
    const headlessEnv = process.env.HEADLESS
    const slowMoEnv = process.env.SLOWMO
    const headless = headlessEnv ? headlessEnv === 'true' : 'new'
    const slowMo = slowMoEnv ? parseInt(slowMoEnv, 10) : 0

    console.log('headless =', headless)
    console.log('slowMo =', slowMo)
    console.log('executablePath =', executablePath || '(default)')

    const launchOptions = {
        headless,
        slowMo,
        devtools: headless === false,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--start-maximized'],
        defaultViewport: null,
        channel: executablePath ? undefined : 'chrome',
        executablePath: executablePath || undefined,
    }

    console.log('Lancement de Puppeteer...')
    let browser
    try {
        browser = await puppeteer.launch(launchOptions)
    } catch (err) {
        console.error('Erreur au lancement de Puppeteer:', err)
        process.exit(1)
    }

    const page = await browser.newPage()
    page.setDefaultTimeout(20000)

    try {
        console.log('Navigation vers', baseUrl)
        await page.goto(baseUrl, { waitUntil: 'networkidle0' })
        console.log('Page chargée')

        await page.waitForFunction(() =>
            document.body.textContent.includes('Catalogue Monster')
        )
        console.log("Texte d'accueil détecté")

        console.log('Scroll bas/haut')
        await scrollDownUp(page, 1, 500, 5)

        console.log("Navigation vers 'Catalogue'")
        const clickedCatalogue = await clickByText(page, 'nav a', 'Catalogue')
        if (!clickedCatalogue) throw new Error("Lien 'Catalogue' introuvable")

        await page.waitForFunction(() =>
            document.body.textContent.includes('Catalogue Monster Energy')
        )
        console.log('Page Catalogue affichée')

        for (let i = 0; i < 2; i++) {
            console.log(`Catégorie #${i + 1}`)
            const typeHandles = await page.$$(
                'main ul li a, main .container ul li a, ul li a'
            )
            if (!typeHandles || typeHandles.length === 0) {
                console.warn('Aucune catégorie trouvée')
                break
            }
            const idx = Math.min(i, typeHandles.length - 1)
            const typeText = await page.evaluate(
                (el) => el.textContent?.trim() || '',
                typeHandles[idx]
            )
            console.log(`Clique sur la catégorie: "${typeText}"`)
            await typeHandles[idx].click()

            await page.waitForFunction(
                (t) =>
                    document.body.textContent.includes(
                        `Monsters de type: ${t}`
                    ),
                {},
                typeText
            )
            await scrollDownUp(page, 1, 400, 5)
            await clickByText(page, 'nav a', 'Catalogue')
            await page.waitForFunction(() =>
                document.body.textContent.includes('Catalogue Monster Energy')
            )
        }

        /*
        // Sélecteurs
        const selMin = "input[aria-label='Prix min']"
        const selMax = "input[aria-label='Prix max']"

        let sliderMin = null
        let sliderMax = null

        try {
            const sliders = await page.$$(selMin)
            if (sliders.length > 0) sliderMin = sliders[0]

            const slidersMax = await page.$$(selMax)
            if (slidersMax.length > 0) sliderMax = slidersMax[0]
        } catch (err) {
            console.warn(
                'Erreur lors de la récupération des sliders:',
                err.message
            )
        }

        // Vérifie avant de manipuler
        if (sliderMin && sliderMax) {
            console.log(' Sliders détectés — mise à jour des valeurs')
            await page.evaluate(() => {
                const minSlider = document.querySelector(
                    "input[aria-label='Prix min']"
                )
                const maxSlider = document.querySelector(
                    "input[aria-label='Prix max']"
                )
                if (!minSlider || !maxSlider) return

                const newMin = 2.5
                const newMax = 8

                minSlider.value = newMin
                maxSlider.value = newMax

                minSlider.dispatchEvent(new Event('input', { bubbles: true }))
                minSlider.dispatchEvent(new Event('change', { bubbles: true }))
                maxSlider.dispatchEvent(new Event('input', { bubbles: true }))
                maxSlider.dispatchEvent(new Event('change', { bubbles: true }))
            })
            console.log(' Valeurs du slider modifiées')
        } else {
            console.warn(' Aucun slider trouvé (skip)')
        }

       */
        console.log("Retour à l'accueil via le logo")
        await clickByText(page, 'a', 'Monster Front')
        await page.waitForFunction(() =>
            document.body.textContent.includes('Catalogue Monster')
        )

        console.log("Clic sur 'Contact' dans le header")
        const contactClicked = await clickByText(page, 'nav a', 'Contact')
        if (contactClicked) {
            await page.waitForFunction(() =>
                document.body.textContent.toLowerCase().includes('contact')
            )
            console.log('Page Contact affichée')

            console.log('Remplissage du formulaire de contact')
            await page.type('input[name="name"]', 'Hugo Houdini', { delay: 50 })
            await page.type(
                'textarea[name="message"]',
                'Salut, je suis Hugo houdini, je suis pas agressif mais je casse les tetes ',
                { delay: 100 }
            )
            console.log('Clique sur le bouton Envoyer')
            await clickByText(page, 'button', 'Envoyer')

            await page.waitForFunction(() =>
                document.body.textContent.includes(
                    'Merci ! Ton message a été envoyé'
                )
            )
            console.log('Message de confirmation affiché')

            console.log("Retour à l'accueil via le logo")
            await clickByText(page, 'a', 'Monster Front')
            await page.waitForFunction(() =>
                document.body.textContent.includes('Catalogue Monster')
            )
        } else {
            console.warn("Lien 'Contact' introuvable dans le header")
        }

        console.log('Sélection de monstres aléatoires')
        const cardLinkSelector = 'article.monster a, .monster a'
        const cardSelectorFallback = 'article.monster'
        let count = await getElementsCount(page, cardLinkSelector).catch(
            () => 0
        )
        if (count === 0)
            count = await getElementsCount(page, cardSelectorFallback).catch(
                () => 0
            )
        console.log('Nombre de monstres trouvés:', count)

        if (count > 0) {
            const toClick = randomInt(1, Math.min(2, count))
            console.log(`Cliquer sur ${toClick} monstre(s) aléatoire(s)`)
            for (let k = 0; k < toClick; k++) {
                const idx = randomInt(0, count - 1)
                console.log(`Clique sur monstre index ${idx}`)
                if (
                    await getElementsCount(page, cardLinkSelector).catch(
                        () => 0
                    )
                ) {
                    await clickByIndex(page, cardLinkSelector, idx)
                } else {
                    await clickByIndex(page, cardSelectorFallback, idx)
                }
                await sleep(300)
                await clickByText(page, 'a', 'Monster Front')
            }
        }

        console.log('Test recherche par nom/type')
        // Correction: Utilisation de page.$$
        const monsterHandles = await page.$$('article.monster')
        console.log('Monstres visibles:', monsterHandles.length)
        if (monsterHandles.length > 0) {
            const randomIndex = randomInt(0, monsterHandles.length - 1)
            const monsterHandle = monsterHandles[randomIndex]
            const { name, type } = await page.evaluate((el) => {
                const nameEl = el.querySelector('.monster__title')
                const typeEl = el.querySelector('.monster__type')
                return {
                    name: nameEl?.textContent?.trim() || '',
                    type: typeEl?.textContent?.trim() || '',
                }
            }, monsterHandle)

            console.log(`Recherche: name="${name}", type="${type}"`)
            const searchInput =
                (await page.$("input[type='text']")) ||
                (await page.$("input[type='search']")) ||
                (await page.$("input[placeholder*='Rechercher']"))

            if (!searchInput) console.warn('Aucun champ de recherche trouvé')
            else console.log('Champ de recherche détecté')

            if (searchInput) {
                if (name) {
                    await clearInput(page, 'input')
                    await page.type('input', name, { delay: 50 })
                    await sleep(800)
                }
                await clearInput(page, 'input')
                if (type) {
                    await page.type('input', type, { delay: 50 })
                    await sleep(800)
                }
                await clearInput(page, 'input')
            }
        }

        console.log('Test des liens footer')
        await scrollDownUp(page, 1, 500, 5)
        const footerLinks = await page.$$('footer a')
        console.log('Nombre de liens footer:', footerLinks.length)

        for (const link of footerLinks) {
            const text = await page.evaluate(
                (el) => el.textContent?.trim() || '',
                link
            )
            if (!text) continue
            console.log(`Test lien footer: "${text}"`)

            const href = await page.evaluate(
                (el) => el.getAttribute('href') || '',
                link
            )
            const isExternal =
                href && (href.startsWith('http') || href.startsWith('//'))

            try {
                const isVisible = await page.evaluate((el) => {
                    const rect = el.getBoundingClientRect()
                    return (
                        document.body.contains(el) &&
                        rect.width > 0 &&
                        rect.height > 0 &&
                        window.getComputedStyle(el).visibility !== 'hidden'
                    )
                }, link)

                if (!isVisible) {
                    console.warn(`Lien "${text}" invisible, ignoré`)
                    continue
                }

                if (isExternal) {
                    console.log(`Lien externe -> ${href}`)
                    const [newPage] = await Promise.all([
                        browser.waitForTarget(
                            (target) => target.opener() === page.target()
                        ),
                        page.evaluate((el) => {
                            el.setAttribute('target', '_blank')
                            el.click()
                        }, link),
                    ])
                    const newTab = await newPage.page()
                    await newTab.waitForTimeout(1000)
                    await newTab.close()
                    await page.bringToFront()
                } else {
                    console.log(`Lien interne -> ${href}`)
                    await link.click()
                    await sleep(600)
                    const stillOnSite = await page.evaluate(() =>
                        document.body.textContent.includes('Monster')
                    )
                    if (!stillOnSite) {
                        console.warn(
                            `Sorti du site après "${text}", retour à l'accueil`
                        )
                        await clickByText(page, 'a', 'Monster Front')
                        await page.waitForFunction(() =>
                            document.body.textContent.includes(
                                'Catalogue Monster'
                            )
                        )
                    }
                }
            } catch (err) {
                console.warn(
                    `Erreur lors du clic sur "${text}": ${err.message}`
                )
            }
        }

        console.log('Script terminé sans erreur')
        await sleep(1500)
        await browser.close()
        process.exit(0)
    } catch (err) {
        console.error('Erreur attrapée dans le try/catch principal:', err)
        await browser.close()
        process.exit(1)
    }
}

run()
