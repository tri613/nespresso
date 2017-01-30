const fs = require('fs');
const request = require('request');
const $ = require('cheerio');

const baseUrl = "https://www.nespresso.com";
const productsUrl = "/tw/zh/pages/coffee-range-original";
const products = [];

(async function () {
  const start = new Date().getTime();
  try {
    products.push(...await getProducts());
    fs.writeFile("./data.json", JSON.stringify(products), "utf8", (err) => {
        if (err) throw err;
        const end = new Date().getTime();
        console.log(`Data saved! Time cost: ${(end-start) / 1000} seconds.`);
    });
  } catch(e) {
    console.log(e);
  }
})();

function fetchBody(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if(response.statusCode === 200) {
        resolve(body);
      } else {
        reject(err);
      }
    });
  });
}

async function getProducts() {
  const body = await fetchBody(baseUrl+productsUrl);
  return Promise.all(
    $(body).find(".product").map(await modifyProductInfo).get()
  );
}

async function modifyProductInfo(i, node) {
  const self = $(node);
  const qv = self.attr("data-qv");
  const detail = await getProductDetail(qv);
  return {
     name: self.attr("data-product-name"),
     flavor: self.attr("data-flavour"),
     image: self.find("img").attr("src"),
     qv: qv,
     intensity: self.attr("data-intensity"),
     details: detail
   };
}

async function getProductDetail(qv) {
    const detailBody = await fetchBody(baseUrl+qv);
    const self = $(detailBody);
    const wrap = self.find(".description > .section").eq(0);
    wrap.find("style").remove();
    const subtitle = wrap.find("h2").text().replace(/\n/g, '').trim();
    const description = wrap.find("p").text().replace(/\n/g, '').trim();
    return {subtitle, description};
}
