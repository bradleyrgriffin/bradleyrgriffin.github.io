"use strict";  // gives improved error-checking in scripts.

    var canvas;    // The canvas element on which we will draw.
    var graphics;  // A 2D graphics context for drawing on the canvas.

    var pointlist = [];

    var color, lineThickness = 10;

    var lastEvent = [];
    
    /**
     *  draws a point where the user clicked.
     */
    function draw(xVal,yVal) {
        graphics.fillRect(xVal,yVal,4,4);
    }
    
    
    /**
     * This function is called in init() to set up mouse event handling
     * on the canvas.  You can modify the nested functions doMouseDown,
     * doMouseDrag, and possibly doMouseUp to change the reponse to
     * mouse events.  As an example, this program does some simple drawing.
     * 
     * However, only mouseUp and mouseDown are really in use in this program, 
     * mouseMove is there if I decide to use it.
     */
    function installMouseHandler() {

        var dragging = false;  // set to true when a drag action is in progress.
        var startX, startY;    // coordinates of mouse at start of drag.
        var prevX, prevY;      // previous mouse position during a drag.
        
        function doMouseDown(evt) {
                // This function is called when the user presses a button on the mouse.
                // Only the main mouse button will start a drag.
            if (dragging) {
                return;  // if a drag is in progress, don't start another.
            }
            if (evt.button != 0) {
                return;  // don't respond unless the button is the main (left) mouse button.
            }
            var x,y;  // mouse position in canvas coordinates
            var r = canvas.getBoundingClientRect();
            x = Math.round(evt.clientX - r.left);  // translate mouse position from screen coords to canvas coords.
            y = Math.round(evt.clientY - r.top);   // round to integer values; some browsers would give non-integers.
            //pointlist.push(x);
            //pointlist.push(y); 
            
            dragging = true;  // (this won't be the case for all mousedowns in all programs)
            if (dragging) {
                startX = prevX = x;
                startY = prevY = y;
                document.addEventListener("mousemove", doMouseMove, false);
                document.addEventListener("mouseup", doMouseUp, false);
            }
        }
        
        function doMouseMove(evt) {
            /*
                // This function is called when the user moves the mouse during a drag.
            if (!dragging) {
                return;  // (shouldn't be possible)
            }
            var x,y;  // mouse position in canvas coordinates
            var r = canvas.getBoundingClientRect();
            x = Math.round(evt.clientX - r.left);  
            y = Math.round(evt.clientY - r.top);
            
            /*
            // As an example, if the shift key is down, then a black line is drawn from the
            // previous mouse position to the current position.  Otherwise, a randomly colored
            // square is drawn at the current mouse position.
                graphics.lineWidth = this.lineThickness;
                graphics.strokeStyle = this.color;
                graphics.lineCap = "round";
                graphics.beginPath();
                graphics.moveTo(prevX,prevY);
                graphics.lineTo(x,y);


                graphics.stroke();
                
            
            prevX = x;  // update prevX,prevY to prepare for next call to doMouseMove
            prevY = y;
            */
        }
        
        function doMouseUp(evt) {
                // This function is called when the user releases a mouse button during a drag.
            if (!dragging) {
                return;  // (shouldn't be possible)
            }

            var x,y;  // mouse position in canvas coordinates
            var r = canvas.getBoundingClientRect();
            x = Math.round(evt.clientX - r.left);  
            y = Math.round(evt.clientY - r.top);

            //Add points to pointlist, and then draws the point on the canvas.
            pointlist.push(x);
            pointlist.push(y);
            draw(x,y);

            //Removes and updates lister information
            dragging = false;
            document.removeEventListener("mousemove", doMouseMove, false);
            document.removeEventListener("mouseup", doMouseMove, false);
            
            //draws the temporary line that the user sees.
            graphics.lineWidth = lineThickness;
            graphics.strokeStyle = color;
            graphics.lineCap = "round";
            graphics.beginPath();
            graphics.moveTo(pointlist[pointlist.length-2], pointlist[pointlist.length-1]);
            graphics.lineTo(pointlist[pointlist.length -4], pointlist[pointlist.length - 3]);
            graphics.stroke();
         }
         
         canvas.addEventListener("mousedown", doMouseDown, false);

   } // end installMouseHandler

    
    /**
     *  KeyCode responses
     */
    function doKeyDown(evt) {
        var code = evt.keyCode;  // Numerical code for key that was pressed.
        switch (code) {
        case 37:  // left arrow key
                //does nothing
            break;
        case 39:  // right arrow key
                //does nothing
            break;
        case 38:  // up arrow key
                //does nothing
            break;
        case 40:  // down arrow key
            
            //Draws the fully-defined polygon, and fills it in by calling the drawPolygon function.
            drawPolygon();
            break;
        case 32:  // space key

            //Clears the Canvas
            graphics.clearRect(0,0,canvas.width,canvas.height);
            pointlist = [];
            break;
        }
        if (code <= 40 && code >=37) {
            evt.preventDefault(); // Stop arrow keys from scrolling the page.
        }
    }
    

    //Draws the fully-defined polygon/polyline from the global var pointslist. Fills in the polygon/polyline as well, with the selected color.
    function drawPolygon(){
        graphics.beginPath();
        graphics.moveTo(pointlist[0],pointlist[1]);
        for(var i = 2; i < pointlist.length; i+=2){
            graphics.lineTo(pointlist[i], pointlist[i+1]);
        }
        graphics.lineTo(pointlist[0], pointlist[1]);
        graphics.closePath();
        graphics.fillStyle = color;
        graphics.fill();
        graphics.strokeStyle = color;
        graphics.stroke();
        pointlist = [];
    }
       
    /**
     * The init() function is called after the page has been
     * loaded.  It initializes the canvas and graphics variables,
     * and it installs mouse and key listeners.  If an error
     * occurs, a message is displayed in place of the canvas.
     */
    function init() {
        try {
            canvas = document.getElementById("canvas");
            graphics = canvas.getContext("2d");
        } catch(e) {
            document.getElementById("canvasholder").innerHTML =
               "<p>Canvas graphics is not supported.<br>" +
               "An error occurred while initializing graphics.</p>";
        }
        installMouseHandler();
        document.addEventListener("keydown", doKeyDown, false);


        
            //Will change color value to whatever the selected value is.
            document.getElementById("color").value = "Black";
            document.getElementById("color").onchange = function(){
                color = document.getElementById("color").value;
                graphics.strokeStyle = color;
                graphics.fillStyle = color;
                graphics.fill();
                graphics.stroke();
            };

            //Will change the line thickness value to whatever the selected value is.
            document.getElementById("lineThickness").value = "10";
            document.getElementById("lineThickness").onchange = function(){
                lineThickness = parseInt(document.getElementById("lineThickness").value);
            };
            
}