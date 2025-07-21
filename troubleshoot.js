#!/usr/bin/env node

// Code Companion Troubleshooting Script
console.log('🔍 Code Companion Troubleshooting Tool');
console.log('=====================================\n');

// Check Node.js version
console.log('✅ Node.js version:', process.version);
console.log('✅ Platform:', process.platform);
console.log('✅ Architecture:', process.arch);

// Check if required files exist
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'src/index.js',
  'src/codeAnalyzer.js',
  'src/codeTranslator.js',
  'public/index.html',
  'public/style.css',
  'public/script.js'
];

console.log('\n📁 Checking required files:');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING!`);
  }
});

// Check if node_modules exists
console.log('\n📦 Checking dependencies:');
if (fs.existsSync('node_modules')) {
  console.log('✅ node_modules directory exists');
  
  // Check specific dependencies
  const deps = ['express', 'cors'];
  deps.forEach(dep => {
    if (fs.existsSync(`node_modules/${dep}`)) {
      console.log(`✅ ${dep} installed`);
    } else {
      console.log(`❌ ${dep} - NOT INSTALLED! Run: npm install`);
    }
  });
} else {
  console.log('❌ node_modules directory missing - Run: npm install');
}

// Test module loading
console.log('\n🧪 Testing module loading:');
try {
  const CodeAnalyzer = require('./src/codeAnalyzer');
  const analyzer = new CodeAnalyzer();
  console.log('✅ CodeAnalyzer loads successfully');
} catch (error) {
  console.log('❌ CodeAnalyzer error:', error.message);
}

try {
  const CodeTranslator = require('./src/codeTranslator');
  const translator = new CodeTranslator();
  console.log('✅ CodeTranslator loads successfully');
} catch (error) {
  console.log('❌ CodeTranslator error:', error.message);
}

// Test basic functionality
console.log('\n🚀 Testing basic functionality:');
try {
  const CodeAnalyzer = require('./src/codeAnalyzer');
  const analyzer = new CodeAnalyzer();
  
  const testCode = 'function test() { return true; }';
  analyzer.analyzeCode(testCode, 'javascript').then(result => {
    console.log('✅ Code analysis works');
    console.log('   Summary:', result.summary.substring(0, 50) + '...');
  }).catch(err => {
    console.log('❌ Code analysis failed:', err.message);
  });
} catch (error) {
  console.log('❌ Analysis test failed:', error.message);
}

// Check port availability
console.log('\n🌐 Checking port 3000:');
const net = require('net');
const server = net.createServer();

server.listen(3000, () => {
  console.log('✅ Port 3000 is available');
  server.close();
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('⚠️  Port 3000 is already in use');
    console.log('   Try: lsof -ti:3000 | xargs kill');
  } else {
    console.log('❌ Port check error:', err.message);
  }
});

console.log('\n🎯 Next Steps:');
console.log('1. Fix any ❌ issues shown above');
console.log('2. Run: npm install (if dependencies missing)');
console.log('3. Run: npm start');
console.log('4. Open: http://localhost:3000');
console.log('\n💡 For detailed help, check debug-setup.md');