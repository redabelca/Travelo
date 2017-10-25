var l = console.log,
  r = require,
  {
    exec
  } = r('child_process'),
  wd = r('selenium-webdriver'),
  fs = r('fs'),
  mkdirp = r('mkdirp'),
  getDirName = r('path').dirname,
  username = "baybe",
  accessKey = "33931ceb-2e60-4b12-8a20-cfb5d1df342f",
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
    },
    'Windows 7': {
      'opera': ['12.12']
    },
    'Windows XP': {
      'opera': ['12.12']
    },
    'Linux': {
      'opera': ['12.15']
    },
    'OS X 10.8': {
      'chrome': ['49.0'],
      'firefox': ['54.0']
    },
    'macOS 10.12': {
      'safari': ['10.0']
    }
  },
  i, current = [],
  jobId;

function writeFileSync(path, contents, cb, typeOfData) {
  //if (!fs.existsSync(getDirName(path))) {
  mkdirp(getDirName(path), (err) => {
    if (err) return cb(err);
    fs.writeFileSync(path, contents, typeOfData);
    cb && cb();
  });
  //}
}
function loop(limit, stepTime, fn, cb) {
  var i = -1,
    inter = setInterval(function () {
      i++;
      if (i >= limit) {
        clearInterval(inter);
        cb && cb(i);
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
  driver.get("https://redabelca.github.io/First/").then(()=>{driver.quit()});
    /*.then(() => driver.manage().logs().get(wd.logging.Type.BROWSER), reason => {});
    .then(logs => {
      writeFileSync('OS/' + args.platform + '/' + args.browserName + '/v' + args.version + '/errors.json', JSON.stringify(logs));
    }, reason => {});
  driver.wait(until.elementLocated(By.css('body'))).then(() => {
    driver.executeScript("var div=document.createElement('div');div.className='for-test';div.innerHTML=Math.ceil(document.body.scrollHeight/window.innerHeight);document.body.appendChild(div);");
  });*/

  //VIDEO
  /*driver.findElement(By.className('for-test')).getText().then(txt => {
    loop(Number(txt) + 1, 10, () => {
      driver.executeScript("window.scrollBy(0,(window.innerHeight-100))");
    }, () => {
      driver.executeScript("window.scrollTo(0,0)")
        .then(() => {

          //UR SCRIPT HERE

          driver.session_.then(data => {
            jobId = data.id_;
          });
        }).then(driver.quit()).then(() => {
          var assetsName = {
              "sauce-log": "log.json",
              "selenium-log": "selenium-server.log",
              "video": "video.flv"
            },
            assetName;
          setTimeout(() => {
            mkdirp(getDirName('OS/' + args.platform + '/' + args.browserName + '/v' + args.version), (er) => {
              if(er){l(er); return;}
              for (assetName in assetsName) {
                exec('"C:/Program Files (x86)/Git/bin/sh.exe" --login -i -c "curl -u ' + username + ':' + accessKey + ' -O https://saucelabs.com/rest/v1/' + username + '/jobs/' + jobId + '/assets/' + assetsName[assetName] + '"', {
                  cwd: 'OS/' + args.platform + '/' + args.browserName + '/v' + args.version
                }, (err, stdout, stderr) => {
                  err && l(err);
                  stdout && l(stdout);
                  stderr && l(stderr);
                });
              }
            });
          }, 10000);
        });
    });
  });*/
}
for(i=0;i<current.length;i++){
  test(i);
}
/*
PARALLEL wd.promise.createFlow(()=> {test(i);l('Test number : '+i);});
*/
