const puppeteer = require("puppeteer");

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


const scrap = async (url) => {
    try {
        // Creamos un array vacío scrapedData donde almacenaremos la información obtenida del scraping
        const scrapedData = []
        // inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
        console.log("Opening the browser......");
        const browser = await puppeteer.launch({ headless: false })

        // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page = await browser.newPage();
        // Indicamos la url que debe cargarse en la pestaña con page.goto(url)
        await page.goto(url);
        console.log(`Navigating to ${url}...`);

        // Extraemos todos los links a los que luego navegaremos para obtener el detalle de cada oferta

        // Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos
        // En este caso , en el CB filtramos el array de items, guardando en un nuevo array

        /********** A RELLENAR page.$eval(selector, function)  *********/
        const tmpurls = await page.$$eval('h3[data-testid="project-card-title"] > a', data => data.map(a => a.href))

        //Quitamos los duplicados
        const urls = await tmpurls.filter((link, index) => { return tmpurls.indexOf(link) === index })

        console.log("url capuradas", urls)
        // Me quedo con los 20 primeros productos, porque sino es muy largo
        const urls2 = urls.slice(0, 5);

        // Filtramos los productos
        // Extraemos el dato de cada oferta
        // await extractProductDataToptal(urls2[productLink],browser)

        console.log(`${urls2.length} links encontrados`);
        console.log(urls2);

        // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractProductDataToptal por cada link en el array. Luego pusheamos el resultado a scraped data
        for (productLink in urls2) {
            const job = await extractProductDataToptal(urls2[productLink], browser)
            scrapedData.push(job)
        }

        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length)

        // cerramos el browser con el método browser.close
        await browser.close()
        // Devolvemos el array con los productos
        return scrapedData;

    } catch (err) {
        console.log("Error:", err);
    }
}

exports.scrap = scrap;

/********** DESCOMENTAR PARA PROBAR *********/
// scrap("https://www.toptal.com/freelance-jobs/developers/jobs/").then(data => console.log(data))