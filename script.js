const fs = require('fs');

const actions = {
    display: (filePath) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(`Błąd odczytu pliku: ${err.message}`);
                return;
            }
            console.log(`Zawartość pliku ${filePath}:`);
            console.log(data);
        });
    },
    append: (filePath, text) => {
        fs.appendFile(filePath, text, 'utf8', (err) => {
            if (err) {
                console.error(`Błąd dopisania do pliku: ${err.message}`);
                return;
            }
            console.log(`Tekst został dopisany do pliku ${filePath}`);
        });
    },
    delete: (filePath) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Błąd usunięcia pliku: ${err.message}`);
                return;
            }
            console.log(`Plik ${filePath} został usunięty`);
        });
    },
};

const executeAction = (action, filePath, additionalData) => {
    if (!actions[action]) {
        console.error(`Nieznana akcja: ${action}`);
        return;
    }
    actions[action](filePath, additionalData);
};

const parseArgs = () => {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Należy podać akcję i ścieżkę do pliku');
        return;
    }
    const action = args[0];
    const filePath = args[1];
    const additionalData = args.slice(2).join(' ');
    return { action, filePath, additionalData };
};

const { action, filePath, additionalData } = parseArgs();
executeAction(action, filePath, additionalData);