import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { createObjectCsvWriter } from 'csv-writer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Define paths and constants
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3000;
const JWT_SECRET = 'your-secret-key';
const USERS_CSV_PATH = join(__dirname, 'users.csv');
const CODES_CSV_PATH = join(__dirname, 'random_codes_updated.csv');

// Initialize Express app
const app = express();

// Middleware for CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Ensure the users.csv file exists
if (!fs.existsSync(USERS_CSV_PATH)) {
  fs.writeFileSync(USERS_CSV_PATH, 'email,password,registrationNo\n');
}

// Setup CSV writer for user data
const csvWriter = createObjectCsvWriter({
  path: USERS_CSV_PATH,
  header: [
    { id: 'email', title: 'email' },
    { id: 'password', title: 'password' },
    { id: 'registrationNo', title: 'registrationNo' }
  ],
  append: true
});

// Helper function to read users from CSV
const getUsers = () => {
  try {
    const content = fs.readFileSync(USERS_CSV_PATH, 'utf-8');
    return content.split('\n').slice(1) // Skip header
      .filter(line => line.trim()) // Filter out empty lines
      .map(line => {
        const [email, password, registrationNo] = line.split(',');
        return { email, password, registrationNo };
      });
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Helper function to validate registration code
const isValidRegistrationCode = (registrationNo) => {
  try {
    const content = fs.readFileSync(CODES_CSV_PATH, 'utf-8');
    const codes = content.split('\n');
    return codes.some(code => code.split(',')[0] === registrationNo);
  } catch (error) {
    console.error('Error reading registration codes:', error);
    return false;
  }
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  const { email, password, registrationNo } = req.body;

  try {
    console.log('Register request:', req.body);

    // Validate registration code
    if (!isValidRegistrationCode(registrationNo)) {
      return res.status(400).json({ error: 'Invalid registration code' });
    }

    // Check if user already exists
    const users = getUsers();
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    await csvWriter.writeRecords([{ email, password: hashedPassword, registrationNo }]);

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password, registrationNo } = req.body;

  try {
    console.log('Login request:', req.body);

    // Validate registration code
    if (!isValidRegistrationCode(registrationNo)) {
      return res.status(400).json({ error: 'Invalid registration code' });
    }

    // Find user
    const users = getUsers();
    const user = users.find(u => u.email === email && u.registrationNo === registrationNo);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or registration number' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    console.log('Login successful:', email);
    res.json({ message: 'Login successful', redirect: '/course-section' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});