const puppeteer = require('puppeteer');
const { expect } = require('chai');


describe('User interactions', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('file://' + __dirname + '/../index.html');
  });


  beforeEach(async () => {
    // Clear input fields
    await page.evaluate(() => {
      document.querySelector('#day').value = '';
      document.querySelector('#month').value = '';
      document.querySelector('#year').value = '';
    });

    // Reset the result display
    await page.evaluate(() => {
      document.querySelector('#y_diff').innerText = '--';
      document.querySelector('#m_diff').innerText = '--';
      document.querySelector('#d_diff').innerText = '--';
    });
  });

  after(async function () {
    await browser.close();
  });

  afterEach(async function() {
    this.timeout(4000);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  })

  it('should calculate age correctly when form is submitted', async () => {
    // Fill out the form
    await page.type('#day', '20');
    await page.type('#month', '11');
    await page.type('#year', '1989');

    // Click the submit button
    await page.click('.divider');

    // Wait for the result to be updated
    await page.waitForFunction(
      () => document.querySelector('#y_diff').innerText !== '--'
    );

    // Check the results
    const y_diff = await page.$eval('#y_diff', el => el.innerText);
    const m_diff = await page.$eval('#m_diff', el => el.innerText);
    const d_diff = await page.$eval('#d_diff', el => el.innerText);

    // Replace these values with the expected ones based on the current date
    expect(y_diff).to.equal('33');
    expect(m_diff).to.equal('5');
    expect(d_diff).to.equal('16');

  });


  it('should not update the result when a future date is entered', async () => {
    // Fill out the form with a future date
    await page.type('#day', '20');
    await page.type('#month', '12');
    await page.type('#year', '3000');

    // Click the submit button
    await page.click('.divider');

    // Wait for a short duration to ensure the form has time to process
    await page.waitForTimeout(500);

    // Check if the results are unchanged (still showing the default values)
    const y_diff = await page.$eval('#y_diff', el => el.innerText);
    const m_diff = await page.$eval('#m_diff', el => el.innerText);
    const d_diff = await page.$eval('#d_diff', el => el.innerText);

    expect(y_diff).to.equal('--');
    expect(m_diff).to.equal('--');
    expect(d_diff).to.equal('--');
  });

});
