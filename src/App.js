import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import CreateToDo from './components/CreateToDo';
import {Switch,Route} from 'react-router-dom';
import Home from './components/Home';


import axios from 'axios';

class App extends Component {
  
  state = {
    todos : [],
    currentToDo : {},
    currentID : -1 , 
    editMode : false
  }
 

  async getToDos(){
    const todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
    this.setState({todos:todos.data.slice(0,10)});
    console.log(this.state.todos);
  }

  componentDidMount(){
      this.getToDos();
  }
  
  handleEdit=(index)=>{
    this.setState({
      currentToDo:{...this.state.todos[index]},
      currentID : index,
      editMode : true,
    })
    console.log(index);
  }
  handleUpdate = () => {
    let todos = this.state.todos;
    todos[this.state.currentID] = {...this.state.currentToDo};
    this.setState({
      currentID: -1,
      todos : todos,
      currentToDo : {},
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
    this.setState({todos})
  }

  render(){
    return (
      <div>
        <Switch>
          <Route exact path = '/'>
            <Home todos = {this.state.todos} onDelete={this.handleDelete}
              onEdit = {this.handleEdit}
            />
          </Route>
          <Route exact path="/create">
            <CreateToDo onChange = {this.handleEdit}/>
          </Route>
        </Switch>
        {this.state.editMode && 
        
        <form onSubmit={this.handleUpdate}>
            <h1>EDIT</h1>
            <label>TITLE</label>
            <input
              name="title"
              value= {this.state.currentToDo['title']}
              placeholder="title"
              onChange = {this.handleChange}
            />
          </form>}
      </div>
    );
  }
}

export default App;
