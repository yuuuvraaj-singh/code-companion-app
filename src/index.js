const express = require('express');
const cors = require('cors');
const path = require('path');
const CodeAnalyzer = require('./codeAnalyzer');
const CodeTranslator = require('./codeTranslator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public')));

// Initialize services
const analyzer = new CodeAnalyzer();
const translator = new CodeTranslator();

// Routes
app.post('/api/analyze', async (req, res) => {
  try {
    const { code, language } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const analysis = await analyzer.analyzeCode(code, language);
    res.json({ analysis });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze code' });
  }
});

app.post('/api/translate', async (req, res) => {
  try {
    const { code, fromLanguage, toLanguage } = req.body;
    
    if (!code || !fromLanguage || !toLanguage) {
      return res.status(400).json({ 
        error: 'Code, fromLanguage, and toLanguage are required' 
      });
    }

    const translation = await translator.translateCode(code, fromLanguage, toLanguage);
    res.json({ translation });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Failed to translate code' });
  }
});

app.get('/api/languages', (req, res) => {
  res.json({
    supported: [
      'javascript', 'python', 'java', 'cpp', 'csharp', 
      'go', 'rust', 'php', 'ruby', 'typescript'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Code Companion server running on http://localhost:${PORT}`);
});