import {Loan} from '../models/associations.js'
import  bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";

const createLoan = async (req,res) =>{
    const { loanAmount, interestRate,tenure } = req.body;
    try {
      const userId = req.user.id
      const loan = await Loan.create({amount:loanAmount, interestRate:interestRate, tenure: tenure,userId: userId, });
      res.status(201).json({ message: "New Loan created successfully" ,loan});
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
}

const getMyLoans = async (req,res) =>{
    try {
      const userId = req.user.id
      const loans = await Loan.findAll({where:{userId}});
      res.status(200).json({ message: "Successfully Fetched All User Loans" ,loans});
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
}

const updateLoan = async (req,res) =>{
    try {
      const id = parseInt(req.params.id)
      const body = req.body
      const loanData = await Loan.findOne({ where: id  });
      const loan = await loanData.update(body);
      res.status(200).json({ message: "Successfully Updated Loan Status" ,loan});
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
}


export  { createLoan ,getMyLoans,updateLoan};
