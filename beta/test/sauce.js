var l = console.log,
  r = require,
  wd = r('selenium-webdriver'),
  fs = r('fs'),
  mkdirp = r('mkdirp'),
  getDirName = r('path').dirname,
  username = "mklkh",
  accessKey = "5f287d5c-3d84-4cd3-951b-cd8a41bc51a2",
  By = wd.By,
  until = wd.until,
  prefs = new wd.logging.Preferences().setLevel(wd.logging.Type.BROWSER, wd.logging.Level.SEVERE),
  combination = {
    'Windows 10': {
      'MicrosoftEdge': ['14.14393'],
      'internet explorer': ['11.0'],
      'chrome': ['59.0', '60.0'],
      'firefox': ['54.0'],
    },
    'Windows 8.1': {
      'internet explorer': ['11.0'],
      'firefox': ['54.0'],
    },
    'Windows 8': {
      'firefox': ['54.0'],
    },
    'Windows 7': {
      'opera': ['12.12']
    },
    'Windows XP': {
      'chrome': ['49.0'],
      'firefox': ['54.0'],
      'opera': ['12.12']
    },
    'Linux': {
      'chrome': ['48.0'],
      'firefox': ['54.0'],
      'opera': ['12.15']
    },
    'OS X 10.8': {
      'chrome': ['49.0'],
      'firefox': ['54.0']
    },
    'macOS 10.12': {
      'firefox': ['54.0'],
      'safari': ['10.0']
    }
  },
  i, current = [];

function writeFileSync(path, contents, typeOfData, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err) return cb(err);
    fs.writeFileSync(path, contents, typeOfData, cb);
  });
}

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
for (var platform in combination) {
  for (var br in combination[platform]) {
    for (i = 0; i < combination[platform][br].length; i++) {
      current.push({
        b: br,
        p: platform,
        v: combination[platform][br][i]
      });
    }
  }
}

function test(iOftest) {
  !current[iOftest] && l('----------------END------------------');
  var args = {
      browserName: current[iOftest].b,
      platform: current[iOftest].p,
      version: current[iOftest].v
    },
    driver = new wd.Builder().withCapabilities(args).
  setLoggingPrefs(prefs).
  usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub").build();

  //LOG ERRORS
  driver.get("https://redabelca.github.io/First/")
    .then(() => driver.manage().logs().get(wd.logging.Type.BROWSER), reason => {})
    .then(logs => {
      fs.writeFileSync('errors.json', logs);
    }, reason => {});

  driver.executeScript("var div=document.createElement('div');div.className='for-test';div.innerHTML=Math.ceil(document.body.scrollHeight/window.innerHeight);document.body.appendChild(div);");

  //IMGs and VIDEO
  var numberOfScrolling;
  driver.findElement(By.className('for-test')).getText().then(txt => {
    numberOfScrolling = Number(txt);
  });
  
  for(i=0;i< numberOfScrolling ;i++){
    driver.takeScreenshot().then((data) => {
      writeFileSync('OS/' + args.platform + '/' + args.browserName + '/v' + args.version + '/' + i + '.png', data, 'base64');
    })
      .then(() => {
      driver.executeScript("window.scrollBy(0,window.innerHeight-5)");
    });
  }

  driver.session_.then(data => {
    l(data.id_);
  });
  driver.quit();
}

test(3);

/*
loop(current.length,1000,(i)=>{wd.promise.createFlow(()=> {test(i);l('Test number : '+i);} );});
*/
