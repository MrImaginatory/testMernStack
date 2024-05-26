import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeList() {
  const navigate =  useNavigate();

  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [employeesPerPage] = useState(8);
  const [sortBy, setSortBy] = useState({ column: null, order: 'asc' });

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/employeeData');
      setEmployeeData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setIsLoading(false);
    }
  };

  const handleSort = (column) => {
    const sortOrder = sortBy.column === column && sortBy.order === 'asc' ? 'desc' : 'asc';
    setSortBy({ column, order: sortOrder });
    const sortedData = [...employeeData].sort((a, b) => {
      const columnA = a[column].toUpperCase();
      const columnB = b[column].toUpperCase();
      if (sortOrder === 'asc') {
        return columnA > columnB ? 1 : -1;
      } else {
        return columnA < columnB ? 1 : -1;
      }
    });
    setEmployeeData(sortedData);
  };

  const lastIndex = (pageNumber + 1) * employeesPerPage;
  const firstIndex = lastIndex - employeesPerPage;
  const currentEmployees = employeeData.slice(firstIndex, lastIndex);

  const paginate = (pageNumber) => {
    setPageNumber(pageNumber);
  };

const handleLogout = ()=>{
  localStorage.clear();
  navigate('/login');
};

  return (
    <div className="container mx-auto mt-5">
      <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer float-right" onClick={handleLogout}>Logout</span>
      <h1 className="text-center text-3xl font-bold mb-4">Employee Data</h1>  
      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                <th onClick={() => handleSort('Name')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Name</th>
                <th onClick={() => handleSort('Email')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Email</th>
                <th onClick={() => handleSort('MobileNumber')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Mobile Number</th>
                <th onClick={() => handleSort('Location')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Location</th>
                <th onClick={() => handleSort('Designation')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualifications</th>
                <th onClick={() => handleSort('Role')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">Role</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentEmployees.map((employee) => (
                <tr key={employee._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.Name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.Email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.MobileNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.Location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.Designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.Qualification.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.Role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <nav className="block">
          <ul className="flex justify-center -space-x-px">
            {Array.from({ length: Math.ceil(employeeData.length / employeesPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  className={`px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 ${
                    pageNumber === index ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : ''
                  }`}
                  onClick={() => paginate(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default EmployeeList;
