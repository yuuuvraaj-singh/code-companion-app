# 🐛 Code Companion Debugging Guide

## Common Issues & Solutions

### Issue 1: "localhost refused to connect"
**Cause:** Server isn't running
**Solution:**
```bash
# Make sure you're in the project directory
cd code-companion

# Install dependencies first
npm install

# Start the server
npm start
```

### Issue 2: "npm: command not found" or "node: command not found"
**Cause:** Node.js not installed
**Solution:**
```bash
# On macOS with Homebrew:
brew install node

# Or download from: https://nodejs.org/
```

### Issue 3: VS Code debugging not working
**Cause:** Missing launch configuration
**Solution:** Use the `.vscode/launch.json` I created, then:

1. Open VS Code
2. Go to Run and Debug (Ctrl+Shift+D)
3. Select "Launch Code Companion"
4. Press F5 to start debugging

### Issue 4: "Cannot find module 'express'"
**Cause:** Dependencies not installed
**Solution:**
```bash
npm install
```

### Issue 5: Code runs but website doesn't load
**Cause:** Wrong URL or port conflict
**Solution:**
- Make sure you see "Code Companion server running on http://localhost:3000"
- Try: http://127.0.0.1:3000
- Check if port 3000 is in use: `lsof -i :3000`

## 🔧 Step-by-Step Debugging

### Method 1: VS Code Debugging
1. Open the project in VS Code
2. Press `Ctrl+Shift+D` (Run and Debug)
3. Select "Launch Code Companion"
4. Press `F5` or click the green play button
5. Set breakpoints by clicking left of line numbers

### Method 2: Console Debugging
```bash
# Run with detailed logging
DEBUG=* npm start

# Or run the test file to check functionality
npm test
```

### Method 3: Manual Testing
```bash
# Test if Node.js works
node --version

# Test if the main file runs
node src/index.js

# Test individual components
node -e "const analyzer = require('./src/codeAnalyzer'); console.log('Analyzer loaded successfully');"
```

## 🚨 Emergency Reset
If nothing works, try this complete reset:

```bash
# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall everything
npm install

# Start fresh
npm start
```

## 📞 Quick Health Check
Run this command to verify everything:

```bash
node -e "
console.log('✅ Node.js:', process.version);
try {
  require('./src/codeAnalyzer');
  require('./src/codeTranslator');
  console.log('✅ All modules load correctly');
} catch(e) {
  console.log('❌ Module error:', e.message);
}
"
```