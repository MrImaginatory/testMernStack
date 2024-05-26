import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EmployeeData() {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
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

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
    console.log(`Editing employee with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    setDeleteId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    setShowDeleteConfirmation(false);
    try {
      const response = await axios.delete(`http://localhost:8000/deleteEmployee/${deleteId}`);
      console.log('Employee deleted successfully');
      fetchEmployeeData();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
    setShowDeleteConfirmation(false);
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
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md mx-1 hover:bg-blue-600'>
      <Link to="/add" className="text-white-500 hover:text-white-700">Add Employees</Link>
      </button>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mx-1 hover:bg-blue-600"
                      onClick={() => handleEdit(employee._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md mx-1 hover:bg-red-600"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
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

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Confirm Delete
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete this employee?</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeData;
