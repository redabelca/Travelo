let l=console.log,r=require,fs=r('fs'),prompt=r('prompt'),dir='C:/Users/redabelca/Desktop/Travelo/beta/',{exec} = r('child_process');

prompt.start();
prompt.get(['nameOfComp'], function (er, res) {
  let ext=['pug','scss','ts'];
  ['pug/components/','scss/components/','js/components/'].map((compDir,i)=>{
    if(i==2){
      fs.existsSync(`${dir+compDir+res.nameOfComp}.${ext[i]}`)==1&&exec(`start ${dir+compDir+res.nameOfComp}.${ext[i]}`, (err, stdout, stderr)=>{err&&l(err);stdout&&l(stdout);stderr&&l(stderr);});
    }else{
      exec(`start ${dir+compDir+res.nameOfComp}.${ext[i]}`, (err, stdout, stderr)=>{err&&l(err);stdout&&l(stdout);stderr&&l(stderr);});   
    }
  });
});