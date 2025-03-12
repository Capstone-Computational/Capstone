document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const menu = document.getElementById('menu');
    const aboutLink = document.getElementById('about-link');
    const aboutSection = document.getElementById('about-section');
    const exitAboutButton = document.getElementById('exit-about');
    const casesLink = document.querySelector('a[href="#cases-per-year"]');
    const casesSection = document.getElementById('cases-per-year');
    const exitCasesButton = document.getElementById('exit-cases');
    const stagesLink = document.querySelector('a[href="#stages-of-hiv"]');
    const stagesSection = document.getElementById('stages-of-hiv');
    const exitStagesButton = document.getElementById('exit-stages');
    const mainSection = document.querySelector('main');
    const numberOfCasesSection = document.querySelector('.number-of-cases');
    const hivPredictionSection = document.querySelector('.hiv-prediction');
    let hivChartInstance = null;

    menuButton.addEventListener('click', function() {
        menu.classList.toggle('hidden');
    });

    aboutLink.addEventListener('click', function(event) {
        event.preventDefault();
        aboutSection.classList.remove('hidden');
        casesSection.classList.add('hidden');
        stagesSection.classList.add('hidden');
        numberOfCasesSection.classList.add('hidden');
        hivPredictionSection.classList.add('hidden');
        mainSection.classList.add('hidden');
        menu.classList.add('hidden');
        destroyChart();
    });

    exitAboutButton.addEventListener('click', function() {
        aboutSection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        numberOfCasesSection.classList.remove('hidden');
        hivPredictionSection.classList.remove('hidden');
    });

    casesLink.addEventListener('click', function(event) {
        event.preventDefault();
        casesSection.classList.remove('hidden');
        aboutSection.classList.add('hidden');
        stagesSection.classList.add('hidden');
        numberOfCasesSection.classList.add('hidden');
        hivPredictionSection.classList.add('hidden');
        mainSection.classList.add('hidden');
        menu.classList.add('hidden');
        showBarChart();
    });

    exitCasesButton.addEventListener('click', function() {
        casesSection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        numberOfCasesSection.classList.remove('hidden');
        hivPredictionSection.classList.remove('hidden');
        destroyChart();
    });

    stagesLink.addEventListener('click', function(event) {
        event.preventDefault();
        stagesSection.classList.remove('hidden');
        aboutSection.classList.add('hidden');
        casesSection.classList.add('hidden');
        numberOfCasesSection.classList.add('hidden');
        hivPredictionSection.classList.add('hidden');
        mainSection.classList.add('hidden');
        menu.classList.add('hidden');
        destroyChart();
    });

    exitStagesButton.addEventListener('click', function() {
        stagesSection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        numberOfCasesSection.classList.remove('hidden');
        hivPredictionSection.classList.remove('hidden');
    });

    // Close the menu if clicked outside
    document.addEventListener("click", function (event) {
        if (!menuButton.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.add("hidden");
        }
    });

    function showBarChart() {
        // Data from the table
        const years = [2019, 2020, 2021, 2022, 2023, 2024];
        const cases = [12711, 8027, 12319, 14921, 17227, 17551];

        // Get the canvas element
        const ctx = document.getElementById('hivChart').getContext('2d');

        // Destroy the previous chart instance if it exists
        if (hivChartInstance) {
            hivChartInstance.destroy();
        }

        // Create the bar chart
        hivChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Total Number of Cases',
                    data: cases,
                    backgroundColor: 'skyblue',
                    borderColor: 'black',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function destroyChart() {
        if (hivChartInstance) {
            hivChartInstance.destroy();
            hivChartInstance = null;
            // Clear the canvas
            const ctx = document.getElementById('hivChart').getContext('2d');
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById("casesChart").getContext("2d");
    var casesChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
            datasets: [{
                label: "Cases",
                data: [12711, 8027, 12319, 14921, 17227, 17551],
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                pointBackgroundColor: "red",
                pointBorderColor: "red",
                pointRadius: 5,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            animation: {
                duration: 2000, // Duration of the animation in milliseconds
                easing: 'easeInOutQuad' // Easing function for the animation
            },
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Year"
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return ["2019", "2020", "2021", "2022", "2023", "2024"][index];
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Number of Cases"
                    },
                    beginAtZero: false
                }
            }
        }
    });
});

