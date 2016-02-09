var m = {t:50,r:100,b:50,l:100},
    w = d3.select('.plot').node().clientWidth- m.l- m.r,
    h = d3.select('.plot').node().clientHeight - m.t - m.b;

var plot = d3.select('.plot').append('svg')
    .attr('width',w+ m.l+ m.r)
    .attr('height',h+ m.t+ m.b)
    .append('g').attr('class','histogram')
    .attr('transform','translate('+ m.l+','+ m.t+')');

d3.csv('../data/hubway_trips_reduced.csv',parse,dataLoaded);

function dataLoaded(err,rows){
    var layout = d3.layout.histogram()
        .value(function(d){return d.startTime})
        .range([new Date(2011,6,28),new Date(2013,11,31)])
        .bins(d3.range(new Date(2011,6,28), new Date(2013,11,31), 1000*3600*24));

    var timeSeries = layout(rows);

    //Scale and axis
    var scaleX = d3.time.scale().domain([new Date(2011,6,28),new Date(2013,11,31)]).range([0,w]),
        scaleY = d3.scale.linear().domain([0,d3.max(timeSeries,function(d){return d.y})]).range([h,0]);
    var axisX = d3.svg.axis()
        .orient('bottom')
        .scale(scaleX)
        .ticks(d3.time.month)
        .tickFormat(function(v){
            return v.getFullYear() + '-' + (v.getMonth()+1)
        });

    //Generator
    var line = d3.svg.line()
        .x(function(d){return scaleX(d.x + d.dx/2)})
        .y(function(d){return scaleY(d.y)})
        .interpolate('basis');
    var area = d3.svg.area()
        .x(function(d){return scaleX(d.x + d.dx/2)})
        .y1(function(d){return scaleY(d.y)})
        .y0(h)
        .interpolate('basis');

    //append DOM
    plot.append('path').attr('class','area').datum(timeSeries).attr('d',area);
    plot.append('path').attr('class','line').datum(timeSeries).attr('d',line);

    plot.append('g').attr('class','axis axis-x')
        .attr('transform','translate(0,'+h+')')
        .call(axisX);

    var target = plot.append('g').attr('class','target');
    target.append('circle').attr('r',2);
    target.append('text').attr('text-anchor','middle').attr('dy',-15);

    //Interaction
    var bisector = d3.bisector(function(d){return d.x}).left;

    plot.append('rect').attr('width',w).attr('height',h).style('fill-opacity',0)
        .on('mousemove',function(){
            var date = scaleX.invert(d3.mouse(plot.node())[0]);

            var i = bisector(timeSeries, date);

            var x = scaleX(timeSeries[i].x + timeSeries[i].dx/2),
                y = scaleY(timeSeries[i].y);

            target.attr('transform','translate('+x+','+y+')')
                .select('text').text((new Date(timeSeries[i].x)).toString() + ' : ' + timeSeries[i].y);
        })





}

function parse(d){
    if(+d.duration<0) return;

    return {
        duration: +d.duration,
        startTime: parseDate(d.start_date),
        endTime: parseDate(d.end_date),
        startStation: d.strt_statn,
        endStation: d.end_statn
    }
}

function parseDate(date){
    var day = date.split(' ')[0].split('/'),
        time = date.split(' ')[1].split(':');

    return new Date(+day[2],+day[0]-1, +day[1], +time[0], +time[1]);
}

