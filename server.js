const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080; // Zmień ten port, jeśli chcesz

// Funkcja sprawdzająca istnienie pliku
const fileExists = (filePath) => {
    try {
        fs.accessSync(filePath);
        return true;
    } catch (err) {
        return false;
    }
};

// Obsługa żądania GET
app.get('/files/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'files', fileName);

    if (!fileExists(filePath)) {
        res.status(404).send('Plik nie istnieje');
        return;
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Błąd odczytu pliku: ${err.message}`);
            res.status(500).send('Błąd serwera');
            return;
        }
        res.send(data);
    });
});

// Obsługa żądania POST
app.post('/files/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'files', fileName);
    const additionalData = req.body; // Zawartość żądania POST

    if (!fileExists(filePath)) {
        res.status(404).send('Plik nie istnieje');
        return;
    }

    fs.appendFile(filePath, additionalData, 'utf8', (err) => {
        if (err) {
            console.error(`Błąd dopisania do pliku: ${err.message}`);
            res.status(500).send('Błąd serwera');
            return;
        }
        res.send('Tekst został dopisany do pliku');
    });
});

// Obsługa żądania DELETE
app.delete('/files/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'files', fileName);

    if (!fileExists(filePath)) {
        res.status(404).send('Plik nie istnieje');
        return;
    }

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Błąd usunięcia pliku: ${err.message}`);
            res.status(500).send('Błąd serwera');
            return;
        }
        res.send('Plik został usunięty');
    });
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie ${port}`);
});