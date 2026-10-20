// Requires local Playwright and Chrome. DRAWRY_PLAYWRIGHT_MODULE may select an
// existing Playwright installation; no package installation or network is used.
'use strict';
const {chromium} = require(process.env.DRAWRY_PLAYWRIGHT_MODULE || 'playwright');
const path = require('node:path');
const {pathToFileURL} = require('node:url');

(async () => {
  const browser = await chromium.launch({headless:true,channel:'chrome'});
  try {
    const page = await browser.newPage({viewport:{width:1440,height:1200},deviceScaleFactor:1});
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const ready = async () => {
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => [...document.images].every(i => i.complete && i.naturalWidth));
    };
    await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
    await ready();
    const images = page.locator('.concept-card .phone[data-mode=light] .painted-photo');
    const largest = await images.evaluateAll(nodes => {
      const result = {};
      nodes.forEach((node,index) => {
        const rect = node.getBoundingClientRect(), name = node.dataset.photo;
        const area = rect.width * rect.height;
        if (!result[name] || area > result[name].area) result[name] = {index,area};
      });
      return result;
    });
    // Compose the original photo and the existing SVG in the browser. PDFs use
    // these pixels; normal HTML keeps the original image and vector layers.
    for (const [name,{index}] of Object.entries(largest)) {
      if (!/^[a-z][a-z0-9-]*$/.test(name)) throw new Error('Invalid photo asset name');
      // Render at the source image's integer dimensions, outside the scaled
      // phone frame. This avoids rounding and coloured edge pixels in dark PDFs.
      await images.nth(index).evaluate(node => {
        const image = node.querySelector('img'), clone = node.cloneNode(true);
        clone.id = 'print-asset-capture';
        Object.assign(clone.style, {
          position:'fixed',left:'0',top:'0',zIndex:'9999',margin:'0',
          width:`${image.naturalWidth}px`,height:`${image.naturalHeight}px`,
          maxWidth:'none',borderRadius:'0',transform:'none'
        });
        document.body.appendChild(clone);
      });
      await page.locator('#print-asset-capture').screenshot({
        path:path.join(__dirname,'assets',`print-${name}-ink.png`),
        animations:'disabled'
      });
      await page.locator('#print-asset-capture').evaluate(node => node.remove());
    }
    await page.goto(pathToFileURL(path.join(__dirname,'print.html')).href);
    await ready();
    const pages = await page.locator('.print-page').count();
    if (pages !== 3) throw new Error(`Expected 3 PDF pages, received ${pages}`);
    if (errors.length) throw new Error(errors.join('\n'));
    await page.pdf({
      path:path.join(__dirname,'final-design.pdf'),
      printBackground:true,
      preferCSSPageSize:true
    });
    console.log(`Exported ${pages} PDF pages and ${Object.keys(largest).length} print photo assets.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
