var l = console.log,
  r = require,
  wd = r('selenium-webdriver'),
  username = "baybe",
  accessKey = "33931ceb-2e60-4b12-8a20-cfb5d1df342f",
  By = wd.By,
  until = wd.until;

function loop(limit, stepTime, fn, cb) {
  var i = -1,
    inter = setInterval(function () {
      i++;
      if (i >= limit) {
        clearInterval(inter);
        cb(i);
      } else {
        fn(i);
      }
    }, stepTime);
}

function test() {
  var args = {
      browserName: 'chrome',
      platform: 'Windows 10',
      version: '60',
      recordScreenshots: false
    },
    driver = new wd.Builder().withCapabilities(args)
    .usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub").build();

  driver.get("https://www.saucelabs.com");
  driver.findElement(By.css('[href=\'/signup/trial\'')).click();
  driver.wait(until.elementLocated(By.css('[name=\'first_name\']')))
    .then(() => {
      driver.findElement(By.css('[name=\'first_name\']')).sendKeys('jane');
      driver.findElement(By.css('[name=\'last_name\']')).sendKeys('jacky');
      driver.findElement(By.css('[name=\'company\']')).sendKeys('me');
      l('3tini rass dial email bla @');
      var prompt = r('prompt');
      prompt.start();
      prompt.get(['user', 'email'], function (er, res) {
        driver.findElement(By.css('[name=\'username\'')).sendKeys(res.user);
        driver.findElement(By.css('[name=\'email\'')).sendKeys(res.email + '@gmx.com');
        driver.executeScript('document.getElementById(\'password\').type=\'text\';');
        driver.findElement(By.id('password')).sendKeys(res.user + '123').then(() => {
          driver.actions().click(driver.findElement(By.css('#company-size'))).perform();
          driver.findElements(By.css('option')).then((els)=>{
            els[1].click();
          });
        });
      });
      loop(6, 50000, () => {
        driver.executeScript('document.querySelector(\'[name=company]\').innerHTML=\'me\'');
      }, () => {
        l('ended here baybe');
      });
    });
}
test();
