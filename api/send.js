// api/send.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Alle Felder müssen ausgefüllt werden.' });
  }

  // Transporter für Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kontakt.fkwebdesign@gmail.com',
      pass: process.env.GMAIL_APP_PASSWORD // App-Passwort von Gmail
    }
  });

  try {
    await transporter.sendMail({
      from: email, // Absender: der Nutzer
      to: 'Kontak@fkwebdesign.de', // Empfänger
      subject: `Neue Nachricht von ${name}`,
      text: message
    });

    return res.status(200).json({ message: 'Nachricht erfolgreich gesendet!' });
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    return res.status(500).json({ message: 'Fehler beim Senden der E-Mail.' });
  }
}
