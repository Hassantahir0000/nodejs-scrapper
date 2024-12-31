const puppeteer = require("puppeteer");

async function scrapeProductData(url) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Extract page content
    const data = await page.evaluate(() => {
      const title = document
        .querySelector("h1.page-title span.base")
        ?.innerText.trim();
      const sku = document
        .querySelector(".sku")
        ?.innerText.trim()
        .replace("SKU: ", "");
      const description = document
        .querySelector(".product-att")
        ?.innerText.trim();
      const detailedDescription = document
        .querySelector(
          "#description\\.tab .product.attribute.description .value"
        )
        ?.innerText.trim();

      // Extract features
      const features = [];
      document
        .querySelectorAll(
          "#additional .data.table.additional-attributes tbody tr"
        )
        .forEach((el) => {
          const featureLabel = el.querySelector("th").innerText.trim();
          const featureValue = el.querySelector("td").innerText.trim();
          features.push({ featureLabel, featureValue });
        });

      // Extract images
      const images = [];
      document.querySelectorAll(".gallery-placeholder img").forEach((el) => {
        images.push(el.getAttribute("src"));
      });

      return {
        title,
        sku,
        description,
        detailedDescription,
        features,
        images,
      };
    });
    await browser.close();

    return data; // Return scraped data
  } catch (error) {
    console.error("Error scraping data:", error);
  }
}

async function scrapeMultipleProducts(urls) {
  // Create an array to hold all the scraped data
  const allData = [];

  // Loop over the list of URLs and scrape each one
  for (let url of urls) {
    const data = await scrapeProductData(url);
    allData.push({ url, ...data }); // Store data along with the URL
  }

  console.log("Scraped data from all URLs:");
  console.log(allData);

  // Optionally, return all the data
  return allData;
}

// List of URLs to scrape
const urlsToScrape = [
  "https://www.premierhousewares.com/lyon-2-door-natural-rattan-and-oak-cabinet-5528694.html",
  "https://www.premierhousewares.com/gabelle-console-table-5527832.html",
  "https://www.premierhousewares.com/jakara-natural-wooden-cabinet-5528073.html",
  "https://www.premierhousewares.com/templar-gold-finish-beaded-coffee-table-5527833.html",
  "https://www.premierhousewares.com/flori-1-drawer-draw-side-table-with-hairpin-legs-2406261.html",
  "https://www.premierhousewares.com/lyon-4-door-natural-rattan-and-oak-sideboard-5528695.html",
  "https://www.premierhousewares.com/gabor-side-table-5529231.html",
  "https://www.premierhousewares.com/lyon-oak-wood-sideboard-2404973.html",
  "https://www.premierhousewares.com/lyon-rattan-and-oak-wood-two-drawer-chest-5528691.html",
  "https://www.premierhousewares.com/doha-side-table-5528577.html",
  "https://www.premierhousewares.com/gabor-coffee-table-5529232.html",
  "https://www.premierhousewares.com/corso-three-door-sideboard-5527882.html",
  "https://www.premierhousewares.com/gabelle-square-side-table-5527831.html",
  "https://www.premierhousewares.com/gabo-large-coffee-table-5527562.html",
  "https://www.premierhousewares.com/trento-set-of-2-side-tables-5502693.html",
  "https://www.premierhousewares.com/jakara-sideboard-with-metal-legs-5528067.html",
  "https://www.premierhousewares.com/trento-coffee-table-with-black-glass-top-5502683.html",
  "https://www.premierhousewares.com/covent-sideboard-5527865.html",
  "https://www.premierhousewares.com/gabor-console-table-5529234.html",
  "https://www.premierhousewares.com/sherman-white-wood-side-cabinet-2406553.html",
  "https://www.premierhousewares.com/corso-one-drawer-bedside-table-5527879.html",
  "https://www.premierhousewares.com/depok-coffee-table-with-hairpin-legs-2406748.html",
  "https://www.premierhousewares.com/depok-nest-of-two-tables-2406750.html",
  "https://www.premierhousewares.com/corso-console-table-5527880.html",
  "https://www.premierhousewares.com/brando-sideboard-5529083.html",
  "https://www.premierhousewares.com/jakara-natural-finish-wooden-coffee-table-5528069.html",
  "https://www.premierhousewares.com/gabelle-rectangle-coffee-table-5527572.html",
  "https://www.premierhousewares.com/jakara-natural-finish-wooden-media-unit-5528071.html",
  "https://www.premierhousewares.com/corso-coffee-table-5527885.html",
  "https://www.premierhousewares.com/ramus-black-and-white-ombre-side-table-5509138.html",
  "https://www.premierhousewares.com/doha-coffee-table-5528576.html",
  "https://www.premierhousewares.com/sherman-white-wood-console-table-2406550.html",
  "https://www.premierhousewares.com/depok-rectangular-console-table-2406749.html",
];

// Call the function to scrape multiple URLs
scrapeMultipleProducts(urlsToScrape);
