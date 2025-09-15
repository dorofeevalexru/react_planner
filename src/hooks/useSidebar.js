import { useCallback } from 'react';

export const useSidebar = () => {
  const initSidebar = useCallback(() => {
    // Инициализация сайдбара будет здесь
    console.log('Sidebar initialized');
  }, []);

  return { initSidebar };
};