// API Base URL
const API_BASE_URL = 'https://phi-lab-server.vercel.app/api/v1/lab';

// State Management
let allIssues = [];
let currentFilter = 'all';
let isSearching = false;

// DOM Elements
const issuesGrid = document.getElementById('issuesGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const issueCountEl = document.getElementById('issueCount');
const openCountEl = document.getElementById('openCount');
const closedCountEl = document.getElementById('closedCount');
const searchInput = document.getElementById('searchInput');
const newIssueBtn = document.getElementById('newIssueBtn');
const modal = document.getElementById('issueModal');
const modalBody = document.getElementById('modalBody');

// Check authentication
document.addEventListener('DOMContentLoaded', () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      if (isLoggedIn !== 'true') {
            window.location.href = 'index.html';
            return;
      }

      // Initialize the app
      init();
});

// Initialize Application
function init() {
      loadAllIssues();
      setupEventListeners();
}

// Setup Event Listeners
function setupEventListeners() {
      // Tab buttons
      const tabButtons = document.querySelectorAll('.tab');
      tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                  // Remove active class from all buttons
                  tabButtons.forEach(b => b.classList.remove('tab-active'));
                  // Add active class to clicked button
                  btn.classList.add('tab-active');

                  // Update filter
                  currentFilter = btn.dataset.tab;
                  filterIssues();
            });
      });

      // Search functionality - search as you type with debounce
      let searchTimeout;
      searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const searchTerm = e.target.value.trim();

            if (searchTerm === '') {
                  if (isSearching) {
                        isSearching = false;
                        loadAllIssues();
                  }
            } else {
                  // Debounce search - wait 500ms after user stops typing
                  searchTimeout = setTimeout(() => {
                        performSearch();
                  }, 500);
            }
      });

      // Also search on Enter key
      searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                  clearTimeout(searchTimeout);
                  performSearch();
            }
      });

      // New Issue button (optional feature)
      newIssueBtn.addEventListener('click', () => {
            alert('New Issue feature - To be implemented');
      });
}

// Fetch All Issues
async function loadAllIssues() {
      try {
            showLoading(true);
            isSearching = false;

            const response = await fetch(`${API_BASE_URL}/issues`);
            if (!response.ok) throw new Error('Failed to fetch issues');

            const data = await response.json();
            allIssues = data.data || data;

            updateCounts();
            filterIssues();

            showLoading(false);
      } catch (error) {
            console.error('Error loading issues:', error);
            showLoading(false);
            showNoResults(true, 'Failed to load issues. Please try again.');
      }
}

