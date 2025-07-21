class CodeTranslator {
  constructor() {
    this.translationRules = {
      javascript: {
        python: {
          'function': 'def',
          'let ': '',
          'const ': '',
          'var ': '',
          '===': '==',
          '!==': '!=',
          'console.log': 'print',
          'true': 'True',
          'false': 'False',
          'null': 'None'
        },
        java: {
          'let ': 'var ',
          'const ': 'final var ',
          'function': 'public static void',
          'console.log': 'System.out.println',
          'true': 'true',
          'false': 'false'
        }
      },
      python: {
        javascript: {
          'def ': 'function ',
          'print': 'console.log',
          'True': 'true',
          'False': 'false',
          'None': 'null',
          '==': '===',
          '!=': '!=='
        }
      }
    };
  }

  async translateCode(code, fromLanguage, toLanguage) {
    const from = fromLanguage.toLowerCase();
    const to = toLanguage.toLowerCase();
    
    if (from === to) {
      return {
        translatedCode: code,
        notes: 'No translation needed - same language'
      };
    }

    const rules = this.translationRules[from]?.[to];
    if (!rules) {
      return {
        translatedCode: this.basicTranslation(code, from, to),
        notes: `Basic translation from ${fromLanguage} to ${toLanguage}. Manual review recommended.`
      };
    }

    let translatedCode = code;
    const appliedRules = [];

    // Apply translation rules
    for (const [pattern, replacement] of Object.entries(rules)) {
      if (translatedCode.includes(pattern)) {
        translatedCode = translatedCode.replace(new RegExp(pattern, 'g'), replacement);
        appliedRules.push(`${pattern} → ${replacement}`);
      }
    }

    // Language-specific formatting
    translatedCode = this.applyLanguageFormatting(translatedCode, to);

    return {
      translatedCode,
      notes: `Translated from ${fromLanguage} to ${toLanguage}`,
      appliedRules
    };
  }

  basicTranslation(code, fromLang, toLang) {
    // Fallback translation with basic syntax changes
    let translated = code;
    
    if (toLang === 'python') {
      // Convert to Python-like syntax
      translated = translated
        .replace(/function\s+(\w+)\s*\(/g, 'def $1(')
        .replace(/console\.log/g, 'print')
        .replace(/true/g, 'True')
        .replace(/false/g, 'False')
        .replace(/null/g, 'None');
    } else if (toLang === 'java') {
      // Convert to Java-like syntax
      translated = translated
        .replace(/function\s+(\w+)\s*\(/g, 'public static void $1(')
        .replace(/console\.log/g, 'System.out.println');
    }
    
    return translated;
  }

  applyLanguageFormatting(code, language) {
    switch (language) {
      case 'python':
        // Python uses indentation instead of braces
        return code.replace(/\{/g, ':').replace(/\}/g, '');
      case 'java':
        // Ensure proper Java class structure
        if (!code.includes('class ')) {
          return `public class Main {\n${code}\n}`;
        }
        return code;
      default:
        return code;
    }
  }
}

module.exports = CodeTranslator;