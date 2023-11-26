import React, { Component } from 'react';
import axios from "axios";
import "../App.css";


class ToDoItem extends Component {
    state = {
        "title": this.props.title,
        "status": this.props.status,
        "button": this.processStatus(this.props.status)
    }

    //n converts the status of the to-do item, pending to edit.
    processStatus(status) {
        if (status === "PENDING") {
            return "edit"
        }else {
            return "delete"
        }
    }
    //Based on status invert it.
    inverseStatus(status) {
        if (status === "PENDING") {
            return "DONE"
        }else {
            return "PEDNING"
        }
    }
    //Edit or delete the to-do item
    sendRequest = () => {
        axios.post("http://127.0.0.1:8000/v1/item/" + 
        this.state.button,
        {
            "title": this.state.title,
            "status": this.inverseStatus(this.state.status)
        },
        {headers: {"token": "some_token"}}).then(response => {
            //Pass the response through the ToDoItem component for more handling later.    
            //Returns the full to do item from the server
            this.props.passBackResponse(response);
        })
    }
    render() {
        return(
            <div className="itemContainer">
                <p>{this.state.title}</p>
                <div className="actionButton" onClick={this.sendRequest}>{this.state.button}</div>
            </div>
        )
    }
}
export default ToDoItem;