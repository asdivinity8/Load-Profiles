import React, { useState, useEffect } from "react";
import "./App.css";
import LineChart from "./components/LineChart";
import Label from "./components/AxisLabel";
import ChartTitle from "./components/ChartTitle";
import NavPanel from "./components/NavPanel";
import Data from "./testdata";
import LoadProfiles from "./loadProfiles";

const styles = {
  chartComponentsContainer: {
    display: 'grid', gridTemplateColumns: '300px auto', gap: '2px'
  },
  chartWrapper: { position: 'relative', left: '-15px', top: '-30px'}
}

function App() {
  const [selectedMenuItem, setSelectedMenuItem] = useState('Agricultural (Pork)')

  const [ selectedData, setSelectedData ] = useState();

  const getSelectedData = (Data,value) =>  Data.find(datum=> datum.name === value);
  

  useEffect(()=>{
    setSelectedData(getSelectedData(Data,selectedMenuItem));
  })
  useEffect(()=>{
    let selectedData =getSelectedData(Data,selectedMenuItem)
    setSelectedData(selectedData);
  },[selectedMenuItem])
  
  const handleMenuSelection = (value) =>{
    setSelectedMenuItem(value);
  }

  return (
    <div style={{ padding:'20px 40px', backgroundColor:'#102D4C' }}>
       <h1 style={{fontSize:'36px', fontWeight:'bold', color:'#ffffff', margin:'0', padding:'0 0 10px'}}>Load profiles
        <span style={{fontSize:'18px', color:'#ffffff', marginLeft:'20px'}}>Available datasets</span>
      </h1>
      <div style={styles.chartComponentsContainer}>
        <NavPanel profiles={LoadProfiles} selectedMenuItem={selectedMenuItem} handleMenuSelection={handleMenuSelection}/>
        <div className="main-container">
          <ChartTitle text={selectedMenuItem}/>
          <Label text="kW" />
          {selectedData && <div style={styles.chartWrapper}>
            <LineChart
              width={500 }
              height={300}
              data={selectedData}
              horizontalGuides={7}
              precision={2}
            />
          </div>}
        </div>
      </div>
    </div>
  );
}

export default App;