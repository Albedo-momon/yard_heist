import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const dataDir = path.resolve(process.cwd(), 'server', 'data');
const csvPath = path.join(dataDir, 'subscribers.csv');

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(csvPath)) {
    fs.writeFileSync(csvPath, 'timestamp,name,email\n', 'utf8');
}

function appendToCsv(name, email) {
    const line = `${new Date().toISOString()},"${name.replace(/"/g, '""')}","${email.replace(/"/g, '""')}"\n`;
    fs.appendFileSync(csvPath, line, 'utf8');
}

function createTransporter() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!host || !user || !pass) {
        return null;
    }
    return nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
    });
}

app.post('/api/subscribe', async (req, res) => {
    try {
        const { name, email } = req.body || {};
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        appendToCsv(name, email);

        const transporter = createTransporter();
        const message = `Hi ${name},\n\nEmail sent to you. We will get back to you on launch.\n\n— The Yard Heist`;

        if (transporter) {
            await transporter.sendMail({
                from: process.env.MAIL_FROM || 'no-reply@yardheist.com',
                to: email,
                subject: 'You are on the list — The Yard Heist',
                text: message,
            });
        } else {
            console.warn('SMTP not configured. Skipping email send.');
        }

        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});


