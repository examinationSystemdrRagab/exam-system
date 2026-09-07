const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// خدمة ملفات الواجهة الأمامية من مجلد public مباشرة
app.use(express.static(path.join(__dirname, 'public')));

// الاتصال بقاعدة البيانات MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Database Successfully!'))
.catch(err => console.log('Database Connection Error:', err));

const User = require('./models/User');

// مسار إنشاء حساب جديد (Signup)
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: "جميع الحقول مطلوبة." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "هذا البريد مسجل مسبقاً." });
        }

        const user = new User({ 
            name, 
            email, 
            password, 
            role: 'student' 
        });
        
        await user.save();

        res.status(201).json({ message: "تم إنشاء الحساب بنجاح!" });
    } catch (err) {
        console.log("Signup Error Details:", err.message);
        res.status(500).json({ error: "خطأ في السيرفر: " + err.message });
    }
});

// مسار تسجيل الدخول (Login)
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "البريد الإلكتروني غير مسجل." });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "كلمة المرور غير صحيحة." });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ message: "تم تسجيل الدخول بنجاح", token, role: user.role, name: user.name });
    } catch (err) {
        console.log("Login Error:", err);
        res.status(500).json({ error: "خطأ في تسجيل الدخول." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running securely on port ${PORT}`);
});