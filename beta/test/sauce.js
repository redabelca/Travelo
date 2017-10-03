var l = console.log,
  r = require,
  wd = r('selenium-webdriver'),
  fs = r('fs'),
  mkdirp = r('mkdirp'),
  request = r('request'),
  getDirName = r('path').dirname,
  username = "wlad",
  accessKey = "6d46c450-71c8-455a-a844-894b3524cd15",
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
      version: current[iOftest].v,
      recordScreenshots: false
    },
    driver = new wd.Builder().withCapabilities(args).
  setLoggingPrefs(prefs).
  usingServer("http://" + username + ":" + accessKey + "@ondemand.saucelabs.com:80/wd/hub").build();

  //LOG ERRORS
  driver.get("https://redabelca.github.io/First/")
    .then(() => driver.manage().logs().get(wd.logging.Type.BROWSER), reason => {})
    .then(logs => {
      writeFileSync('OS/' + args.platform + '/' + args.browserName + '/v' + args.version + '/errors.json', JSON.stringify(logs));
    }, reason => {});
  driver.wait(until.elementLocated(By.css('body'))).then(() => {
    l('found');
  });

  driver.executeScript("var div=document.createElement('div');div.className='for-test';div.innerHTML=Math.ceil(document.body.scrollHeight/window.innerHeight);document.body.appendChild(div);");

  //VIDEO
  driver.findElement(By.className('for-test')).getText().then(txt => {
    loop(Number(txt)+1, 800, () => {
      driver.executeScript("window.scrollBy(0,(window.innerHeight-100))");
    }, () => {
      driver.executeScript("window.scrollTo(0,0)")
        .then(() => {
          
        //UR SCRIPT HERE
        
        }).then(driver.quit());
    });
  });
}

/*
loop(current.length,1000,(i)=>{wd.promise.createFlow(()=> {test(i);l('Test number : '+i);} );});


        .then(() => {
          driver.session_.then(data => {
            l(current.length);
            request({
              uri: 'https://saucelabs.com/rest/v1/'+username+'/jobs/'+data.id_+'/assets',
'https://saucelabs.com/rest/v1/' + username + '/jobs?limit=' + current.length,
  gzip: true,
  'auth': {
    'user': username,
    'pass': accessKey
  }
},
function (er, res, body) {
  er && l(er);
  l(JSON.parse(body).length);
  //writeFileSync('OS/' + args.platform + '/' + args.browserName + '/v' + args.version + '/v.flv',body);
});
});
});*/