import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Home from './components/Home';


import axios from 'axios';

class App extends Component {
  
  state = {
    todos : [],
    currentToDo : {},
    currentID : -1 , 
    editMode : false,
    addMode : false
  }
 

  async getToDos(){
    const todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
    this.setState({todos:todos.data.slice(0,10)});
    console.log(this.state.todos);
  }

  componentDidMount(){
      this.getToDos();
  }
  
  handleEdit=(id)=>{
    let currentToDo = this.state.todos.filter((todo)=>todo.id===id)
    
    console.log(currentToDo);
    this.setState({
      currentToDo: currentToDo,
      currentID : id,
      editMode : true,
      addMode : false,
    })
  }

  handleAdd=()=>{
    
    console.log("add handled");
    let todos = [...this.state.todos];
    let index = todos[todos.length-1].id+1;
    console.log(index);
    
    this.setState({
      currentToDo : {userId:1,id:index,title:'new task',completed:false},
      currentID : index,
      addMode : true,
      editMode : false
    })
  }
  handleUpdate = () => {
    let todos = [...this.state.todos];
    if(this.state.addMode===true){
      console.log("addMode");
      todos.push(this.state.currentToDo);
    }
    else{  // edit mode
      console.log("Edit mode");
      todos = todos.map(todo=>{
        if(todo.id===this.state.currentID){
          console.log(todo.id);
          return {...this.state.currentToDo}
        }else{
          return todo;
        }
      })
    }
    this.setState({
      currentID: -1,
      todos : todos,
      currentToDo : {},
      addMode : false,
      editMode : false,
    })
    console.log("update handled");
  }
  handleChange = (event) => {
    let field = event.target.name;
    let currentToDo = {...this.state.currentToDo};
    currentToDo[field] = event.target.value;
    this.setState({currentToDo:{...currentToDo}});

  }
  handleDelete = (id) =>{       // arrow function to prevent binding func to this 
        
    let todos = [...this.state.todos];
    todos = todos.filter((todo=>todo.id!=id))
    this.setState({todos,currentID:-1,currentToDo:{},editMode:false,addMode:false})
  }

  render(){

    return (
      <div>
        <Home todos = {this.state.todos} onDelete={this.handleDelete}
              onEdit = {this.handleEdit} onAdd = {this.handleAdd}
            />
        {(this.state.editMode || this.state.addMode) && 
        
        <form onSubmit={this.handleUpdate}>
            <h1>EDIT/ADD</h1>
            <label>TITLE</label>
            <input
              name="title"
              value= {this.state.currentToDo['title']}
              
              onChange = {this.handleChange}
              required
            />
            <button className="btn" type="submit">Update</button>
          </form>
          }
      </div>
    );
  }
}

export default App;
