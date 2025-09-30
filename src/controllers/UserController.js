import User from "../models/user.js";

// Lấy tất cả user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách user" });
  }
};

// Lấy user theo id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User không tồn tại" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy user" });
  }
};

// Tạo user mới
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi tạo user" });
  }
};

// Cập nhật user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User không tồn tại" });
    }
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi cập nhật user" });
  }
};

// Xóa user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User không tồn tại" });
    }
    await user.destroy();
    res.json({ message: "Xóa user thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi xóa user" });
  }
};
