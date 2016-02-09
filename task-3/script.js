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

var circles = plot.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx',function(d,i){return w/9*i})
    .attr('cy',h/2)
    .attr('r',10)
    .on('mouseover',function(d,i){})
    .on('mouseleave',function(d,i){});

//Task 1: append the same 10 circles to #plot-2

//Task 2: how do these two plots talk to each other?

