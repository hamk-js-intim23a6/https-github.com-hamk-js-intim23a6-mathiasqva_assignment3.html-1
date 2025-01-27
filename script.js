function calculateAndPlot() {
    const funcInput = document.getElementById('function').value;
    const startX = parseFloat(document.getElementById('startX').value);
    const endX = parseFloat(document.getElementById('endX').value);
    const xStep = parseFloat(document.getElementById('xStep').value);
    const yScale = parseFloat(document.getElementById('yScale').value);
    
    if (isNaN(startX) || isNaN(endX) || isNaN(xStep) || isNaN(yScale) || !funcInput) {
        alert("Please enter valid numeric values for all fields.");
        return;
    }

    if (startX >= endX) {
        alert("Start of x must be less than end of x.");
        return;
    }

    let xValues = [];
    let yValues = [];
    let resultsHtml = '<h3>Results:</h3><ul>';

    for (let x = startX; x <= endX; x += xStep) {
        try {
            let y = eval(funcInput.replace(/x/g, `(${x})`)) * yScale;
            xValues.push(x);
            yValues.push(y);
            resultsHtml += `<li>f(${x}) = ${y}</li>`;
        } catch (e) {
            alert("Error in function evaluation: " + e.message);
            return;
        }
    }

    resultsHtml += '</ul>';
    document.getElementById('results').innerHTML = resultsHtml;

    plotFunction(xValues, yValues);
}

function plotFunction(xValues, yValues) {
    const ctx = document.getElementById('functionPlot').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xValues,
            datasets: [{
                label: 'Function Plot',
                data: yValues,
                borderColor: 'blue',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'x'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'f(x)'
                    }
                }
            }
        }
    });
}
