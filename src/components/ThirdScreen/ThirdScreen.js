import React, { Component } from 'react';
import classes from './ThirdScreen.module.css';
import ThirdScreen1 from './ThirdScreen1/ThirdScreen1';
import ThirdScreen2 from './ThirdScreen2/ThirdScreen2';
import ThirdScreen3 from './ThirdScreen3/ThirdScreen3';

function moveSircle(clientX, rangeLeft, sircleWidth, rangeWidth){

    const sircle = document.querySelector(`.${classes.sircle}`);
    const rangeCcolor = document.querySelector(`.${classes.range_color}`);

    let position = `${clientX - rangeLeft - (sircleWidth/2) }`;

    if (position > rangeWidth - (sircleWidth / 2)){
        position = rangeWidth - (sircleWidth / 2)
    }
    if (position < -(sircleWidth / 2)){
        position = -(sircleWidth / 2)
    }

    sircle.style.left = position +  'px';
    rangeCcolor.style.width = (+(sircleWidth / 2) + +(position) ) + 'px';
    
}

function approximationSircle(position, point, sircleWidth){

    const sircle = document.querySelector(`.${classes.sircle}`);
    const rangeCcolor = document.querySelector(`.${classes.range_color}`);
    const slide = document.querySelector(`.${classes.ThirdScreen_Slider}`);
    const slideWhidth = slide.getBoundingClientRect().width;


    sircle.style.transition = `all .5s`;
    rangeCcolor.style.transition = `all .5s`;
    sircle.style.left = position + 'px';
    rangeCcolor.style.width = (+(sircleWidth / 2) + +(position) ) + 'px';
    setTimeout(() => {sircle.style.transition = '';}, 1000)
    setTimeout(() => {rangeCcolor.style.transition = '';}, 1000)

    slide.style.transition = `all .5s`
    slide.style.transform = `translateX(${point * -(slideWhidth / 3)}px)`;
}

export default class ThirdScreen extends Component {

    state = {
        startX: 0,
        moveX: 0,
        rangeWidth: 0,
        rangeLeft: 0,
        sircleWidth: 0,
        points: 3,
    }

    
    handleTouchMove = (e) => {
        const {rangeLeft, sircleWidth, rangeWidth} = this.state
        moveSircle(e.changedTouches[0].clientX, rangeLeft, sircleWidth, rangeWidth)
        this.setState({
            moveX: e.changedTouches[0].clientX,
        })
    }
    handleTouchEnd = () => {
        const {points, rangeWidth, moveX, rangeLeft, sircleWidth} = this.state;
       
        const arrPoints = [];
        for (let i = 0; i < points; i++){
            arrPoints[i] = (rangeWidth / (points - 1)) * i
        }

        let nowPosition = Math.floor ( (( (moveX - rangeLeft) + (arrPoints[1] / 2) ) / arrPoints[1]) );

        if(nowPosition < 0) nowPosition = 0;
        if(nowPosition > points - 1) nowPosition = points - 1;

        approximationSircle((nowPosition * arrPoints[1]) - (sircleWidth / 2), nowPosition, sircleWidth );

    }

    componentDidMount(){
        const range = document.querySelector(`.${classes.range}`);
        const sircle = document.querySelector(`.${classes.sircle}`);
        this.setState({
            rangeWidth: range.getBoundingClientRect().width,
            rangeLeft: range.getBoundingClientRect().left,
            sircleWidth: sircle.getBoundingClientRect().width,
        })       
    }

    render(){
        return(
            <div className={classes.ThirdScreen} >
                <div className = {classes.ThirdScreen_Slider}>
                    <ThirdScreen1/>
                    <ThirdScreen2/>
                    <ThirdScreen3/>
                </div>
                <div className = {classes.wrapper}>
                    <div className = {classes.range}>
                        <div className = {classes.range_color}></div>
                        <div  
                            className = {classes.sircle}
                            onTouchMove={e => this.handleTouchMove(e)}
                            onTouchEnd={() => this.handleTouchEnd()}
                        >
                        </div>
                    </div>
                </div>
                <div className={classes.ThirdScreen_date}></div>
            </div>
        );
    }
}
