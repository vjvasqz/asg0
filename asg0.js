//DrawRectangle.js

function main() {
    //Retrieve <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log ('Failed to retrieve the <canvas> element');
        return;
    }
    //get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');

    //Draw a blue rectangle
    // ctx.fillStyle = 'rgba(0,0,225,1.0)'; //set a blue color
    // ctx.fillRect(120,10,150,150); //Fill a rectangle with the color

    //Draw a black rectangle
    ctx.fillStyle = 'rgba(0,0,0,1.0)'; //set a black color
    ctx.fillRect(0,0,400,400); //Fill a rectangle with the color
    
    //Part2 - calls Vector3 from cuon and calles the drawVector function
    // let v1 = new Vector3([2.25, 2.25, 0]);
    // drawVector(ctx, v1, "red");
}

//Part 2 - Draw a red vector v1
function drawVector(ctx, v, color) {

    let cx = ctx.canvas.width/2; //finds the center of the canvas
    let cy = ctx.canvas.height/2; //finds the center of the canvas

    // Scale vector coordinates by 20
    let sx = v.elements[0] * 20;
    let sy = v.elements[1] * 20;

    ctx.beginPath(); //begins the line's path
    ctx.moveTo(cx,cy); //center the point
    ctx.lineTo(cx + sx, cy - sy); //location of the line
    ctx.strokeStyle = color;//calls the color
    ctx.stroke();//draws the line
}

// Part 3 - Add user interface
// Part 4 - Modify add second vector v2
function handleDrawEvent(){
    //need to get the canvas like in the main function
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    //clear the canvas
    ctx.fillStyle = 'rgba(0,0,0,1.0)'; //set a black color
    ctx.fillRect(0,0,400,400); //Fill a rectangle with the color

    //Read the values of the text boxes to create v1.
    let drawV1x = parseFloat(document.getElementById('v1x').value);
    let drawV1y = parseFloat(document.getElementById('v1y').value);
    let v1 = new Vector3([drawV1x,drawV1y,0]);

    //Read the values of the text boxes to create v2.
    let drawV2x = parseFloat(document.getElementById('v2x').value);
    let drawV2y = parseFloat(document.getElementById('v2y').value);
    let v2 = new Vector3([drawV2x,drawV2y,0]);


    //call drawVector for vector 1
    drawVector(ctx, v1, "red");

    //call drawVector for vector 2
    drawVector(ctx, v2, "blue");
}

// Part 5 - Operations
function handleDrawOperationEvent(){
    //// 1) Clear Canvas
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0,0,0,1.0)'; //set a black color
    ctx.fillRect(0,0,400,400); //Fill a rectangle with the color


    //// 2 & 3) read v1, read v2
    //Read the values of the text boxes to create v1.
    let drawV1x = parseFloat(document.getElementById('v1x').value);
    let drawV1y = parseFloat(document.getElementById('v1y').value);
    let v1 = new Vector3([drawV1x,drawV1y,0]);
    //call drawVector for vector 1
    drawVector(ctx, v1, "red");
    //Read the values of the text boxes to create v2.
    let drawV2x = parseFloat(document.getElementById('v2x').value);
    let drawV2y = parseFloat(document.getElementById('v2y').value);
    let v2 = new Vector3([drawV2x,drawV2y,0]);
    //call drawVector for vector 2
    drawVector(ctx, v2, "blue");


    //// 4) read the operation selection and the scalar
    let operationSelct = document.getElementById("operations").value;
    let scalr = parseFloat(document.getElementById("scalar").value);
    // Operation options
    if (operationSelct === 'Add'){
        let result = v1.add(v2);
        drawVector(ctx, result, "green");
    } else if (operationSelct === 'Sub'){
        let result = v1.sub(v2);
        drawVector(ctx, result, "green");
        
    } else if (operationSelct === 'Mul'){
        let resultA = v1.mul(scalr);
        let resultB = v2.mul(scalr);
        drawVector(ctx, resultA, "green");
        drawVector(ctx, resultB, "green");
        
    } else if (operationSelct === 'Div'){
        if (scalr != 0) {
            let resultA = v1.div(scalr);
            let resultB = v2.div(scalr);
            drawVector(ctx,resultA, "green");
            drawVector(ctx,resultB, "green");
        }
        
    // Part 6 - Magnitude and normalize operations
    } else if (operationSelct === 'Mag'){
        let mag1 = v1.magnitude();
        let mag2 = v2.magnitude();
        console.log("Magnitude v1: ", mag1);
        console.log("Magnitude v2: ", mag2);

    } else if (operationSelct === 'Nor'){
        let nor1 = new Vector3([drawV1x, drawV1y,0]);
        let nor2 = new Vector3([drawV2x, drawV2y,0]);
        nor1.normalize();
        nor2.normalize();
        drawVector(ctx,nor1, "green");
        drawVector(ctx,nor2, "green");
        
    } else if (operationSelct === "Angl"){
        let angle = angleBetween(v1, v2);
        console.log("Angle: ", angle)
    } else if (operationSelct === "Area"){
        let area = areaTriangle(v1, v2);
        console.log("Area of the triangle: ", area)
    }
}

//Part 7 - Angles between vectors 
function angleBetween(v1, v2){
    let dotPrd = Vector3.dot(v1, v2);

    //get the magnitudes
    let mag1 = v1.magnitude();
    let mag2 = v2.magnitude();

    let cosAng = dotPrd/(mag1*mag2);
    if(cosAng > 1) cosAng = 1;
    if(cosAng < -1) cosAng = -1;

    //convert radian to degree
    let angleDeg = Math.acos(cosAng) * (180/ Math.PI);
    return angleDeg;
}

//Part 8 - Area of Triangle
function areaTriangle(v1, v2){
    let crossProduct = Vector3.cross(v1, v2);
    let areaParllel = crossProduct.magnitude();
    return areaParllel /2;
}
