const connectToMongo=require('./db')
const express=require('express')
const cors =require('cors')
connectToMongo();

const app=express()
app.use(cors)
const port=5000

app.use(express.json())
//Available routes
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/files',require('./routes/files.js'))
app.get('/',(req,res)=>
{
    res.send('hello world')
})

app.listen(port,()=>
{
    console.log(`example app litening ${port}`)
})


// backend/server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Multer configuration for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({ storage: storage });

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/drive', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log(err));

// // Mongoose model for file documents
// const File = mongoose.model('File', {
//   name: String,
//   path: String
// });

// // Route to upload a file
// app.post('/upload', upload.single('file'), async (req, res) => {
//   const { file } = req;
// console.log(file)
//   if (!file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   try {
//     const newFile = new File({
//       name: file.originalname,
//       path: file.path
//     });

//     await newFile.save();
//     res.status(201).send(newFile);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Route to get all files
// app.get('/files', async (req, res) => {
//   try {
//     const files = await File.find();
//     res.send(files);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// // Route to delete a file
// app.delete('/files/:id', async (req, res) => {
//   const fileId = req.params.id;

//   try {
//     const file = await File.findById(fileId);

//     if (!file) {
//       return res.status(404).send('File not found');
//     }

//     // Delete file from uploads folder
//     fs.unlinkSync(file.path);

//     await file.remove();
//     res.send('File deleted successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
