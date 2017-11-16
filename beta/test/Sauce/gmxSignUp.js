var l = console.log,
  r = require,
  wd = r('selenium-webdriver'),
  username = "wlad",
  accessKey = "6d46c450-71c8-455a-a844-894b3524cd15",
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

  driver.get("https://www.gmx.com");
  driver.findElement(By.id('signup-button')).click();
  driver.wait(until.elementLocated(By.id('ida')));
  driver.wait(until.elementLocated(By.css('#id36 [value=\'1\']')))
    .then(() => {
      driver.findElement(By.id('ida')).sendKeys('jane');
      driver.findElement(By.id('idc')).sendKeys('jack');
      driver.findElement(By.css('#id13 [value=\'2\']')).click();
      driver.findElement(By.css('#id10 [value=\'02\']')).click();
      driver.findElement(By.css('#id14 [value=\'26\']')).click();
      var prompt = r('prompt'); prompt.start();
      prompt.get(['email'], function (er, res) {
        driver.findElement(By.id('id1d')).sendKeys(String(res.email));
      });
      driver.executeScript('document.getElementById(\'id2b\').type=\'text\';');
      driver.executeScript('document.getElementById(\'id2e\').type=\'text\';');
      driver.executeScript('document.getElementById(\'id2b\').value=\'Nsite-123\';');
      driver.executeScript('document.getElementById(\'id2e\').value=\'Nsite-123\';');
      driver.findElement(By.css('#id36 [value=\'1\']')).click();l('yallah bsmllah');
      loop(6, 50000, () => {
        driver.findElement(By.id('id38')).sendKeys('asr');
      }, () => {
        l('ended here baybe');
      });
    });
}
test();