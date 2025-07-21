#!/bin/bash

echo "🚀 Code Companion Quick Installer"
echo "================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the code-companion directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "• macOS: brew install node"
    echo "• Windows: Download from https://nodejs.org/"
    echo "• Linux: sudo apt install nodejs npm"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    echo "Try running: npm install --force"
    exit 1
fi

echo "✅ Dependencies installed successfully!"

# Test the installation
echo ""
echo "🧪 Testing installation..."
node -e "
try {
  require('./src/codeAnalyzer');
  require('./src/codeTranslator');
  console.log('✅ All modules loaded successfully');
} catch(e) {
  console.log('❌ Module loading failed:', e.message);
  process.exit(1);
}
"

echo ""
echo "🎉 Installation complete!"
echo ""
echo "To start Code Companion:"
echo "  npm start"
echo ""
echo "Then open your browser to:"
echo "  http://localhost:3000"
echo ""
echo "For debugging in VS Code:"
echo "  Press F5 or use Run and Debug panel"