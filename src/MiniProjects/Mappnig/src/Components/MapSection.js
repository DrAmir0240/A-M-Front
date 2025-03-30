import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery, gql } from "@apollo/client";

// آیکون‌های امتحانی
const tollIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3063/3063178.png", // عوارضی
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const lightVehicleIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/744/744465.png", // ماشین سبک
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

const heavyVehicleIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/920/920354.png", // ماشین سنگین
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});

// تعریف کوئری GraphQL
const GET_DATA = gql`
    query MyQuery {
        allTollStations {
            name
            location
        }
        allLightVehicles {
            plate
            ownerName
            location
        }
        allHeavyVehicles {
            plate
            ownerName
            location
        }
    }
`;

// تابع برای پارس کردن لوکیشن
const parseLocation = (location) => {
    return [location.y, location.x]; // [lat, lng] برای Leaflet
};

const MapSection = () => {
    // استفاده از useQuery برای گرفتن دیتا
    const { loading, error, data } = useQuery(GET_DATA);

    // مدیریت state برای دیتا
    const tollStations = data?.allTollStations || [];
    const lightVehicles = data?.allLightVehicles || [];
    const heavyVehicles = data?.allHeavyVehicles || [];

    const center = [35.6892, 51.3890]; // مختصات تهران

    // نمایش لودینگ یا خطا
    if (loading) return <p>در حال بارگذاری...</p>;
    if (error) return <p>خطا: {error.message}</p>;

    return (
        <MapContainer center={center} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {/* مارکرهای عوارضی */}
            {tollStations.map((station, index) => (
                <Marker
                    key={`toll-${index}`}
                    position={parseLocation(station.location)}
                    icon={tollIcon}
                >
                    <Popup>{station.name}</Popup>
                </Marker>
            ))}
            {/* مارکرهای ماشین‌های سبک */}
            {lightVehicles.map((vehicle, index) => (
                <Marker
                    key={`light-${index}`}
                    position={parseLocation(vehicle.location)}
                    icon={lightVehicleIcon}
                >
                    <Popup>
                        پلاک: {vehicle.plate} <br />
                        صاحب: {vehicle.ownerName}
                    </Popup>
                </Marker>
            ))}
            {/* مارکرهای ماشین‌های سنگین */}
            {heavyVehicles.map((vehicle, index) => (
                <Marker
                    key={`heavy-${index}`}
                    position={parseLocation(vehicle.location)}
                    icon={heavyVehicleIcon}
                >
                    <Popup>
                        پلاک: {vehicle.plate} <br />
                        صاحب: {vehicle.ownerName}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapSection;