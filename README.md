# Code Companion 🤖

An AI-powered tool that helps developers understand their code and translate between programming languages.

## Features

- **Code Analysis**: Get detailed insights about your code structure, complexity, and suggestions for improvement
- **Language Translation**: Convert code from one programming language to another
- **Web Interface**: Easy-to-use browser-based interface
- **Multiple Languages**: Support for JavaScript, Python, Java, and more

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the server**:
   ```bash
   npm start
   ```

3. **Open your browser** and go to `http://localhost:3000`

## Usage

### Code Analysis
1. Select the "Analyze Code" tab
2. Choose your programming language
3. Paste your code in the text area
4. Click "Analyze Code" to get insights

### Code Translation
1. Select the "Translate Code" tab
2. Choose source and target languages
3. Paste your code in the text area
4. Click "Translate Code" to convert

## Supported Languages

- JavaScript
- Python
- Java
- C++
- C#
- Go
- Rust
- PHP
- Ruby
- TypeScript

## API Endpoints

- `POST /api/analyze` - Analyze code structure and complexity
- `POST /api/translate` - Translate code between languages
- `GET /api/languages` - Get list of supported languages

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

Run tests:
```bash
npm test
```

## Project Structure

```
code-companion/
├── src/
│   ├── index.js          # Express server
│   ├── codeAnalyzer.js   # Code analysis logic
│   └── codeTranslator.js # Code translation logic
├── public/
│   ├── index.html        # Web interface
│   ├── style.css         # Styling
│   └── script.js         # Frontend JavaScript
├── test/
│   └── test.js           # Test suite
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

MIT License - feel free to use this project for learning and development!