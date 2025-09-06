// server.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Statische Dateien aus 'public' bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// JSON und URL-encoded Daten parsen
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route: Zeige das Formular
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API-Route: Berechne Quadrat (für AJAX)
app.post('/api/square', (req, res) => {
  const input = req.body.number;
  const number = parseFloat(input);

  if (isNaN(number)) {
    return res.json({ error: 'Bitte eine gültige Zahl eingeben.' });
  }

  res.json({
    input: number,
    result: number ** 2
  });
});

// Server starten – auf allen Netzwerkschnittstellen
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🌐 Server läuft auf http://localhost:${PORT}`);
  console.log(`🌐 Im Netzwerk erreichbar unter: http://DEINE_IP:${PORT}`);
  console.log(`   (Finde DEINE_IP mit 'ipconfig' im Terminal)`);
});