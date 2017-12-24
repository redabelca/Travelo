let l=console.log,r=require,prompt=r('prompt'),fs=r('fs'),path=r('path'),dir;

prompt.start();
prompt.get(['prjName'], (er, res)=>{
  dir=`C:/Users/redabelca/Desktop/${prjName}/`;

  //read all html files and store all srcs used
  let matchesFromHtmls=[];
  fs.readdirSync(dir+`final/`).map((file,i)=>{
    if(!fs.statSync(dir+`final/${file}`).isDirectory()){
      matchesFromHtmls.push(fs.readFileSync(`${dir}final/${file}`,'utf-8').match(/url\(([.\/\-\w]+(?=\)))|(src=('|")[.\/\-\w]+(?=("|')))/g));
    }
  });

  let arrayOfImgsUsed=[];
  matchesFromHtmls.map(arr=>{
    arr&&arr.map(str=>{
      if(!arrayOfImgsUsed.includes(path.basename(str.replace(/(url\()|(src=('|"))/g,'')))){
        arrayOfImgsUsed.push(path.basename(str.replace(/(url\()|(src=('|"))/g,'')));
      }
    });
  });
  l(arrayOfImgsUsed);
  l(arrayOfImgsUsed.length);

  fs.readdirSync(dir+`final/img/`).map((img,i)=>{
    if(!arrayOfImgsUsed.includes(img) ){
      fs.unlinkSync(dir+`final/img/${img}`);
    }
  });
});