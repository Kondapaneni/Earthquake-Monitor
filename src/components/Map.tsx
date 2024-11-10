import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import { format } from 'date-fns';
import { AlertTriangle, Clock, Ruler } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import type { Earthquake, EarthquakeFeature } from '../types';

export default function Map() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await fetch(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );
        const data: EarthquakeFeature = await response.json();
        setEarthquakes(
          data.features.map((feature) => ({
            id: feature.id,
            properties: feature.properties,
            geometry: feature.geometry,
          }))
        );
      } catch (err) {
        setError('Failed to fetch earthquake data');
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 300000);
    return () => clearInterval(interval);
  }, []);

  const getMarkerColor = (magnitude: number) => {
    if (magnitude >= 6) return '#dc2626';
    if (magnitude >= 4) return '#ea580c';
    if (magnitude >= 2) return '#ca8a04';
    return '#16a34a';
  };

  const getMarkerStyle = (magnitude: number) => ({
    radius: Math.max(magnitude * 3, 5),
    fillColor: getMarkerColor(magnitude),
    color: 'white',
    weight: 1.5,
    opacity: 1,
    fillOpacity: 0.8,
  });

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center scale-in">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading earthquake data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 rounded-lg scale-in">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Data Error</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="h-full w-full"
      minZoom={2}
      zoomControl={false}
      worldCopyJump={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        maxZoom={20}
      />
      <ZoomControl position="bottomleft" />
      {earthquakes.map((earthquake) => (
        <CircleMarker
          key={earthquake.id}
          center={[
            earthquake.geometry.coordinates[1],
            earthquake.geometry.coordinates[0],
          ]}
          {...getMarkerStyle(earthquake.properties.mag)}
          className={earthquake.properties.mag >= 6 ? 'marker-pulse' : ''}
        >
          <Popup className="earthquake-popup">
            <div className="p-3 scale-in">
              <h3 className="font-bold text-lg mb-3 text-gray-900">
                {earthquake.properties.title}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shadow-sm"
                       style={{ backgroundColor: getMarkerColor(earthquake.properties.mag) }}>
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  <span className="font-semibold">Magnitude:</span>
                  <span>{earthquake.properties.mag.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Ruler className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Depth:</span>
                  <span>{earthquake.geometry.coordinates[2].toFixed(1)} km</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Time:</span>
                  <span>
                    {format(new Date(earthquake.properties.time), 'MMM d, yyyy HH:mm:ss')}
                  </span>
                </div>
              </div>
              {earthquake.properties.tsunami === 1 && (
                <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-2 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <p className="text-red-700 text-sm font-semibold">
                    Tsunami Warning Active
                  </p>
                </div>
              )}
              <a
                href={earthquake.properties.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-sm inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                View detailed report →
              </a>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}