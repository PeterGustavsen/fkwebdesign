# 🔧 Kontaktformular Fehlerbehebung

## ❌ Problem: Fehlermeldung beim Absenden des Kontaktformulars

### 📋 Checkliste zur Fehlerbehebung

#### 1. ✅ Backend-Server läuft
Der Node.js-Server muss laufen, damit das Kontaktformular funktioniert.

**Lokal testen:**
```bash
# Im Projektordner:
npm install
npm start
```

Server sollte ausgeben:
```
✅ F&K Webdesign Server läuft auf Port 3000
📧 Kontaktformular API: http://localhost:3000/api/contact
💊 Health Check: http://localhost:3000/api/health
```

**Testen im Browser:**
Öffne: http://localhost:3000/api/health

Erwartete Antwort:
```json
{
  "status": "OK",
  "message": "F&K Webdesign Server läuft",
  "timestamp": "2025-10-21T..."
}
```

---

#### 2. ✅ .env Datei konfiguriert

Die `.env` Datei muss im Hauptverzeichnis existieren und konfiguriert sein:

```env
PORT=3000
EMAIL_USER=deine-gmail-adresse@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx
```

**WICHTIG:** Verwende ein Gmail **App-Passwort**, nicht dein normales Passwort!

**App-Passwort erstellen:**
1. https://myaccount.google.com/security
2. "2-Step Verification" aktivieren
3. "App passwords" → Neues Passwort für "Mail" erstellen
4. 16-stelliges Passwort in `.env` eintragen

---

#### 3. ✅ Backend-URL in config.js korrekt

Öffne `js/config.js` und prüfe die URL:

```javascript
const CONFIG = {
  API_BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://www.fkwebdesign.de', // <-- HIER DEINE URL EINTRAGEN!
  ...
};
```

**Für verschiedene Hosting-Szenarien:**

- **Lokale Entwicklung:** `http://localhost:3000`
- **Eigener Server mit Node.js:** `https://api.fkwebdesign.de` oder `https://www.fkwebdesign.de`
- **Separater Backend-Server:** `https://backend-domain.com`

---

#### 4. ✅ CORS-Konfiguration (bei separatem Backend)

Wenn dein Backend auf einer anderen Domain läuft, prüfe in `server.js`:

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://www.fkwebdesign.de', 'https://fkwebdesign.de'],
  methods: ['GET', 'POST'],
  credentials: true
}));
```

---

## 🚀 Deployment-Optionen

### Option A: Alles auf einem Node.js-Server
**Empfohlen für:** VPS, Cloud-Server (DigitalOcean, AWS, etc.)

1. Server mit Node.js aufsetzen
2. Projekt hochladen
3. `.env` Datei konfigurieren
4. `npm install && npm start`
5. Mit PM2 dauerhaft laufen lassen:
   ```bash
   npm install -g pm2
   pm2 start server.js --name fk-webdesign
   pm2 save
   pm2 startup
   ```

### Option B: Frontend auf Webhosting, Backend separat
**Empfohlen für:** Gemischtes Setup

1. **Frontend** (HTML/CSS/JS) auf normalem Webhosting (z.B. Strato, 1&1)
2. **Backend** auf Node.js-fähigem Server
3. In `js/config.js` Backend-URL eintragen

### Option C: Serverless (ohne eigenen Server)
**Empfohlen für:** Einfachheit ohne Server-Verwaltung

Verwende einen Dienst wie:
- **Vercel** (kostenlos für kleine Projekte)
- **Netlify Functions**
- **AWS Lambda**

---

## 🔍 Fehlersuche

### Fehler im Browser Console anzeigen

Öffne die Browser DevTools (F12) und schau in die Console.

**Häufige Fehler:**

#### `Failed to fetch` oder `NetworkError`
**Ursache:** Server läuft nicht oder URL falsch
**Lösung:** 
- Prüfe, ob Server läuft: `http://localhost:3000/api/health`
- Prüfe `js/config.js` URL

#### `CORS Error`
**Ursache:** Frontend und Backend auf verschiedenen Domains
**Lösung:** CORS in `server.js` konfigurieren (siehe oben)

#### `500 Internal Server Error`
**Ursache:** Backend-Fehler (meist E-Mail-Konfiguration)
**Lösung:**
- Prüfe Server-Console für Fehler
- Prüfe `.env` Datei (EMAIL_USER, EMAIL_PASS)
- Teste mit: `node server.js` (zeigt Fehler an)

#### `400 Bad Request`
**Ursache:** Fehlende Pflichtfelder
**Lösung:** Name, E-Mail und Nachricht müssen ausgefüllt sein

---

## 📧 E-Mail funktioniert nicht

### Gmail blockiert E-Mails

**Symptome:** Server läuft, aber E-Mails kommen nicht an

**Lösungen:**
1. **App-Passwort verwenden** (siehe oben)
2. "Weniger sichere Apps" aktivieren (nicht empfohlen)
3. Ersten Versuch in Gmail erlauben:
   - Schau in Gmail Inbox nach "Suspicious sign-in prevented"
   - Klicke "Yes, it was me"

### Alternative zu Gmail

Wenn Gmail nicht funktioniert, verwende einen professionellen E-Mail-Dienst:

**SendGrid (empfohlen):**
```javascript
// In server.js:
const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

**Andere Optionen:**
- Mailgun
- AWS SES
- Mailjet

---

## 🆘 Schnelle Notfall-Lösung

Wenn nichts funktioniert, verwende vorübergehend **FormSubmit** (kein Backend nötig):

```html
<!-- In contact.html, form ändern zu: -->
<form action="https://formsubmit.co/kontakt@fkwebdesign.de" method="POST">
  <input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_subject" value="Neue Kontaktanfrage - F&K Webdesign">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <input type="tel" name="phone">
  <textarea name="message" required></textarea>
  <button type="submit">Senden</button>
</form>
```

**Nachteil:** Keine schöne Bestätigungs-E-Mail, kein eigenes Design

---

## 📞 Support

Wenn nichts hilft:
- 📧 kontakt@fkwebdesign.de
- 📞 017615780236

---

## ✅ Finale Checkliste

- [ ] `npm install` ausgeführt
- [ ] `.env` Datei existiert und ist konfiguriert
- [ ] Gmail App-Passwort erstellt
- [ ] Server läuft: `npm start`
- [ ] Health Check funktioniert: http://localhost:3000/api/health
- [ ] `js/config.js` Backend-URL korrekt
- [ ] Test-E-Mail gesendet und erhalten

---

**Viel Erfolg!** 🚀


