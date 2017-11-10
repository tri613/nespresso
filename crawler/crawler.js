var ColorThief  = require('color-thief-jimp');
var phantom = require('phantom');
var Crawler = require('spa-crawler/lib/index')

var crawler = new Crawler({
  rndr: {
    // The single page app should emit this event
    // when it is done rendering each page
    readyEvent: 'rendered'
  },
  // The initial url of the single page app
  app: 'http://localhost:8080'
})

// Start out crawler when your app is ready and listen for urls
crawler.start().crawler
  // Log each url
  .on('spaurl', console.log.bind(console))
  // When the crawler is done, kill the process
  .on('complete', () => process.exit(0))

// (async function() {
//   const instance = await phantom.create();
//   const page = await instance.createPage();
//   await page.on('onResourceRequested', function (requestData) {
//     console.info('Requesting', requestData.url);
//   });

//   const status = await page.open('http://localhost:8080/#/');
//   const content = await page.property('content');
//   console.log(content);

//   await instance.exit();
// })();
