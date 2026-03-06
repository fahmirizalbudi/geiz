document.addEventListener('DOMContentLoaded', () => {
  // Dropdown Toggles
  const dropdownToggles = document.querySelectorAll('[data-dropdown-toggle]');
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = toggle.getAttribute('data-dropdown-toggle');
      const target = document.getElementById(targetId);
      if (target) {
        const isVisible = target.classList.contains('opacity-100');
        if (isVisible) {
          target.classList.remove('opacity-100', 'visible', 'translate-y-0');
          target.classList.add('opacity-0', 'invisible', 'translate-y-2');
        } else {
          target.classList.remove('opacity-0', 'invisible', 'translate-y-2');
          target.classList.add('opacity-100', 'visible', 'translate-y-0');
        }
      }
    });
  });

  // Close Dropdowns on Click Outside
  document.addEventListener('click', () => {
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('opacity-100', 'visible', 'translate-y-0');
      dropdown.classList.add('opacity-0', 'invisible', 'translate-y-2');
    });
  });

  // Modal Open
  const modalToggles = document.querySelectorAll('[data-modal-target]');
  modalToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = toggle.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (modal) {
        modal.classList.remove('modal-hidden');
        modal.classList.add('modal-visible');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Modal Close
  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-closing');
    setTimeout(() => {
      modal.classList.remove('modal-closing');
      modal.classList.add('modal-hidden');
      document.body.style.overflow = '';
    }, 250);
  }

  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      const modal = closeBtn.closest('.modal');
      closeModal(modal);
      return;
    }
    if (e.target.classList.contains('modal')) {
      closeModal(e.target);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal.modal-visible');
      closeModal(openModal);
    }
  });

  // Sheet Toggles
  const sheetToggles = document.querySelectorAll('[data-sheet-target]');
  sheetToggles.forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = toggle.getAttribute('data-sheet-target');
      const sheet = document.getElementById(targetId);
      if (sheet) {
        // Show sheet container
        sheet.classList.remove('hidden');

        // Animate background
        const bg = sheet.querySelector('[data-sheet-close]');
        if (bg) {
          setTimeout(() => {
            bg.classList.remove('opacity-0');
            bg.classList.add('opacity-100');
          }, 10);
        }

        // Animate content
        const content =
          sheet.querySelector('#chatSheetContent') || sheet.querySelector('.bg-white.shadow-2xl');
        if (content) {
          setTimeout(() => {
            content.classList.remove('translate-x-full');
            content.classList.add('translate-x-0');
          }, 10);
        }
      }
    });
  });

  // Sheet Close
  const sheetCloseButtons = document.querySelectorAll('[data-sheet-close]');
  sheetCloseButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const sheet = btn.closest('.fixed.inset-0.z-\\[100\\]');
      if (sheet) {
        // Animate content out
        const content =
          sheet.querySelector('#chatSheetContent') || sheet.querySelector('.bg-white.shadow-2xl');
        if (content) {
          content.classList.remove('translate-x-0');
          content.classList.add('translate-x-full');
        }

        // Hide container after animation
        setTimeout(() => {
          sheet.classList.add('hidden');
        }, 300);
      }
    });
  });

  // Sidebar Toggle (Mobile & Desktop)
  const mobileMenuToggles = document.querySelectorAll('.mobile-menu-toggle');
  const sidebar = document.querySelector('aside');
  const sidebarTexts = sidebar ? sidebar.querySelectorAll('.sidebar-text') : [];

  // Create mobile backdrop once
  const backdrop = document.createElement('div');
  backdrop.id = 'sidebarBackdrop';
  backdrop.className = 'fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none';
  document.body.appendChild(backdrop);

  function openMobileSidebar() {
    sidebar.classList.add('translate-x-0');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileSidebar() {
    sidebar.classList.remove('translate-x-0');
    backdrop.classList.remove('opacity-100', 'pointer-events-auto');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  backdrop.addEventListener('click', closeMobileSidebar);

  // Close on nav link click (mobile)
  if (sidebar) {
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) closeMobileSidebar();
      });
    });
  }

  mobileMenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      if (!sidebar) return;
      if (window.innerWidth >= 768) {
        // Desktop: collapse to icon-only
        sidebar.classList.toggle('w-80');
        sidebar.classList.toggle('w-20');
        sidebarTexts.forEach(text => {
          text.classList.toggle('opacity-0');
          text.classList.toggle('w-0');
        });
      } else {
        // Mobile: overlay drawer
        const isOpen = sidebar.classList.contains('translate-x-0');
        if (isOpen) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      }
    });
  });

  // Handle resize — clean up mobile state if resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      if (sidebar) sidebar.classList.remove('translate-x-0'); // critical bugfix: clear mobile open state
      backdrop.classList.remove('opacity-100', 'pointer-events-auto');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  });

  // Theme Toggle Dark Mode
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  
  // Set initial theme
  if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', function() {
      // Toggle theme in local storage and document class
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    });
  });
});
