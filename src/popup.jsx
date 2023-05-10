import React from "react";
import ReactDOM from 'react-dom';
import Interface from "./Interface";


function Popup(){
    return(
        <div style={{ width: '250px' }}>
            <Interface />
        </div>
    );
}

ReactDOM.render(<Popup />, document.getElementById('react-target'));