import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl/Cmd + K - Open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]');
        if (searchInput) searchInput.focus();
      }

      // Ctrl/Cmd + N - Create new event
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        navigate('/event/create');
      }

      // Ctrl/Cmd + M - Open messages
      if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        navigate('/messages');
      }

      // Ctrl/Cmd + H - Go home
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault();
        navigate('/');
      }

      // Ctrl/Cmd + D - Go to dashboard
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.role) {
          navigate(`/dashboard/${user.role}`);
        }
      }

      // Ctrl/Cmd + / - Show shortcuts help
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        showShortcutsHelp();
      }

      // Escape - Close modals/dropdowns
      if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[data-modal]');
        modals.forEach(modal => modal.style.display = 'none');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  const showShortcutsHelp = () => {
    const shortcuts = [
      { keys: 'Ctrl/Cmd + K', action: 'Focus search' },
      { keys: 'Ctrl/Cmd + N', action: 'Create new event' },
      { keys: 'Ctrl/Cmd + M', action: 'Open messages' },
      { keys: 'Ctrl/Cmd + H', action: 'Go to home' },
      { keys: 'Ctrl/Cmd + D', action: 'Go to dashboard' },
      { keys: 'Ctrl/Cmd + /', action: 'Show this help' },
      { keys: 'Escape', action: 'Close modals' }
    ];

    alert(
      'Keyboard Shortcuts:\n\n' +
      shortcuts.map(s => `${s.keys}: ${s.action}`).join('\n')
    );
  };

  return { showShortcutsHelp };
};
