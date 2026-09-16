self.addEventListener("install",()=>{
    console.log("server worker installed")
})


self.addEventListener("activate",()=>{
    console.log("server worker activated")
})