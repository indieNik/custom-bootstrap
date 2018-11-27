function appendToDom(svg, child) {
    svg.appendChild(child);
}

function drawGraphLabel(svgId, position, value, inverted, state) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById(svgId);
    let label = document.createElementNS(svgns, "text");
    let renderedPosition = position;
    
    inverted ? renderedPosition = 'inverted-' + position : renderedPosition = position;

    let classVal = "graph__label graph__label--" + renderedPosition;
    if(state) classVal += ' graph__label--' + state;

    // console.log('Final Class val: ', classVal);
    label.setAttributeNS(null, "class", classVal);
    if (value) label.textContent = value;
    
    // svg.appendChild(label);
    appendToDom(svg, label);
}

function drawGraphLine(svgId, position, inverted, dashed) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById(svgId);
    let graphLine = document.createElementNS(svgns, "path");

    let classVal = "graph__line graph__line--" + position;
    if (dashed) classVal += " graph__line--dashed"
    if (inverted) classVal += " graph__line--inverted"

    // console.log('Final Class val: ', classVal);
    graphLine.setAttributeNS(null, "class", classVal);
    
    // svg.appendChild(graphLine);
    appendToDom(svg, graphLine);
}

function drawGraphCircle(svgId, state) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById(svgId);
    let circle = document.createElementNS(svgns, "circle");

    let classVal = "graph__circle";
    if(state) classVal += ' graph__circle--' + state;

    // console.log('Final Class val: ', classVal);
    circle.setAttributeNS(null, "class", classVal);
    
    // svg.appendChild(circle);
    appendToDom(svg, circle);
}

function drawGraphMarker(svgId, inverted, state) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById(svgId);
    let marker = document.createElementNS(svgns, "circle");
    let classVal = "graph__marker";

    if(inverted) classVal += ' graph__marker--' + 'inverted';
    if(state) classVal += ' graph__marker--' + state;
    // console.log('Final Class val: ', classVal);
    marker.setAttributeNS(null, "class", classVal);
    
    // If state is Active, add another active outer SVG
    if(state === 'active') {
        let outerMarker = document.createElementNS(svgns, "circle");
        classVal += ' graph__marker--active-outer';
        // console.log('Final Outer Class val: ', classVal);
        outerMarker.setAttributeNS(null, "class", classVal);
        svg.appendChild(outerMarker);
        appendToDom(svg, outerMarker)
    }
    
    // svg.appendChild(marker);
    appendToDom(svg, marker);
}

function drawGraphConnectorLine(svgId, inverted, dashed, curved) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById(svgId);
    let graphConnectorLine = document.createElementNS(svgns, "path");
    let classVal = "connector__line";
    if (dashed) classVal += " connector__line--dashed";
    if (inverted) classVal += " connector__line--inverted";
    if (curved) classVal += " connector__line--curve";

    // console.log('Final Class val: ', classVal);
    graphConnectorLine.setAttributeNS(null, "class", classVal);
    
    // svg.appendChild(graphConnectorLine);
    appendToDom(svg, graphConnectorLine);
}

setTimeout(() => {

    let jsonData = [
        {    
            'id': 'node1',
            'type': 'node',
            'topLabel': 'Jan 1',
            'middleLabel': '500',
            'bottomLabel': 'Assigned',
            'inverted': false,
            'status': 'shared',
            'activeState' : 'normal',
            'leftDashed' : false,
            'rightDashed' : false
        },
        {    
            'id': 'node2',
            'type': 'node',
            'topLabel': 'Jan 10',
            'middleLabel': '',
            'bottomLabel': 'Shared',
            'inverted': false,
            'status': 'shared',
            'activeState' : 'normal',
            'leftDashed' : false,
            'rightDashed' : false
        },
        {    
            'id': 'node3',
            'type': 'node',
            'topLabel': 'Jan 18',
            'middleLabel': '',
            'bottomLabel': 'Assigned',
            'inverted': false,
            'status': 'shared',
            'activeState' : 'normal',
            'leftDashed' : false,
            'rightDashed' : false
        },
        {    
            'id': 'graph_connector_curve',
            'type': 'connector',
            'inverted': false,
            'dashed' : false
        },
        {    
            'id': 'node4',
            'type': 'node',
            'topLabel': 'Employee',
            'middleLabel': '',
            'bottomLabel': 'Feb 2',
            'inverted': true,
            'status': 'shared',
            'activeState' : 'normal',
            'leftDashed' : false,
            'rightDashed' : false
        },
        {    
            'id': 'node5',
            'type': 'node',
            'topLabel': 'Manager',
            'middleLabel': '',
            'bottomLabel': 'Feb 23',
            'inverted': true,
            'status': 'shared',
            'activeState' : 'active',
            'leftDashed' : false,
            'rightDashed' : false
        },
        {    
            'id': 'node6',
            'type': 'node',
            'topLabel': 'Additional',
            'middleLabel': '',
            'bottomLabel': 'Mar 1',
            'inverted': true,
            'status': 'not-shared',
            'activeState' : 'inactive',
            'leftDashed' : false,
            'rightDashed' : false
        }
    ];
    let graph_container = document.createElement('div');
    graph_container.setAttribute('id', 'graph_container_new');
    graph_container.setAttribute('class', 'graph-container');
    
    document.body.appendChild(graph_container);
    
    jsonData.forEach( (node, index) => {
        let svgns = "http://www.w3.org/2000/svg";
        if(node.type === 'node') {
            // Create a SVG DOM element to draw each graph node
            let graph = document.createElementNS(svgns, 'svg');
            graph.setAttribute('id', node.id);
            graph.setAttribute('class', 'graph');
            graph_container.appendChild(graph);
    
            drawGraphCircle(node.id, node.status);
            drawGraphLabel(node.id, 'top', node.topLabel, node.inverted, 'normal');
            drawGraphLabel(node.id, 'middle', node.middleLabel, node.inverted, node.activeState);
            drawGraphLabel(node.id, 'bottom', node.bottomLabel, node.inverted, node.activeState);
            drawGraphLine(node.id, 'left', node.inverted, node.leftDashed);
            drawGraphLine(node.id, 'right', node.inverted, node.rightDashed);
            drawGraphMarker(node.id, node.inverted, node.activeState);  

            if (jsonData.length > index - 1) {
                let graph_connector = document.createElementNS(svgns, 'svg');
                let graph_connector_id = 'connector' + (index+1);
                graph_connector.setAttribute('id', graph_connector_id);
                graph_connector.setAttribute('class', 'connector');
                graph_container.appendChild(graph_connector);
                // Draw a dashed connector line only if the current node's right graphLine is dashed
                drawGraphConnectorLine(graph_connector_id, node.inverted, node.rightDashed, false);
            }
        } else {
            // Remove the previous connector
            let previousConnector = document.querySelectorAll(".connector:last-child");
            console.log('Removing: ', previousConnector);
            previousConnector[0].remove();
            // Draw a curved connector
            let graph_connector_curve = document.createElementNS(svgns, 'svg');
            let graph_connector_curve_id = node.id;
            graph_connector_curve.setAttribute('id', graph_connector_curve_id);
            graph_connector_curve.setAttribute('class', 'connector connector--curve');
            graph_container.appendChild(graph_connector_curve);
            // Draw a dashed connector line only if the current node's right graphLine is dashed
            drawGraphConnectorLine(graph_connector_curve_id, node.inverted, node.dashed, true);
        }
    });
}, 1000);