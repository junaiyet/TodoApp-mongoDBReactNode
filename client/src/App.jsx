import { useEffect, useState } from "react"
import axios from "axios"

function App() {
const [text,setText] = useState('')
const [editText,setEditText] = useState(false)
const [edit,setEdit] = useState({})
const [id,setId] = useState('')
const [textCategory,setTextCategory] = useState('')
const [list,setList] = useState([])
const [categorylist,setCategoryList] = useState([])
const [active,setActive]= useState(false)
  //http://localhost:8000/addtodo
  //http://localhost:8000/alltodo
  //http://localhost:8000/createcategory
  //http://localhost:8000/allcategory
  //http://localhost:8000/edittodo

  useEffect(()=>{
    async function all() {
      let data = await axios.get("http://localhost:8000/alltodo");
      let categorydata = await axios.get("http://localhost:8000/allcategory");
      setList(data.data)
      setCategoryList(categorydata.data)
    }
    all()
  },[active])
  let handleSubmit= async()=>{
        let data = await axios.post("http://localhost:8000/addtodo",{
          name:text,
          category : id,
        })
        setActive(!active)
       console.log(data)
  }
  let handleCreateCategory = async()=>{
    let data = await axios.post("http://localhost:8000/createcategory",{
      name:textCategory,
      
    })
    setActive(!active)
    console.log(data)
  }
  let handleId = (e)=>{
    setId(e.target.value)
  }
  let handleEdit = (item)=>{
    setEditText(true)
    setEdit(item)
  }
  return (
    <>
     <h1>ToDo App</h1>
     <>
     <input onChange={(e)=>setText(e.target.value)} value={editText&& edit.name}/>

     {editText
     ?
     <button>Update</button>
      :
      <button onClick={handleSubmit}>Submit</button>
    }
     <select onChange={handleId}>
      <option >Select Category</option>
      {categorylist.map(item=>(
        <option key={item.name} value={item._id}>{item.name}</option>
      ))}
     </select>
     <br />
     <br /> 
     <input onChange={(e)=>setTextCategory(e.target.value)}/>
     <button onClick={handleCreateCategory}>Creat Catagory</button>
    <h1>Tod List</h1>
     <ul>  
      {list.map(item=>(
        <li key={item.name}>
          {item.name}--{item.category.name} 
           <button onClick={()=>handleEdit(item)}>Edit</button>
        </li>

      ))}
     </ul>
     </>
    </>
  )
}

export default App
