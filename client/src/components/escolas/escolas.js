import React, { useState } from "react"
import AsyncSelect from 'react-select/async'


function Escolas() {


    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    // handle input change event
    const handleInputChange = value => {
        setValue(value);
    };

    // handle selection
    const handleChange = value => {
        setSelectedValue(value);
    }

    // load options using API call
    const loadOptions = (inputValue) => {
        return fetch(`http://localhost:3001/escolas`).then(res => res.json());
    };

    return (
        <div >
            <AsyncSelect
                cacheOptions
                defaultOptions
                value={selectedValue}
                getOptionLabel={e => e.nome}
                getOptionValue={e => e.id}
                loadOptions={loadOptions}
                onInputChange={handleInputChange}
                onChange={handleChange}
                label="Single select"
            />
            
        </div>
    )
}

export default Escolas

// <pre>Input Value: "{inputValue}"</pre>
// <pre className='select'>Selected Value: {JSON.stringify(selectedValue || {}, null, 2)}</pre>