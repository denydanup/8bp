const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

//---- Definisi
let Unique = 'UNIQUE-ID';
let InputForm = '.p-1 > .form-user-id > :nth-child(2) > :nth-child(1) > .user-id-input';
let ButtonFree = ':nth-child(2) > .mt-5 > .single-item-grid > .h-full > .face-desktop > .mt-4 > .m-button'
let Claim = '.p-1 > .form-user-id > :nth-child(2) > .action-btn > .m-button'
let Gas = '.mt-4 > .m-button'
//---- Delay
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
//---- Function Login 8 Ball Pool
async function Login8bp(){
    const browser = await puppeteer
    .launch({     
      args: ['--disable-web-security'],
      args: ['--no-default-browser-check'],
      args: ['--no-sandbox'],
      args: [ '--no-default-browser-check'],
      ignoreDefaultArgs: ['--enable-automation',
                         '--disable-blink-features=AutomaticControlled'],
      headless: false})
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);  
    await page.goto('https://8ballpool.com/en/shop#free_daily_cue_piece');
    const Welcome = await page.title();  
    console.log(Welcome);
    await page.waitForSelector(ButtonFree);
    await page.click(ButtonFree);
    await page.waitForSelector(InputForm);
    console.log("Claiming...");
    await page.type(InputForm, Unique,{ delay: 100 });
    await page.click(Claim);
    await delay(4000);
    await page.waitForSelector(Gas);
    await delay(4000);
    await page.evaluate(() => {
      Array.from(document.querySelectorAll('button')).filter(button => {
        return button.innerText == 'FREE' // filter il for specific text
      }).forEach(element => {
        if (element) element.click(); // click on il with specific text
      });
    });
    await delay(4000);
    await page.evaluate(() => {
      Array.from(document.querySelectorAll('button')).filter(button => {
        return button.innerText == 'FREE' // filter il for specific text
      }).forEach(element => {
        if (element.style.display !== 'none') { // Check if button is visible
          try {
              element.click(); // Attempt to click
          } catch (error) {
            console.log("Claimed!");
          }
      }
      
      });
    });
}
//--- Let Start
Login8bp();
