import React from "react";
import { PulseLoader } from 'react-spinners';

import './index.css';

export function LoadSpinner() {
    return (
        <div className='page__load-spinner'>
            <PulseLoader color='#fff'/>
        </div>
    );
}
