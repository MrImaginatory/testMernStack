const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

app.use(express.json());
app.use(cors());
app.use(cookie());
app.use(express.urlencoded({ extended: false }));

const Employee = require('./models/employeeSchema'); // Import the Employee model

mongoose.connect('mongodb://localhost:27017/employeeDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to DB'))
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

app.listen(8000, () => console.log('Server running on port 8000'));

app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});     

let tokenData=null;
let roleData=null;

// Api End Point For Login
app.post('/login', async (req, res) => {
    let userCred = req.body;

    try {
        const user = await Employee.findOne({ Email: userCred.Email });
        if (user != null) {
            bcrypt.compare(userCred.Password, user.Password, (err, result) => {
                if (result) {
                    // jwk token signing
                    jwt.sign({ Email: user.Email, Role: user.Role }, 'secretkey', (err, token) => {
                       if(!err){
                        tokenData=token;
                        roleData=user.Role;
                        return res.send({ message: "Login Successful", tokenData: token ,roleData:user.Role});
                       }
                    });
                } else {
                    return res.status(401).send({ message: 'Invalid Password' });
                }
            });
        } else {
            return res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ message: 'Internal server error' }); // Handle any other errors
    }
});

// Api End Point for Adding Employee 
app.post('/addEmployee', async (req, res) => {
    try {
        const empData = req.body;

        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(empData.Password, salt);

        // Update password in employee data
        empData.Password = hashedPassword;

        // Create new employee instance
        const newEmployee = new Employee(empData);

        // Save employee to database
        const savedEmployee = await newEmployee.save();

        res.status(201).send({ message: 'Added employee', employee: savedEmployee });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).send({ message: 'Error adding employee', error });
    }
});

// Api End Point for Logout
app.get('/logout', (req, res) => {
    tokenData=null;
    res.status(200).send({ message: 'Logged out successfully' });
});

// Api End Point for viewing Employee
app.get('/employeeData', async (req, res) => {
    try {
        const employeeData = await Employee.find();
        res.status(200).send(employeeData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching employee data', error });
    }
});


// Api End Point for viewing Employee by Id
app.get('/employeeData/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let data = await Employee.findOne({ _id: id }); // Assuming _id is the field representing the employee ID
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching employee data', error });
    }
});


//Api endpoint for UpdateEmployee
app.put('/updateEmployee/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const empData = req.body;

        // Check if password is provided and hash it
        if (empData.Password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(empData.Password, salt);
            empData.Password = hashedPassword;
        }

        // Find and update employee by id
        const updatedEmployee = await Employee.findByIdAndUpdate(id, empData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        res.status(200).send({ message: 'Employee updated', employee: updatedEmployee });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send({ message: 'Error updating employee', error });
    }
});

// Api End Point for Deleting Employee
app.delete('/deleteEmployee/:id', async (req, res) => {
    try {
        const employeeData = await Employee.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: 'Employee data', employeeData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error fetching employee data', error });
    }
})








// app.post('/addMultipleEmployee', async (req, res) => {
//     try {
    //         const employeesData = req.body;
    
    //         // Array to store saved employees
    //         const savedEmployees = [];
    
    //         // Iterate over each employee data
    //         for (const empData of employeesData) {
        //             // Generate salt and hash password
        //             const salt = await bcrypt.genSalt(10);
        //             const hashedPassword = await bcrypt.hash(empData.Password, salt);
        
        //             // Update password in employee data
        //             empData.Password = hashedPassword;
        
        //             // Create new employee instance
        //             const newEmployee = new Employee(empData);

//             // Save employee to database
//             const savedEmployee = await newEmployee.save();
            
//             // Add saved employee to array
//             savedEmployees.push(savedEmployee);
//         }

//         res.status(201).send({ message: 'Added employees', employees: savedEmployees });
//     } catch (error) {
//         console.error('Error adding employees:', error);
//         res.status(500).send({ message: 'Error adding employees', error });
//     }
// });



// app.post('/register', (req, res) => {

//     let userData = req.body;

//     bcrypt.genSalt(10, (err, salt) => {

//         if (err) {
//             console.error('Error generating salt:', err);
//             return res.status(500).send({ message: 'Internal server error' });
//         }

//         bcrypt.hash(userData.Password, salt, async (err, hash) => {

//             if (err) {
//                 console.error('Error hashing password:', err);
//                 return res.status(500).send({ message: 'Internal server error' });
//             }

//             userData.Password = hash;

//             try {
//                 let user = new employee(userData); // Create a new User instance
//                 let doc = await user.save(); // Save the user to the database
//                 console.log('User created:', doc);
//                 res.status(200).send({ message: 'Created successfully' });
//             } catch (error) {
//                 console.error('Error creating user:', error);
//                 res.status(500).send({ message: 'Internal server error' });
//             }
//         });
//     });
// });