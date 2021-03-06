        var lin_svg = d3.select("#linear").attr("width", 350).attr("height", 350).attr("x", 310).style("background", "beige").style("margin", "auto").style("padding", "5px").style("border", "3px solid black");
    
        d3.select("#linear_bezier_path").attr("fill", "none").style("stroke", "green").style("stroke-width", "3")
        d3.select("#linear_control_path").attr("fill", "none").style("stroke", "black")
    
        var qud_svg = d3.select("#quadratic").attr("width", 350).attr("height", 350).attr("x", 310).style("background", "beige").style("margin", "auto").style("padding", "5px").style("border", "3px solid black");
            
        d3.select("#quadratic_bezier_path").attr("fill", "none").style("stroke", "green").style("stroke-width", "3")
        d3.select("#quadratic_control_path").attr("fill", "none").style("stroke", "black")
        
        var cub_svg = d3.select("#cubic").attr("width", 350).attr("height", 350).attr("x", 310).style("background", "beige").style("margin", "auto").style("padding", "5px").style("border", "3px solid black");
        
        d3.select("#cubic_bezier_path").attr("fill", "none").style("stroke", "green").style("stroke-width", "3")
        d3.select("#cubic_control_path").attr("fill", "none").style("stroke", "black")

        var qutc_svg = d3.select("#quartic").attr("width", 350).attr("height", 350).attr("x", 310).style("background", "beige").style("margin", "auto").style("padding", "5px").style("border", "3px solid black");
        
        d3.select("#quartic_bezier_path").attr("fill", "none").style("stroke", "green").style("stroke-width", "3")
        d3.select("#quartic_control_path").attr("fill", "none").style("stroke", "black")
            
        var count, t = 0, mode;
        var lineFunction = d3.line().x(function (d) { return d.x; }).y(function (d) { return d.y; });
        d3.select("#slider").on("input", generate_bezier_curves)
        
        load_svgs();
        
function load_linear()
{
linear_cp = [{x: 40,y: 320 }, {x: 300, y: 40 }];
linear_control = lin_svg.selectAll(".linear_control")
    .data(linear_cp);
linear_control.enter().append("circle").merge(linear_control)
    .attr("r", 10)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .classed("linear_control", true)
    .call(d3.drag().on("drag", dragged))
    lin_svg.select("#linear_control_path")
    .attr("d", lineFunction(linear_cp))

    generate_linear_bezier_curve()
    function dragged(d) 
    {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y)
    generate_linear_bezier_curve()
    }
}

function load_quadratic()
{
var quadratic_cp = [{x: 50, y:320},{x: 60, y: 50},{x: 270,y: 40}];
quadratic_control = qud_svg.selectAll(".quadratic_control")
    .data(quadratic_cp);
quadratic_control.enter().append("circle").merge(quadratic_control)
    .attr("r", 10)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .classed("quadratic_control", true)
    .call(d3.drag().on("drag", dragged))
    qud_svg.select("#quadratic_control_path")
    .attr("d", lineFunction(quadratic_cp))
generate_quadratic_bezier_curve()
function dragged(d) 
{
d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y)
generate_quadratic_bezier_curve()
}
}
function load_cubic()
{
cubic_cp = [{x:30, y:320},{x:120, y:50},{x:220, y:50},{x:320, y:320}];
cubic_control = cub_svg.selectAll(".cubic_control")
    .data(cubic_cp);
cubic_control.enter().append("circle").merge(cubic_control)
    .attr("r", 10)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .text(function(d, i) { return "P" + i }) 
    .classed("cubic_control", true)
    .call(d3.drag().on("drag", dragged))
    .text(function(d, i) { return "P" + i; console.log(i) });
    cub_svg.select("#cubic_control_path")
    .attr("d", lineFunction(cubic_cp))
generate_cubic_bezier_curve()
function dragged(d) 
    {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y)
    generate_cubic_bezier_curve()
    }
}
function load_quartic()
{
quartic_cp = [{x:30,y:320},{x:100,y:50},{x:190,y:50},{x:175,y:280},{x:320,y:320}];
quartic_control = qutc_svg.selectAll(".quartic_control")
    .data(quartic_cp);
quartic_control.enter().append("circle").merge(quartic_control)
    .attr("r", 10)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .classed("quartic_control", true)
    .call(d3.drag().on("drag", dragged))
    qutc_svg.select("#quartic_control_path")
    .attr("d", lineFunction(quartic_cp))
generate_quartic_bezier_curve()
function dragged(d) 
    {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y)
    generate_quartic_bezier_curve()
    }
}
function radioMode()
{
    generate_bezier_curves()
}
function generate_linear_bezier_curve()
{
mode = document.getElementsByName("mode");
count = d3.select("#slider").property("value")
linear_c = d3.select("#linear").selectAll(".linear_control").data()
console.log(linear_c);
linear_p = [];
for (var i = 0; i <= count; i++) 
{
if(mode[0].checked)
{
t=i/count;
}
else
{
t=i/100;
}
        var linear = {};
        linear.x = (1 - t) * linear_c[0].x +
            t *  linear_c[1].x;
        linear.y = (1 - t) * linear_c[0].y +
            t *  linear_c[1].y;
         linear_p.push(linear)
    }
    update_linear_bezier_curve(linear_p);
    update_linear_control_curve(linear_c);
}

