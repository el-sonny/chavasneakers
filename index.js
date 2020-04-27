const fs = require('fs').promises;

async function loadJSON(file) {
    const data = await fs.readFile(file);
    return JSON.parse(data);
};

async function saveJSON(filename, json) {
    return fs.writeFile(filename, JSON.stringify(json));
};

async function execute() {
    const data = await loadJSON('./data/nike-waffle-racer-offwite-black-sales.json');
    const sales = data.ProductActivity;

    let counts = {};
    let income = {};
    sales.forEach(sale => {
        if (!counts[sale.shoeSize]) {
            counts[sale.shoeSize] = {};
            income[sale.shoeSize] = {};
        }
        let date = new Date(sale.createdAt);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let compositeKey = month.toString() + '-' + year.toString();
        if (!counts[sale.shoeSize][compositeKey]) {
            counts[sale.shoeSize][compositeKey] = 0;
            income[sale.shoeSize][compositeKey] = 0;
        }
        counts[sale.shoeSize][compositeKey] += 1;
        income[sale.shoeSize][compositeKey] += sale.amount;
    });
    const res = await saveJSON('./output/nike-waffle-racer-offwite-black-sales-summary.json', counts);
    const res2 = await saveJSON('./output/nike-waffle-racer-offwite-black-sales-income-summary.json', income);
};

execute();