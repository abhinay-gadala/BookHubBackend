import usersModel from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if user already exists
    const existingUser = await usersModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new usersModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ 
       message: "User registered successfully",
       token,
        user: {
          id: newUser._id,
          role: "user",
        },
      });

  } catch (err) {
    console.log("Register error:", err); // Add this for debugging
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.AUTHORIZED_EMAIL &&
      password === process.env.AUTHORIZED_PASSWORD
    ) {
      const adminId = process.env.AUTHORIZED_ID || "68c850ff96acdbd5b692698e"; // fallback if not set

      const token = jwt.sign(
        { id: adminId, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful (Hardcoded Admin)",
        token,
        user: {
          id: adminId,
          role: "admin",
        },
      });
    }

    // 2️⃣ Normal DB User
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful (DB User)",
      token,
      user: {
        id: user._id,
        role: "user",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};


export const getUser = async (req, res) => {
    try {
        const user = await usersModel.find();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err.message });
    }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phonenumber, dateOfBirth, bio } = req.body;

  try {
    // Check if email is being updated and already exists for another user
    if (email) {
      const existingUser = await usersModel.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }

    // Hash password if it's being updated
    let updatedFields = { name, email, phonenumber, dateOfBirth, bio };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await usersModel.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const getIndividualUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
