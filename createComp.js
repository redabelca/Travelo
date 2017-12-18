let l=console.log,r=require,prompt=r('prompt'),dir='C:/Users/redabelca/Desktop/Travelo/beta/';

prompt.start();
prompt.get(['nameOfComp','generateTs'], function (er, res) {
  let ext=['pug','scss','ts'];
  ['pug/components/','scss/components/','js/components/'].map((compDir,i)=>{
    let fs=r('fs');
    if(i==2){
      res.generateTs==1&&fs.writeFileSync(`${dir+compDir+res.nameOfComp}.${ext[i]}`, '');
      r('child_process').exec(`start ${dir+compDir+res.nameOfComp}.${ext[i]}`, (err, stdout, stderr)=>{err&&l(err);stdout&&l(stdout);stderr&&l(stderr);});
    }else{
      fs.writeFileSync(`${dir+compDir+res.nameOfComp}.${ext[i]}`, '');
      r('child_process').exec(`start ${dir+compDir+res.nameOfComp}.${ext[i]}`, (err, stdout, stderr)=>{err&&l(err);stdout&&l(stdout);stderr&&l(stderr);});
    }
  });
});