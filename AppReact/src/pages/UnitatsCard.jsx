import { useState } from "react";
import { useEffect } from "react";
import './UnitatsCard.css';

function UnitatsCard(){
    const [comp, setUnitatsCard] = useState(0);

    useEffect(() => {}, [comp]);

    const incr = function(){
        setUnitatsCard(comp +1);
    }

    const dec = function(){
        if (comp > 0){
            setUnitatsCard(comp - 1);
        }
    } 

    return (
        <div className="unitats-container">
            <span>Unitats al carretó</span>
            <button className="unitats-btn" onClick={() => incr()}>+</button>
            <span className="unitats-display">{comp}</span>
            <button className="unitats-btn" onClick={() => dec()}>-</button>
        </div>
    );
}

export default UnitatsCard