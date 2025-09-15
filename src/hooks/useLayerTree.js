import { useCallback } from 'react';

export const useLayerTree = () => {
  const initLayerTree = useCallback((map) => {
    // Инициализация дерева слоев будет здесь
    console.log('Layer tree initialized with map:', map);
  }, []);

  return { initLayerTree };
};