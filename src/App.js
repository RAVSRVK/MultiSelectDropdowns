import './App.css';
import MultipleSelectCheckmarks from './Components/Dropdown';
import { useSelector } from 'react-redux';
import { Box, Button, Grid, Typography } from '@mui/material';
import { dropdownNames, impkeys } from './utils/constants'
import { useState } from 'react';
import { filteredData } from './store/selector';

function App() {
  const { selectedOptions, disabledOptions, availableData } = useSelector((data) => data.multiSelectDropdowns);
  const [filteredObjects, setFilteredObjects] = useState([])

  const handleShowData = () => {
    setFilteredObjects(filteredData(selectedOptions, availableData));
  }

  return (
    <><Grid sx={{ display: 'flex', flexDirection: 'column' }}>

      <Typography variant='h3'>Multi Select dependent Dropdown</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <MultipleSelectCheckmarks
          selectedOptions={selectedOptions}
          impkey={impkeys.category}
          data={availableData}
          disabled={disabledOptions.category}
          name={dropdownNames.category} />
        <MultipleSelectCheckmarks
          selectedOptions={selectedOptions}
          impkey={impkeys.brand}
          data={availableData}
          disabled={disabledOptions.brand}
          name={dropdownNames.brand} />
        <MultipleSelectCheckmarks
          selectedOptions={selectedOptions}
          impkey={impkeys.color}
          data={availableData}
          disabled={disabledOptions.color}
          name={dropdownNames.color} />
        <MultipleSelectCheckmarks
          selectedOptions={selectedOptions}
          impkey={impkeys.price}
          data={availableData}
          disabled={disabledOptions.price}
          name={dropdownNames.price} />
        <MultipleSelectCheckmarks
          selectedOptions={selectedOptions}
          impkey={impkeys.name}
          data={availableData}
          disabled={disabledOptions.name}
          name={dropdownNames.name} />
      <Button onClick={handleShowData}>Submit</Button>
      </Box>
    </Grid><Box>
        {filteredObjects?.length !== 0 && filteredObjects.map((ele) => {
          return <Box>
            {JSON.stringify(ele)}
          </Box>
        })}

      </Box></>
  );
}

export default App;
