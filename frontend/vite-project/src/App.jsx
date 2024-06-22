import React from 'react';
import PieChart from './Components/PieChart';
import SalaryRangeChart from './Components/SalaryRange';
import AgeRangeChart from './Components/AgeRange';

const App = () => {
  return (
    <div className="App">
      <h1>Gender Distribution Chart</h1>
      <PieChart />
      <br/>
      <SalaryRangeChart/>
      <br/>
      <AgeRangeChart/>
    </div>
  );
};

export default App;
