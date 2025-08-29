// Zenava Admin Dashboard JavaScript

// Initialize Quill editors for rich text editing
document.addEventListener('DOMContentLoaded', function() {
  // Initialize rich text editors
  initializeQuillEditors();
  
  // Initialize tab functionality
  initializeTabs();
  
  // Initialize form validation
  initializeFormValidation();
  
  // Initialize data tables
  initializeDataTables();
});

// Initialize Quill Rich Text Editors
function initializeQuillEditors() {
  const languages = ['en', 'jp', 'hk'];
  
  languages.forEach(lang => {
    const editorElement = document.getElementById(`editor-${lang}`);
    if (editorElement) {
      new Quill(`#editor-${lang}`, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
          ]
        },
        placeholder: `Enter ${lang.toUpperCase()} content here...`
      });
    }
  });
}

// Tab Management
function showTab(language) {
  // Hide all content tabs
  document.querySelectorAll('.content-tab').forEach(tab => {
    tab.classList.add('hidden');
  });
  
  // Show selected tab
  document.getElementById(`tab-${language}`).classList.remove('hidden');
  
  // Update tab buttons
  document.querySelectorAll('button[onclick^="showTab"]').forEach(btn => {
    btn.classList.remove('bg-blue-100', 'text-blue-700');
    btn.classList.add('text-gray-700', 'hover:bg-gray-100');
  });
  
  // Highlight active tab
  event.target.classList.add('bg-blue-100', 'text-blue-700');
  event.target.classList.remove('text-gray-700', 'hover:bg-gray-100');
}

function showSeoTab(language) {
  // Hide all SEO tabs
  document.querySelectorAll('.seo-tab').forEach(tab => {
    tab.classList.add('hidden');
  });
  
  // Show selected tab
  document.getElementById(`seo-tab-${language}`).classList.remove('hidden');
  
  // Update tab buttons
  document.querySelectorAll('button[onclick^="showSeoTab"]').forEach(btn => {
    btn.classList.remove('bg-green-100', 'text-green-700');
    btn.classList.add('text-gray-700', 'hover:bg-gray-100');
  });
  
  // Highlight active tab
  event.target.classList.add('bg-green-100', 'text-green-700');
  event.target.classList.remove('text-gray-700', 'hover:bg-gray-100');
}

function initializeTabs() {
  // Add click handlers for tab switching
  const contentTabs = document.querySelectorAll('button[onclick^="showTab"]');
  const seoTabs = document.querySelectorAll('button[onclick^="showSeoTab"]');
  
  // Set default active tabs
  if (contentTabs.length > 0) {
    contentTabs[0].classList.add('bg-blue-100', 'text-blue-700');
  }
  
  if (seoTabs.length > 0) {
    seoTabs[0].classList.add('bg-green-100', 'text-green-700');
  }
}

// Form Validation
function initializeFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!validateForm(this)) {
        e.preventDefault();
        showNotification('Please fill in all required fields', 'error');
      }
    });
  });
}

function validateForm(form) {
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('border-red-500');
      isValid = false;
    } else {
      field.classList.remove('border-red-500');
    }
  });
  
  return isValid;
}

// Data Tables Enhancement
function initializeDataTables() {
  // Add search functionality
  const searchInputs = document.querySelectorAll('input[placeholder*="Search"]');
  
  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const table = this.closest('.bg-white').querySelector('table tbody');
      
      if (table) {
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          if (text.includes(searchTerm)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      }
    });
  });
  
  // Add filter functionality
  const filterSelects = document.querySelectorAll('select');
  
  filterSelects.forEach(select => {
    select.addEventListener('change', function() {
      applyFilters();
    });
  });
}

