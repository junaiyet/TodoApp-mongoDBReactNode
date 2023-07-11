const express = require('express')
var cors = require('cors')
const app = express()
const mongoose = require('mongoose');
const TodoTask = require("./models/todoSchema.js")
const Category = require("./models/categorySchema.js")

mongoose.connect(`mongodb+srv://todo:U7xFRp9NbglgOpHw@cluster0.wv9fbmz.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    console.log('DB Connected')
})
app.use(cors())
app.use(express.json())

app.post("/addtodo",(req,res)=>{
    const {name,category}= req.body
    let todo = new TodoTask({
        name,
        category
    })
    todo.save()
    res.send(todo)
})

app.post("/createcategory",(req,res)=>{
    const {name}= req.body
    let category = new Category({
        name
    })
    category.save()
    res.send(category)
})

app.post("/edittodo",async(req,res)=>{
    const {id,name} = req.body

    let updateTodo = await TodoTask.findOneAndUpdate({_id:id},{name},{new:true})

    res.send(updateTodo)
})



/**/
app.get("/alltodo", async(req,res)=>{
    let data = await TodoTask.find({}).populate("category");
    res.send(data)
})

app.get("/allcategory",async(req,res)=>{
    let data = await Category.find({})
    res.send(data)
})






app.listen("8000", () => {
    console.log("Port Start")
  })

  //U7xFRp9NbglgOpHw