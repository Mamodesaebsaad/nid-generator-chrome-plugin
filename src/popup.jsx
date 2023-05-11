import React from "react";
import ReactDOM from 'react-dom';
import Interface from "./Interface";


function Popup(){
    return(
        <div style={{ width: '290px', height: '450px' }}>
            <Interface />
        </div>
    );
}

ReactDOM.render(<Popup />, document.getElementById('react-target'));