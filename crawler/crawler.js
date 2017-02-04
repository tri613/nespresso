const fs = require('fs');
const request = require('request');
const $ = require('cheerio');
const Jimp = require('jimp');
const getPalette = require('get-rgba-palette');

const baseUrl = "https://www.nespresso.com";
const productsUrl = "/tw/zh/pages/coffee-range-original";
const products = [];

(async function () {
  const start = new Date().getTime();
  try {
    products.push(...await getProducts());
    fs.writeFile(`${__dirname}/data.json`, JSON.stringify(products), (err) => {
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
  const details = await getProductDetail(qv);
  const src = baseUrl + self.find("img").attr("src");
  return {
     name: self.attr("data-product-name"),
     flavor: self.attr("data-flavour"),
     image: src,
     color: await getColor(src),
     qv: qv,
     intensity: self.attr("data-intensity"),
     details: details
   };
}

async function getColor(src) {
  const imageColors = await Jimp.read(src)
    .then(image => {
      // return Jimp.intToRGBA(image.getPixelColor(13,12));
      const colors = [];
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        const red   = image.bitmap.data[ idx + 0 ];
        const green = image.bitmap.data[ idx + 1 ];
        const blue  = image.bitmap.data[ idx + 2 ];
        const alpha = image.bitmap.data[ idx + 3 ];
        // colors.push({r:red, g:green, b:blue, a:alpha});
        colors.push(red,green,blue,alpha);
      });
      return Uint8ClampedArray.from(colors);
    });

  const base = getPalette(imageColors, 1)[0];
  return getClosetColor(base);
}

function getClosetColor(base) {
  const palette = [
    {name: "red",    "rgb": [255, 0, 0]},
    {name: "orange", "rgb": [255, 165, 0]},
    {name: "yellow", "rgb": [255, 255, 0]},
    {name: "gold",   "rgb": [250, 211, 116]},
    {name: "brown",  "rgb": [131, 71, 34]},
    {name: "green",  "rgb": [0, 255, 0]},
    {name: "blue",   "rgb": [0, 0, 255]},
    {name: "purple", "rgb": [128, 0, 128]},
    {name: "white",  "rgb": [255, 255, 255]},
    // {name: "gray",   "rgb": [128, 128, 128]},
    {name: "silver", "rgb": [192, 192, 192]},
    {name: "black",  "rgb": [0, 0, 0]}
  ];

  const [baseR, baseG, baseB] = base;
  const closet = palette.reduce((result, color) => {
    const [colorR, colorG, colorB] = color.rgb;
    const diff = Math.sqrt(
      Math.pow(baseR - colorR, 2) +
      Math.pow(baseG - colorG, 2) +
      Math.pow(baseB - colorB, 2)
    );
    if (diff <= result.diff) {
      result = {
        name: color.name,
        diff: diff
      };
    }
    return result;
  }, {name: "unknown", diff: Infinity});

  return {names: [closet.name], rgb: base};
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
