# 🚀 Code Companion - Complete Installation Guide

## One-Command Installation

Copy and paste this entire command block into your terminal:

```bash
# Create project directory
mkdir -p code-companion && cd code-companion

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Installing Node.js..."
    # On macOS with Homebrew
    if command -v brew &> /dev/null; then
        brew install node
    else
        echo "Please install Node.js from https://nodejs.org/ first"
        exit 1
    fi
fi

# Install dependencies and start
npm install express cors && npm start
```

## Alternative: Manual Step-by-Step

### Step 1: Install Node.js
```bash
# On macOS:
brew install node

# On Windows: Download from https://nodejs.org/
# On Linux: 
sudo apt update && sudo apt install nodejs npm
```

### Step 2: Create and Setup Project
```bash
mkdir code-companion
cd code-companion
npm init -y
npm install express cors
```

### Step 3: Start the Server
```bash
npm start
```

### Step 4: Open Browser
```
http://localhost:3000
```

## 🆘 If Nothing Works - Emergency Solution

If you're still having issues, here's a standalone HTML version that works without Node.js:

1. Create a file called `standalone.html`
2. Copy the content from the next section
3. Open it directly in your browser

## 🔧 Troubleshooting Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] In correct directory (`ls` shows package.json)
- [ ] Dependencies installed (`ls node_modules` shows folders)
- [ ] Server started (`npm start` shows "server running")
- [ ] Correct URL (`http://localhost:3000`)

## 📞 Quick Health Check
```bash
node --version && npm --version && echo "✅ Ready to install!"
```