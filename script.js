const fs=require('fs');
fs.readFile('./hello.txt',(err,data)=>{
	if(err){
		console.log('erooor');
	}
	console.log('Async',data.toString());
});
const file=fs.readFileSync('./hello.txt');
console.log('Sync',file.toString());
fs.unlink('./bye.txt',err=>{
	if(err){
		console.log('eroooor');
	}
});