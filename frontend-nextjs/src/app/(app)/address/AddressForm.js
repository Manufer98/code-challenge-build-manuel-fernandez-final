import React from 'react'
import AutoCompleteInput from './AutoCompleteInput';



const AddressForm = ({address, setAddress}) => {

    const handleManualInputChange = (event, stateProperty) => {
      
        const newAddress = { ...address };
        newAddress[stateProperty] = event.target.value;    
        setAddress(newAddress.address);
      };


  return (
    <div >
        <label htmlFor='address'>
        <AutoCompleteInput  
        address={address}
        setAddress={setAddress}
        handleManualInputChange={handleManualInputChange} 
        />

        </label>


    </div>
  )
}

export default AddressForm