var webdriver = require('selenium-webdriver'),
  username = "brikawgaro",
  accessKey = "9bd0341b-4d98-4b52-8ced-6bb26fe67243",
  args = {
    'browserName': '',
    'platform': '',
    'version': '',
    'username': username,
    'accessKey': accessKey
  },
  browsers=['iPhone','iPad','android','chrome','firefox', 'internet explorer','MicrosoftEdge','opera', 'safari'],
  OSs = [ 'iOS 10.2' , 'iOS 10' , 'iOS 9.3' , 'iOS 9.2' , 'iOS 9.1' , 'iOS 9.0' , 'iOS 8.4' , 'iOS 8.3' , 'iOS 8.2' , 'iOS 8.1' , 'Android 6.0' , 'Android 5.1' , 'Android 5.0' , 'Android 4.4' , 'Windows 10' , 'Windows 8.1' , 'Windows 8' , 'Windows 7' , 'Windows XP' , 'MacOS Sierra 10.12' , 'MacOS El Capitan 10.11' , 'MacOS Yosemite 10.10' , 'MacOS Mavericks 10.9' , 'MacOS Mountain Lion 10.8' , 'Linux'],
  browserVersions={
    chrome:[26,58,'beta','dev'],
    firefox:[4,53,'beta','dev'],//21.0b1 and 25.0b2 for some OSs
    ie:[6,11],
    edge:[13.10586,14.14393],
    safari:[5.1,10],
    opera:[11.64,12.12,12.15]
  },
  driver;

function test(b, p, v) {
  args.browserName=b;
  args.platform=p;
  args.version=v;
  driver = new webdriver.Builder().
  withCapabilities(args).
  usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub").
  build();
  driver.get("http://www.goldenhealth.ga");
  driver.getTitle().then(function(title) {
    console.log('Page title is: ' + title);
  });
  
  driver.wait(function(){
    return driver.
    findElement(webdriver.By.id('close-overlay-container')).
    getText().
    then(function(txt){
      return txt=='Skip ad »';
    })
  },10000).
  then(function(){
    driver.findElement(webdriver.By.id('close-overlay-container')).
    getText().
    then(function(txt){
      console.log(txt);
      driver.findElement(webdriver.By.id('close-overlay-container')).click();
    })
  });
  
  
  //Skip ad »
  driver.quit();
  
};


