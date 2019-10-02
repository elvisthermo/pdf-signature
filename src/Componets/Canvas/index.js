import React,{useState,useEffect} from 'react';
import paint from './paint'

function Canvas(props) {
    function canvas_draw() {

    }

    useEffect(() => {
        (function() {
            paint();

        }());

    }, [])

    useEffect(()=>{
        (function() {
            console.log("clear");
            paint();
        }());
    },[props.clear]);



    return (
        <div id="sketch"  width="400px" height="80px">
            <canvas id="paint" width="400px" height="80px" style={{"position":"relative","border":"2px solid"}}></canvas>
        </div>
    );

}

export default Canvas;