// Perform Search
async function performSearch() {
      const searchTerm = searchInput.value.trim();

      if (searchTerm === '') {
            loadAllIssues();
            return;
      }

      try {
            showLoading(true);
            isSearching = true;

            const response = await fetch(`${API_BASE_URL}/issues/search?q=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error('Search failed');

            const data = await response.json();
            allIssues = data.data || data;

            updateCounts();
            filterIssues();

            showLoading(false);
      } catch (error) {
            console.error('Error searching issues:', error);
            showLoading(false);
            showNoResults(true, 'Search failed. Please try again.');
      }
}

// Filter Issues by Status
function filterIssues() {
      let filteredIssues = [...allIssues];

      if (currentFilter === 'open') {
            filteredIssues = allIssues.filter(issue =>
                  issue.status?.toLowerCase() === 'open'
            );
      } else if (currentFilter === 'closed') {
            filteredIssues = allIssues.filter(issue =>
                  issue.status?.toLowerCase() === 'closed'
            );
      }

      displayIssues(filteredIssues);
}

// Display Issues
function displayIssues(issues) {
      issuesGrid.innerHTML = '';

      if (issues.length === 0) {
            showNoResults(true);
            return;
      }

      showNoResults(false);

      issues.forEach(issue => {
            const card = createIssueCard(issue);
            issuesGrid.appendChild(card);
      });
}

// Create Issue Card
function createIssueCard(issue) {
      const card = document.createElement('div');
      const status = issue.status?.toLowerCase() || 'open';
      card.className = `card bg-base-100 shadow-lg hover:shadow-xl transition-all cursor-pointer border-t-4 issue-card ${status}`;

      // Format date
      const date = formatDate(issue.createdAt);

      // Get priority badge colors
      const getPriorityBadge = (priority) => {
            const p = priority?.toLowerCase();
            if (p === 'high') return 'badge-error';
            if (p === 'medium') return 'badge-warning';
            return 'badge-ghost';
      };

      const getStatusBadge = (status) => {
            return status === 'open' ? 'badge-success' : 'badge-secondary';
      };

      card.innerHTML = `
        <div class="card-body">
            <div class="flex justify-between items-start mb-2">
                <span class="badge ${getStatusBadge(status)} uppercase text-xs font-semibold">${status}</span>
            </div>
            <h3 class="card-title text-base line-clamp-2">${escapeHtml(issue.title || 'Untitled')}</h3>
            <p class="text-sm text-base-content/70 line-clamp-2">${escapeHtml(issue.description || 'No description')}</p>
            <div class="flex flex-wrap gap-2 mt-2">
                ${issue.label ? `<span class="badge badge-info badge-sm">${escapeHtml(issue.label)}</span>` : ''}
                ${issue.priority ? `<span class="badge ${getPriorityBadge(issue.priority)} badge-sm">${escapeHtml(issue.priority)}</span>` : ''}
            </div>
            <div class="flex justify-between items-center mt-4 pt-3 border-t border-base-300 text-xs text-base-content/60">
                <span class="font-medium">By ${escapeHtml(issue.author || 'Unknown')}</span>
                <span>${date}</span>
            </div>
        </div>
    `;

      // Add click event to open modal
      card.addEventListener('click', () => openIssueModal(issue));

      return card;
}

// Open Issue Modal
async function openIssueModal(issue) {
      // If we have the full issue data, display it
      // Otherwise, fetch it from the API
      let issueData = issue;

      if (!issue.id) {
            // If issue doesn't have full data, it should have an id to fetch
            console.warn('Issue missing data');
            return;
      }

      // Try to fetch full issue details if available
      try {
            const response = await fetch(`${API_BASE_URL}/issue/${issue.id}`);
            if (response.ok) {
                  const data = await response.json();
                  issueData = data.data || data;
            }
      } catch (error) {
            console.log('Using cached issue data');
      }

      displayIssueModal(issueData);
}

// Display Issue in Modal
function displayIssueModal(issue) {
      const status = issue.status?.toLowerCase() || 'open';
      const date = formatDate(issue.createdAt);
      const statusBadge = status === 'open' ? 'badge-success' : 'badge-secondary';

      modalBody.innerHTML = `
        <h2 class="text-2xl font-bold mb-3">${escapeHtml(issue.title || 'Untitled')}</h2>
        <span class="badge ${statusBadge} uppercase mb-4">${status}</span>
        
        <p class="text-base leading-relaxed mb-6">${escapeHtml(issue.description || 'No description available')}</p>
        
        <div class="space-y-3">
            <div class="flex gap-3">
                <span class="font-semibold text-base-content/70 min-w-[100px]">Author:</span>
                <span>${escapeHtml(issue.author || 'Unknown')}</span>
            </div>
            <div class="flex gap-3">
                <span class="font-semibold text-base-content/70 min-w-[100px]">Status:</span>
                <span>${escapeHtml(issue.status || 'Open')}</span>
            </div>
            ${issue.priority ? `
                <div class="flex gap-3">
                    <span class="font-semibold text-base-content/70 min-w-[100px]">Priority:</span>
                    <span>${escapeHtml(issue.priority)}</span>
                </div>
            ` : ''}
            ${issue.label ? `
                <div class="flex gap-3">
                    <span class="font-semibold text-base-content/70 min-w-[100px]">Label:</span>
                    <span>${escapeHtml(issue.label)}</span>
                </div>
            ` : ''}
            <div class="flex gap-3">
                <span class="font-semibold text-base-content/70 min-w-[100px]">Created:</span>
                <span>${date}</span>
            </div>
            ${issue.id ? `
                <div class="flex gap-3">
                    <span class="font-semibold text-base-content/70 min-w-[100px]">Issue ID:</span>
                    <span>#${issue.id}</span>
                </div>
            ` : ''}
        </div>
    `;

      modal.checked = true;
}

// Close Modal
function closeModal() {
      modal.checked = false;
}

// Update Issue Counts
function updateCounts() {
      const totalCount = allIssues.length;
      const openCount = allIssues.filter(issue =>
            issue.status?.toLowerCase() === 'open'
      ).length;
      const closedCount = allIssues.filter(issue =>
            issue.status?.toLowerCase() === 'closed'
      ).length;

      issueCountEl.textContent = `${totalCount} Issue${totalCount !== 1 ? 's' : ''}`;
      openCountEl.textContent = `${openCount} Open`;
      closedCountEl.textContent = `${closedCount} Closed`;
}

// Show/Hide Loading Spinner
function showLoading(show) {
      if (show) {
            loadingSpinner.style.display = 'block';
            issuesGrid.classList.add('hidden');
            noResults.style.display = 'none';
      } else {
            loadingSpinner.style.display = 'none';
            issuesGrid.classList.remove('hidden');
      }
}

// Show/Hide No Results
function showNoResults(show, message = 'No issues found') {
      if (show) {
            noResults.querySelector('p').textContent = message;
            noResults.style.display = 'block';
            issuesGrid.classList.add('hidden');
      } else {
            noResults.style.display = 'none';
            issuesGrid.classList.remove('hidden');
      }
}

// Format Date
function formatDate(dateString) {
      if (!dateString) return 'Unknown date';

      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
            return 'Today';
      } else if (diffDays === 1) {
            return 'Yesterday';
      } else if (diffDays < 7) {
            return `${diffDays} days ago`;
      } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
      } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months} month${months !== 1 ? 's' : ''} ago`;
      } else {
            return date.toLocaleDateString();
      }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
}
