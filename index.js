// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;
// const JWT_SECRET = 'yoursecretkey'; // change this for real use!

// // Connect to MongoDB (replace <YOUR_MONGODB_URI> with your MongoDB connection string)
// mongoose.connect('mongodb+srv://abhirambca2021:abhi@cluster0.zjvaigp.mongodb.net/Root?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // User schema & model
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String
// });
// const User = mongoose.model('User', userSchema);

// // Item schema & model
// const itemSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   description: String,
//   image: String
// });
// const Item = mongoose.model('Item', itemSchema);

// // Middleware to check JWT token
// function auth(req, res, next) {
//   const token = req.header('Authorization')?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (e) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// }

// // Routes

// // Register
// app.post('/api/auth/register', async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password)
//     return res.status(400).json({ message: 'Please enter all fields' });

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     res.json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Login
// app.post('/api/auth/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: 'Please enter all fields' });

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

//     res.json({ token, user: { name: user.name, email: user.email } });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all items
// app.get('/api/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get one item by id
// app.get('/api/items/:id', async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add new item (protected)
// app.post('/api/items', auth, async (req, res) => {
//   const { name, price, description, image } = req.body;
//   if (!name || !price || !description || !image)
//     return res.status(400).json({ message: 'Please enter all fields' });

//   try {
//     const newItem = new Item({ name, price, description, image });
//     await newItem.save();
//     res.json(newItem);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Update item (protected)
// app.put('/api/items/:id', auth, async (req, res) => {
//   try {
//     const item = await Item.findById(req.params.id);
//     if (!item) return res.status(404).json({ message: 'Item not found' });

//     const { name, price, description, image } = req.body;

//     item.name = name || item.name;
//     item.price = price || item.price;
//     item.description = description || item.description;
//     item.image = image || item.image;

//     await item.save();
//     res.json(item);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect MongoDB
// mongoose.connect('mongodb+srv://abhirambca2021:abhi@cluster0.zjvaigp.mongodb.net/Root?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // MongoDB Models
// const Item = mongoose.model('Item', new mongoose.Schema({
//   name: String,
//   price: Number,
//   image: String,
// }));

// const User = mongoose.model('User', new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// }));

// // JWT Auth Middleware
// const authenticate = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).send({ message: 'Unauthorized' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, 'secretkey123');
//     req.user = decoded; // not used here but useful if needed later
//     next();
//   } catch (err) {
//     return res.status(401).send({ message: 'Invalid token' });
//   }
// };

// // -------------------- ROUTES --------------------

// // Register user
// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).send({ message: 'Email already registered' });
//   }

//   const user = new User({ name, email, password });
//   await user.save();

//   res.send({ message: 'User registered successfully' });
// });

// // Login user
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email, password });
//   if (!user) {
//     return res.status(401).send({ message: 'Invalid email or password' });
//   }

//   const token = jwt.sign({ userId: user._id }, 'secretkey123');
//   res.send({ message: 'Login successful', token });
// });

// // Get all items
// app.get('/items', async (req, res) => {
//   const items = await Item.find();
//   res.send(items);
// });

// // Get single item by ID
// app.get('/items/:id', async (req, res) => {
//   const item = await Item.findById(req.params.id);
//   if (!item) return res.status(404).send({ message: 'Item not found' });
//   res.send(item);
// });

// // Add new item (only if logged in)
// app.post('/items', authenticate, async (req, res) => {
//   const item = new Item(req.body);
//   await item.save();
//   res.send(item);
// });

// // Update item by ID
// app.put('/items/:id', authenticate, async (req, res) => {
//   const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.send(item);
// });

// // Delete item (optional)
// app.delete('/items/:id', authenticate, async (req, res) => {
//   await Item.findByIdAndDelete(req.params.id);
//   res.send({ message: 'Item deleted' });
// });

// // Start server
// app.listen(5000, () => {
//   console.log('Server running at http://localhost:5000');
// });











const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');


const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images statically from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb+srv://abhirambca2021:abhi@cluster0.zjvaigp.mongodb.net/Root?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// MongoDB Schemas
const Item = mongoose.model('Item', new mongoose.Schema({
  name: String,
  price: Number,
  image: String, // stores relative path like "/uploads/filename.jpg"
}));

const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  password: String,
}));

// JWT Auth Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'secretkey123');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

// --------- Routes -----------

// Register user
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: 'Email already registered' });
  }

  const user = new User({ name, email, password });
  await user.save();

  res.send({ message: 'User registered successfully' });
});

// Login user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user._id }, 'secretkey123');
  res.send({ message: 'Login successful', token });
});

// Get all items
app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

// Get item by id
app.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).send({ message: 'Item not found' });
  res.send(item);
});

// Add new item (with image upload)
app.post('/items', authenticate, upload.single('image'), async (req, res) => {
  const { name, price } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';

  const item = new Item({ name, price, image });
  await item.save();

  res.send(item);
});

// Update item by ID (with optional image upload)
app.put('/items/:id', authenticate, upload.single('image'), async (req, res) => {
  const { name, price } = req.body;
  const update = { name, price };

  if (req.file) {
    update.image = `/uploads/${req.file.filename}`;
  }

  const item = await Item.findByIdAndUpdate(req.params.id, update, { new: true });
  res.send(item);
});

// Delete item
app.delete('/items/:id', authenticate, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.send({ message: 'Item deleted' });
});

// Start server
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
