// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./src/routes/userRoutes.js";

import sequelize from "./src/config/db.js";
import User from "./src/models/user.js";

// Lấy __dirname trong ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// phục vụ file tĩnh trong thư mục public
app.use(express.static(path.join(__dirname, "public")));

// Kết nối DB
try {
  await sequelize.authenticate();
  console.log("Kết nối database thành công!");
  await sequelize.sync({ alter: true });
  console.log("Đồng bộ model User thành công!");
} catch (err) {
  console.error(" Lỗi kết nối hoặc sync DB:", err);
}

// route mặc định
app.get("/", (req, res) => {
  res.send("hello world hahah");
});
 
app.use("/users", userRoutes);

// chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
