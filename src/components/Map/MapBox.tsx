"use client"
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
interface MapboxMapProps {
  wrapperClassName?: string;
  mapClassName?: string;
  initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;
  onMapLoaded?(map: mapboxgl.Map): void;
  onMapRemoved?(): void;
  latlng: number[];

}

function MapboxMap({
  initialOptions = {},
  onMapLoaded,
  latlng,
  wrapperClassName,
  onMapRemoved,
}: MapboxMapProps) {
  const [map, setMap] = React.useState<mapboxgl.Map>();
  const [isAtStart, setIsAtStart] = useState(true);
  console.log("LATLNG ",latlng)
  const mapNode = React.useRef(null);

  React.useEffect(() => {
    const node = mapNode.current;
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      center: [0,0],
      zoom: 1,
      interactive: false,
      style:"mapbox://styles/cbizy/clqqynrao00lz01qxgk7t66rs"
    
      
    });

    
    
    // save the map object to React.useState
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);


  useEffect(() => {
    // Call flyToLocation when the map is set (i.e., not null)
    if (map) {
      
        flyToLocation();
        
    }
}, [map]); // Dependency array includes 'map'

const flyToLocation = () => {


    const end = {
        center: {lng:latlng[0],lat:latlng[1]} as LngLatLike,
        zoom: 16.5,
        bearing: 130,
        pitch: 45
    };

    if (map) {

        map.flyTo({
            // flyTo options
            ...end,
            duration: 10000,
            essential: true
        }).on("moveend", () => {
          if(isAtStart){
            const marker1 = new mapboxgl.Marker()
            .setLngLat([-75.706471, 45.356071])
            .addTo(map);
            map.scrollZoom.enable();
            map.dragPan.enable();
            map.dragRotate.enable();
            map.touchZoomRotate.enable();
            map.touchPitch.enable();
          }
          // console.log("moveend");
        });

    setIsAtStart(!isAtStart);
    // map["scrollZoom"].enable();

      }
    };

    

  return (
    <div className={wrapperClassName}>
      {/* <link
        href="https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css"
        rel="stylesheet"
      /> */}
      <script>
        map.setConfigProperty('basemap', 'lightPreset', 'dusk')
      </script>
      <div ref={mapNode} className={wrapperClassName} />
    </div>
  );
}

export default MapboxMap;
