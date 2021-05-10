import React from 'react';
import classes from './FirstScreen.module.css'

const FirstScreen = props => {

    return(
        <div className={classes.FirstScreen} >
            <div className = {classes.circle}>
                <div className = {classes.circle_animation_1}></div>
                <div className = {classes.circle_animation_1_1}></div>
            </div>
            <div className = {classes.circle_2}>
                <div className = {classes.circle_animation_2}></div>
                <div className = {classes.circle_animation_2_1}></div>
            </div>
            <div className = {classes.circle_3}>
                <div className = {classes.circle_animation_3}></div>
                <div className = {classes.circle_animation_3_1}></div>
            </div>
            <div className = {classes.circle_4}>
                <div className = {classes.circle_animation_3}></div>
                <div className = {classes.circle_animation_3_1}></div>
            </div>
        </div>
    );
}

export default FirstScreen;