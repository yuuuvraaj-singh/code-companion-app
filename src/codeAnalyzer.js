class CodeAnalyzer {
  constructor() {
    this.patterns = {
      javascript: {
        functions: /function\s+(\w+)\s*\([^)]*\)|(\w+)\s*=\s*\([^)]*\)\s*=>/g,
        variables: /(?:let|const|var)\s+(\w+)/g,
        classes: /class\s+(\w+)/g,
        imports: /(?:import|require)\s*.*?from\s*['"]([^'"]+)['"]/g
      },
      python: {
        functions: /def\s+(\w+)\s*\(/g,
        variables: /(\w+)\s*=/g,
        classes: /class\s+(\w+)/g,
        imports: /(?:import|from)\s+(\w+)/g
      },
      java: {
        functions: /(?:public|private|protected)?\s*(?:static)?\s*\w+\s+(\w+)\s*\(/g,
        variables: /(?:int|String|boolean|double|float)\s+(\w+)/g,
        classes: /(?:public\s+)?class\s+(\w+)/g,
        imports: /import\s+([^;]+);/g
      }
    };
  }

  async analyzeCode(code, language = 'javascript') {
    const lang = language.toLowerCase();
    const patterns = this.patterns[lang] || this.patterns.javascript;
    
    const analysis = {
      summary: this.generateSummary(code, lang),
      structure: this.analyzeStructure(code, patterns),
      complexity: this.calculateComplexity(code),
      suggestions: this.generateSuggestions(code, lang)
    };

    return analysis;
  }

  generateSummary(code, language) {
    const lines = code.split('\n').length;
    const chars = code.length;
    
    // Basic analysis
    const hasLoops = /(?:for|while|forEach)/.test(code);
    const hasConditions = /(?:if|switch|case)/.test(code);
    const hasAsync = /(?:async|await|Promise)/.test(code);
    
    let summary = `This ${language} code contains ${lines} lines and ${chars} characters. `;
    
    if (hasLoops) summary += "It includes loop structures for iteration. ";
    if (hasConditions) summary += "It uses conditional logic for decision making. ";
    if (hasAsync) summary += "It handles asynchronous operations. ";
    
    return summary;
  }

  analyzeStructure(code, patterns) {
    const structure = {
      functions: [],
      variables: [],
      classes: [],
      imports: []
    };

    // Extract functions
    let match;
    while ((match = patterns.functions.exec(code)) !== null) {
      structure.functions.push(match[1] || match[2]);
    }

    // Extract variables
    patterns.variables.lastIndex = 0;
    while ((match = patterns.variables.exec(code)) !== null) {
      structure.variables.push(match[1]);
    }

    // Extract classes
    patterns.classes.lastIndex = 0;
    while ((match = patterns.classes.exec(code)) !== null) {
      structure.classes.push(match[1]);
    }

    // Extract imports
    patterns.imports.lastIndex = 0;
    while ((match = patterns.imports.exec(code)) !== null) {
      structure.imports.push(match[1]);
    }

    return structure;
  }

  calculateComplexity(code) {
    const lines = code.split('\n').length;
    const cyclomaticFactors = (code.match(/(?:if|for|while|case|catch)/g) || []).length;
    
    let complexity = 'Low';
    if (lines > 100 || cyclomaticFactors > 10) complexity = 'Medium';
    if (lines > 300 || cyclomaticFactors > 20) complexity = 'High';
    
    return {
      level: complexity,
      lines,
      cyclomaticFactors
    };
  }

  generateSuggestions(code, language) {
    const suggestions = [];
    
    // Check for common issues
    if (code.includes('var ')) {
      suggestions.push("Consider using 'let' or 'const' instead of 'var' for better scoping");
    }
    
    if (code.split('\n').some(line => line.length > 120)) {
      suggestions.push("Some lines are very long - consider breaking them up for readability");
    }
    
    if (!code.includes('//') && !code.includes('/*')) {
      suggestions.push("Add comments to explain complex logic");
    }
    
    return suggestions;
  }
}

module.exports = CodeAnalyzer;