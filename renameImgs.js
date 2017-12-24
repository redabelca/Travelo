// This is a function that rename all imgs in a dir into 1.jpg 2.jpg ...
let l=console.log,r=require,fs=r('fs');
let dir='C:/Users/redabelca/Desktop/Travelo/final/img/',files=fs.readdirSync(dir);

files.map((file,i) => {
  fs.renameSync(dir+file,`${dir+i}.jpg`);
});