// Content Management Functions
function deleteContent(id) {
  if (confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
    // Make API call to delete content
    fetch(`/admin/api/content/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showNotification('Content deleted successfully', 'success');
        // Remove row from table
        document.querySelector(`tr[data-id="${id}"]`)?.remove();
      } else {
        showNotification('Failed to delete content', 'error');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showNotification('An error occurred', 'error');
    });
  }
}

function publishContent(id) {
  fetch(`/admin/api/content/${id}/publish`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showNotification('Content published successfully', 'success');
      // Update status in table
      updateContentStatus(id, 'published');
    } else {
      showNotification('Failed to publish content', 'error');
    }
  });
}

function updateContentStatus(id, status) {
  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) {
    const statusCell = row.querySelector('.status-cell');
    if (statusCell) {
      statusCell.innerHTML = `<span class="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">${status}</span>`;
    }
  }
}

// SEO Management Functions
function analyzeSEO(id) {
  showNotification('Analyzing SEO...', 'info');
  
  fetch(`/admin/api/seo/analyze/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showSEOAnalysisResults(data.analysis);
    } else {
      showNotification('SEO analysis failed', 'error');
    }
  });
}

function showSEOAnalysisResults(analysis) {
  // Create modal or update UI with SEO analysis results
  const modal = createModal('SEO Analysis Results', generateSEOReport(analysis));
  document.body.appendChild(modal);
}

function generateSEOReport(analysis) {
  return `
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span>SEO Score</span>
        <span class="font-bold ${analysis.score >= 80 ? 'text-green-600' : analysis.score >= 60 ? 'text-yellow-600' : 'text-red-600'}">${analysis.score}/100</span>
      </div>
      
      <div class="space-y-2">
        <h4 class="font-semibold">Recommendations:</h4>
        <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
          ${analysis.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// I18n Management Functions
function autoTranslate(key, fromLang, toLang) {
  const sourceText = document.querySelector(`textarea[data-key="${key}"][data-lang="${fromLang}"]`).value;
  
  if (!sourceText.trim()) {
    showNotification('Please enter source text first', 'warning');
    return;
  }
  
  showNotification('Translating...', 'info');
  
  fetch('/admin/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: sourceText,
      from: fromLang,
      to: toLang
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const targetTextarea = document.querySelector(`textarea[data-key="${key}"][data-lang="${toLang}"]`);
      if (targetTextarea) {
        targetTextarea.value = data.translation;
        showNotification('Translation completed', 'success');
      }
    } else {
      showNotification('Translation failed', 'error');
    }
  });
}

function saveTranslation(key) {
  const translations = {};
  const languages = ['en', 'jp', 'hk'];
  
  languages.forEach(lang => {
    const textarea = document.querySelector(`textarea[data-key="${key}"][data-lang="${lang}"]`);
    if (textarea) {
      translations[lang] = textarea.value;
    }
  });
  
  fetch(`/admin/api/i18n/${key}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ translations })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showNotification('Translation saved successfully', 'success');
    } else {
      showNotification('Failed to save translation', 'error');
    }
  });
}

// Utility Functions
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-opacity duration-300 ${
    type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
    type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
    type === 'warning' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
    'bg-blue-100 text-blue-800 border border-blue-200'
  }`;
  
  notification.innerHTML = `
    <div class="flex items-center">
      <i class="fas ${
        type === 'success' ? 'fa-check-circle' :
        type === 'error' ? 'fa-exclamation-circle' :
        type === 'warning' ? 'fa-exclamation-triangle' :
        'fa-info-circle'
      } mr-2"></i>
      <span>${message}</span>
      <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-gray-500 hover:text-gray-700">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

function createModal(title, content) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50';
  
  modal.innerHTML = `
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">${title}</h3>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="mt-2">
          ${content}
        </div>
      </div>
    </div>
  `;
  
  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  return modal;
}

function applyFilters() {
  // This would implement the actual filtering logic
  // based on the selected filter values
  console.log('Applying filters...');
}

// Export functions for global access
window.showTab = showTab;
window.showSeoTab = showSeoTab;
window.deleteContent = deleteContent;
window.publishContent = publishContent;
window.analyzeSEO = analyzeSEO;
window.autoTranslate = autoTranslate;
window.saveTranslation = saveTranslation;