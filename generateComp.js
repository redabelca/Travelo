let l=console.log,r=require,fs=r('fs'),mkdirp=r('mkdirp'),prompt=r('prompt'),dir='C:/Users/redabelca/Desktop/Travelo/beta/';
let ext=['pug','scss','ts'];

prompt.start();
prompt.get(['nameOfComp','generateTs'], function (er, res) {
  ['pug/components/','scss/components/','js/components/'].map((compDir,i)=>{
    if(i==2){
      res.generateTs==1&&fs.writeFileSync(`${dir+compDir+res.nameOfComp}.${ext[i]}`, '');
    }else{
      fs.writeFileSync(`${dir+compDir+res.nameOfComp}.${ext[i]}`, '');
    }
  });
});