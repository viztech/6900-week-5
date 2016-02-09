var m = {t:50,r:50,b:50,l:50},
    w = d3.select('.plot').node().clientWidth - m.l - m.r,
    h = d3.select('.plot').node().clientHeight - m.t - m.b;

var data = d3.range(10).map(function(d){return Math.random()*100});
console.log(data);

var plot = d3.select('.plot').append('svg')
    .attr('width',w+ m.l+ m.r)
    .attr('height',h+ m.t + m.b)
    .append('g')
    .attr('transform','translate('+ m.l+','+ m.t+')');

plot.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx',function(d,i){return w/9*i})
    .attr('cy',h/2)
    .attr('r',10);

//Task 1: change circle color based on "mouseenter" and "mouseleave"

//Task 2: apply tooltip

//Task 3: consolidate everything under one function