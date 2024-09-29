import React from 'react';
import { useLocation } from 'react-router-dom';

import './AddressComponent.css';

const AddressComponent = () => {
    const location = useLocation();
    const { address, alias, balance } = location.state || {};

    if (!address) {
        return <div>No address data available</div>;
    }

    return (
        <div className="address-view-container">
            <div className='adrress-view'>
            <h1>Address Details</h1>
            <p>Address: {address}</p>
            <p>Balance: {balance}</p>
            <p>Alias: {alias}</p>
            </div>
        </div>
    );
};

export default AddressComponent;