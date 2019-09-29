import React,{useState,useEffect} from 'react';
import paint from './paint'

function Canvas() {
    function canvas_draw() {

    }

    useEffect(() => {
        (function() {
            paint();

        }());


    }, [])

    return (
        <div id="sketch"  width="400px" height="80px">
            <canvas id="paint" width="400px" height="80px" style={{"position":"relative","border":"2px solid"}}></canvas>
        </div>
    );

}

export default Canvas;




