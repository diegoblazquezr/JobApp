const puppeteer = require("puppeteer");
const urlToptal = 'https://www.toptal.com/freelance-jobs/developers/jobs/';
const urlUpwork = 'https://www.upwork.com/freelance-jobs/website-development/';

// Creamos una función para extraer la información de cada oferta
const extractProductDataToptal = async (url, browser) => {
    try {
        // Creamos un objeto vacío donde almacenaremos la información de cada oferta
        const toptalData = {}
        // Abrimos una nueva pestaña
        const page = await browser.newPage()
        // Accedemos al link de cada oferta que nos llega por parámetros
        await page.goto(url)

        // Utilizamos el método newPage.$eval(selector, function) y almacenamos en toptalData:

        /********** A RELLENAR todos los page.$eval(selector, function)  *********/
        //titulo
        toptalData['title'] = await page.$eval('h1[data-testid="job-details-title"]', title => title.innerText);
        //descripción
        toptalData['description'] = await page.$eval('div[data-testid="job-description"] > p', description => description.innerText);
        //skills
        toptalData['skills'] = await page.$$eval('.flex.flex-wrap.gap-2 > li', data => data.map(a => a.innerText));
        //localizacion cliente
        toptalData['clientLocation'] = await page.$eval('.paragraph-xs.text-gray-700:nth-child(4) > p', p => p.innerText)
        //info
        toptalData['url'] = url;

        return toptalData // Devuelve los datos de un oferta
    }
    catch (err) {
        // Devolvemos el error 
        return { error: err }
    }
}

// Creamos una función para extraer la información de cada oferta
const extractProductDataUpwork = async (url, browser) => {
    try {
        // Creamos un objeto vacío donde almacenaremos la información de cada oferta
        const upworkData = {}
        // Abrimos una nueva pestaña
        const page = await browser.newPage()
        // Accedemos al link de cada oferta que nos llega por parámetros
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Utilizamos el método newPage.$eval(selector, function) y almacenamos en toptalData:

        /********** A RELLENAR todos los page.$eval(selector, function)  *********/
        //titulo
        upworkData['title'] = await page.$eval('h4[class="m-0"][data-v-78643a09]', title => title.innerText);
        //descripción
        upworkData['description'] = await page.$eval('div[data-test="Description"] > p', description => description.innerText);
        //skills
        upworkData['skills'] = await page.$$eval('.air3-badge.air3-badge-highlight.badge.disabled', skills => skills.map(a => a.innerText));
        //localizacion cliente
        upworkData['clientLocation'] = await page.$eval('li[data-qa="client-location"] > strong', location => location.innerText)
        //info
        upworkData['url'] = url;

        return upworkData // Devuelve los datos de un oferta
    }
    catch (err) {
        // Devolvemos el error 
        return { error: err }
    }
}


const scrap = async (url1, url2) => {
    try {
        // Creamos un array vacío scrapedData donde almacenaremos la información obtenida del scraping
        const scrapedData = []
        // inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
        console.log("Opening the browser......");
        const browser = await puppeteer.launch({ headless: true })

        // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page1 = await browser.newPage();
        // Indicamos la url1 que debe cargarse en la pestaña con page.goto(url1)
        await page1.goto(url1);
        console.log(`Navigating to ${url1}...`);

        // Extraemos todos los links a los que luego navegaremos para obtener el detalle de cada oferta

        // Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos
        // En este caso , en el CB filtramos el array de items, guardando en un nuevo array

        /********** A RELLENAR page.$eval(selector, function)  *********/
        const tmpurls1 = await page1.$$eval('h3[data-testid="project-card-title"] > a', data => data.map(a => a.href))

        //Quitamos los duplicados
        const urls1 = await tmpurls1.filter((link, index) => { return tmpurls1.indexOf(link) === index })

        console.log("url capuradas", urls1)
        // Me quedo con los 20 primeros productos, porque sino es muy largo
        const urlsSlice1 = urls1.slice(0, 5);

        // Filtramos los productos
        // Extraemos el dato de cada oferta
        // await extractProductDataToptal(urls2[productLink],browser)

        console.log(`${urlsSlice1.length} links encontrados`);
        console.log(urlsSlice1);

        // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractProductDataToptal por cada link en el array. Luego pusheamos el resultado a scraped data
        for (jobLink in urlsSlice1) {
            const job = await extractProductDataToptal(urlsSlice1[jobLink], browser)
            scrapedData.push(job)
        }

        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length)

        // cerramos el browser con el método browser.close
        await page1.close()


        // MISMO PROCESO URL2

        // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        // const page2 = await browser.newPage();
        // Indicamos la url1 que debe cargarse en la pestaña con page.goto(url1)
        const page2 = await browser.newPage();
        await page2.goto(url2);
        console.log(`Navigating to ${url2}...`);

        // Extraemos todos los links a los que luego navegaremos para obtener el detalle de cada oferta

        // Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos
        // En este caso , en el CB filtramos el array de items, guardando en un nuevo array

        /********** A RELLENAR page.$eval(selector, function)  *********/
        const tmpurls2 = await page2.$$eval('a[data-qa="job-title"]', data => data.map(a => a.href))

        //Quitamos los duplicados
        const urls2 = await tmpurls2.filter((link, index) => { return tmpurls2.indexOf(link) === index })

        console.log("url capuradas", urls2)
        // Me quedo con los 20 primeros productos, porque sino es muy largo
        const urlsSlice2 = urls2.slice(0, 5);

        // Filtramos los productos
        // Extraemos el dato de cada oferta
        // await extractProductDataUpwork(urls2[productLink],browser)

        console.log(`${urlsSlice2.length} links encontrados`);
        console.log(urlsSlice2);

        // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractProductDataUpwork por cada link en el array. Luego pusheamos el resultado a scraped data
        for (jobLink in urlsSlice2) {
            const job = await extractProductDataUpwork(urlsSlice2[jobLink], browser)
            scrapedData.push(job)
        }

        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length)

        // cerramos el browser con el método browser.close
        await page2.close();
        await browser.close()

        // Devolvemos el array con los productos
        return scrapedData;

    } catch (err) {
        console.log("Error:", err);
    }
}

exports.scrap = scrap;

/********** DESCOMENTAR PARA PROBAR *********/
scrap(urlToptal, urlUpwork).then(data => console.log(data))