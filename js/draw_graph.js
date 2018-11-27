function drawGraphLabel(svgId, position, value, inverted) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById(svgId);
    let label = document.createElementNS(svgns, "text");
    let renderedPosition = position;
    
    inverted ? renderedPosition = 'inverted-' + position : renderedPosition = position;

    let classVal = "graph__label graph__label--" + renderedPosition;
    // console.log('Final Class val: ', classVal);
    label.setAttributeNS(null, "class", classVal);
    if (value) label.textContent = value;
    
    svg.appendChild(label);
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
    
    svg.appendChild(graphLine);
}

function drawGraphCircle(svgId, state) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById(svgId);
    let circle = document.createElementNS(svgns, "circle");

    let classVal = "graph__circle";
    if(state) classVal += ' graph__circle--' + state;

    // console.log('Final Class val: ', classVal);
    circle.setAttributeNS(null, "class", classVal);
    
    svg.appendChild(circle);
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
    }
    
    svg.appendChild(marker);
}

function drawGraphConnectorLine(svgId, inverted, dashed) {
    let svgns = "http://www.w3.org/2000/svg";
    let svg = document.getElementById(svgId);
    let graphConnectorLine = document.createElementNS(svgns, "path");
    let classVal = "connector__line";
    if (dashed) classVal += " connector__line--dashed"
    if (inverted) classVal += " connector__line--inverted"

    // console.log('Final Class val: ', classVal);
    graphConnectorLine.setAttributeNS(null, "class", classVal);
    
    svg.appendChild(graphConnectorLine);
}

setTimeout(async function(){

    let json = {
        'node1': {
            'topLabel': 'Jan 1',
            'middleLabel': '500',
            'bottomLabel': 'Assigned',
            'inverted': false,
            'status': 'shared',
            'activeState' : 'normal',
            'leftDashed' : false,
            'rightDashed' : false
        },
        'node2': {
            'topLabel': 'Jan 10',
            'middleLabel': '',
            'bottomLabel': 'Shared',
            'inverted': false,
            'status': 'shared',
            'activeState' : 'normal',
            'leftDashed' : false,
            'rightDashed' : false
        },
        'node3': {
            'topLabel': 'Jan 18',
            'middleLabel': '',
            'bottomLabel': 'Assigned',
            'inverted': false,
            'status': 'shared',
            'activeState' : 'normal',
            'leftDashed' : false,
            'rightDashed' : true
        },
        'node4': {
            'topLabel': 'Employee',
            'middleLabel': '',
            'bottomLabel': 'Feb 2',
            'inverted': true,
            'status': 'shared',
            'activeState' : 'normal',
            'leftDashed' : true,
            'rightDashed' : false
        },
        'node5': {
            'topLabel': 'Manager',
            'middleLabel': '',
            'bottomLabel': 'Feb 23',
            'inverted': true,
            'status': 'shared',
            'activeState' : 'active',
            'leftDashed' : false,
            'rightDashed' : false
        },
        'node6': {
            'topLabel': 'Additional',
            'middleLabel': '',
            'bottomLabel': 'Mar 1',
            'inverted': true,
            'status': 'not-shared',
            'activeState' : 'inactive',
            'leftDashed' : false,
            'rightDashed' : false
        }
    };

    let graph_container = document.getElementById('graph-container');

    for (const nodeId in json) {

        const node = json[nodeId];
        
        // Create a SVG DOM element to paint
        let graph = document.createElement('svg');
        graph.setAttribute('id', nodeId);
        graph.setAttribute('class', 'graph');
        graph_container.appendChild(graph);

        drawGraphCircle(nodeId, node['status']);
        drawGraphLabel(nodeId, 'top', node['topLabel'], node['inverted']);
        drawGraphLabel(nodeId, 'middle', node['middleLabel'], node['inverted']);
        drawGraphLabel(nodeId, 'bottom', node['bottomLabel'], node['inverted']);
        drawGraphLine(nodeId, 'left', node['inverted'], node['leftDashed']);
        drawGraphLine(nodeId, 'right', node['inverted'], node['rightDashed']);
        drawGraphMarker(nodeId, node['inverted'], node['activeState']);
        await sleep(500);

        if(nodeId != 'node8') {
            let graph_container = document.getElementById('graph-container');
            let graph_connector = document.createElement('svg');
            let graph_connector_id = 'connector' + parseInt(Object.keys(json).indexOf(nodeId) + 1);
            graph_connector.setAttribute('id', graph_connector_id);
            graph_connector.setAttribute('class', 'connector');
            graph_container.appendChild(graph_connector);
            // Draw a dashed connector line only if the current node's right graphLine is dashed
            drawGraphConnectorLine(graph_connector_id, node['inverted'], node['rightDashed']);
            await sleep(1000);
        }
    }

    console.log(graph_container);

}, 0);

function sleep(ms) {
    console.log('Sleeping for ' + ms + ' seconds..');
    return new Promise(resolve => setTimeout(resolve, ms));
}  