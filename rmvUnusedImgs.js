let l=console.log,r=require,prompt=r('prompt'),fs=r('fs'),path=r('path');

//read all html files and store all srcs used
let matchesFromHtmls=[];
fs.readdirSync(`final/`).map((file,i)=>{
  if(!fs.statSync(`final/${file}`).isDirectory()){
    matchesFromHtmls.push(fs.readFileSync(`final/${file}`,'utf-8').match(/url\(([.\/\-\w]+(?=\)))|(src=('|")[.\/\-\w]+(?=("|')))/g));
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
l(arrayOfImgsUsed); l(arrayOfImgsUsed.length);

fs.readdirSync(`final/img/`).map((img,i)=>{
  if(!arrayOfImgsUsed.includes(img) ){
    fs.unlinkSync(`final/img/${img}`);
  }
});