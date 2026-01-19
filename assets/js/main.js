// Star Rating Functionality (Index Page)
document.addEventListener('DOMContentLoaded', function() {
  // Star rating functionality
  const starWrappers = document.querySelectorAll('.star-wrapper');
  starWrappers.forEach(wrapper => {
    const ratingRaw = wrapper.dataset.rating;
    const ratingNum = Math.max(0, Math.min(5, parseFloat(ratingRaw)));
    if (Number.isNaN(ratingNum)) return;
    const widthPercent = (ratingNum / 5) * 100;
    const fillEl = wrapper.querySelector('.stars-fill');
    if (!fillEl) return;
    fillEl.style.width = widthPercent + '%';
  });
});

// Account Cards Horizontal Scroll with Slider
(function() {
  const cardsRow = document.getElementById('accountCardsRow');
  const sliderThumb = document.getElementById('sliderThumb');
  const sliderTrack = document.querySelector('.slider-track');
  const sliderContainer = document.querySelector('.account-cards-slider');
  
  if (!cardsRow || !sliderThumb || !sliderTrack) return;
  
  let isDragging = false;
  
  // Calculate thumb size and position based on visible cards
  function updateSlider() {
    const maxScroll = cardsRow.scrollWidth - cardsRow.clientWidth;
    const totalWidth = cardsRow.scrollWidth;
    const visibleWidth = cardsRow.clientWidth;
    
    if (maxScroll > 0) {
      const trackWidth = sliderTrack.offsetWidth;
      const visibleRatio = visibleWidth / totalWidth;
      const thumbWidth = Math.max(trackWidth * visibleRatio, 50);
      const maxThumbLeft = trackWidth - thumbWidth;
      const scrollRatio = cardsRow.scrollLeft / maxScroll;
      
      sliderThumb.style.width = thumbWidth + 'px';
      sliderThumb.style.left = (scrollRatio * maxThumbLeft) + 'px';
      sliderContainer.style.display = 'block';
    } else {
      sliderContainer.style.display = 'none';
    }
  }
  
  // Update slider when scrolling
  cardsRow.addEventListener('scroll', function() {
    if (!isDragging) {
      updateSlider();
    }
  });
  
  // Drag functionality
  sliderThumb.addEventListener('mousedown', function(e) {
    isDragging = true;
    const trackRect = sliderTrack.getBoundingClientRect();
    const startX = e.clientX - trackRect.left;
    const thumbLeft = parseFloat(sliderThumb.style.left) || 0;
    const offsetX = startX - thumbLeft;
    
    function onMouseMove(e) {
      const trackRect = sliderTrack.getBoundingClientRect();
      const newX = e.clientX - trackRect.left - offsetX;
      const trackWidth = sliderTrack.offsetWidth;
      const thumbWidth = sliderThumb.offsetWidth;
      const maxLeft = trackWidth - thumbWidth;
      const clampedX = Math.max(0, Math.min(maxLeft, newX));
      
      sliderThumb.style.left = clampedX + 'px';
      
      // Update scroll position
      const scrollRatio = clampedX / maxLeft;
      const maxScroll = cardsRow.scrollWidth - cardsRow.clientWidth;
      cardsRow.scrollLeft = scrollRatio * maxScroll;
    }
    
    function onMouseUp() {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  
  // Click on track to jump
  sliderTrack.addEventListener('click', function(e) {
    if (e.target === sliderThumb) return;
    
    const trackRect = sliderTrack.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    const trackWidth = sliderTrack.offsetWidth;
    const thumbWidth = sliderThumb.offsetWidth;
    const maxLeft = trackWidth - thumbWidth;
    const newLeft = Math.max(0, Math.min(maxLeft, clickX - thumbWidth / 2));
    
    sliderThumb.style.left = newLeft + 'px';
    
    const scrollRatio = newLeft / maxLeft;
    const maxScroll = cardsRow.scrollWidth - cardsRow.clientWidth;
    cardsRow.scrollLeft = scrollRatio * maxScroll;
  });
  
  // Enable mouse wheel scrolling
  cardsRow.addEventListener('wheel', function(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      cardsRow.scrollLeft += e.deltaY;
      updateSlider();
    }
  });
  
  // Initialize on load and resize
  updateSlider();
  window.addEventListener('resize', updateSlider);
})();

// Balance Toggle Functionality for Account Cards
(function() {
  const balanceToggles = document.querySelectorAll('.balance-toggle');
  
  balanceToggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      const balanceWrapper = this.closest('.account-balance-wrapper');
      const balanceAmount = balanceWrapper.querySelector('.balance-amount');
      const originalAmount = balanceAmount.getAttribute('data-original') || balanceAmount.textContent;
      
      // Toggle icon
      if (this.classList.contains('fa-eye')) {
        // Hide amount - store original and show dots
        balanceAmount.setAttribute('data-original', originalAmount);
        balanceAmount.textContent = '••••••••';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
      } else {
        // Show amount - restore original
        balanceAmount.textContent = originalAmount;
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
      }
    });
  });
})();

