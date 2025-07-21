class CodeCompanion {
  constructor() {
    this.currentTab = 'analyze';
    this.init();
  }

  init() {
    this.setupTabs();
    this.setupEventListeners();
    this.loadSupportedLanguages();
  }

  setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active content
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === `${targetTab}-tab`) {
            content.classList.add('active');
          }
        });
        
        this.currentTab = targetTab;
      });
    });
  }

  setupEventListeners() {
    document.getElementById('analyze-btn').addEventListener('click', () => {
      this.analyzeCode();
    });

    document.getElementById('translate-btn').addEventListener('click', () => {
      this.translateCode();
    });

    // Auto-resize textareas
    document.querySelectorAll('textarea').forEach(textarea => {
      textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    });
  }

  async loadSupportedLanguages() {
    try {
      const response = await fetch('/api/languages');
      const data = await response.json();
      
      const selects = document.querySelectorAll('select[id*="language"]');
      selects.forEach(select => {
        select.innerHTML = '';
        data.supported.forEach(lang => {
          const option = document.createElement('option');
          option.value = lang;
          option.textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
          select.appendChild(option);
        });
      });
    } catch (error) {
      console.error('Failed to load languages:', error);
    }
  }

  async analyzeCode() {
    const code = document.getElementById('analyze-code').value.trim();
    const language = document.getElementById('analyze-language').value;
    
    if (!code) {
      this.showError('Please enter some code to analyze');
      return;
    }

    this.showLoading('analyze-results');
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, language })
      });

      const data = await response.json();
      
      if (response.ok) {
        this.displayAnalysis(data.analysis);
      } else {
        this.showError(data.error || 'Analysis failed');
      }
    } catch (error) {
      this.showError('Network error: ' + error.message);
    }
  }

  async translateCode() {
    const code = document.getElementById('translate-code').value.trim();
    const fromLanguage = document.getElementById('from-language').value;
    const toLanguage = document.getElementById('to-language').value;
    
    if (!code) {
      this.showError('Please enter some code to translate');
      return;
    }

    if (fromLanguage === toLanguage) {
      this.showError('Please select different source and target languages');
      return;
    }

    this.showLoading('translate-results');
    
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, fromLanguage, toLanguage })
      });

      const data = await response.json();
      
      if (response.ok) {
        this.displayTranslation(data.translation);
      } else {
        this.showError(data.error || 'Translation failed');
      }
    } catch (error) {
      this.showError('Network error: ' + error.message);
    }
  }

  displayAnalysis(analysis) {
    const resultsDiv = document.getElementById('analyze-results');
    
    resultsDiv.innerHTML = `
      <div class="results">
        <h3>📊 Code Analysis Results</h3>
        
        <div class="analysis-section">
          <h4>Summary</h4>
          <p>${analysis.summary}</p>
        </div>

        <div class="analysis-section">
          <h4>Code Structure</h4>
          ${this.renderStructure(analysis.structure)}
        </div>

        <div class="analysis-section">
          <h4>Complexity</h4>
          <p><strong>Level:</strong> ${analysis.complexity.level}</p>
          <p><strong>Lines:</strong> ${analysis.complexity.lines}</p>
          <p><strong>Cyclomatic Factors:</strong> ${analysis.complexity.cyclomaticFactors}</p>
        </div>

        ${analysis.suggestions.length > 0 ? `
          <div class="analysis-section">
            <h4>Suggestions</h4>
            <ul class="suggestions">
              ${analysis.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderStructure(structure) {
    let html = '';
    
    Object.entries(structure).forEach(([type, items]) => {
      if (items.length > 0) {
        html += `
          <div style="margin-bottom: 15px;">
            <strong>${type.charAt(0).toUpperCase() + type.slice(1)}:</strong>
            <div class="structure-list">
              ${items.map(item => `<span class="structure-item">${item}</span>`).join('')}
            </div>
          </div>
        `;
      }
    });
    
    return html || '<p>No structural elements detected</p>';
  }

  displayTranslation(translation) {
    const resultsDiv = document.getElementById('translate-results');
    
    resultsDiv.innerHTML = `
      <div class="results">
        <h3>🔄 Translation Results</h3>
        
        <div class="analysis-section">
          <h4>Translated Code</h4>
          <textarea readonly style="min-height: 200px; background: #f8f9fa;">${translation.translatedCode}</textarea>
        </div>

        <div class="analysis-section">
          <h4>Translation Notes</h4>
          <p>${translation.notes}</p>
        </div>

        ${translation.appliedRules && translation.appliedRules.length > 0 ? `
          <div class="analysis-section">
            <h4>Applied Rules</h4>
            <ul class="suggestions">
              ${translation.appliedRules.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
  }

  showLoading(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<div class="loading">🤖 Processing your code...</div>';
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    
    // Show error in current tab
    const activeTab = document.querySelector('.tab-content.active');
    const existingError = activeTab.querySelector('.error');
    if (existingError) {
      existingError.remove();
    }
    
    activeTab.appendChild(errorDiv);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
      if (errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CodeCompanion();
});