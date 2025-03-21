import { generateToken } from '../config/jwt.config.js';
import { hashPassword, comparePassword } from '../utils/password.utils.js';

export const register = async (req, res) => {
  try {
    // Implementation will come later
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    // Implementation will come later
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
