# 📋 Code Companion - Complete Step-by-Step Setup

## 🎯 Choose Your Installation Method

### Method 1: Instant Demo (No Setup Required) ⚡
1. Find the file `standalone.html` in your project folder
2. Double-click it to open in your browser
3. Start using Code Companion immediately!

### Method 2: Full Installation (Recommended) 🔧

#### Step 1: Install Node.js
**On macOS:**
```bash
# If you have Homebrew:
brew install node

# If you don't have Homebrew, install it first:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**On Windows:**
1. Go to https://nodejs.org/
2. Download the LTS version
3. Run the installer
4. Restart your computer

**On Linux:**
```bash
sudo apt update
sudo apt install nodejs npm
```

#### Step 2: Verify Installation
Open terminal/command prompt and run:
```bash
node --version
npm --version
```
You should see version numbers (like v18.17.0)

#### Step 3: Navigate to Project
**You're already in the right directory!** 

Since you can see all the Code Companion files (package.json, src/, public/, etc.), you can skip this step.

If you need to navigate here from elsewhere:
```bash
# Only if you're in a different directory
cd /path/to/where/you/saved/code-companion
```

#### Step 4: Install Dependencies
```bash
npm install
```
Wait for it to complete (may take 1-2 minutes)

#### Step 5: Start the Server
```bash
npm start
```
You should see: "Code Companion server running on http://localhost:3000"

#### Step 6: Open Your Browser
Go to: `http://localhost:3000`

## 🚨 Troubleshooting Common Issues

### Issue: "npm: command not found"
**Solution:** Node.js isn't installed properly
- Restart your terminal
- Try the Node.js installation steps again

### Issue: "Cannot find module 'express'"
**Solution:** Dependencies not installed
```bash
npm install
```

### Issue: "localhost refused to connect"
**Solution:** Server isn't running
- Make sure you see "server running" message
- Check you're using the correct URL: http://localhost:3000

### Issue: "Port 3000 is already in use"
**Solution:** Another app is using port 3000
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill

# Or change the port in src/index.js to 3001
```

## 🧪 Test Your Installation

### Quick Test Commands:
```bash
# Check if everything is working
node troubleshoot.js

# Run the test suite
npm test

# Start in development mode
npm run dev
```

### Test the Website:
1. Go to http://localhost:3000
2. Click "Analyze Code" tab
3. Paste this test code:
```javascript
function hello(name) {
  console.log("Hello, " + name);
  return true;
}
```
4. Click "Analyze Code" button
5. You should see analysis results

## 🎮 Using Code Companion

### Code Analysis:
1. Select "Analyze Code" tab
2. Choose your programming language
3. Paste your code
4. Click "Analyze Code"
5. View the results: summary, structure, complexity, suggestions

### Code Translation:
1. Select "Translate Code" tab
2. Choose source language (From)
3. Choose target language (To)
4. Paste your code
5. Click "Translate Code"
6. View the translated code

## 🔧 VS Code Debugging Setup

1. Open the project in VS Code
2. Press `Ctrl+Shift+D` (or `Cmd+Shift+D` on Mac)
3. Select "Launch Code Companion" from dropdown
4. Press `F5` to start debugging
5. Set breakpoints by clicking left of line numbers

## 📞 Need Help?

1. **Run diagnostics:** `node troubleshoot.js`
2. **Check debug guide:** Open `debug-setup.md`
3. **Emergency reset:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

## ✅ Success Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] In correct directory (`ls` shows package.json)
- [ ] Dependencies installed (`ls node_modules` shows folders)
- [ ] Server started (`npm start` shows "server running")
- [ ] Website loads (`http://localhost:3000` works)
- [ ] Code analysis works (test with sample code)
- [ ] Code translation works (test JS to Python)

## 🎉 You're Done!

Once you see the Code Companion interface in your browser, you're ready to:
- Analyze any code for structure and complexity
- Translate between JavaScript, Python, Java, and more
- Get AI-powered suggestions for code improvement

Enjoy your new Code Companion! 🤖