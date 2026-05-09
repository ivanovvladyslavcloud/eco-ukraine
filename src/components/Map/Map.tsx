"use client";

import { useLatestMeasurements } from "@/hooks/useLatestMeasurements";
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from "react-leaflet";
import { MonitoringStation } from "@/types/station";
import { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { track } from "@/lib/analytics"
import { useMapEvents } from "react-leaflet"
import { useRef } from "react"
import "leaflet/dist/leaflet.css";

interface Props {
  stations: MonitoringStation[];
  selectedStationId?: string;
  onSelectStation?: (id: string | null) => void;
}

function getColor(pm25: number) {
  if (pm25 <= 15) return "green";
  if (pm25 <= 35) return "orange";
  return "red";
}

function Recenter({ latLng }: { latLng: LatLngTuple }) {
  const map = useMap();
  useEffect(() => {
    map.setView(latLng, map.getZoom());
  }, [latLng, map]);
  return null;
}


function MapAnalytics() {
  const lastZoom = useRef<number | null>(null);

  useMapEvents({
    zoomend: (e) => {
      const zoom = e.target.getZoom();

      if (lastZoom.current === zoom) return;
      lastZoom.current = zoom;

      track("map_zoom_changed", {
        zoom,
      });
    },
  });

  return null;
}


export default function Map({ stations, selectedStationId, onSelectStation }: Props) {
  const center: LatLngTuple = [49.8397, 24.0297];

  const { data: latestData = {} } = useLatestMeasurements();

  return (
    <div>
      {selectedStationId && (
        <button
          className="mb-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onSelectStation?.(null)}
        >
          Reset
        </button>
      )}

      <MapContainer
        center={center}
        zoom={7}
        scrollWheelZoom
        style={{ height: "600px", width: "100%" }}
      >
        <MapAnalytics />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

              {stations.length > 0 &&
        stations.map((station) => {
          if (!station.location?.lat || !station.location?.lng) return null;
          const isSelected = station.id === selectedStationId;
          const measurement = latestData[station.id];
          const color = measurement ? getColor(measurement.pm25) : "gray";
          return (
            <CircleMarker
              key={station.id}
              center={[station.location.lat, station.location.lng]}
              radius={8}
              pathOptions={{ color: isSelected ? "red" : color, fillColor: isSelected ? "red" : color, fillOpacity: 0.7, }}
              eventHandlers={{
                click: () => {
                  onSelectStation?.(station.id);

                  track("map_station_selected", {
                    stationId: station.id,
                    stationName: station.name,
                    type: station.type,
                    hasData: !!measurement,
                    pm25: measurement?.pm25 ?? null,
                  });
                },
              }}
            >
              <Popup> <div> <h3 className="font-bold">{station.name}</h3> 
              <p>Type: {station.type}</p> 
              {measurement ? ( <> <p>PM2.5: {measurement.pm25}</p> <p>PM10: {measurement.pm10}</p> 
              <p>NO2: {measurement.no2}</p> <p>SO2: {measurement.so2}</p> <p>CO: {measurement.co}</p>
              <p>O3: {measurement.o3}</p> </> ) : ( <p>No recent data</p> )} </div> </Popup>
            </CircleMarker>
          );
        })
      }

        {selectedStationId && (
          <Recenter
            latLng={[
              stations.find((s) => s.id === selectedStationId)?.location.lat || center[0],
              stations.find((s) => s.id === selectedStationId)?.location.lng || center[1],
            ]}
          />
        )}
      </MapContainer>
    </div>
  );
}