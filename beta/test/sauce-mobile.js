var l = console.log,
  r = require,
  wd = r('selenium-webdriver'),
  fs = r('fs'),
  username = "motardharr",
  accessKey = "19c324c6-2b5f-4ee1-bd49-c8d2cfbb574c",
  prefs = new wd.logging.Preferences().setLevel(wd.logging.Type.BROWSER, wd.logging.Level.SEVERE),
  combination = {
    iOS: {
      platformVersion: ['10.0', '10.3'],
      deviceName: ['iPhone 6 Simulator', 'iPhone 6s Simulator', 'iPhone 7 Simulator', 'iPhone 5s Simulator', 'iPad Air Simulator'],
      browserName: ['Safari']
    },
    Android: {
      platformVersion: ['4.4', '5.1', '6.0', '7.1'],
      deviceName: ['Android Emulator', 'Google Nexus 7C GoogleAPI Emulator', 'Samsung Galaxy S4 GoogleAPI Emulator'],
      browserName: ['Chrome', 'Android']
    }
  },
  i, current = [];

for (platform in combination) {
  for (i = 0; i < combination[platform].platformVersion.length; i++) {
    for (var j = 0; j < combination[platform].deviceName.length; j++) {
      for (var k = 0; k < combination[platform].browserName.length; k++) {
        current.push({
          b: combination[platform].browserName[k],
          p: platform,
          v: combination[platform].platformVersion[i],
          d: combination[platform].deviceName[j]
        });
      }
    }
  }
}

function test(iOftest) {
  !current[iOftest] && l('\n\n ENNNNNNNNNND \n\n');
  var args = {
      browserName: current[iOftest].b,
      platformName: current[iOftest].p,
      platformVersion: current[iOftest].v,
      deviceName: current[iOftest].d,
      appiumVersion: '1.6.5',
      deviceOrientation: 'portrait'
    },
    driver = new wd.Builder().withCapabilities(args).
  setLoggingPrefs(prefs).
  usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub").build();

  driver.get("https://redabelca.github.io/First/");
  //.then(() => driver.manage().logs().get(wd.logging.Type.BROWSER))
  /*.then((logs) => {
    l(logs);
  });*/
  /*driver.session_.then(function (data) {
    l(data.id_);
  });*/
  driver.takeScreenshot().then((data) => {
      l(args.platformName + '.png');
      fs.writeFileSync(args.platformName + '-' + iOftest + '-' + args.platformVersion + '.png', data, 'base64');
    })
    .then(() => {
      driver.quit();
    });
}

loop(10, 1000, (i) => {
  test(i);
});

/*
//Parallel
wd.promise.createFlow(function () {
  test('chrome', 'Windows 10', '50.0');
});
wd.promise.createFlow(function () {
  test('chrome', 'Windows 8', '50.0');
});
*/

function loop(limit, stepTime, fn) {
  var i = -1,
    inter = setInterval(function () {
      i++;
      if (i >= limit) {
        clearInterval(inter);
      } else {
        fn(i);
      }
    }, stepTime);
}

