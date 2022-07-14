import React from 'react'
import PropTypes from 'prop-types'
import Dropdown from './Dropdown';

const ChartTitle = ({text}) => (
    <div style={{ display:'flex', justifyContent:'space-between', paddingRight:'100px'}}>
        <div>
        <h3 style={{marginBottom: '-10px', color: "#102D4C", fontSize: "26px", fontWeight: "bold"}}>{text}</h3>
        <p style={{color: "#102D4C", fontSize: "18px",}}>Load, daily view</p>
        </div>
        <Dropdown />
    </div>
    
);

ChartTitle.propTypes = {
    text: PropTypes.string.isRequired
}

export default ChartTitle;