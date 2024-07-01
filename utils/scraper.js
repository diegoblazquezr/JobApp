const puppeteer = require("puppeteer");
const urlToptal = 'https://www.toptal.com/freelance-jobs/developers/jobs/';
const urlFreelancer = 'https://www.freelancer.es/jobs/php_html_css_javascript_nodejs_java/?featured=true&languages=en';

// Creamos una función para extraer la información de cada oferta de Toptal
const extractProductDataToptal = async (url, browser) => {
    try {
        const toptalData = {}
        const page = await browser.newPage()
        await page.goto(url)

        //titulo
        toptalData['title'] = await page.$eval('h1[data-testid="job-details-title"]', title => title.innerText);
        //descripción
        toptalData['description'] = await page.$eval('div[data-testid="job-description"] > p', description => description.innerText);
        //skills
        toptalData['skills'] = await page.$$eval('.flex.flex-wrap.gap-2 > li', data => data.map(a => a.innerText));
        //localizacion cliente
        toptalData['client_location'] = await page.$eval('.paragraph-xs.text-gray-700:nth-child(4) > p', p => p.innerText)
        //link al job
        toptalData['url'] = url;

        return toptalData // Devuelve los datos de un oferta
    }
    catch (err) {
        return { error: err }
    }
}

// Creamos una función para extraer la información de cada oferta de Freelancer
const extractProductDataFreelancer = async (url, browser) => {
    try {
        const freelancerData = {}
        const page = await browser.newPage()
        await page.goto(url);

        //titulo
        freelancerData['title'] = await page.$eval('h1', title => title.innerText);
        //descripción (limitado a 300 caracteres)
        let description = await page.$eval('fl-text[class="Project-description"] > div', description => description.innerHTML);
        description = description.replace(/\n\s*/g, ' ');
        if (description.length > 200) {
            description = description.substring(0, 300) + '...';
        }
        freelancerData['description'] = description
        //skills (limitado a 3 skills, devuelve 5 en total)
        let skills = await page.$$eval('div[_ngcontent-webapp-c598].ng-star-inserted > fl-tag > fl-link > a > div > fl-text > span > div', skills => skills.map(a => a.innerText));
        skills = skills.slice(0, 3)
        freelancerData['skills'] = skills
        //localizacion cliente
        freelancerData['client_location'] = await page.$eval('app-project-view-logged-out-client-info > div:nth-child(2) > fl-text > div', location => location.innerText)
        //link al job
        freelancerData['url'] = url;

        return freelancerData // Devuelve los datos de un oferta
    }
    catch (err) {
        return { error: err }
    }
}

const scrap = async (url1, url2) => {
    try {
        const scrapedData = []
        // inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
        console.log("Opening the browser......");
        const browser = await puppeteer.launch({ headless: false })

        // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page1 = await browser.newPage();

        // Scrap URL1 (Toptal)
        await page1.goto(url1);
        console.log(`Navigating to ${url1}...`);

        const tmpurls1 = await page1.$$eval('h3[data-testid="project-card-title"] > a', data => data.map(a => a.href))
        const urls1 = await tmpurls1.filter((link, index) => { return tmpurls1.indexOf(link) === index })
        console.log("url capuradas", urls1)
        const urlsSlice1 = urls1.slice(0, 5);

        console.log(`${urlsSlice1.length} links encontrados`);
        console.log(urlsSlice1);

        for (jobLink in urlsSlice1) {
            const job = await extractProductDataToptal(urlsSlice1[jobLink], browser)
            scrapedData.push(job)
        }

        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length)

        await page1.close()

        // SCRAP URL2 (Freelancer)

        // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page2 = await browser.newPage();
        // await page2.goto(url2, { waitUntil: 'networkidle2', timeout: 0});
        await page2.goto(url2);
        console.log(`Navigating to ${url2}...`);

        const tmpurls2 = await page2.$$eval('a[class="JobSearchCard-primary-heading-link"]', data => data.map(a => a.href))
        const urls2 = await tmpurls2.filter((link, index) => { return tmpurls2.indexOf(link) === index })
        console.log("url capuradas", urls2)
        const urlsSlice2 = urls2.slice(0, 0);

        console.log(`${urlsSlice2.length} links encontrados`);
        console.log(urlsSlice2);

        for (jobLink in urlsSlice2) {
            const job = await extractProductDataFreelancer(urlsSlice2[jobLink], browser)
            scrapedData.push(job)
        }

        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length)

        await page2.close();
        await browser.close()

        return scrapedData;

    } catch (err) {
        console.log("Error:", err);
    }
}

exports.scrap = scrap;

/********** DESCOMENTAR PARA PROBAR *********/
// scrap(urlToptal, urlFreelancer).then(data => console.log(data))