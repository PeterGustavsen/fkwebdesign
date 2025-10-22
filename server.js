const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('.'));

// E-Mail Konfiguration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Kontaktformular Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validierung
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, E-Mail und Nachricht sind erforderlich.'
      });
    }

    // E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
      });
    }

    // E-Mail an F&K Webdesign
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'kontakt@fkwebdesign.de',
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <div style="font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0e0f12; color: #f3f3f3;">
          <div style="background: linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(255,140,58,0.05) 100%); padding: 40px 30px; border-radius: 8px;">
            
            <!-- Logo -->
            <div style="text-align: center; margin-bottom: 25px;">
              <img src="cid:logo" alt="F&K Webdesign Logo" style="width: 80px; height: 80px; border-radius: 50%; box-shadow: 0 4px 12px rgba(255,140,58,0.3);">
            </div>
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #ff8c3a; font-family: 'Roboto', sans-serif; font-weight: 900; font-size: 28px; margin: 0 0 10px 0;">
                Neue Kontaktanfrage
              </h1>
              <p style="color: #c9c9c9; margin: 0; font-size: 14px;">
                F&K Webdesign Website
              </p>
            </div>

            <!-- Kontaktdaten -->
            <div style="background-color: rgba(20,20,24,0.6); padding: 25px; border-radius: 14px; border: 1px solid rgba(255,153,0,0.15); margin-bottom: 20px;">
              <h2 style="color: #87ceeb; font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 20px; margin: 0 0 15px 0;">
                Kontaktdaten
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #c9c9c9; font-weight: 600; width: 100px;">Name:</td>
                  <td style="padding: 8px 0; color: #f3f3f3;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #c9c9c9; font-weight: 600;">E-Mail:</td>
                  <td style="padding: 8px 0;">
                    <a href="mailto:${email}" style="color: #ff8c3a; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #c9c9c9; font-weight: 600;">Telefon:</td>
                  <td style="padding: 8px 0;">
                    <a href="tel:${phone}" style="color: #ff8c3a; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ` : ''}
              </table>
            </div>

            <!-- Nachricht -->
            <div style="background-color: rgba(20,20,24,0.6); padding: 25px; border-radius: 14px; border-left: 4px solid #ff8c3a; margin-bottom: 20px;">
              <h2 style="color: #87ceeb; font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 20px; margin: 0 0 15px 0;">
                Nachricht
              </h2>
              <p style="color: #f3f3f3; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>

            <!-- Antworten Button -->
            <div style="text-align: center; margin: 25px 0;">
              <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #ff8c3a 0%, #ff6b35 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 30px rgba(255,140,58,0.3);">
                Jetzt antworten
              </a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(255,153,0,0.15); margin-top: 20px;">
              <p style="color: #c9c9c9; font-size: 13px; margin: 0;">
                Diese Nachricht wurde über das Kontaktformular auf<br>
                <strong style="color: #ff8c3a;">www.fkwebdesign.de</strong> gesendet
              </p>
            </div>

          </div>
        </div>
      `,
      text: `
Neue Kontaktanfrage - F&K Webdesign

Kontaktdaten:
-------------
Name: ${name}
E-Mail: ${email}
${phone ? `Telefon: ${phone}` : ''}

Nachricht:
----------
${message}

