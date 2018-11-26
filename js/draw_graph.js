
setTimeout(function(){

    var json = {
        'id': '1',
        'name': "Nikhil"
    };

    var svgns = "http://www.w3.org/2000/svg";
    var svg = document.getElementById('svg');
    var labelTop = document.createElementNS(svgns, "text");
    labelTop.setAttributeNS(null, "class", "graph__label graph__label--top");
    labelTop.setAttributeNS(null, "value", '500');
    labelTop.setAttributeNS(null, "text-anchor",  "middle");
    labelTop.setAttributeNS(null, "font-size",  "small");
    labelTop.setAttributeNS(null, "fill", "#CBCBCB");


    var graphLineLeft = document.createElementNS(svgns, "text");
    var graphLineRight = document.createElementNS(svgns, "text");
    var circle = document.createElementNS(svgns, "text");
    var labelMiddle = document.createElementNS(svgns, "text");
    var marker = document.createElementNS(svgns, "text");
    var labelBottom = document.createElementNS(svgns, "text");

    console.log(labelTop);
    console.log(json);
    svg.appendChild(labelTop);
}, 1000);