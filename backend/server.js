const express = require('express');
const app = express();
const PORT = 5000;

// 中间件
app.use(express.json());

// 基本路由
app.get('/', (req, res) => {
  res.json({ message: 'Course Planner API 正在运行' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
