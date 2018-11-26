function drawGraphLabel(position, color, value, inverted) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById('svg');
    let label = document.createElementNS(svgns, "text");
    let renderedPosition = position;
    
    inverted ? renderedPosition = 'inverted-' + position : renderedPosition = position;

    let classVal = "graph__label graph__label--" + renderedPosition;
    console.log('Final Class val: ', classVal);
    label.setAttributeNS(null, "class", classVal);
    if (value) label.textContent = value;
    
    svg.appendChild(label);
}

function drawGraphLine(position, inverted, dashed) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById('svg');
    let graphLine = document.createElementNS(svgns, "path");

    let classVal = "graph__line graph__line--" + position;
    if (dashed) classVal += " graph__line--dashed"
    if (inverted) classVal += " graph__line--inverted"

    console.log('Final Class val: ', classVal);
    graphLine.setAttributeNS(null, "class", classVal);
    
    svg.appendChild(graphLine);
}

function drawGraphCircle(state) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById('svg');
    let circle = document.createElementNS(svgns, "circle");

    let classVal = "graph__circle";
    if(state) classVal += ' graph__circle--' + state;

    console.log('Final Class val: ', classVal);
    circle.setAttributeNS(null, "class", classVal);
    
    svg.appendChild(circle);
}

function drawGraphMarker(inverted, state) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById('svg');
    let marker = document.createElementNS(svgns, "circle");
    let classVal = "graph__marker";

    if(inverted) classVal += ' graph__marker--' + 'inverted';
    if(state) classVal += ' graph__marker--' + state;
    console.log('Final Class val: ', classVal);
    marker.setAttributeNS(null, "class", classVal);
    
    // If state is Active, add another active outer SVG
    if(state === 'active') {
        let outerMarker = document.createElementNS(svgns, "circle");
        classVal += ' graph__marker--active-outer';
        console.log('Final Outer Class val: ', classVal);
        outerMarker.setAttributeNS(null, "class", classVal);
        svg.appendChild(outerMarker);
    }
    
    svg.appendChild(marker);
}

setTimeout(function(){

    let json = {
        'id': '1',
        'name': "Nikhil"
    };
    
    drawGraphCircle('not-shared');
    drawGraphCircle('waiting');
    drawGraphCircle('pending');
    drawGraphCircle('shared');
    
    drawGraphLabel('top', '#CBCBCB', "Jan 1", false);
    drawGraphLabel('middle', '#3B3B3B', "500", false);
    drawGraphLabel('bottom', '#CBCBCB', "Assigned", false);
    drawGraphLabel('top', '#CBCBCB', "Employee", true);
    drawGraphLabel('middle', '#3B3B3B', "500", true);
    drawGraphLabel('bottom', '#CBCBCB', "Feb 2", true);

    drawGraphLine('left', false, false);
    drawGraphLine('right', false, false);
    drawGraphLine('left', true, false);
    drawGraphLine('right', true, false);

    drawGraphMarker(false, 'active')
    drawGraphMarker(true, 'inactive')

}, 0);