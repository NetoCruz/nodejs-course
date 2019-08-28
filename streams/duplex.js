const {Duplex} = require('stream')

const duplexStream = new Duplex({
   write(chunk,oncoding,callback){
      console.log(chunk.toString())
      callback()
   },
   read(size){
     if(this.push.currentCharCode >90){
         this.push(null)
         return
     }
     this.push(String.fromCharCode(this.currentCharCode++))
   } 
})

duplexStream.currentCharCode=65
process.stdin.pipe(duplexStream).pipe(process.stdout)