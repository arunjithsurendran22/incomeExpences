// need to store description amout  type
const entries = [];  

        const pieChartColors = {
            income: "#007BFF",
            expense: "#FF6B6B",
        };

        const ctx = document.getElementById("myPieChart").getContext("2d");
        const myPieChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Income", "Expenses"],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [pieChartColors.income, pieChartColors.expense],
                }],
            },
            options: {
                responsive: false,
                maintainAspectRatio: false,
            },
        });

        function addEntry() {
            // get users from inputs
            const description = document.getElementById("description").value;
            const amount = parseFloat(document.getElementById("amount").value);
            const type = document.getElementById("type").value;

            // checking valid description and number also
            if (description && !isNaN(amount)) {
                const entry = { description, amount, type }; 
                entries.push(entry);
                updateTableAndChart(entry);
                updateBalance();
            }

            // Clear the input fields
            document.getElementById("description").value = "";
            document.getElementById("amount").value = "";
        }

        function updateTableAndChart(entry) {
            const entryList = document.getElementById("entry-list");
            const newRow = entryList.insertRow();

            const descriptionCell = newRow.insertCell(0);
            const amountCell = newRow.insertCell(1);
            const typeCell = newRow.insertCell(2);

            descriptionCell.innerHTML = entry.description;
            amountCell.innerHTML = `₹${entry.amount}`;
            typeCell.innerHTML = entry.type;

            // Update the pie chart
            const chartData = myPieChart.data.datasets[0].data;
            if (entry.type === "income") {
                chartData[0] += entry.amount;
            } else {
                chartData[1] += entry.amount;
            }
            myPieChart.update();
        }

        function updateBalance() {
            const totalIncome = entries.reduce((total, entry) => {
                if (entry.type === "income") {
                    return total + entry.amount;
                }
                return total;
            }, 0);

            const totalExpenses = entries.reduce((total, entry) => {
                if (entry.type === "expense") {
                    return total + entry.amount;
                }
                return total;
            }, 0);

            const balance = totalIncome - totalExpenses;
            const balanceValue = document.getElementById("balanceValue");
            balanceValue.textContent = `₹${balance}`;
        }