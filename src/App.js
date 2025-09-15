import React, { useRef, useEffect, useState } from 'react';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';
import Map from './components/Map/Map';
import { useMap } from './hooks/useMap';
import './styles/base.css';
import './styles/header-footer.css';
import './styles/info-control.css';
import './styles/layer-tree.css';
import './styles/sidebar.css';

function App() {
  const mapRef = useRef(null);
  const { map, initMap } = useMap();
  const [layerConfig, setLayerConfig] = useState(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const mapInstance = initMap(mapRef.current);
      
      // Загрузка конфигурации слоев
      const loadLayerConfig = async () => {
        try {
          const response = await fetch(process.env.PUBLIC_URL + '/config/layers.json');
          if (response.ok) {
            const config = await response.json();
            setLayerConfig(config);
          } else {
            console.warn('Layer config not found, using fallback');
            setLayerConfig({
              name: "Fallback Config",
              nodes: []
            });
          }
        } catch (error) {
          console.error('Failed to load layer config:', error);
          setLayerConfig({
            name: "Fallback Config",
            nodes: []
          });
        }
      };

      loadLayerConfig();
    }
  }, [map, initMap]);

  return (
    <div className="app">
      <div className="main-content">
        <Sidebar map={map} layerConfig={layerConfig} />
        <Map mapRef={mapRef} />
        {/* Контейнер для scale line */}
        <div id="scale-line-container" className="scale-line-container"></div>
      </div>
      <Footer />
    </div>
  );
}

export default App;