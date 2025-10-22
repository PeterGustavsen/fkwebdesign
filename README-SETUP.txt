========================================
F&K WEBDESIGN - BACKEND SETUP ANLEITUNG
========================================

✅ ERFOLGREICH BEREINIGT!
-------------------------
Vorher: 59.034 Dateien (mit TinaCMS & unnötigen Dependencies)
Nachher: 1.214 Dateien (nur essentielle Dependencies)
Reduktion: 97,9% weniger Dateien! 🎉

Website-Dateien: 34 Dateien
node_modules: ~1.180 Dateien (von vorher ~58.000!)


📋 NÄCHSTE SCHRITTE
-------------------

1. ERSTELLE EINE .env DATEI
   Erstelle im Hauptverzeichnis eine Datei namens ".env" mit folgendem Inhalt:

   PORT=3000
   EMAIL_USER=deine-gmail-adresse@gmail.com
   EMAIL_PASS=dein-app-passwort-hier

2. GMAIL APP-PASSWORT ERSTELLEN
   a) Gehe zu: https://myaccount.google.com/security
   b) Aktiviere "2-Step Verification" (falls noch nicht aktiv)
   c) Suche nach "App passwords"
   d) Erstelle ein neues App-Passwort für "Mail"
   e) Kopiere das 16-stellige Passwort in die .env Datei

3. SERVER STARTEN
   npm start

   Oder für Entwicklung (mit Auto-Reload):
   npm run dev

4. TESTE DAS KONTAKTFORMULAR
   - Öffne die Website
   - Gehe zur Kontakt-Seite
   - Fülle das Formular aus
   - Sende eine Test-Nachricht


📧 E-MAIL KONFIGURATION
-----------------------
Empfänger: kontakt@fkwebdesign.de
Absender: Deine Gmail-Adresse (aus .env)

Der Kunde erhält automatisch eine schöne Bestätigungs-E-Mail im F&K Design!


🎨 NEUE FEATURES
----------------
✅ Minimales Backend (nur 5 Dependencies statt 100+)
✅ E-Mail-Adresse geändert zu: kontakt@fkwebdesign.de
✅ Visuell gestaltete Bestätigungs-E-Mail mit:
   - F&K Gradient-Titel (Blau → Orange)
   - Dunkel-Theme passend zur Website
   - 3-Schritte-Prozess "Was passiert als Nächstes?"
   - Kontaktinformationen & Links
   - Call-to-Action Buttons
   - Responsive Design
   - Plain-Text Fallback

✅ Verbesserte E-Mail an F&K:
   - Strukturierte Darstellung
   - "Jetzt antworten" Button
   - Sender-E-Mail als Reply-To


🚀 VORTEILE DER BEREINIGUNG
---------------------------
✓ 97,9% weniger Dateien
✓ ~95% weniger Speicherplatz
✓ Schnellere npm install (2 min statt 10+ min)
✓ Übersichtlicher Code
✓ Keine unnötigen Dependencies
✓ Einfachere Wartung
✓ Schnellerer Server-Start


📝 WICHTIGE HINWEISE
--------------------
⚠️ NIEMALS die .env Datei ins Git committen!
✓ Die .env ist bereits in .gitignore
✓ Für jeden Entwickler/Server eine eigene .env Datei
✓ Teste das Formular vor dem Live-Gang
✓ Überprüfe Spam-Ordner bei Test-E-Mails


🆘 BEI PROBLEMEN
----------------
1. Prüfe ob node_modules installiert sind (npm install)
2. Prüfe ob .env Datei korrekt ist
3. Prüfe Gmail App-Passwort (nicht normales Passwort!)
4. Prüfe Server-Logs in der Konsole
5. Teste mit: curl http://localhost:3000/api/health

Kontakt:
📧 kontakt@fkwebdesign.de
📞 017615780236


Viel Erfolg! 🚀
- Konstantin & Ruben


