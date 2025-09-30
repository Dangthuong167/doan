// db.js
// src/config/db.js
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("mobileShop", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false, 
});

try {
  await sequelize.authenticate();
  console.log("Kết nối MySQL thành công!");
} catch (error) {
  console.error("Không thể kết nối MySQL:", error);
}

export default sequelize;

