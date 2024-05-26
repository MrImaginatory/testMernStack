import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddEmployeeForm from './components/addEmp';
import EmployeeData from './components/employeeData';
import EmployeeList from './components/employeeList';
import LoginForm from './components/loginForm';
import UpdateEmployeeForm from './components/updateEmployeeForm';

function App(){
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LoginForm />}/>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/empList' element={<EmployeeList />} />
          <Route path='/empData' element={<EmployeeData />}/>
          <Route path='/update/:id' element={<UpdateEmployeeForm />} />
          <Route path='/add' element={<AddEmployeeForm />} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