---
Diese Nachricht wurde über das Kontaktformular auf www.fkwebdesign.de gesendet.
      `,
      attachments: [{
        filename: 'logo.png',
        path: path.join(__dirname, 'ChatGPT Image 17. Okt. 2025, 13_48_27.png'),
        cid: 'logo'
      }]
    };

    // E-Mail senden
    await transporter.sendMail(mailOptions);

    // Bestätigungs-E-Mail an den Absender - visuell gestaltet im F&K Design
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Vielen Dank für Ihre Nachricht - F&K Webdesign',
      html: `
        <div style="font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0e0f12; color: #f3f3f3;">
          <div style="background: linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(255,140,58,0.05) 100%); padding: 40px 30px; border-radius: 8px;">
            
            <!-- Logo -->
            <div style="text-align: center; margin-bottom: 25px;">
              <img src="cid:logo" alt="F&K Webdesign Logo" style="width: 80px; height: 80px; border-radius: 50%; box-shadow: 0 4px 12px rgba(255,140,58,0.3);">
            </div>
            
            <!-- Header mit Gradient-Title -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="background: linear-gradient(90deg, #87ceeb 0%, #87ceeb 42%, #a3daf1 45%, #ffb266 55%, #ff8c3a 65%, #ff6b35 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-family: 'Roboto', sans-serif; font-weight: 900; font-size: 32px; margin: 0 0 10px 0; line-height: 1.2;">
                Vielen Dank!
              </h1>
              <p style="color: #c9c9c9; margin: 0; font-size: 16px; line-height: 1.5;">
                Ihre Nachricht wurde erfolgreich gesendet
              </p>
            </div>

            <!-- Begrüßung -->
            <div style="margin-bottom: 25px;">
              <p style="color: #f3f3f3; font-size: 16px; line-height: 1.6; margin: 0 0 15px 0;">
                Hallo <strong style="color: #ff8c3a;">${name}</strong>,
              </p>
              <p style="color: #f3f3f3; font-size: 16px; line-height: 1.6; margin: 0;">
                vielen Dank für Ihre Nachricht! Wir haben Ihre Anfrage erhalten und werden uns <strong>innerhalb von 24 Stunden</strong> bei Ihnen melden.
              </p>
            </div>

        <!-- Ihre Nachricht -->
        <div style="background-color: rgba(20,20,24,0.6); padding: 25px; border-radius: 14px; border: 1px solid rgba(255,153,0,0.15); margin-bottom: 25px;">
          <h2 style="color: #87ceeb; font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 15px 0;">
            Ihre Nachricht an uns
          </h2>
          <p style="color: #f3f3f3; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
        </div>

        <!-- Was passiert als Nächstes -->
            <div style="margin-bottom: 30px;">
              <h3 style="color: #ff8c3a; font-family: 'Roboto', sans-serif; font-weight: 700; font-size: 18px; margin: 0 0 15px 0;">
                Was passiert als Nächstes?
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 30px;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #ff8c3a; border-radius: 50%; text-align: center; line-height: 24px; color: #0e0f12; font-weight: 700; font-size: 14px;">1</span>
                  </td>
                  <td style="padding: 10px 0; vertical-align: top;">
                    <p style="color: #f3f3f3; margin: 0; line-height: 1.5;">
                      <strong style="color: #87ceeb;">Prüfung Ihrer Anfrage</strong><br>
                      <span style="color: #c9c9c9; font-size: 14px;">Wir analysieren Ihre Bedürfnisse</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #87ceeb; border-radius: 50%; text-align: center; line-height: 24px; color: #0e0f12; font-weight: 700; font-size: 14px;">2</span>
                  </td>
                  <td style="padding: 10px 0; vertical-align: top;">
                    <p style="color: #f3f3f3; margin: 0; line-height: 1.5;">
                      <strong style="color: #87ceeb;">Persönliche Antwort</strong><br>
                      <span style="color: #c9c9c9; font-size: 14px;">Sie erhalten eine maßgeschneiderte Antwort</span>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;">
                    <span style="display: inline-block; width: 24px; height: 24px; background-color: #ffb266; border-radius: 50%; text-align: center; line-height: 24px; color: #0e0f12; font-weight: 700; font-size: 14px;">3</span>
                  </td>
                  <td style="padding: 10px 0; vertical-align: top;">
                    <p style="color: #f3f3f3; margin: 0; line-height: 1.5;">
                      <strong style="color: #87ceeb;">Kostenloses Erstgespräch</strong><br>
                      <span style="color: #c9c9c9; font-size: 14px;">Wir besprechen Ihr Projekt im Detail</span>
                    </p>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Website Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://www.fkwebdesign.de" style="display: inline-block; background: linear-gradient(135deg, #ff8c3a 0%, #ff6b35 100%); color: white; padding: 14px 30px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 30px rgba(255,140,58,0.3);">
                Zur Website
              </a>
            </div>

            <!-- Grußformel -->
            <div style="margin-bottom: 25px;">
              <p style="color: #f3f3f3; font-size: 16px; line-height: 1.6; margin: 0 0 5px 0;">
                Mit freundlichen Grüßen,
              </p>
              <p style="color: #ff8c3a; font-weight: 700; font-size: 16px; margin: 0;">
                Konstantin & Ruben<br>
                <span style="color: #c9c9c9; font-weight: 400; font-size: 14px;">F&K Webdesign Team</span>
              </p>
            </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 25px; border-top: 1px solid rgba(255,153,0,0.15); margin-top: 30px;">
          <p style="color: #ff8c3a; font-weight: 700; font-size: 18px; margin: 0 0 5px 0;">
            F&K Webdesign
          </p>
          <p style="color: #c9c9c9; font-size: 13px; margin: 0 0 10px 0;">
            Wir bringen Familienunternehmen ins neue Zeitalter
          </p>
          <p style="color: #c9c9c9; font-size: 13px; margin: 0 0 15px 0;">
            📧 <a href="mailto:kontakt@fkwebdesign.de" style="color: #87ceeb; text-decoration: none;">kontakt@fkwebdesign.de</a><br>
            📞 <a href="tel:+4917615780236" style="color: #87ceeb; text-decoration: none;">017615780236</a><br>
            🌐 <a href="https://www.fkwebdesign.de" style="color: #87ceeb; text-decoration: none;">www.fkwebdesign.de</a>
          </p>
          <p style="color: #999; font-size: 11px; margin: 0; font-style: italic;">
            Bitte überprüfen Sie auch Ihren Spam-Ordner, falls Sie innerhalb von 24 Stunden keine Antwort erhalten haben.
          </p>
        </div>

          </div>
        </div>
      `,
      text: `
