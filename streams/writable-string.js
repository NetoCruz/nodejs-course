const {Writable} = require('stream')
const writableString = new Writable({
    write(chunk,encoding,callback){
     console.log(chunk.toString())
     callback()
    }
})

process.stdin.pipe(writableString)