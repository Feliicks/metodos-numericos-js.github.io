function getId() {
    var inputFunction = document.getElementById("input_function").value;
    document.getElementById("output-p").innerHTML = inputFunction;
}

function eval_deri(f, value) {
    f = math.parse(f);
    f = math.derivative(f, "x").toString()
    return math.evaluate(f, {
        x: value
    })
}

function eval_func(f, value) {
    /*console.log(math.evaluate(f, {
        x: value
    }));*/

    return math.evaluate(f, {
        x: value
    })
}

function resolver_newthon() {
    i = 0
    let input_function = document.getElementById("input_function").value;
    let input_value = document.getElementById("valor_inicial").value;
    var tabla = '<table  class="table table-striped table-borderer" border="3"><tr class="table-dark table-sm"><td align="center">i</td><td align="center">x<sub></sub></td><td align="center">Error</td></tr>';
    var err, x_i, x = input_value //valor inicial
    do {//style="width: 200px"
        x_i = x;
        x = x - eval_func(input_function, x) / eval_deri(input_function, x);
        err = Math.abs((x - x_i) / x);
        tabla += '<tr class="table-active "><td>x<sub>' + i + '</sub></td><td>' + x_i + '</td><td>' + err + '</td></tr>';
        i++;
    } while (x != x_i && i < 100);
    document.getElementById('resultado').innerHTML = tabla + '</tbody></table><br>' + (i == 100 ? '<div class="text-center">No se pudo resolver. </div>' : '<div class="text-center">La solucion es ' + x+'</div>');
    console.log (x);
    draw();
}

function draw() {
    try {
        // compile the expression once
        const expression = document.getElementById('input_function').value
        const expr = math.compile(expression)

        // evaluate the expression repeatedly for different values of x
        const xValues = math.range(-10, 10, 0.5).toArray()
        const yValues = xValues.map(function (x) {
            return expr.evaluate({
                x: x
            })
        })

        // render the plot using plotly
        const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter'
        }
        const data = [trace1]
        Plotly.newPlot('plot', data)
    } catch (err) {
        console.error(err)
        alert(err)
    }
}