// Balance Toggle Functionality for Account Insights
(function() {
  const balanceToggleInsight = document.querySelector('.balance-toggle-insight');
  
  if (balanceToggleInsight) {
    balanceToggleInsight.addEventListener('click', function() {
      const balanceAmount = document.querySelector('.balance-amount-insight');
      const originalAmount = balanceAmount.getAttribute('data-original') || balanceAmount.textContent;
      
      // Toggle icon
      if (this.classList.contains('fa-eye')) {
        // Hide amount - store original and show dots
        balanceAmount.setAttribute('data-original', originalAmount);
        balanceAmount.textContent = '••••••••';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
      } else {
        // Show amount - restore original
        balanceAmount.textContent = originalAmount;
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
      }
    });
  }
})();

// Collapse/Expand Functionality for Linked Bank Accounts
(function() {
  const collapseBtn = document.getElementById('collapseBtn');
  const accountCardsWrapper = document.querySelector('.account-cards-wrapper');
  const collapseText = document.querySelector('.collapse-text');
  const collapseIcon = document.querySelector('.collapse-icon');
  
  if (collapseBtn && accountCardsWrapper && collapseText && collapseIcon) {
    collapseBtn.addEventListener('click', function() {
      const isCollapsed = accountCardsWrapper.style.display === 'none';
      
      if (isCollapsed) {
        // Expand
        accountCardsWrapper.style.display = 'block';
        collapseText.textContent = 'Collapse';
        collapseIcon.className = 'fa-solid fa-arrows-to-circle collapse-icon';
      } else {
        // Collapse
        accountCardsWrapper.style.display = 'none';
        collapseText.textContent = 'Expand';
        collapseIcon.className = 'fa-solid fa-arrows-up-down-left-right';
      }
    });
  }
})();

