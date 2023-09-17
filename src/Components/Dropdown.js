import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { updateOptions } from '../store/reducer';
import { impkeys } from '../utils/constants';
import { filterDataBasedOnSelectedObjects } from '../store/selector';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks({ data, impkey, selectedOptions, disabled, name }) {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const [actualFilters, setActualFilters] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedFilters(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value?.split(',') : value,
    );
  };

  const handleClose = () => {
    dispatch(updateOptions({
      impkey,
      selectedValues: selectedFilters
    }))
  }
  React.useEffect(() => {
    const {brand, price, color, category} = selectedOptions
    if(disabled ){
      setSelectedFilters([]);
    }
    if(selectedFilters?.length!==0 && selectedOptions[impkey].length===0){
      setSelectedFilters([]);
    }
    switch (impkey) {
      case impkeys.category:
        setActualFilters(filterDataBasedOnSelectedObjects({}, data, impkey));
        break;
        case impkeys.brand:
        setActualFilters(filterDataBasedOnSelectedObjects({category}, data, impkey))
        break;
        case impkeys.color:
          setActualFilters(filterDataBasedOnSelectedObjects({brand, category}, data, impkey))
        break;
        case impkeys.price: 
          setActualFilters(filterDataBasedOnSelectedObjects({brand, color, category}, data, impkey))
        break;
        case impkeys.name: 
          setActualFilters(filterDataBasedOnSelectedObjects({brand, color, category, price}, data, impkey))
        break;    
      default:
        return 
        break;
    }
    // setActualFilters(filterDataBasedOnSelectedObjects(selectedOptions, data, impkey)) -> previous arrays 
  }, [selectedOptions, impkey, data, disabled]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{name}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          onClose={handleClose}
          value={selectedFilters}
          disabled={disabled}
          onChange={handleChange}
          input={<OutlinedInput label={name} />}
          renderValue={(selected) => selectedFilters.join(', ')}
          MenuProps={MenuProps}
        >
          {actualFilters?.map((ele) => (
            <MenuItem key={ele} value={ele}>
              <Checkbox checked={selectedFilters.indexOf(ele) > -1} />
              <ListItemText primary={ele} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
