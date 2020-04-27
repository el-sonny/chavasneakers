const fs = require('fs').promises;

async function loadJSON(file) {
    const data = await fs.readFile(file);
    return JSON.parse(data);
};

async function execute() {
    await loadJSON();
};

execute();