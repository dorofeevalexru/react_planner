import { useState, useCallback, useEffect } from 'react';
import { Map, View } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Zoom, Rotate, ScaleLine } from 'ol/control';
import { Tile } from 'ol/layer';
import { OSM } from 'ol/source';

export const useMap = () => {
  const [map, setMap] = useState(null);

  const initMap = useCallback((mapElement) => {
    // Создаем базовый слой OSM
    const osmLayer = new Tile({
      source: new OSM(),
      zIndex: -1
    });
    osmLayer.set('isBaseLayer', true);

    // Создаем элементы управления с правильными классами
    const zoomControl = new Zoom({
      className: 'custom-ol-zoom'
    });
    
    const rotateControl = new Rotate({
      className: 'custom-ol-rotate'
    });
    
    const scaleLineControl = new ScaleLine({
      className: 'custom-ol-scale-line',
      target: document.getElementById('scale-line-container') // Указываем конкретный контейнер
    });

    // Создаем карту
    const mapInstance = new Map({
      target: mapElement,
      layers: [osmLayer],
      view: new View({
        center: fromLonLat([30.19, 59.95]),
        zoom: 4
      }),
      controls: [zoomControl, rotateControl, scaleLineControl]
    });

    // Добавляем обработчик для обновления размера при изменении размера окна
    const handleResize = () => {
      mapInstance.updateSize();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Очистка при размонтировании
    mapInstance.on('unmount', () => {
      window.removeEventListener('resize', handleResize);
    });

    setMap(mapInstance);
    return mapInstance;
  }, []);

  return { map, initMap };
};