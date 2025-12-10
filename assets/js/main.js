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