function generate_quadratic_bezier_curve()   
{        
mode = document.getElementsByName("mode");
count = d3.select("#slider").property("value")
quadratic_c = d3.select("#quadratic").selectAll(".quadratic_control").data()
quadratic_p = [];
for (var i = 0; i <= count; i++) 
{
if(mode[0].checked)
{
t=i/count;
}
else
{
t=i/100;
}
quadratic = {x:0,y:0};
quadratic.x = Math.pow(1 - t, 2) * quadratic_c[0].x +
        (1 - t) * 2 * t * quadratic_c[1].x +
        t * t * quadratic_c[2].x;
quadratic.y = Math.pow(1 - t, 2) * quadratic_c[0].y +
        (1 - t) * 2 * t * quadratic_c[1].y +
        t * t * quadratic_c[2].y;
quadratic_p.push(quadratic)
}
update_quadratic_bezier_curve(quadratic_p);
update_quadratic_control_curve(quadratic_c);
}

function generate_cubic_bezier_curve()
{
mode = document.getElementsByName("mode");
count = d3.select("#slider").property("value")
cubic_c = d3.select("#cubic").selectAll(".cubic_control").data()
cubic_p = [];
for (var i = 0; i <= count; i++) 
{
if(mode[0].checked)
{
t=i/count;
}
else
{
t=i/100;
}
cubic = {x:0,y:0};
cubic.x = Math.pow(1 - t, 3) * cubic_c[0].x +
    Math.pow(1 - t, 2) * 3 * t * cubic_c[1].x + 
        (1 - t) * 3 * t * t * cubic_c[2].x + t * t * t * cubic_c[3].x;
cubic.y = Math.pow(1 - t, 3) * cubic_c[0].y +
    Math.pow(1 - t, 2) * 3 * t * cubic_c[1].y + 
    (1 - t) * 3 * t * t * cubic_c[2].y + t * t * t * cubic_c[3].y;
cubic_p.push(cubic)
}
update_cubic_bezier_curve(cubic_p);
update_cubic_control_curve(cubic_c);
}

function generate_quartic_bezier_curve()
{
mode = document.getElementsByName("mode");
count = d3.select("#slider").property("value")
quartic_c = d3.select("#quartic").selectAll(".quartic_control").data()
quartic_p = [];
for (var i = 0; i <= count; i++) 
{
if(mode[0].checked)
{
t=i/count;
}
else
{
t=i/100;
}
quartic = {x:0,y:0};
quartic.x = Math.pow(1 - t, 4) * quartic_c[0].x + Math.pow(1 - t, 3) * 4 * t *
quartic_c[1].x + Math.pow(1 - t, 2) * 6 * t * t *
quartic_c[2].x + (1 - t) * 4 * t * t * t * quartic_c[3].x + t * t * t * t * quartic_c[4].x;

quartic.y = Math.pow(1 - t, 4) * quartic_c[0].y + Math.pow(1 - t, 3) * 4 * t *
quartic_c[1].y+ Math.pow(1 - t, 2) * 6 * t * t *
quartic_c[2].y + (1 - t) * 4 * t * t * t * quartic_c[3].y + t * t * t * t * quartic_c[4].y;
quartic_p.push(quartic)
console.log(quartic_p);
}
update_quartic_bezier_curve(quartic_p);
update_quartic_control_curve(quartic_c);
}

