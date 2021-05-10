import React, { Component } from 'react';
import FirstScreen from './FirstScreen/FirstScreen';
import Pagination from './Pagination/Pagination';
import SecondScreen from './SecondScreen/SecondScreen';
import classes from './Slider.module.css';
import ThirdScreen from './ThirdScreen/ThirdScreen';



export default class Slider extends Component {


    state = {
        startY: 0,
        moveY: 0,
        position: 0,
        isFinish: false,
        arrDoted: [
            1,
            2,
            3,
        ]
    }

    handleTouchStart = (e) => {
        this.setState({
            startY: e.changedTouches[0].clientY
        })
    }

    handleTouchMove = (e) => {
        this.setState({moveY: e.changedTouches[0].clientY})
    }

    handleTouchEnd = () => {
        const moveY = this.state.moveY === 0 ? this.state.startY : this.state.moveY;
        
        const scroll = this.state.startY - moveY;
        this.scrollHeight(scroll);

        this.setState({
            startY: 0,
            moveY: 0,
            isFinish: true,
        })

    }

    scrollHeight = (scroll) => {
        if(Math.abs(scroll) > 100){
            if(scroll > 0){
                let position = this.state.position === 2 ? 2 : this.state.position + 1;
                this.setState({position}, () => {
                    this.swipe(this.state.position);
                });
                
            } else {
                let position = this.state.position === 0 ? 0 : this.state.position - 1;
                this.setState({position}, () => {
                    this.swipe(this.state.position);
                });
                
            }
        } else {
            this.swipe(this.state.position);
        }
    }
    swipe = (position) => {
        this.setState({position}, () => {
            const resultPosition = position === 0 ? 0 :  window.innerHeight * position;
            window.scrollTo({
                top: resultPosition,
                behavior: "smooth"
            });
        });
    }
    
    componentDidMount() {
        this.swipe(0);
        document.body.style.overflow = "hidden";
    }
    
    render(){
        const View =  this.state.position === 0
        ? <div className={classes.Slider_next}></div>
        : null;
        return (
            <div
                className= {classes.Slider}
                onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
                onTouchEnd={() => this.handleTouchEnd()}
                onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
            >
                <Pagination
                    doted = {this.state.arrDoted}
                    position = {this.state.position}
                    swipe = {this.swipe}
                />

                <FirstScreen/>
                <SecondScreen/>
                <ThirdScreen/>
                {View}
            </div>
        );
    }
}