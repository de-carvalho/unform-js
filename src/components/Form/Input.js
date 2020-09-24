import React, {useEffect, useRef} from 'react';
import { useField} from '@unform/core';
import InputField from './styles/Input';

export default function Input({name, ...rest}) {
    const inputRef = useRef(null);
    const {fieldName, registerField, defaultValue, error} = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    return(

        <div>
            <InputField ref={inputRef} defaultValue={defaultValue} {...rest}/>

            { error && <span style={{color: '#f00'}}>{error}</span> }
        </div>
    );
}