// RTGS Notice Auto-Rotation and Navigation
(function() {
  const rtgsMessages = document.querySelectorAll('.rtgs-message');
  const rtgsArrowLeft = document.getElementById('rtgsArrowLeft');
  const rtgsArrowRight = document.getElementById('rtgsArrowRight');
  let currentIndex = 0;
  let autoRotateTimeout;
  
  if (rtgsMessages.length === 0) return;
  
  // Function to show a specific message
  function showMessage(index) {
    rtgsMessages.forEach((msg, i) => {
      if (i === index) {
        msg.classList.add('active');
      } else {
        msg.classList.remove('active');
      }
    });
    currentIndex = index;
  }
  
  // Function to go to next message
  function nextMessage() {
    const nextIndex = (currentIndex + 1) % rtgsMessages.length;
    showMessage(nextIndex);
    scheduleNextRotation(); // Schedule next rotation after showing message
  }
  
  // Function to go to previous message
  function previousMessage() {
    const prevIndex = (currentIndex - 1 + rtgsMessages.length) % rtgsMessages.length;
    showMessage(prevIndex);
    scheduleNextRotation(); // Schedule next rotation after showing message
  }
  
  // Function to schedule next auto-rotation
  function scheduleNextRotation() {
    // Clear any existing timeout
    if (autoRotateTimeout) {
      clearTimeout(autoRotateTimeout);
    }
    // Schedule next rotation after 10 seconds
    autoRotateTimeout = setTimeout(nextMessage, 10000);
  }
  
  // Function to start auto-rotation
  function startAutoRotate() {
    scheduleNextRotation();
  }
  
  // Function to stop auto-rotation
  function stopAutoRotate() {
    if (autoRotateTimeout) {
      clearTimeout(autoRotateTimeout);
      autoRotateTimeout = null;
    }
  }
  
  // Arrow button navigation
  if (rtgsArrowLeft) {
    rtgsArrowLeft.addEventListener('click', function() {
      stopAutoRotate();
      previousMessage();
      startAutoRotate(); // Restart timer for 10 seconds
    });
  }
  
  if (rtgsArrowRight) {
    rtgsArrowRight.addEventListener('click', function() {
      stopAutoRotate();
      nextMessage();
      startAutoRotate(); // Restart timer for 10 seconds
    });
  }
  
  // Start auto-rotation on page load
  startAutoRotate();
  
  // Pause auto-rotation on hover (optional enhancement)
  const rtgsNotice = document.querySelector('.rtgs-notice');
  if (rtgsNotice) {
    rtgsNotice.addEventListener('mouseenter', stopAutoRotate);
    rtgsNotice.addEventListener('mouseleave', startAutoRotate);
  }
})();

