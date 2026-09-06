// Mockaroo Local Client App
let activeFieldRow = null;

document.addEventListener('DOMContentLoaded', () => {
  initSortable();
});

// Re-init sortable whenever HTMX swaps new rows
document.addEventListener('htmx:afterSwap', (evt) => {
  initSortable();
});

function initSortable() {
  const container = document.getElementById('fields-container');
  if (container && !container._sortableInit) {
    new Sortable(container, {
      handle: '.drag-handle',
      animation: 150,
      ghostClass: 'sortable-ghost'
    });
    container._sortableInit = true;
  }
}

// Modal handling
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

// Close modals on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-root:not(.hidden)').forEach(modal => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
    document.body.style.overflow = '';
  }
});

// Type Picker Modal Logic
function openTypePicker(btn) {
  activeFieldRow = btn.closest('.field-row');
  const searchInput = document.getElementById('type-search');
  if (searchInput) {
    searchInput.value = '';
    filterTypes('');
  }
  openModal('type-modal');
  setTimeout(() => {
    if (searchInput) searchInput.focus();
  }, 50);
}

function selectType(typeKey, typeName) {
  if (!activeFieldRow) return;

  const typeInput = activeFieldRow.querySelector('.field-type-input');
  const typeBtn = activeFieldRow.querySelector('.field-type-btn');

  if (typeInput) typeInput.value = typeKey;
  if (typeBtn) typeBtn.innerText = typeName;

  closeModal('type-modal');
  activeFieldRow = null;
}

function filterTypes(query) {
  const q = query.toLowerCase().trim();
  const cards = document.querySelectorAll('.type-card');
  const catSections = document.querySelectorAll('.category-section');

  cards.forEach(card => {
    const name = (card.getAttribute('data-name') || '').toLowerCase();
    const cat = (card.getAttribute('data-category') || '').toLowerCase();
    const desc = (card.getAttribute('data-desc') || '').toLowerCase();

    if (!q || name.includes(q) || cat.includes(q) || desc.includes(q)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Hide empty category sections
  catSections.forEach(sec => {
    const visibleInSec = sec.querySelectorAll('.type-card[style="display: block;"]').length;
    sec.style.display = (!q || visibleInSec > 0) ? 'block' : 'none';
  });
}

function filterByCategory(category) {
  const searchInput = document.getElementById('type-search');
  if (searchInput) searchInput.value = '';
  
  const catButtons = document.querySelectorAll('.category-btn');
  catButtons.forEach(btn => {
    if (btn.getAttribute('data-category') === category) {
      btn.classList.add('bg-primary-green', 'text-white');
      btn.classList.remove('text-gray-300', 'bg-dark-card');
    } else {
      btn.classList.remove('bg-primary-green', 'text-white');
      btn.classList.add('text-gray-300', 'bg-dark-card');
    }
  });

  const catSections = document.querySelectorAll('.category-section');
  catSections.forEach(sec => {
    if (category === 'ALL' || sec.getAttribute('data-category') === category) {
      sec.style.display = 'block';
      sec.querySelectorAll('.type-card').forEach(c => c.style.display = 'block');
    } else {
      sec.style.display = 'none';
    }
  });
}

// Formula Editor Modal Logic
function openFormulaEditor(btn) {
  activeFieldRow = btn.closest('.field-row');
  const fieldName = activeFieldRow.querySelector('.field-name-input').value || 'field';
  const formulaInput = activeFieldRow.querySelector('.field-formula-input');
  
  document.getElementById('formula-field-name').innerText = fieldName;
  const editor = document.getElementById('formula-editor-text');
  editor.value = formulaInput ? formulaInput.value : '';

  openModal('formula-modal');
  setTimeout(() => editor.focus(), 50);
}

function saveFormula() {
  if (!activeFieldRow) return;
  const editor = document.getElementById('formula-editor-text');
  const formulaInput = activeFieldRow.querySelector('.field-formula-input');
  const formulaBtn = activeFieldRow.querySelector('.field-formula-btn');

  if (formulaInput) formulaInput.value = editor.value;
  
  if (formulaBtn) {
    if (editor.value.trim()) {
      formulaBtn.classList.add('bg-amber-600', 'text-white');
      formulaBtn.classList.remove('text-gray-400');
    } else {
      formulaBtn.classList.remove('bg-amber-600', 'text-white');
      formulaBtn.classList.add('text-gray-400');
    }
  }

  closeModal('formula-modal');
  activeFieldRow = null;
}

function insertFormulaSnippet(snippet) {
  const editor = document.getElementById('formula-editor-text');
  editor.value = snippet;
  editor.focus();
}

// Delete row helper
function removeFieldRow(btn) {
  const row = btn.closest('.field-row');
  const container = document.getElementById('fields-container');
  if (container.querySelectorAll('.field-row').length <= 1) {
    alert('At least one field is required.');
    return;
  }
  if (row) row.remove();
}
