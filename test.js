
const response = await new Promise((resolve, reject)=>{
    process.stdout.write("Choose [y/n]: ");
    if(process.stdout.isTTY){
        process.stdin.on("readable",function(){
          var chunk = Buffer.from(process.stdin.read()).toString('utf-8');
          if(chunk != null) {
            if (chunk === "y") {
                process.stdin.on("readable", ()=>{});
                process.stdin.setRawMode(false);
                process.stdout.write("y\n");
                resolve(true);
            }
            else if (chunk === "n") {
                process.stdin.on("readable", ()=>{});
                process.stdin.setRawMode(false);
                process.stdout.write("n\n");
                resolve(false);
            }
          }
        });
        process.stdin.setRawMode(true);
      } else {
        console.log("You are not using a tty device...");
      }
      
});

console.log("You chose: " + (response === true ? "YES" : "FALSE"));