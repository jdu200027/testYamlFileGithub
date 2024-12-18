const bodyParser = require('body-parser');
const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
const PORT = 5000;
const WEBHOOK_SECRET = 'your-github-webhook-secret'; // Add your webhook secret here.

app.use(bodyParser.json());

// Webhook endpoint
app.post('/github-webhook', (req, res) => {
    const signature = req.headers['x-hub-signature-256'];
    const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
    const digest = `sha256=${hmac.update(JSON.stringify(req.body)).digest('hex')}`;

    // Validate the webhook signature
    if (signature !== digest) {
        console.log('Invalid signature');
        return res.status(401).send('Invalid signature');
    }

    console.log('GitHub Webhook received! Pulling latest code...');

    // Pull the latest code from GitHub and restart the app
    exec('git pull origin main && pm2 restart app', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error pulling code: ${error.message}`);
            return res.status(500).send('Error pulling code');
        }

        console.log(`Git Pull Output: ${stdout}`);
        console.error(`Git Pull Error: ${stderr}`);
        res.status(200).send('Code pulled and app restarted successfully.');
    });
});

app.get('/test', (req, res) => {
    res.status(200).json({ message: 'Watching GitHub for updates!' });
});

app.listen(PORT, () => console.log(`Port ${PORT} listening for GitHub Webhooks!`));
