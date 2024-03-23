const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// Multer-Konfiguration
const upload = multer({
    dest: 'uploads/' // Der Ordner, in dem die hochgeladenen Dateien gespeichert werden sollen
});


// POST-Route zum Speichern von Bildern
app.post('/upload', upload.single('photo'), (req, res) => {
    // req.file enthält Informationen über das hochgeladene Bild
    console.log('Bild empfangen:', req.file);

    // Hier können Sie Code zum Speichern des Bildes in einer Datenbank oder einem Dateispeicher einfügen

    res.send('Bild erfolgreich hochgeladen');
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
