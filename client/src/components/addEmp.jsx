import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddEmployeeForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        Password: '',
        MobileNumber: '',
        Location: '',
        Designation: '',
        Qualification: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevState => {
                const newQualifications = checked
                    ? [...prevState.Qualification, value]
                    : prevState.Qualification.filter(q => q !== value);
                return {
                    ...prevState,
                    Qualification: newQualifications
                };
            });
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/addEmployee', formData);
            console.log('Employee added successfully');
            // Reset form fields after successful submission
            setFormData({
                Name: '',
                Email: '',
                Password: '',
                MobileNumber: '',
                Location: '',
                Designation: '',
                Qualification: []
            });
            setTimeout(() => {
                navigate('/empData');
            }, 2000);
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleCancel = () => {
        navigate('/empData');
    };

    return (<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-xl">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Add Employee
      </h2>
    </div>
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1">
              <input
                id="Name"
                name="Name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.Name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                id="Email"
                name="Email"
                type="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.Email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="Password"
                name="Password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.Password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="MobileNumber" className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <div className="mt-1">
              <input
                id="MobileNumber"
                name="MobileNumber"
                type="tel"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.MobileNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="Location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <div className="mt-1">
              <input
                id="Location"
                name="Location"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.Location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="Designation" className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <div className="mt-1">
              <select
                id="Designation"
                name="Designation"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.Designation}
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                <option value="Intern">Intern</option>
                <option value="Team Leader">Team Leader</option>
                <option value="Web designer">Web designer</option>
                <option value="Frontend developer">Frontend developer</option>
                <option value="Backend developer">Backend developer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification</label>
            <div className="mt-2 space-y-1">
              {['MCA', 'BCA', 'BSc'].map((qualification) => (
                <label key={qualification} className="inline-flex items-center mr-3">
                  <input
                    type="checkbox"
                    name="Qualification"
                    value={qualification}
                    checked={formData.Qualification.includes(qualification)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{qualification}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add employee
            </button>
            <button
              onClick={handleCancel}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
    );
}

export default AddEmployeeForm;
