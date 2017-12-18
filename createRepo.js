let r = require,l=console.log,prompt = r('prompt');

prompt.start();
prompt.get(['repoName'], function (er, res) {
  [
    `curl -u redabelca https://api.github.com/user/repos -d "{\\"name\\":\\"${res.repoName}\\"}"`,
    `git init`,
    `git add ./** ./*`,
    `git commit -m "first commit"`,
    `git remote add origin https://github.com/redabelca/${res.repoName}.git`,
    `git push -u origin master`,
    `start https://github.com/redabelca/${res.repoName}`,
    `start https://github.com/redabelca/${res.repoName}/settings`,
    `start https://redabelca.github.io/${res.repoName}`,
  ].map(cmd=>{
    r('child_process').execSync(cmd,{stdio:'inherit'});
  });
});