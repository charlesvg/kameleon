import puppeteer from 'puppeteer-core';
import {PNG} from 'pngjs';
import * as fs from 'fs';
import pixelmatch from 'pixelmatch';
// import * as fs from 'fs';
// import * as path from 'path';


//
// const readFile = (filename: string) =>  {
//     return fs.readFileSync(path.resolve(__dirname, filename));
// };

const compare = (screenshot: Buffer) => {


    console.time('read baseline');
    const img1 = PNG.sync.read(fs.readFileSync('baseline.png'));
    console.timeEnd('read baseline');
    console.time('decode shot');
    const img2 = PNG.sync.read(screenshot);
    console.timeEnd('decode shot');
    const {width, height} = img1;
    const diff = new PNG({width, height});

    console.time('matched in');
    const output = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});
    console.timeEnd('matched in');

    console.log(output);
}

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        ignoreHTTPSErrors: true,
        pipe: true,
    });
    const page = await browser.newPage();
    await page.goto('https://google.com');
    console.time('take baseline');
    await page.screenshot({ fullPage: true, path: 'baseline.png'});
    console.timeEnd('take baseline');
    await page.keyboard.type('Hello');
    console.time('take shot');
    const screenshot = await page.screenshot({ fullPage: true});
    console.timeEnd('take shot');

    const session = await page.target().createCDPSession();
    console.time('take shot1');
    const ret = await session.send('Page.captureScreenshot');
    console.timeEnd('take shot1');


    compare(screenshot);
    await browser.close();
})();