Vielen Dank für Ihre Nachricht!
================================

Hallo ${name},

vielen Dank für Ihre Nachricht! Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.

Ihre Nachricht an uns:
${message}

Was passiert als Nächstes?
--------------------------
1. Prüfung Ihrer Anfrage - Wir analysieren Ihre Bedürfnisse
2. Persönliche Antwort - Sie erhalten eine maßgeschneiderte Antwort
3. Kostenloses Erstgespräch - Wir besprechen Ihr Projekt im Detail

Mit freundlichen Grüßen,
Konstantin & Ruben
F&K Webdesign Team

---
F&K Webdesign
Wir bringen Familienunternehmen ins neue Zeitalter

📧 kontakt@fkwebdesign.de
📞 017615780236
🌐 www.fkwebdesign.de

Bitte überprüfen Sie auch Ihren Spam-Ordner, falls Sie innerhalb von 24 Stunden keine Antwort erhalten haben.
      `,
      attachments: [{
        filename: 'logo.png',
        path: path.join(__dirname, 'ChatGPT Image 17. Okt. 2025, 13_48_27.png'),
        cid: 'logo'
      }]
    };

    await transporter.sendMail(confirmationMailOptions);

    res.json({
      success: true,
      message: 'Vielen Dank für Ihre Nachricht! Wir haben Ihnen eine Bestätigung per E-Mail gesendet.'
    });

  } catch (error) {
    console.error('Fehler beim Senden der E-Mail:', error);
    res.status(500).json({
      success: false,
      message: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail.'
    });
  }
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'F&K Webdesign Server läuft',
    timestamp: new Date().toISOString()
  });
});

// 404 Handler für API-Routen
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API-Endpunkt nicht gefunden'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✅ F&K Webdesign Server läuft auf Port ${PORT}`);
  console.log(`📧 Kontaktformular API: http://localhost:${PORT}/api/contact`);
  console.log(`💊 Health Check: http://localhost:${PORT}/api/health`);
});
