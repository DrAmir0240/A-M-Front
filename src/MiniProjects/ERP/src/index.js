import { Route, Routes, Link, Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FiPackage, FiTruck, FiUsers } from "react-icons/fi";
import styles from './erp.module.css';

function ERP() {
    const { projectName } = useParams();
    const basePath = `/project/${projectName}`;

    const [shipments, setShipments] = useState([
        { id: 1, name: "Package A", status: "In Transit", assignedDriver: "" },
        { id: 2, name: "Package B", status: "Delivered", assignedDriver: "" },
    ]);
    const [drivers, setDrivers] = useState([
        { id: 1, name: "John Doe", vehicle: "Truck A" },
        { id: 2, name: "Jane Smith", vehicle: "Van B" },
    ]);
    const [vehicles, setVehicles] = useState([
        { id: 1, name: "Truck A", capacity: "5 Tons" },
        { id: 2, name: "Van B", capacity: "2 Tons" },
    ]);

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>Dashboard</h2>
                <nav>
                    <Link to={`${basePath}/shipments`} className={styles.navLink}>
                        <FiPackage className={styles.icon} /> Shipments
                    </Link>
                    <Link to={`${basePath}/drivers`} className={styles.navLink}>
                        <FiUsers className={styles.icon} /> Drivers
                    </Link>
                    <Link to={`${basePath}/vehicles`} className={styles.navLink}>
                        <FiTruck className={styles.icon} /> Vehicles
                    </Link>
                </nav>
            </aside>
            <div className={styles.content}>
                <Routes>
                    <Route path=":subPath" element={
                        <>
                            {window.location.pathname === `${basePath}/shipments` && <Shipments shipments={shipments} setShipments={setShipments} drivers={drivers} />}
                            {window.location.pathname === `${basePath}/drivers` && <Drivers drivers={drivers} setDrivers={setDrivers} shipments={shipments} />}
                            {window.location.pathname === `${basePath}/vehicles` && <Vehicles vehicles={vehicles} setVehicles={setVehicles} />}
                            {window.location.pathname === basePath && <Navigate to={`${basePath}/shipments`} />}
                        </>
                    } />
                </Routes>
            </div>
        </div>
    );
}

function Shipments({ shipments, setShipments, drivers }) {
    const addShipment = () => {
        const newShipment = {
            id: shipments.length + 1,
            name: `Package ${String.fromCharCode(65 + shipments.length)}`,
            status: "Pending",
            assignedDriver: "",
        };
        setShipments([...shipments, newShipment]);
    };

    const deleteShipment = (id) => {
        setShipments(shipments.filter((shipment) => shipment.id !== id));
    };

    const editShipment = (id, key, value) => {
        setShipments(shipments.map((shipment) => (shipment.id === id ? { ...shipment, [key]: value } : shipment)));
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.cardTitle}>Shipments</h2>
            <button onClick={addShipment} className={styles.button}>
                Add Shipment
            </button>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Assigned Driver</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {shipments.map((shipment) => (
                    <tr key={shipment.id}>
                        <td>
                            <input
                                type="text"
                                value={shipment.name}
                                onChange={(e) => editShipment(shipment.id, "name", e.target.value)}
                                className={styles.input}
                            />
                        </td>
                        <td>
                            <select
                                value={shipment.status}
                                onChange={(e) => editShipment(shipment.id, "status", e.target.value)}
                                className={styles.select}
                            >
                                <option>Pending</option>
                                <option>In Transit</option>
                                <option>Delivered</option>
                            </select>
                        </td>
                        <td>
                            <select
                                value={shipment.assignedDriver}
                                onChange={(e) => editShipment(shipment.id, "assignedDriver", e.target.value)}
                                className={styles.select}
                            >
                                <option value="">Unassigned</option>
                                {drivers.map((driver) => (
                                    <option key={driver.id} value={driver.id}>
                                        {driver.name}
                                    </option>
                                ))}
                            </select>
                        </td>
                        <td>
                            <button onClick={() => deleteShipment(shipment.id)} className={styles.deleteButton}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

function Drivers({ drivers, setDrivers, shipments }) {
    const addDriver = () => {
        const newDriver = {
            id: drivers.length + 1,
            name: `Driver ${drivers.length + 1}`,
            vehicle: "Unknown",
        };
        setDrivers([...drivers, newDriver]);
    };

    const deleteDriver = (id) => {
        setDrivers(drivers.filter((driver) => driver.id !== id));
    };

    const editDriver = (id, key, value) => {
        setDrivers(drivers.map((driver) => (driver.id === id ? { ...driver, [key]: value } : driver)));
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.cardTitle}>Drivers</h2>
            <button onClick={addDriver} className={styles.button}>
                Add Driver
            </button>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Vehicle</th>
                    <th>Assigned Shipments</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {drivers.map((driver) => {
                    const assignedShipments = shipments.filter((shipment) => shipment.assignedDriver == driver.id);
                    return (
                        <tr key={driver.id}>
                            <td>
                                <input
                                    type="text"
                                    value={driver.name}
                                    onChange={(e) => editDriver(driver.id, "name", e.target.value)}
                                    className={styles.input}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={driver.vehicle}
                                    onChange={(e) => editDriver(driver.id, "vehicle", e.target.value)}
                                    className={styles.input}
                                />
                            </td>
                            <td>
                                {assignedShipments.length > 0 ? assignedShipments.map((s) => s.name).join(", ") : "None"}
                            </td>
                            <td>
                                <button onClick={() => deleteDriver(driver.id)} className={styles.deleteButton}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

function Vehicles({ vehicles, setVehicles }) {
    const addVehicle = () => {
        const newVehicle = {
            id: vehicles.length + 1,
            name: `Vehicle ${vehicles.length + 1}`,
            capacity: "Unknown",
        };
        setVehicles([...vehicles, newVehicle]);
    };

    const deleteVehicle = (id) => {
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    };

    const editVehicle = (id, key, value) => {
        setVehicles(vehicles.map((vehicle) => (vehicle.id === id ? { ...vehicle, [key]: value } : vehicle)));
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.cardTitle}>Vehicles</h2>
            <button onClick={addVehicle} className={styles.button}>
                Add Vehicle
            </button>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Capacity</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                        <td>
                            <input
                                type="text"
                                value={vehicle.name}
                                onChange={(e) => editVehicle(vehicle.id, "name", e.target.value)}
                                className={styles.input}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={vehicle.capacity}
                                onChange={(e) => editVehicle(vehicle.id, "capacity", e.target.value)}
                                className={styles.input}
                            />
                        </td>
                        <td>
                            <button onClick={() => deleteVehicle(vehicle.id)} className={styles.deleteButton}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ERP;