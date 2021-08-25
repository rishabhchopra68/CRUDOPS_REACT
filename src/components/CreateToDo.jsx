import React, { Component } from 'react'

class CreateToDo extends Component{
    constructor(){
        super();
    }
    state = {  }
    render() { 
        return (
            <div>
                <h1>ADD a to-do</h1> 
                <form >
                    <label>User ID</label>
                    <input ></input>
                    <label>ID</label>
                    <input value = {this.props.currentSize+1}></input>
                    <label>Title</label>
                    <input onChange={this.props.onChange}></input>
                    <label>Completed ? </label>
                    <select>
                        <option>true</option>
                        <option>false</option>
                    </select>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
 
export default CreateToDo;