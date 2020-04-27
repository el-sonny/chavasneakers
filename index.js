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

    let sizes = {};
    sales.forEach(sale => {
        if (!sizes[sale.shoeSize]) {
            sizes[sale.shoeSize] = {};
        }
        let date = new Date(sale.createdAt);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let compositeKey = month.toString() + '-' + year.toString();
        if (!sizes[sale.shoeSize][compositeKey]) {
            sizes[sale.shoeSize][compositeKey] = 0;
        }
        sizes[sale.shoeSize][compositeKey] += 1;
    });
    const res = await saveJSON('./output/nike-waffle-racer-offwite-black-sales-summary.json',sizes);
};

execute();