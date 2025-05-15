// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "node_modules/leaflet-geosearch/dist/geosearch.css";
// import { useFormContext } from "react-hook-form";
//
// const CustomMapStyles = () => {
//     useEffect(() => {
//         const styleElement = document.createElement('style');
//         styleElement.type = 'text/css';
//         styleElement.innerHTML = `
//       /* Override geosearch input styles */
//       .leaflet-control-geosearch form input.glass {
//         font-family: 'sans', 'yekan', 'Inter var', 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
//         font-size: 14px !important;
//         padding: 8px 12px !important;
//         height: 40px !important;
//         border-radius: 4px !important;
//         box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
//         width: 100% !important;
//         max-width: 300px !important;
//         transition: all 0.2s ease-in-out;
//       }
//
//       /* Focused state */
//       .leaflet-control-geosearch form input.glass:focus {
//         box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15) !important;
//         border-color: #3f51b5 !important;
//       }
//
//       /* Results list styling */
//       .leaflet-control-geosearch form .results {
//         font-family: 'sans', 'yekan', 'Inter var', 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
//         margin-top: 5px !important;
//         border-radius: 4px !important;
//         box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2) !important;
//       }
//
//       .leaflet-control-geosearch form .results > * {
//         padding: 8px 12px !important;
//         font-size: 13px !important;
//         line-height: 1.4 !important;
//         transition: background-color 0.2s;
//       }
//
//       .leaflet-control-geosearch form .results > *:hover {
//         background-color: #f0f0f0 !important;
//       }
//
//       /* Reset button styling */
//       .leaflet-control-geosearch form a.reset {
//         right: 8px !important;
//         top: 10px !important;
//         height: 18px !important;
//         width: 18px !important;
//         line-height: 18px !important;
//       }
//
//       /* Container sizing */
//       .leaflet-control-geosearch {
//         width: 100% !important;
//         max-width: 300px !important;
//         margin-top: 8px !important;
//         margin-left: 8px !important;
//       }
//
//       /* Custom popup styling */
//       .leaflet-popup-content {
//         font-family: 'sans', 'yekan', 'Inter var', 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
//         font-size: 13px !important;
//         line-height: 1.5 !important;
//         margin: 10px 14px !important;
//         text-align: center;
//       }
//     `;
//
//         document.head.appendChild(styleElement);
//
//         return () => {
//             document.head.removeChild(styleElement);
//         };
//     }, []);
//
//     return null;
// };
//
// function MapClickHandler({ onMapClick }) {
//     const map = useMap();
//
//     useEffect(() => {
//         const handleClick = (e) => {
//             if (onMapClick) onMapClick(e);
//         };
//
//         map.on('click', handleClick);
//
//         return () => {
//             map.off('click', handleClick);
//         };
//     }, [map, onMapClick]);
//
//     return null;
// }
//
// function SearchBar({ onLocationSelect, setPosition }) {
//     const map = useMap();
//
//     useEffect(() => {
//         const provider = new OpenStreetMapProvider();
//
//         const searchControl = new GeoSearchControl({
//             provider,
//             style: "bar",
//             autoComplete: true,
//             searchLabel: "آدرس مورد نظر خود را وارد کنید",
//             showMarker: false,
//             showPopup: false,
//             marker: {
//                 draggable: false,
//             },
//             popupFormat: ({ result }) => result.label,
//             maxMarkers: 1,
//             retainZoomLevel: false,
//         });
//
//         map.addControl(searchControl);
//
//         const handleSearchResult = (event) => {
//             try {
//                 const { x, y, label } = event.location;
//
//                 const lat = event.location.lat !== undefined ? event.location.lat : y;
//                 const lng = event.location.lng !== undefined ? event.location.lng : x;
//
//                 if (lat !== undefined && lng !== undefined) {
//                     setPosition([lat, lng]);
//
//                     map.setView([lat, lng], 13);
//
//                     if (onLocationSelect) {
//                         onLocationSelect({
//                             latitude: lat,
//                             longitude: lng,
//                             commonName: label || "",
//                             fullAddress: label || ""
//                         });
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error handling search result:", error);
//             }
//         };
//
//         map.on("geosearch/showlocation", handleSearchResult);
//
//         return () => {
//             map.off("geosearch/showlocation", handleSearchResult);
//             map.removeControl(searchControl);
//         };
//     }, [map, onLocationSelect, setPosition]);
//
//     return null;
// }
//
// function MiniMap({ className = "" }) {
//     const { setValue, watch } = useFormContext();
//     const [position, setPosition] = useState([35.6892523, 51.3896004]); // Default position (Tehran)
//
//     const latitude = watch("latitude");
//     const longitude = watch("longitude");
//
//     useEffect(() => {
//         if (latitude && longitude) {
//             setPosition([parseFloat(latitude), parseFloat(longitude)]);
//         }
//     }, [latitude, longitude]);
//
//     const handleMapClick = (e) => {
//         const { lat, lng } = e.latlng;
//         setPosition([lat, lng]);
//
//         setValue("latitude", lat);
//         setValue("longitude", lng);
//     };
//
//     const handleLocationSelect = (locationData) => {
//         if (locationData) {
//             if (locationData.latitude !== undefined && locationData.latitude !== null) {
//                 setValue("latitude", locationData.latitude);
//             }
//
//             if (locationData.longitude !== undefined && locationData.longitude !== null) {
//                 setValue("longitude", locationData.longitude);
//             }
//
//             setValue("commonName", locationData.commonName || "");
//             setValue("fullAddress", locationData.fullAddress || "");
//         }
//     };
//
//     return (
//         <div className={`rounded-lg overflow-hidden shadow-md border border-gray-200 ${className}`}>
//             <MapContainer
//                 center={position}
//                 zoom={13}
//                 style={{ height: "250px", width: "100%" }}
//                 attributionControl={false}
//             >
//                 <CustomMapStyles />
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <Marker position={position}>
//                     <Popup>
//                         موقعیت انتخاب شده: <br />
//                         عرض جغرافیایی: {position[0].toFixed(6)}, طول جغرافیایی: {position[1].toFixed(6)}
//                     </Popup>
//                 </Marker>
//                 <SearchBar onLocationSelect={handleLocationSelect} setPosition={setPosition} />
//                 <MapClickHandler onMapClick={handleMapClick} />
//             </MapContainer>
//         </div>
//     );
// }
//
// export default MiniMap;

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "node_modules/leaflet-geosearch/dist/geosearch.css";
import { useFormContext } from "react-hook-form";
import L from "leaflet";

