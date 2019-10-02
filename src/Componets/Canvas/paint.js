export default function paint(){
    const canvas = document.querySelector('#paint');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);


    const sketch = document.querySelector('#sketch');
    const sketch_style = getComputedStyle(sketch);

    let mouse = {x: 0, y: 0};
    let last_mouse = {x: 0, y: 0};

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        let w = window.innerWidth*0.4
        let h = window.innerHeight*0.4
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - w - this.offsetLeft;
        mouse.y = e.pageY - h - this.offsetTop;
        console.log(mouse.x)
        console.log(mouse.y)
    }, false);


    /* Drawing on Paint App */
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    const onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    };

}