// Transactions table: data, search, pagination, export, edit/delete
(function() {
  const tableBody = document.getElementById('transactionsBody');
  const searchInput = document.getElementById('transactionsSearch');
  const rowsPerPageSelect = document.getElementById('rowsPerPageSelect');
  const paginationSummary = document.getElementById('paginationSummary');
  const paginationNumbers = document.getElementById('paginationNumbers');
  const prevBtn = document.getElementById('paginationPrev');
  const nextBtn = document.getElementById('paginationNext');
  const exportBtn = document.querySelector('.btn-export');
  const masterCheckbox = document.querySelector('.table-transactions thead input[type="checkbox"]');

  if (!tableBody || !searchInput || !rowsPerPageSelect || !paginationSummary || !paginationNumbers || !prevBtn || !nextBtn) {
    return;
  }

  const transactionsData = [
    { id: '#54329', file: 'InvestmentOverview_August2025.xlsx', amount: '150,000 ৳', date: '22 Nov, 2027', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Aiden Carter 3', pendingBy: '-' },
    { id: '#54321', file: 'WealthManagement_August2025.xlsx', amount: '250,000 ৳', date: '30 Mar, 2028', status: 'Pending', statusClass: 'status-pending', approvedBy: 'Liam Thompson 3', pendingBy: 'Ethan Carter 2' },
    { id: '#54328', file: 'InvestmentPortfolio_August2025.xlsx', amount: '400,000 ৳', date: '3 Feb, 2026', status: 'Fully Disbursed', statusClass: 'status-disbursed', approvedBy: 'Oliver Scott 3', pendingBy: '-' },
    { id: '#54323', file: 'FinancialPortfolio_August2025.xlsx', amount: '550,000 ৳', date: '14 Dec, 2026', status: 'Rejected', statusClass: 'status-rejected', approvedBy: 'Logan Brooks 3', pendingBy: 'Mia Wilson' },
    { id: '#54325', file: 'InvestmentOverview_August2025.xlsx', amount: '150,000 ৳', date: '22 Nov, 2027', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Aiden Carter 3', pendingBy: '-' },
    // Additional dummy rows for pagination testing
    { id: '#54330', file: 'SalaryDisbursement_Jan2026.xlsx', amount: '980,000 ৳', date: '02 Jan, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Noah Miller', pendingBy: '-' },
    { id: '#54331', file: 'VendorPayment_Q1_2026.xlsx', amount: '320,000 ৳', date: '18 Jan, 2026', status: 'Pending', statusClass: 'status-pending', approvedBy: 'Emma Davis', pendingBy: 'Oliver Smith' },
    { id: '#54332', file: 'UtilityBills_Jan2026.xlsx', amount: '75,000 ৳', date: '25 Jan, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Sophia Brown', pendingBy: '-' },
    { id: '#54333', file: 'SalaryDisbursement_Feb2026.xlsx', amount: '990,000 ৳', date: '02 Feb, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Noah Miller', pendingBy: '-' },
    { id: '#54334', file: 'VendorPayment_Feb2026.xlsx', amount: '410,000 ৳', date: '16 Feb, 2026', status: 'Pending', statusClass: 'status-pending', approvedBy: 'Emma Davis', pendingBy: 'Liam Wilson' },
    { id: '#54335', file: 'InvestmentStatement_Feb2026.xlsx', amount: '620,000 ৳', date: '27 Feb, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Mason Clark', pendingBy: '-' },
    { id: '#54336', file: 'TaxPayment_2025_2026.xlsx', amount: '1,200,000 ৳', date: '15 Mar, 2026', status: 'Fully Disbursed', statusClass: 'status-disbursed', approvedBy: 'Evelyn Hall', pendingBy: '-' },
    { id: '#54337', file: 'InsurancePremium_2026.xlsx', amount: '300,000 ৳', date: '22 Mar, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Lucas Baker', pendingBy: '-' },
    { id: '#54338', file: 'BonusDisbursement_2026.xlsx', amount: '1,500,000 ৳', date: '30 Mar, 2026', status: 'Pending', statusClass: 'status-pending', approvedBy: 'Harper Lewis', pendingBy: 'Sophia Adams' },
    { id: '#54339', file: 'CorporateLoan_Installment_01.xlsx', amount: '700,000 ৳', date: '05 Apr, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Henry Turner', pendingBy: '-' },
    { id: '#54340', file: 'CorporateLoan_Installment_02.xlsx', amount: '700,000 ৳', date: '05 May, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Henry Turner', pendingBy: '-' },
    { id: '#54341', file: 'CorporateLoan_Installment_03.xlsx', amount: '700,000 ৳', date: '05 Jun, 2026', status: 'Pending', statusClass: 'status-pending', approvedBy: 'Henry Turner', pendingBy: 'Ethan Young' },
    { id: '#54342', file: 'StaffReimbursement_May2026.xlsx', amount: '95,000 ৳', date: '22 May, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Aria Walker', pendingBy: '-' },
    { id: '#54343', file: 'StaffReimbursement_Jun2026.xlsx', amount: '110,000 ৳', date: '25 Jun, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Aria Walker', pendingBy: '-' },
    { id: '#54344', file: 'ExportPayment_Batch01.xlsx', amount: '2,500,000 ৳', date: '07 Jul, 2026', status: 'Fully Disbursed', statusClass: 'status-disbursed', approvedBy: 'James Rivera', pendingBy: '-' },
    { id: '#54345', file: 'ExportPayment_Batch02.xlsx', amount: '2,750,000 ৳', date: '14 Jul, 2026', status: 'Pending', statusClass: 'status-pending', approvedBy: 'James Rivera', pendingBy: 'Olivia King' },
    { id: '#54346', file: 'ImportLC_Settlement_01.xlsx', amount: '3,100,000 ৳', date: '02 Aug, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Benjamin Scott', pendingBy: '-' },
    { id: '#54347', file: 'ImportLC_Settlement_02.xlsx', amount: '2,900,000 ৳', date: '18 Aug, 2026', status: 'Rejected', statusClass: 'status-rejected', approvedBy: 'Benjamin Scott', pendingBy: 'Compliance Team' },
    { id: '#54348', file: 'DividendPayout_Q2_2026.xlsx', amount: '1,850,000 ৳', date: '28 Aug, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Charlotte Perez', pendingBy: '-' },
    { id: '#54349', file: 'DividendPayout_Q3_2026.xlsx', amount: '1,920,000 ৳', date: '30 Sep, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Charlotte Perez', pendingBy: '-' },
    { id: '#54350', file: 'PensionFundDisbursement_2026.xlsx', amount: '1,300,000 ৳', date: '10 Oct, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'William Cox', pendingBy: '-' },
    { id: '#54351', file: 'GovtTaxWithholding_2026.xlsx', amount: '2,050,000 ৳', date: '20 Oct, 2026', status: 'Fully Disbursed', statusClass: 'status-disbursed', approvedBy: 'Amelia Rogers', pendingBy: '-' },
    { id: '#54352', file: 'CSRDonation_HealthSector_2026.xlsx', amount: '600,000 ৳', date: '05 Nov, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Elijah Ward', pendingBy: '-' },
    { id: '#54353', file: 'CSRDonation_Education_2026.xlsx', amount: '750,000 ৳', date: '15 Nov, 2026', status: 'Pending', statusClass: 'status-pending', approvedBy: 'Elijah Ward', pendingBy: 'Board Review' },
    { id: '#54354', file: 'YearEndBonus_2026.xlsx', amount: '3,500,000 ৳', date: '28 Dec, 2026', status: 'Approved', statusClass: 'status-approved', approvedBy: 'Grace Hughes', pendingBy: '-' }
  ];

  let filteredData = transactionsData.slice();
  let currentPage = 1;
  let rowsPerPage = parseInt(rowsPerPageSelect.value, 10) || 10;

  function renderTable() {
    const totalItems = filteredData.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / rowsPerPage));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageItems = filteredData.slice(start, end);

    tableBody.innerHTML = '';

    pageItems.forEach(txn => {
      const tr = document.createElement('tr');

      const checkboxCell = document.createElement('td');
      const idCell = document.createElement('td');
      const fileCell = document.createElement('td');
      const amountCell = document.createElement('td');
      const dateCell = document.createElement('td');
      const statusCell = document.createElement('td');
      const approvedCell = document.createElement('td');
      const pendingCell = document.createElement('td');
      const actionCell = document.createElement('td');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.setAttribute('data-txn-id', txn.id);
      checkboxCell.appendChild(checkbox);

      idCell.textContent = txn.id;
      fileCell.textContent = txn.file;
      amountCell.textContent = txn.amount;
      dateCell.textContent = txn.date;

      const statusBadge = document.createElement('span');
      statusBadge.className = 'status-badge ' + txn.statusClass;
      statusBadge.textContent = txn.status;
      statusCell.appendChild(statusBadge);

      approvedCell.textContent = txn.approvedBy;
      pendingCell.textContent = txn.pendingBy;

      actionCell.className = 'text-end';

      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown txn-action-dropdown';

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'btn btn-sm btn-link text-secondary p-0';
      toggleBtn.setAttribute('data-bs-toggle', 'dropdown');
      toggleBtn.setAttribute('aria-expanded', 'false');

      const toggleIcon = document.createElement('i');
      toggleIcon.className = 'bi bi-three-dots-vertical';
      toggleBtn.appendChild(toggleIcon);

      const menu = document.createElement('ul');
      menu.className = 'dropdown-menu dropdown-menu-end';

      const editItem = document.createElement('li');
      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'dropdown-item txn-edit';
      editBtn.setAttribute('data-txn-id', txn.id);
      const editIcon = document.createElement('i');
      editIcon.className = 'bi bi-pencil-square me-2';
      editBtn.appendChild(editIcon);
      editBtn.appendChild(document.createTextNode(' Edit'));
      editItem.appendChild(editBtn);

      const deleteItem = document.createElement('li');
      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'dropdown-item text-danger txn-delete';
      deleteBtn.setAttribute('data-txn-id', txn.id);
      const deleteIcon = document.createElement('i');
      deleteIcon.className = 'bi bi-trash me-2';
      deleteBtn.appendChild(deleteIcon);
      deleteBtn.appendChild(document.createTextNode(' Delete'));
      deleteItem.appendChild(deleteBtn);

      menu.appendChild(editItem);
      menu.appendChild(deleteItem);

      dropdown.appendChild(toggleBtn);
      dropdown.appendChild(menu);
      actionCell.appendChild(dropdown);

      tr.appendChild(checkboxCell);
      tr.appendChild(idCell);
      tr.appendChild(fileCell);
      tr.appendChild(amountCell);
      tr.appendChild(dateCell);
      tr.appendChild(statusCell);
      tr.appendChild(approvedCell);
      tr.appendChild(pendingCell);
      tr.appendChild(actionCell);

      tableBody.appendChild(tr);
    });

    // Update summary and pagination controls
    paginationSummary.textContent = `Page ${currentPage} of ${totalPages}`;

    paginationNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const span = document.createElement('span');
      span.className = 'page-number' + (i === currentPage ? ' active' : '');
      span.textContent = i;
      span.addEventListener('click', function() {
        if (currentPage !== i) {
          currentPage = i;
          renderTable();
        }
      });
      paginationNumbers.appendChild(span);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Re-bind edit/delete actions
    bindRowActions();
  }

  function bindRowActions() {
    const editButtons = tableBody.querySelectorAll('.txn-edit');
    const deleteButtons = tableBody.querySelectorAll('.txn-delete');

    editButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const id = this.getAttribute('data-txn-id');
        const txn = transactionsData.find(t => t.id === id);
        if (!txn) return;

        const newFile = window.prompt('Edit FILE NAME:', txn.file);
        if (newFile !== null && newFile.trim() !== '') {
          txn.file = newFile.trim();
        }

        const newAmount = window.prompt('Edit TXN AMOUNT:', txn.amount);
        if (newAmount !== null && newAmount.trim() !== '') {
          txn.amount = newAmount.trim();
        }

        applySearch();
      });
    });

    deleteButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const id = this.getAttribute('data-txn-id');
        const confirmed = window.confirm(`Are you sure you want to delete transaction ${id}?`);
        if (!confirmed) return;

        const idx = transactionsData.findIndex(t => t.id === id);
        if (idx !== -1) {
          transactionsData.splice(idx, 1);
        }
        applySearch();
      });
    });
  }

  function applySearch() {
    const term = searchInput.value.trim().toLowerCase();
    if (!term) {
      filteredData = transactionsData.slice();
    } else {
      filteredData = transactionsData.filter(txn => {
        return (
          txn.id.toLowerCase().includes(term) ||
          txn.file.toLowerCase().includes(term) ||
          txn.amount.toLowerCase().includes(term) ||
          txn.date.toLowerCase().includes(term) ||
          txn.status.toLowerCase().includes(term) ||
          txn.approvedBy.toLowerCase().includes(term) ||
          txn.pendingBy.toLowerCase().includes(term)
        );
      });
    }
    currentPage = 1;
    renderTable();
  }

  // Search input
  searchInput.addEventListener('input', function() {
    applySearch();
  });

  // Rows per page select
  rowsPerPageSelect.addEventListener('change', function() {
    const value = parseInt(this.value, 10);
    rowsPerPage = isNaN(value) ? 10 : value;
    currentPage = 1;
    renderTable();
  });

  // Prev / Next buttons
  prevBtn.addEventListener('click', function() {
    if (currentPage > 1) {
      currentPage -= 1;
      renderTable();
    }
  });

  nextBtn.addEventListener('click', function() {
    const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
    if (currentPage < totalPages) {
      currentPage += 1;
      renderTable();
    }
  });

  // Master checkbox (select all on current page)
  if (masterCheckbox) {
    masterCheckbox.addEventListener('change', function() {
      const pageCheckboxes = tableBody.querySelectorAll('input[type="checkbox"]');
      pageCheckboxes.forEach(cb => {
        cb.checked = masterCheckbox.checked;
      });
    });
  }

  // Export current filtered data to XLS (as TSV so Excel opens it)
  if (exportBtn) {
    exportBtn.addEventListener('click', function() {
      if (!filteredData.length) {
        window.alert('No transactions to export.');
        return;
      }

      const header = ['TXN ID', 'FILE NAME', 'TXN AMOUNT', 'TXN DATE', 'TXN STATUS', 'APPROVED BY', 'PENDING BY'];
      const lines = [header.join('\t')];

      filteredData.forEach(txn => {
        lines.push([
          txn.id,
          txn.file,
          txn.amount,
          txn.date,
          txn.status,
          txn.approvedBy,
          txn.pendingBy
        ].join('\t'));
      });

      const blob = new Blob([lines.join('\n')], {
        type: 'application/vnd.ms-excel'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.xls';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Initial render
  renderTable();
})();

// Mobile Sidebar Toggle
(function() {
  const hamburgerBtn = document.querySelector('.btn-hamburger');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  
  if (hamburgerBtn && sidebar && overlay) {
    hamburgerBtn.addEventListener('click', function() {
      sidebar.classList.toggle('show');
      overlay.classList.toggle('show');

      // In mobile view, always keep sidebar in expanded mode when visible
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isMobile) {
        if (sidebar.classList.contains('show')) {
          sidebar.classList.add('sidebar-expanded');
        } else {
          sidebar.classList.remove('sidebar-expanded');
        }
      }
    });
    
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('show');
      sidebar.classList.remove('sidebar-expanded');
      overlay.classList.remove('show');
    });
  }

  // Sidebar expand on hover (desktop) / click (mobile)
  if (sidebar) {
    const mq = window.matchMedia('(min-width: 769px)');

    function isDesktop() {
      return mq.matches;
    }

    // Function to auto-open active nav-item's submenu
    function openActiveSubmenu() {
      const activeNavItem = sidebar.querySelector('.nav-item.active.nav-has-children');
      if (activeNavItem) {
        const subId = activeNavItem.getAttribute('data-subnav-id');
        if (subId) {
          const subNav = document.getElementById(subId);
          if (subNav) {
            activeNavItem.classList.add('nav-open');
            subNav.classList.add('subnav-open');
          }
        }
      }
    }

    // Desktop: Expand on hover
    sidebar.addEventListener('mouseenter', function() {
      if (!isDesktop()) return;
      sidebar.classList.add('sidebar-expanded');
      // Auto-open active submenu
      setTimeout(openActiveSubmenu, 100);
    });

    sidebar.addEventListener('mouseleave', function() {
      if (!isDesktop()) return;
      sidebar.classList.remove('sidebar-expanded');

      // Close all subnavs when collapsing
      sidebar.querySelectorAll('.nav-item.nav-open').forEach(item => {
        item.classList.remove('nav-open');
      });
      sidebar.querySelectorAll('.sidebar-subnav.subnav-open').forEach(sub => {
        sub.classList.remove('subnav-open');
      });
    });

    // Mobile: no hover-based or click-to-expand behavior;
    // sidebar is always opened in expanded state when visible (handled above).

    // Sub-nav toggle buttons
    sidebar.addEventListener('click', function(event) {
      const btn = event.target.closest('.nav-expand-btn');
      if (!btn) return;
      event.preventDefault();
      event.stopPropagation();

      const navItem = btn.closest('.nav-item');
      const subId = navItem ? navItem.getAttribute('data-subnav-id') : null;
      if (!subId) return;

      const subNav = document.getElementById(subId);
      if (!subNav) return;

      // On mobile, also expand sidebar if not already expanded
      if (!isDesktop() && sidebar.classList.contains('show')) {
        sidebar.classList.add('sidebar-expanded');
      }

      const isOpen = navItem.classList.contains('nav-open');
      if (isOpen) {
        navItem.classList.remove('nav-open');
        subNav.classList.remove('subnav-open');
      } else {
        navItem.classList.add('nav-open');
        subNav.classList.add('subnav-open');
      }
    });
  }
})();

