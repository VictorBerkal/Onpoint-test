import React, { Component } from 'react';
import classes from './Pagination.module.css';


export default class Pagination extends Component{
    
    render(){
        const doted = this.props.doted.map((elem, i) => {
            const cls = [];
            if(this.props.position === i){
                cls.push(classes.active);
            }
            return (
                <div
                    className = {cls.join('')}
                    key= {elem + Math.random()}
                    id = {i}
                    onClick={() => {this.props.swipe(i)}}
                ></div>
            );
        });
    
        return (
            <div className={classes.Pagination}>
              {doted}
            </div>
        );
    }
}

