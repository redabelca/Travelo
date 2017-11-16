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
            version: '61',
            recordScreenshots: false
        },
        driver = new wd.Builder().withCapabilities(args)
        .usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub").build();

    driver.get("https://www.google.com").then(() => {
        driver.wait(until.elementLocated(By.id('lst-ib')));
    }).then(() => {
        driver.findElement(By.id('lst-ib')).sendKeys('gmx');
    }).then(() => {
      driver.findElement(By.css('[value="Google Search"]')).click();
    }).then(() => {
      driver.wait(until.elementLocated(By.css('h3')));
        driver.findElement(By.css('h3')).getText().then(t => {
            l(t);
        });
        driver.findElement(By.css('h3')).findElement(By.css('a')).click();
    });

    driver.wait(until.elementLocated(By.id('login-button')));
    driver.findElement(By.id('login-button')).click();
    driver.wait(until.elementLocated(By.id('login-email')))
        .then(() => {
            l('3tini rass dial email bla @');
            var prompt = r('prompt');
            prompt.start();
            prompt.get(['email'], function (er, res) {
                driver.findElement(By.id('login-email')).sendKeys(res.email + '@gmx.com');
                driver.executeScript('document.getElementById(\'login-password\').type=\'text\';');
                driver.findElement(By.id('login-password')).sendKeys('Nsite-123');
                driver.actions().click(driver.findElement(By.css('[type=\'submit\']'))).perform();
                driver.findElements(By.css('svg')).then(els=>{
                  var i=0;
                  els.forEach(el=>{
                    if((i++)===4){
                      el.click();
                    }
                  });
                });
                driver.wait(until.elementLocated(By.css('iframe')),6000);
                driver.switchTo().frame(0);
                driver.findElement(By.css('td.name')).click()
                //driver.findElements(By.css('td.name')).then((els)=>{l(els.length);})
                /*.then(els => {
                  els.forEach((el) => {el.getText().then(t => {l(t);});});
                })*/.then(() => {
                    driver.quit();
                });
            });
        });
}

test();
/*
#login-button
#login-email
#login-password
td.name => contains 'help@saucelabs.com'
iframe#mail-detail a
-----
.navigation-badge click
[href="/beta/users/baybe"]
.btn.btn-action.acbtn
[placeholder="Password"]
[ng-click="authorize()"] click
.clip-content ---> getText*/
