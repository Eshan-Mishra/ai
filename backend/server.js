import express from 'express';
import cors from 'cors';
import { createObjectCsvWriter } from 'csv-writer';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure users.csv exists
const csvFilePath = join(__dirname, 'users.csv');
if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, 'email,password,registrationNo\n');
}

// CSV Writer setup
const csvWriter = createObjectCsvWriter({
  path: csvFilePath,
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
    const content = fs.readFileSync(csvFilePath, 'utf-8');
    const lines = content.split('\n').slice(1); // Skip header
    return lines
      .filter(line => line.trim())
      .map(line => {
        const [email, password, registrationNo] = line.split(',');
        return { email, password, registrationNo };
      });
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

// Helper function to check registration code
const checkRegistrationCode = (registrationNo) => {
  const filePath = join(__dirname, 'random_codes_updated.csv');
  const data = fs.readFileSync(filePath, 'utf8');
  const lines = data.split('\n');
  return lines.some(line => line.split(',')[0] === registrationNo);
};

// Register endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, password, registrationNo } = req.body;
    console.log('Received values:', req.body);

    if (!checkRegistrationCode(registrationNo)) {
      console.log(`Invalid registration code for email: ${email}, registrationNo: ${registrationNo}`);
      return res.status(400).json({ error: `Invalid registration code for email: ${email}, registrationNo: ${registrationNo}` });
    }

    // Check if user exists
    const users = getUsers();
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save to CSV
    await csvWriter.writeRecords([
      { email, password: hashedPassword, registrationNo }
    ]);

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, registrationNo } = req.body;
    console.log('Received values:', req.body);

    if (!checkRegistrationCode(registrationNo)) {
      console.log(`Invalid registration code for email: ${email}, registrationNo: ${registrationNo}`);
      return res.status(400).json({ error: `Invalid registration code for email: ${email}, registrationNo: ${registrationNo}` });
    }

    // Find user
    const users = getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      console.log(`User not found for email: ${email}`);
      console.log('Current users:', users);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log(`Invalid password for email: ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(`Login successful for email: ${email}`);
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});