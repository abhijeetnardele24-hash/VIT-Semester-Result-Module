import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1d',
  });
};

export const loginUser = async (req, res) => {
  const { prnNumber, password } = req.body;
  const cleanPrn = prnNumber.trim();

  try {
    console.log("Login attempt for PRN:", cleanPrn);
    const user = await User.findOne({ where: { prnNumber: cleanPrn } });
    
    if (user) {
      console.log("User found. Hashed password in DB:", user.password);
      const isMatch = await user.matchPassword(password);
      console.log("Password match result:", isMatch);
      
      if (isMatch) {
      res.json({
        id: user.id,
        prnNumber: user.prnNumber,
        name: user.name,
        role: user.role,
        token: generateToken(user.id, user.role),
      });
      } else {
        console.log("Password mismatch for user:", prnNumber);
        res.status(401).json({ message: 'Invalid PRN or password' });
      }
    } else {
      console.log("User not found:", prnNumber);
      res.status(401).json({ message: 'Invalid PRN or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
