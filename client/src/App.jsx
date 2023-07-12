import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState(false);
  const [edit, setEdit] = useState({});
  const [editTask, setEditTask] = useState("");
  const [id, setId] = useState("");
  const [textCategory, setTextCategory] = useState("");
  const [list, setList] = useState([]);
  const [categorylist, setCategoryList] = useState([]);
  const [active, setActive] = useState(false);
  //http://localhost:8000/addtodo
  //http://localhost:8000/alltodo
  //http://localhost:8000/createcategory
  //http://localhost:8000/allcategory
  //http://localhost:8000/edittodo
  //http://localhost:8000/delete

  useEffect(() => {
    async function all() {
      let data = await axios.get("http://localhost:8000/alltodo");
      let categorydata = await axios.get("http://localhost:8000/allcategory");
      setList(data.data);
      setCategoryList(categorydata.data);
    }
    all();
  }, [active]);
  let handleSubmit = async () => {
    let data = await axios.post("http://localhost:8000/addtodo", {
      name: text,
      category: id,
    });
    setActive(!active);
    console.log(data);
  };
  let handleCreateCategory = async () => {
    let data = await axios.post("http://localhost:8000/createcategory", {
      name: textCategory,
    });
    setActive(!active);
    console.log(data);
  };
  let handleId = (e) => {
    setId(e.target.value);
  };
  let handleEdit = (item) => {
    setEditText(true);
    setEdit(item);
  };
  let handleUpdate = async () => {
    console.log(edit._id);
    let data = await axios.post("http://localhost:8000/edittodo", {
      id: edit._id,
      name: edit.name,
    });
    setActive(!active);
    console.log(data);
  };

  let handleDelete = async (item) => {
    let data = await axios.post("http://localhost:8000/delete", {
      id: item._id,
    });
    setActive(!active);
    console.log(data);
  };
  return (
    <>
      <h1>ToDo App</h1>
      <>
        <input onChange={(e) => (editText ? setEdit({ ...edit, name: e.target.value }) : setText(e.target.value))} value={editText ? edit.name : text} />
        {editText ? <button onClick={handleUpdate}>Update</button> : <button onClick={handleSubmit}>Submit</button>}
        <select onChange={handleId}>
          <option>Select Category</option>
          {categorylist.map((item) => (
            <option key={item.name} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <input onChange={(e) => setTextCategory(e.target.value)} />
        <button onClick={handleCreateCategory}>Creat Catagory</button>
        <h1>Tod List</h1>
        <ul>
          {list.map((item) => (
            <li key={item.name}>
              {item.name}--{item.category.name}
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </li>
          ))}
        </ul>
      </>
    </>
  );
}

export default App;
