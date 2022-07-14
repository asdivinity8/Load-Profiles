import React from "react";

const Dropdown = (profiles) => {
    
    return (
        <select style={{ height:'40px', width:'150px', borderRadius:'10px', border:0, alignSelf:'center', color:'darkgreen', padding:'10px'}}>
            <option>Show all seasons</option>
            <option>Summer</option>
            <option>Autumn</option>
            <option>Winter</option>
            <option>Spring</option>
        </select>
    )
}

export default Dropdown;