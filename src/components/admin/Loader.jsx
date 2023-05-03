import React from 'react';
import './assets/loading.css';

const Loader = () => {
    return (
        <div className="loader">
            <div class="cssload-container">
                <div class="cssload-loading"><i></i><i></i><i></i><i></i></div>
            </div>
        </div>
    );
};

export default Loader;