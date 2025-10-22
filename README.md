# F&K Webdesign Backend

Backend-Server für das Kontaktformular der F&K Webdesign Website.

## Installation

1. **Node.js installieren**
   - Laden Sie Node.js von [nodejs.org](https://nodejs.org/) herunter
   - Installieren Sie die LTS-Version

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **E-Mail-Konfiguration**
   - Kopieren Sie `env.example` zu `.env`
   - Konfigurieren Sie Ihre E-Mail-Einstellungen:

   ```env
   EMAIL_USER=peter.gustavsen1966@gmail.com
   EMAIL_PASS=ihr-app-passwort-hier
   PORT=3000
   ```

4. **Gmail App-Passwort einrichten**
   - Gehen Sie zu [Google Account Settings](https://myaccount.google.com/)
   - Sicherheit > 2-Schritt-Verifizierung aktivieren
   - App-Passwörter generieren
   - Das generierte Passwort in `.env` einfügen

## Server starten

```bash
# Produktion
npm start

# Entwicklung (mit Auto-Reload)
npm run dev
```

Der Server läuft dann auf `http://localhost:3000`

## API Endpoints

### POST /api/contact
Sendet eine Kontaktanfrage per E-Mail.

**Request Body:**
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "phone": "+49 123 456789",
  "message": "Hallo, ich interessiere mich für..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Ihre Nachricht wurde erfolgreich gesendet. Vielen Dank!"
}
```

### GET /api/health
Health Check für den Server.

## Features

- ✅ Kontaktformular-Verarbeitung
- ✅ E-Mail-Versand an peter.gustavsen1966@gmail.com
- ✅ Bestätigungs-E-Mail an Absender
- ✅ Formular-Validierung
- ✅ Fehlerbehandlung
- ✅ Responsive Design
- ✅ CORS-Unterstützung

## Deployment

Für Produktions-Deployment:

1. **Umgebungsvariablen setzen**
2. **PM2 für Process Management**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "fk-webdesign"
   ```

3. **Nginx Reverse Proxy** (optional)
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## Sicherheit

- Eingabevalidierung
- CORS-Konfiguration
- Rate Limiting (empfohlen für Produktion)
- HTTPS in Produktion verwenden

## Support

Bei Problemen oder Fragen wenden Sie sich an:
- E-Mail: peter.gustavsen1966@gmail.com
- Telefon: 017615780236