const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({
    Name: {
        type: String,
        require:true
    },
    Email:{
        type: String,
        require:true    
    },
    Password:{
        type: String,
        require:true
    },
    MobileNumber:{
        type: Number,
        require:true 
    },
    Location:{
        type: String,
        require:true
    },
    Designation:{
        type: [String],
        require:true,
        enum:['Intern','Team Leader','Web designer','Frontend developer','Backend developer'],
        require:true
    },
    Qualification:{
        type: [String],
        default: [],
        enum:['MCA','BCA','BSc'],
        require:true
    },
    Role:{
        type: String,
        enum:['Employee','Manager'],
        default: 'Employee'
    }
},{timestamps: true})

module.exports = mongoose.model('Employee', employeeSchema)