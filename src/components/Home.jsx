import React, { Component } from 'react'
import ToDoList from './ToDoList';
import { Link } from 'react-router-dom';

class Home extends Component{
    render(){
    return (
    <div>
        <h1 style = {{textAlign:"center"}}>CRUD operations</h1> 
        
        <ToDoList todos = {this.props.todos} onDelete = {this.props.onDelete}
            onEdit = {this.props.onEdit} onAdd = {this.props.onAdd}
        /> 
    
    
    </div>
    );
}
}
 
export default Home;