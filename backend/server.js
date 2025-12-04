const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5001;

// 中间件
app.use(cors());
app.use(express.json());

// MongoDB 连接
const MONGO_URI = 'mongodb://localhost:27017/Project2';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB 连接成功'))
  .catch(err => console.error('MongoDB 连接失败:', err));

// Track Schema
const trackSchema = new mongoose.Schema({
  Field: { type: String, required: true },           // 课程领域
  'Update-Date': { type: Number, required: true },   // 更新日期 (时间戳)
  'Percent-Complete': { type: Number, default: 0 },  // 完成百分比
  like: { type: Boolean, default: false },           // 收藏
  archive: { type: Boolean, default: false },        // 归档
  title: { type: String },                           // 标题
  iconBg: { type: String },                          // 图标背景色
  iconColor: { type: String },                       // 图标颜色
  iconName: { type: String }                         // 图标名称
});

const Track = mongoose.model('Track', trackSchema, 'Tracks');

// 初始化数据 - 只在数据库为空时插入
const seedData = async () => {
  const count = await Track.countDocuments();
  if (count === 0) {
    const initialTracks = [
      {
        title: 'Track 1',
        Field: 'Computer Science',
        iconName: 'Computer',
        iconBg: '#E3F2FD',
        iconColor: '#2196F3',
        'Update-Date': Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
        'Percent-Complete': 75,
        like: false,
        archive: false
      },
      {
        title: 'Track 2',
        Field: 'Data Science',
        iconName: 'Calculator',
        iconBg: '#E8F5E9',
        iconColor: '#4CAF50',
        'Update-Date': Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
        'Percent-Complete': 60,
        like: true,
        archive: false
      },
      {
        title: 'Track 3',
        Field: 'Mathematics',
        iconName: 'Calculator',
        iconBg: '#FEF3C7',
        iconColor: '#F59E0B',
        'Update-Date': Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
        'Percent-Complete': 45,
        like: false,
        archive: false
      },
      {
        title: 'Track 4',
        Field: 'Music',
        iconName: 'BookOpen',
        iconBg: '#FECDD3',
        iconColor: '#F43F5E',
        'Update-Date': Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
        'Percent-Complete': 90,
        like: true,
        archive: false
      },
      {
        title: 'Track 5',
        Field: 'Art',
        iconName: 'Beaker',
        iconBg: '#DDD6FE',
        iconColor: '#8B5CF6',
        'Update-Date': Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
        'Percent-Complete': 30,
        like: false,
        archive: false
      },
      {
        title: 'Track 6',
        Field: 'Cognitive Science',
        iconName: 'Brain',
        iconBg: '#EDE7F6',
        iconColor: '#673AB7',
        'Update-Date': Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
        'Percent-Complete': 55,
        like: false,
        archive: false
      }
    ];

    await Track.insertMany(initialTracks);
    console.log('初始数据已插入');
  }
};

// 数据库连接成功后初始化数据
mongoose.connection.once('open', () => {
  seedData();
});

// ============ API 路由 ============

// 基本路由
app.get('/', (req, res) => {
  res.json({ message: 'Course Planner API 正在运行' });
});

// GET - 获取所有 tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.find();
    res.json(tracks);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败', details: error.message });
  }
});

// GET - 获取单个 track
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track 不存在' });
    }
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: '获取数据失败', details: error.message });
  }
});

// POST - 添加新 track
app.post('/api/tracks', async (req, res) => {
  try {
    const newTrack = new Track({
      title: req.body.title,
      Field: req.body.Field,
      iconName: req.body.iconName,
      iconBg: req.body.iconBg,
      iconColor: req.body.iconColor,
      'Update-Date': req.body['Update-Date'] || Date.now(),
      'Percent-Complete': req.body['Percent-Complete'] || 0,
      like: req.body.like || false,
      archive: req.body.archive || false
    });
    
    const savedTrack = await newTrack.save();
    res.status(201).json(savedTrack);
  } catch (error) {
    res.status(400).json({ error: '创建失败', details: error.message });
  }
});

// PUT - 更新 track
app.put('/api/tracks/:id', async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedTrack) {
      return res.status(404).json({ error: 'Track 不存在' });
    }
    res.json(updatedTrack);
  } catch (error) {
    res.status(400).json({ error: '更新失败', details: error.message });
  }
});

// DELETE - 删除 track
app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.id);
    
    if (!deletedTrack) {
      return res.status(404).json({ error: 'Track 不存在' });
    }
    res.json({ message: '删除成功', deletedTrack });
  } catch (error) {
    res.status(500).json({ error: '删除失败', details: error.message });
  }
});

// PATCH - 切换 like 状态
app.patch('/api/tracks/:id/like', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track 不存在' });
    }
    
    track.like = !track.like;
    await track.save();
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: '更新失败', details: error.message });
  }
});

// PATCH - 切换 archive 状态
app.patch('/api/tracks/:id/archive', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) {
      return res.status(404).json({ error: 'Track 不存在' });
    }
    
    track.archive = !track.archive;
    await track.save();
    res.json(track);
  } catch (error) {
    res.status(500).json({ error: '更新失败', details: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