// Fix Leaflet marker icon issue in Next.js
const DefaultIcon = L.icon({
    iconUrl: "/images/marker-icon.png",
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const CustomMapStyles = () => {
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.innerHTML = `
      /* Override geosearch input styles */
      .leaflet-control-geosearch form input.glass {
        font-family: 'sans', 'yekan', 'Inter var', 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
        font-size: 14px !important;
        padding: 8px 32px 8px 12px !important;
        height: 40px !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        width: 100% !important;
        max-width: 300px !important;
        transition: all 0.2s ease-in-out;
        border: 2px solid rgba(0, 0, 0, 0.1) !important;
      }
      
      /* Focused state */
      .leaflet-control-geosearch form input.glass:focus {
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15) !important;
        border-color: #3f51b5 !important;
        outline: none !important;
      }
      
      /* Results list styling */
      .leaflet-control-geosearch form .results {
        font-family: 'sans', 'yekan', 'Inter var', 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
        margin-top: 5px !important;
        border-radius: 8px !important;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2) !important;
        overflow: hidden !important;
      }
      
      .leaflet-control-geosearch form .results > * {
        padding: 10px 12px !important;
        font-size: 14px !important;
        line-height: 1.4 !important;
        transition: background-color 0.2s;
        cursor: pointer !important;
      }
      
      .leaflet-control-geosearch form .results > *:hover {
        background-color: #f0f0f0 !important;
      }
      
      /* Reset button styling */
      .leaflet-control-geosearch form a.reset {
        right: 8px !important;
        top: 10px !important;
        height: 20px !important;
        width: 20px !important;
        line-height: 20px !important;
        font-size: 18px !important;
        color: #666 !important;
      }
      
      /* Container sizing */
      .leaflet-control-geosearch {
        width: 100% !important;
        max-width: 300px !important;
        margin-top: 8px !important;
        margin-left: 8px !important;
        z-index: 1000 !important;
      }

      /* Custom popup styling */
      .leaflet-popup-content {
        font-family: 'sans', 'yekan', 'Inter var', 'Roboto', 'Helvetica', 'Arial', 'sans-serif';
        font-size: 13px !important;
        line-height: 1.5 !important;
        margin: 10px 14px !important;
        text-align: center;
      }
      
      .leaflet-popup-content-wrapper {
        border-radius: 8px !important;
      }
      
      /* Improve map attribution styling */
      .leaflet-control-attribution {
        font-size: 10px !important;
        background-color: rgba(255, 255, 255, 0.7) !important;
        padding: 2px 5px !important;
        border-radius: 3px !important;
      }
    `;

        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return null;
};

function MapClickHandler({ onMapClick }) {
    const map = useMap();

    useEffect(() => {
        const handleClick = (e) => {
            if (onMapClick) onMapClick(e);
        };

        map.on('click', handleClick);

        return () => {
            map.off('click', handleClick);
        };
    }, [map, onMapClick]);

    return null;
}

function SearchBar({ onLocationSelect, setPosition }) {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

        const searchControl = new GeoSearchControl({
            provider,
            style: "bar",
            autoComplete: true,
            searchLabel: "آدرس مورد نظر خود را وارد کنید",
            showMarker: false,
            showPopup: false,
            marker: {
                draggable: false,
            },
            popupFormat: ({ result }) => result.label,
            maxMarkers: 1,
            retainZoomLevel: false,
            autoClose: true,
        });

        map.addControl(searchControl);

        const handleSearchResult = (event) => {
            try {
                const { x, y, label } = event.location;

                const lat = event.location.lat !== undefined ? event.location.lat : y;
                const lng = event.location.lng !== undefined ? event.location.lng : x;

                if (lat !== undefined && lng !== undefined) {
                    setPosition([lat, lng]);

                    map.setView([lat, lng], 15);

                    if (onLocationSelect) {
                        onLocationSelect({
                            latitude: lat,
                            longitude: lng,
                            commonName: label || "",
                            fullAddress: label || ""
                        });
                    }
                }
            } catch (error) {
                console.error("Error handling search result:", error);
            }
        };

        map.on("geosearch/showlocation", handleSearchResult);

        return () => {
            map.off("geosearch/showlocation", handleSearchResult);
            map.removeControl(searchControl);
        };
    }, [map, onLocationSelect, setPosition]);

    return null;
}

