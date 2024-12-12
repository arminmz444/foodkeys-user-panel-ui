import React, {useState} from 'react';
import {MapContainer, TileLayer, Marker, useMapEvents, Popup} from 'react-leaflet';
import L from 'leaflet';

interface MapSelectorProps {
    onLocationSelect: (coords: { lat: number; lng: number }) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({onLocationSelect}) => {
    const [markerPosition, setMarkerPosition] = useState<{ lat: number; lng: number } | null>({lat: 32.4279, lng: 53.6880});

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                const {lat, lng} = e.latlng;
                setMarkerPosition({lat, lng});
                onLocationSelect({lat, lng});
            },
        });
        return null;
    };

    return (
        <MapContainer
            center={[32.4279, 53.6880]}
            zoom={5}
            style={{height: '500px', width: '100%'}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapClickHandler/>
            {markerPosition && <Marker position={[markerPosition.lat, markerPosition.lng]}>
                <Popup>
                    A pretty CSS3 popup. <br/> Easily customizable.
                </Popup>
            </Marker>}
        </MapContainer>
    );
};

export default MapSelector;
