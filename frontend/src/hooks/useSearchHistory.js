import { useState, useEffect } from 'react';

const MAX_HISTORY_ITEMS = 10;

export const useSearchHistory = (key = 'searchHistory') => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, [key]);

  const addToHistory = (query) => {
    if (!query || query.trim() === '') return;

    const newHistory = [
      query,
      ...history.filter(item => item !== query)
    ].slice(0, MAX_HISTORY_ITEMS);

    setHistory(newHistory);
    localStorage.setItem(key, JSON.stringify(newHistory));
  };

  const removeFromHistory = (query) => {
    const newHistory = history.filter(item => item !== query);
    setHistory(newHistory);
    localStorage.setItem(key, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(key);
  };

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory
  };
};
