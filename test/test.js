const CodeAnalyzer = require('../src/codeAnalyzer');
const CodeTranslator = require('../src/codeTranslator');

async function runTests() {
  console.log('🧪 Running Code Companion Tests...\n');

  const analyzer = new CodeAnalyzer();
  const translator = new CodeTranslator();

  // Test 1: Code Analysis
  console.log('Test 1: Code Analysis');
  const testCode = `
function calculateSum(a, b) {
  if (a > 0 && b > 0) {
    return a + b;
  }
  return 0;
}

const result = calculateSum(5, 10);
console.log(result);
  `;

  try {
    const analysis = await analyzer.analyzeCode(testCode, 'javascript');
    console.log('✅ Analysis completed');
    console.log('Summary:', analysis.summary);
    console.log('Functions found:', analysis.structure.functions);
    console.log('Variables found:', analysis.structure.variables);
    console.log('Complexity:', analysis.complexity.level);
  } catch (error) {
    console.log('❌ Analysis failed:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Code Translation
  console.log('Test 2: Code Translation (JavaScript to Python)');
  const jsCode = `
function greet(name) {
  console.log("Hello, " + name);
  return true;
}
  `;

  try {
    const translation = await translator.translateCode(jsCode, 'javascript', 'python');
    console.log('✅ Translation completed');
    console.log('Original:', jsCode.trim());
    console.log('Translated:', translation.translatedCode.trim());
    console.log('Notes:', translation.notes);
  } catch (error) {
    console.log('❌ Translation failed:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Same Language Translation
  console.log('Test 3: Same Language Translation');
  try {
    const sameTranslation = await translator.translateCode(jsCode, 'javascript', 'javascript');
    console.log('✅ Same language handling:', sameTranslation.notes);
  } catch (error) {
    console.log('❌ Same language test failed:', error.message);
  }

  console.log('\n🎉 Tests completed!');
}

runTests().catch(console.error);