function MiniMap({ className = "", locationPrefix = "", setAddress }) {
    const { setValue, watch } = useFormContext();
    const [position, setPosition] = useState([35.6892523, 51.3896004]); // Default position (Tehran)

    const latitudeField = `${locationPrefix}Latitude`;
    const longitudeField = `${locationPrefix}Longitude`;

    const latitude = watch(latitudeField);
    const longitude = watch(longitudeField);

    useEffect(() => {
        if (latitude && longitude) {
            setPosition([parseFloat(latitude), parseFloat(longitude)]);
        }
    }, [latitude, longitude]);

    const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);

        // Set the coordinates in the form
        setValue(latitudeField, lat);
        setValue(longitudeField, lng);

        // Try to reverse geocode to get address (for demonstration)
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const data = await response.json();

            if (data.display_name && setAddress) {
                setAddress(data.display_name);
            }
        } catch (error) {
            console.error("Error reverse geocoding:", error);
        }
    };

    const handleLocationSelect = (locationData) => {
        if (locationData) {
            if (locationData.latitude !== undefined && locationData.latitude !== null) {
                setValue(latitudeField, locationData.latitude);
            }

            if (locationData.longitude !== undefined && locationData.longitude !== null) {
                setValue(longitudeField, locationData.longitude);
            }

            // Set address information if available
            if (locationData.fullAddress && setAddress) {
                setAddress(locationData.fullAddress);
            }
        }
    };

    return (
        <div className={`rounded-lg overflow-hidden shadow-md border border-gray-200 ${className}`}>
            <MapContainer
                center={position}
                zoom={14}
                style={{ height: "100%", minHeight: "350px", width: "100%" }}
                attributionControl={true}
                className="z-0"
            >
                <CustomMapStyles />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <Marker position={position}>
                    <Popup>
                        موقعیت انتخاب شده <br />
                        عرض: {position[0].toFixed(6)}<br/>
                        طول: {position[1].toFixed(6)}
                    </Popup>
                </Marker>
                <SearchBar onLocationSelect={handleLocationSelect} setPosition={setPosition} />
                <MapClickHandler onMapClick={handleMapClick} />
            </MapContainer>
        </div>
    );
}

export default MiniMap;