function update_linear_control_curve(linear_c)
{

var linear_control_update = d3.select("#linear").selectAll("#linear_control_path")
linear_control_update.enter().append("path")
        .merge(linear_control_update)
        .attr("d", lineFunction(linear_c))
linear_control_update.exit().remove()
}

function update_linear_bezier_curve(linear_p) 
{
var linear_update = d3.select("#linear")
                .selectAll(".linear_bezpoint")
                .data(linear_p)
linear_update.enter().append("circle").merge(linear_update)
.attr("r", 3)
.attr("cx", function (d, i) {return d.x;})
.attr("cy", function (d, i) {return d.y;})
.classed("linear_bezpoint", true)
linear_update.exit().remove()
lin_svg.select("#linear_bezier_path")   
.attr("d", lineFunction(linear_p))
}

function update_quadratic_control_curve(quartic_c)
{
var quadratic_control_update = d3.select("#quadratic").selectAll("#quadratic_control_path")
quadratic_control_update.enter().append("path")
        .merge(quadratic_control_update)
        .attr("d", lineFunction(quadratic_c))
quadratic_control_update.exit().remove()
}

function update_quadratic_bezier_curve(quadratic_p) 
{
var quadratic_update = d3.select("#quadratic")
                .selectAll(".quadratic_bezpoint")
                .data(quadratic_p)
quadratic_update.enter().append("circle").merge(quadratic_update)
.attr("r", 3)
.attr("cx", function (d, i) {return d.x;})
.attr("cy", function (d, i) {return d.y;})
.classed("quadratic_bezpoint", true)
quadratic_update.exit().remove()
qud_svg.select("#quadratic_bezier_path")
.attr("d", lineFunction(quadratic_p))
}

function update_cubic_control_curve(cubic_c)
{
var cubic_control_update = d3.select("#cubic").selectAll("#cubic_control_path")
cubic_control_update.enter().append("path")
        .merge(cubic_control_update)
        .attr("d", lineFunction(cubic_c))
cubic_control_update.exit().remove()
}

function update_cubic_bezier_curve(cubic_p) 
{
var cubic_update = d3.select("#cubic")
                .selectAll(".cubic_bezpoint")
                .data(cubic_p)
cubic_update.enter().append("circle").merge(cubic_update)
.attr("r", 3)
.attr("cx", function (d, i) {return d.x;})
.attr("cy", function (d, i) {return d.y;})
.classed("cubic_bezpoint", true)
cubic_update.exit().remove()
cub_svg.select("#cubic_bezier_path")
.attr("d", lineFunction(cubic_p))
}

function update_quartic_bezier_curve(quartic_p) 
{
var quartic_update = d3.select("#quartic")
                .selectAll(".quartic_bezpoint")
                .data(quartic_p)
quartic_update.enter().append("circle").merge(quartic_update)
.attr("r", 3)
.attr("cx", function (d, i) {return d.x;})
.attr("cy", function (d, i) {return d.y;})
.classed("quartic_bezpoint", true)
quartic_update.exit().remove()
qutc_svg.select("#quartic_bezier_path")
.attr("d", lineFunction(quartic_p))
}
function update_quartic_control_curve(quartic_c)
{
var quartic_control_update = d3.select("#quartic").selectAll("#quartic_control_path")
quartic_control_update.enter().append("path")
        .merge(quartic_control_update)
        .attr("d", lineFunction(quartic_c))
quartic_control_update.exit().remove()
}
function load_svgs()
{
load_linear()
load_quadratic()
load_cubic()
load_quartic()
}
function generate_bezier_curves()
{
generate_linear_bezier_curve()
generate_quadratic_bezier_curve()
generate_cubic_bezier_curve()
generate_quartic_bezier_curve()
}
function btnFun()
{
    location.reload();
}