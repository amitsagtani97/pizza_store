import React from 'react';
import {Spinner} from "react-bootstrap";

const Loader: React.FC = () => {
    return (
        <div style = {{
            position: 'relative'
        }}>
            <Spinner animation = "border" role = "status" style = {{
                position: 'fixed',
                top     : '50%',
                right   : '50%'
            }}>
                <span className = "sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loader;
