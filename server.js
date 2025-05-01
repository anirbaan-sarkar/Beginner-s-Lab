const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, Client-side JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// --- API Endpoint for Form Submission ---
app.post('/submit-question', (req, res) => {
    const { name, email, subject, question } = req.body;

    // Basic validation on server-side (good practice)
    if (!name || !email || !subject || !question) {
        console.error('Validation Error: Missing form fields');
        return res.status(400).json({ message: 'Please fill out all fields.' });
    }

    // --- Database Interaction Would Go Here ---
    // For now, just log the received data to the console
    console.log('--- New Question Received ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('Question:', question);
    console.log('----------------------------');
    // --- End Database Section Placeholder ---

    // Send a success response back to the client
    res.status(200).json({ message: 'Question received successfully! We will get back to you if needed.' });

    // If there were a server error during hypothetical DB save:
    // res.status(500).json({ message: 'Server error: Could not process your question.' });
});


// --- Routes to Serve Specific HTML Pages (Optional but good practice) ---
// These ensure direct navigation to /about, /ask etc. works
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/email-tips', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'email-tips.html'));
});

app.get('/sop-tips', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sop-tips.html'));
});

app.get('/ask', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ask.html'));
});

// --- Catch-all for 404 Not Found (Optional) ---
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html')); // Create a 404.html if you want
    // Or simply: res.status(404).send('Page Not Found');
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Access the site at http://localhost:${PORT}`);
});