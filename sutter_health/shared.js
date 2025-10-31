// Shared utilities, routing, auth, and mock data for Sutter Health demo

// ========== Mock Data ==========
const MOCK_TRANSACTIONS = [
  {
    id: 'tx_001',
    providerName: 'Dr. Emily Rodriguez, MD',
    specialty: 'Cardiology Consultation',
    dateOfService: 'Oct 20, 2024',
    amount: 453.00,
    status: 'RefundAvailable'
  },
  {
    id: 'tx_002',
    providerName: 'Dr. Sarah Johnson, DDS',
    specialty: 'Dental Checkup',
    dateOfService: 'Sep 15, 2024',
    amount: 185.00,
    status: 'Paid'
  },
  {
    id: 'tx_003',
    providerName: 'Mountain View Medical Lab',
    specialty: 'Blood Work Panel',
    dateOfService: 'Aug 5, 2024',
    amount: 320.00,
    status: 'Processing'
  },
  {
    id: 'tx_004',
    providerName: 'Dr. James Chen, MD',
    specialty: 'Annual Physical Exam',
    dateOfService: 'Jul 12, 2024',
    amount: 275.00,
    status: 'Paid'
  }
];

const VISIT_DETAILS = {
  'tx_001': {
    visitInfo: {
      date: 'Oct 20, 2024',
      provider: 'Dr. Emily Rodriguez, MD',
      specialty: 'Cardiology Consultation',
      location: 'Mountain View Medical Center, 1245 Health Blvd, San Francisco, CA 94107'
    },
    breakdown: {
      original: 453.00,
      covered: 360.00,
      refund: 93.00
    },
    reason: 'Reason: Insurance processed additional coverage after initial payment'
  },
  'tx_002': {
    visitInfo: {
      date: 'Sep 15, 2024',
      provider: 'Dr. Sarah Johnson, DDS',
      specialty: 'Dental Checkup',
      location: 'Sutter Dental Care, 890 Oak Street, San Francisco, CA 94102'
    },
    breakdown: {
      original: 185.00,
      covered: 185.00,
      refund: 0
    },
    reason: 'Payment processed successfully'
  },
  'tx_003': {
    visitInfo: {
      date: 'Aug 5, 2024',
      provider: 'Mountain View Medical Lab',
      specialty: 'Blood Work Panel',
      location: 'Sutter Medical Lab, 456 Pine Ave, San Francisco, CA 94103'
    },
    breakdown: {
      original: 320.00,
      covered: 0,
      refund: 0
    },
    reason: 'Payment currently being processed by insurance'
  },
  'tx_004': {
    visitInfo: {
      date: 'Jul 12, 2024',
      provider: 'Dr. James Chen, MD',
      specialty: 'Annual Physical Exam',
      location: 'Sutter Health Center, 123 Market St, San Francisco, CA 94104'
    },
    breakdown: {
      original: 275.00,
      covered: 275.00,
      refund: 0
    },
    reason: 'Payment processed successfully'
  }
};

// ========== Auth Utilities ==========
function isAuthenticated() {
  return sessionStorage.getItem('sutterAuth') === 'true' || 
         localStorage.getItem('sutterAuth') === 'true';
}

function login(email, rememberMe) {
  if (rememberMe) {
    localStorage.setItem('sutterAuth', 'true');
    localStorage.setItem('sutterEmail', email);
  } else {
    sessionStorage.setItem('sutterAuth', 'true');
    sessionStorage.setItem('sutterEmail', email);
  }
}

function logout() {
  sessionStorage.clear();
  localStorage.removeItem('sutterAuth');
  localStorage.removeItem('sutterEmail');
}

function getCurrentUser() {
  const email = sessionStorage.getItem('sutterEmail') || localStorage.getItem('sutterEmail');
  if (!email) return null;
  const name = email.split('@')[0];
  const parts = name.split('.');
  return {
    email: email,
    firstName: parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'User',
    lastName: parts[1] ? parts[1].charAt(0).toUpperCase() + parts[1].slice(1) : ''
  };
}

// ========== Routing ==========
function navigate(path) {
  window.location.hash = path;
}

function getHash() {
  return window.location.hash || '#/';
}

function getHashParams() {
  const hash = getHash();
  const parts = hash.split('/');
  return {
    page: parts[1] || '',
    id: parts[2] || ''
  };
}

// ========== Toast Notifications ==========
function showToast(message, type = 'success') {
  const existing = document.getElementById('toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-notification';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: ${type === 'success' ? '#4caf50' : '#f44336'};
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    font-size: 14px;
    animation: slideIn 0.3s ease-out;
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ========== Data Access ==========
function getTransactions() {
  return MOCK_TRANSACTIONS;
}

function getTransaction(id) {
  return MOCK_TRANSACTIONS.find(t => t.id === id);
}

function getVisitDetails(id) {
  return VISIT_DETAILS[id];
}

function getRefundTransaction() {
  return MOCK_TRANSACTIONS.find(t => t.status === 'RefundAvailable');
}

// ========== Formatting Utilities ==========
function formatCurrency(amount) {
  return '$' + amount.toFixed(2);
}

function formatDate(dateStr) {
  return dateStr; // Already formatted in mock data
}

// Add keyframe animations to document
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}
