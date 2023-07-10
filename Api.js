const express=require("express")
const app=express()
const bodyP=require("body-parser")
const compiler=require("compilex")
const options = { stats: true, env: "node" };
compiler.init(options)
app.use(bodyP.json())
app.use("/codemirror-5.65.13", express.static("C:/Users/personal/Desktop/compiler/codemirror-5.65.13"))
app.get("/",function(req,res){
    res.sendFile("C:/Users/personal/Desktop/compiler/index.html")
})

app.post("/compile", function(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
  
    try {
      if (lang === "cpp") {
        if (!input) {
          var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } };
          compiler.compileCPP(envData, code, function(data) {
            res.send(data);
          });
        } else {
          var envData = { OS: "windows", cmd: "g++", options: { timeout: 1000 } };
          compiler.compileCPPWithInput(envData, code, input, function(data) {
            res.send(data);
          });
        }
      } else if (lang === "java") {
        if (!input) {
          var envData = { OS: "windows", cmd: "javac" };
          compiler.compileJava(envData, code, function(data) {
            res.send(data);
          });
        } else {
          var envData = { OS: "windows", cmd: "javac" };
          compiler.compileJavaWithInput(envData, code, input, function(data) {
            res.send(data);
          });
        }
      } else if (lang === "python") {
        if (!input) {
          var envData = { OS: "windows" };
          compiler.compilePython(envData, code, function(data) {
            res.send(data);
          });
        } else {
          var envData = { OS: "windows" };
          compiler.compilePythonWithInput(envData, code, input, function(data) {
            res.send(data);
          });
        }
      }
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ error: e });
    }
  });
  
app.listen(4899)
console.log("the program is running")