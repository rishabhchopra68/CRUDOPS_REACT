import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class ToDoList extends Component {
    

    componentDidUpdate(){
        console.log("updated");
    }
    
    render() { 
        const showtodos = this.props.todos.map(
            (todo)=>(
                <div>

            <li key = {todo.id}>
                {todo.title}
                <button style={{marginLeft:"10px"}} onClick = {()=>this.props.onEdit(todo.id)}>Edit</button>
                <button style={{marginLeft:"10px"}} onClick={()=>this.props.onDelete(todo.id)}>Done</button>
            </li>
                </div>
            )
        );
        return (
            <div>
                <h1>To-Do List</h1>
                
                    <button className = 'btn btn-primary' onClick={()=>this.props.onAdd()}>
                        Add Task 
                    </button>
                
                <ul>
                    {showtodos}
                </ul>
            </div>

    );
    }
}
 
export default ToDoList;