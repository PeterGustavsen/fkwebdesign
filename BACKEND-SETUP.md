# 🚀 F&K Webdesign - Backend Setup

## 📋 Minimales Backend für Kontaktformular

Dieses Backend enthält **nur die essentiellen Dependencies** für das Kontaktformular:
- `express` - Webserver
- `nodemailer` - E-Mail-Versand
- `cors` - Cross-Origin Requests
- `body-parser` - Formulardaten verarbeiten
- `dotenv` - Umgebungsvariablen

**Keine unnötigen Dependencies mehr!** 🎉

## 🔧 Installation

### 1. Dependencies installieren
```bash
npm install
```

### 2. Umgebungsvariablen konfigurieren
1. Kopiere `env.example` zu `.env`:
   ```bash
   cp env.example .env
   ```

2. Öffne `.env` und füge deine Daten ein:
   ```env
   PORT=3000
   EMAIL_USER=deine-email@gmail.com
   EMAIL_PASS=dein-app-passwort
   ```

### 3. Gmail App-Passwort erstellen
1. Gehe zu https://myaccount.google.com/security
2. Aktiviere "2-Step Verification"
3. Gehe zu "App passwords"
4. Erstelle ein neues App-Passwort für "Mail"
5. Kopiere das 16-stellige Passwort in deine `.env` Datei

## ▶️ Server starten

### Entwicklung (mit Auto-Reload):
```bash
npm run dev
```

### Produktion:
```bash
npm start
```

Der Server läuft dann auf: http://localhost:3000

## 📧 E-Mail-Konfiguration

### Empfänger-E-Mail
Alle Kontaktanfragen werden an **kontakt@fkwebdesign.de** gesendet.

### Bestätigungs-E-Mail
Der Kunde erhält automatisch eine **visuell gestaltete Bestätigungs-E-Mail** im F&K Design:
- ✅ Gradient-Titel
- ✅ Strukturierte Darstellung der Nachricht
- ✅ 3-Schritte-Prozess
- ✅ Kontaktinformationen
- ✅ Call-to-Action Buttons

## 🧪 API-Endpunkte

### POST /api/contact
Sendet eine Kontaktanfrage.

**Request Body:**
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "phone": "0123456789",
  "message": "Hallo, ich interessiere mich für..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Vielen Dank für Ihre Nachricht! Wir haben Ihnen eine Bestätigung per E-Mail gesendet."
}
```

### GET /api/health
Prüft, ob der Server läuft.

**Response:**
```json
{
  "status": "OK",
  "message": "F&K Webdesign Server läuft",
  "timestamp": "2025-10-20T..."
}
```

## 📊 Vorher vs. Nachher

### Vorher (mit TinaCMS):
- **~59.000 Dateien**
- Dependencies: TinaCMS, React, GraphQL, etc.
- Größe: **~500+ MB**

### Nachher (lean):
- **~200-300 Dateien** (nur node_modules)
- Dependencies: Nur Express, Nodemailer, etc.
- Größe: **~20-30 MB**

**Das ist eine Reduktion um 99,5%!** 🚀

## 🎨 E-Mail-Design Features

Die Bestätigungs-E-Mail verwendet das F&K Webdesign Branding:
- **Dunkel-Theme** (#0e0f12 Hintergrund)
- **Gradient-Titel** (Blau → Orange)
- **Glasmorphismus** (frosted glass effects)
- **Orange Akzente** (#ff8c3a)
- **Responsive Layout**
- **Plain-Text Fallback** für alte E-Mail-Clients

## 🔒 Sicherheit

- ✅ E-Mail-Validierung
- ✅ Pflichtfelder-Check
- ✅ CORS-Schutz
- ✅ App-Passwort statt normales Passwort
- ✅ Umgebungsvariablen für sensible Daten
- ✅ Error Handling

## 📝 Hinweise

- **`.env` Datei NICHT ins Git committen!**
- Die `.env` Datei ist bereits in `.gitignore`
- Für Produktion: Verwende einen professionellen E-Mail-Service (z.B. SendGrid, AWS SES)
- Teste das Kontaktformular vor dem Live-Gang!

## 🆘 Support

Bei Fragen oder Problemen:
- 📧 kontakt@fkwebdesign.de
- 📞 017615780236


