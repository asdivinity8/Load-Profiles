import React from "react";

const NavPanel = (props) => {
    
    return (
        <ul className="navlist">
            <li className="navlist-header">Name</li>
            {
                props.profiles.map((item, index) => {
                    return (
                        <li className={`navlist-item ${props.selectedMenuItem === item.name ? 'active':''}`} key={index} onClick={()=>{props.handleMenuSelection(item.name)}}>
                            <p className="load-name">{item.name}</p>
                            <p className="load-value">{item.value} MWh</p>
                        </li>
                    );
                })
            } 
        </ul>
    )
}

export default NavPanel;