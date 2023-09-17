export const filteredData = (selectedFilters, jsonData) => {
    console.log(selectedFilters);
    const filteredObjectsArray = jsonData?.filter(obj => {
        return Object.entries(selectedFilters)?.every(([key, valuesToCheck]) => {
            if (valuesToCheck.length === 0 || !obj[key]) {
                return true; // No filtration needed for this key
            }
            // Check if obj[key] is an array or a string before calling .includes()
            if (Array.isArray(obj[key])) {
                return valuesToCheck.some(value => obj[key].includes(value));
            } else if (typeof obj[key] === 'string' || typeof obj[key] ==='number') {
                return valuesToCheck.includes(obj[key]);
            }
             else {
                return false; // Handle other data types as needed
            }
        });
    });
    return filteredObjectsArray
}

// Sample for selectedFilters
// {
//     "category": [
//         "Electronics",
//         "Clothing"
//     ],
//     "brand": [
//         "Samsung",
//         "Dell"
//     ],
//     "color": [],
//     "price": [],
//     "name": []
// }

export const filterDataBasedOnSelectedObjects = (selectedFilters, arrayOfObjects, impkey) => {
    const filteredOptions = [];
    const filteredObjectsArray = filteredData(selectedFilters, arrayOfObjects);
    filteredObjectsArray.forEach((ele) => {
        if (!filteredOptions.includes(ele[impkey])) {
            filteredOptions.push(ele[impkey]);
        }
    });
    
    return filteredOptions;
}
