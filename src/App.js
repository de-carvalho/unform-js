import React, { useEffect, useRef } from 'react';
import {Form} from '@unform/web';
import {Scope} from '@unform/core';
import * as Yup from 'yup';

import './App.css';
import Button from './components/Button/Button'
// import 'react-toastify/dist/ReactToastify.css';

import Input from './components/Form/Input';


function App() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Campo obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('Campo obrigatório'),
        address: Yup.object().shape({
          city: Yup.string()
            .min(3, 'mínimo de 3 caracteres')
            .required('Campo obrigatório')
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      formRef.current.setErrors({});
      
      reset();
      
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        })

        formRef.current.setErrors(errorMessages);
      }
    }

  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        name: 'Ana Carolina',
        email: 'ana@email.com',
        address: {
          city: 'Garça'
        }
      })
    }, 2000);
  }, [])

  return (
    <div className="App">
      <h1>Form test!</h1>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Name"/>
        <Input type="email" name="email" placeholder="E-mail"/>
        <Input type="password" name="password" placeholder="Password"/>

        <Scope path="address">
          <Input name="street" placeholder="Street"/>
          <Input name="number" placeholder="Number"/>
          <Input name="neighborhood" placeholder="Neighborhood"/>
          <Input name="city" placeholder="City"/>
          <Input name="state" placeholder="State"/>
        </Scope>

        <Button type="submit">Send</Button>
      </Form>
    </div>
  );
}

export default App;