function calculateHIV() {
    let C0 = parseFloat(document.getElementById("C0").value);
    let R0 = parseFloat(document.getElementById("R0").value);
    let alpha = parseFloat(document.getElementById("alpha").value);
    let beta = parseFloat(document.getElementById("beta").value);
    let t = parseFloat(document.getElementById("t").value);

    if (isNaN(C0) || isNaN(R0) || isNaN(alpha) || isNaN(beta) || isNaN(t)) {
        document.getElementById("result").innerHTML = "Please enter valid numbers.";
        return;
    }

    let e = Math.E; // Euler's constant
    let baseValue = (R0 / alpha) * Math.log(1 + (beta * Math.pow(e, -alpha * t)));

    // Determine the correct multiplier based on β value
    let multiplier;
    if (beta <= 37.3) {
        multiplier = 1;   // No multiplier for 20% or lower
    } else if (beta <= 149.2) {
        multiplier = 10;  // 21% to 50%
    } else {
        multiplier = 100; // 51% and above
    }

    // Apply the multiplier to the base formula
    let Ct = C0 + (multiplier * baseValue);
    
    // Get the line chart and update it
    let casesChart = Chart.getChart("casesChart");
    if (casesChart) {
        // Get the last year from chart labels
        let lastYear = parseInt(casesChart.data.labels[casesChart.data.labels.length - 1]);
        let nextYear = lastYear + t;
        
        // Update chart labels to include new years
        const existingLabels = casesChart.data.labels.map(year => parseInt(year));
        
        // Check if the year already exists in the chart
        if (!existingLabels.includes(nextYear)) {
            // Add the new prediction
            casesChart.data.labels.push(nextYear.toString());
            casesChart.data.datasets[0].data.push(Math.round(Ct));
            
            // Update the chart scales to accommodate new data
            casesChart.options.scales.x.ticks.callback = function(value, index, values) {
                return casesChart.data.labels[index];
            };
            
            casesChart.update();
        } else {
            // If year exists, update the existing value
            const yearIndex = existingLabels.indexOf(nextYear);
            casesChart.data.datasets[0].data[yearIndex] = Math.round(Ct);
            casesChart.update();
        }
    }

    // Update the bar chart
    // First, get the bar chart canvas and check if it exists
    const barChartCanvas = document.getElementById('hivChart');
    if (barChartCanvas) {
        // Get the existing chart instance if it exists
        let barChart = Chart.getChart(barChartCanvas);
        
        // If the chart doesn't exist, create it
        if (!barChart) {
            const ctx = barChartCanvas.getContext('2d');
            barChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
                    datasets: [{
                        label: 'Total Number of Cases',
                        data: [12711, 8027, 12319, 14921, 17227, 17551],
                        backgroundColor: 'skyblue',
                        borderColor: 'black',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        // Get the last year from chart labels
        let lastYear = parseInt(barChart.data.labels[barChart.data.labels.length - 1]);
        let nextYear = lastYear + t;
        
        // Update chart labels to include new years
        const existingLabels = barChart.data.labels.map(year => parseInt(year));
        
        // Check if the year already exists in the chart
        if (!existingLabels.includes(nextYear)) {
            // Add the new prediction year to labels
            barChart.data.labels.push(nextYear.toString());
            
            // Add null for the original dataset to maintain alignment
            barChart.data.datasets[0].data.push(null);
            
            // Check if we already have a prediction dataset
            if (!barChart.data.datasets[1]) {
                // Create a new dataset for predictions with red bars
                const predictionData = Array(barChart.data.labels.length).fill(null);
                predictionData[predictionData.length - 1] = Math.round(Ct);
                
                barChart.data.datasets.push({
                    label: 'Predicted Cases',
                    data: predictionData,
                    backgroundColor: 'red',
                    borderColor: 'darkred',
                    borderWidth: 1
                });
            } else {
                // Extend the existing prediction dataset with nulls
                barChart.data.datasets[1].data.push(null);
                // Set the new prediction
                barChart.data.datasets[1].data[barChart.data.datasets[1].data.length - 1] = Math.round(Ct);
            }
        } else {
            // If year exists, update or add the prediction
            const yearIndex = existingLabels.indexOf(nextYear);
            
            // Make sure we have a prediction dataset
            if (!barChart.data.datasets[1]) {
                const predictionData = Array(barChart.data.labels.length).fill(null);
                predictionData[yearIndex] = Math.round(Ct);
                
                barChart.data.datasets.push({
                    label: 'Predicted Cases',
                    data: predictionData,
                    backgroundColor: 'red',
                    borderColor: 'darkred',
                    borderWidth: 1
                });
            } else {
                // Update the prediction at the specific year
                barChart.data.datasets[1].data[yearIndex] = Math.round(Ct);
            }
        }
        
        barChart.update();
    }

    document.getElementById("result").innerHTML = `Predicted Cases C(t): ${Ct.toFixed(0)}`;
}