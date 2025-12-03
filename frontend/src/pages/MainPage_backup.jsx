import { useState } from 'react';
import {
  Clock,
  Heart,
  FileText,
  Archive,
  Plus,
  Bell,
  Settings,
  Computer,
  Calculator,
  Flask,
  BookOpen,
  Brain
} from 'lucide-react';
import './MainPage.css';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('recent');

  // 模拟课程数据
  const tracks = [
    {
      id: 1,
      title: 'Track 1',
      course: 'Data Structures & Algorithms',
      icon: Computer,
      iconBg: '#E3F2FD',
      iconColor: '#2196F3',
      updated: '2 days ago',
      progress: 75,
      favorite: false
    },
    {
      id: 2,
      title: 'Track 2',
      course: 'Calculus III & Linear Algebra',
      icon: Calculator,
      iconBg: '#E8F5E9',
      iconColor: '#4CAF50',
      updated: '1 week ago',
      progress: 60,
      favorite: true
    },
    {
      id: 3,
      title: 'Track 3',
      course: 'Organic Chemistry II',
      icon: Flask,
      iconBg: '#F3E5F5',
      iconColor: '#9C27B0',
      updated: '3 days ago',
      progress: 45,
      favorite: false
    },
    {
      id: 4,
      title: 'Track 4',
      course: 'Modern American Literature',
      icon: BookOpen,
      iconBg: '#FFF3E0',
      iconColor: '#FF9800',
      updated: '5 days ago',
      progress: 90,
      favorite: true
    },
    {
      id: 5,
      title: 'Track 5',
      course: 'Cognitive Psychology',
      icon: Brain,
      iconBg: '#EDE7F6',
      iconColor: '#673AB7',
      updated: '1 week ago',
      progress: 30,
      favorite: false
    }
  ];

  const [favorites, setFavorites] = useState(
    tracks.reduce((acc, track) => {
      acc[track.id] = track.favorite;
      return acc;
    }, {})
  );

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="main-page">
      {/* 左侧导航栏 */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <FileText size={24} />
            </div>
            <span className="logo-text">Course Planner</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'recent' ? 'active' : ''}`}
            onClick={() => setActiveTab('recent')}
          >
            <Clock size={20} />
            <span>Recent</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Heart size={20} />
            <span>Favorites</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            <FileText size={20} />
            <span>Templates</span>
          </button>
          <button
            className={`nav-item ${activeTab === 'archive' ? 'active' : ''}`}
            onClick={() => setActiveTab('archive')}
          >
            <Archive size={20} />
            <span>Archive</span>
          </button>
        </nav>
      </aside>

      {/* 主内容区域 */}
      <main className="main-content">
        {/* 顶部导航栏 */}
        <header className="top-header">
          <div className="header-spacer"></div>
          <div className="header-actions">
            <button className="icon-button">
              <Bell size={20} />
            </button>
            <button className="icon-button">
              <Settings size={20} />
            </button>
            <div className="user-avatar">
              <img
                src="https://via.placeholder.com/40"
                alt="User"
              />
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <div className="content-area">
          <div className="welcome-section">
            <h1>Hi, Maria!</h1>
            <p>Welcome back to your planner dashboard</p>
          </div>

          <div className="section-header">
            <h2>Recent</h2>
            <button className="view-all-btn">View all</button>
          </div>

          {/* 课程卡片网格 */}
          <div className="tracks-grid">
            {/* New Plan 卡片 */}
            <div className="track-card new-plan-card">
              <button className="new-plan-button">
                <Plus size={32} />
              </button>
              <h3>New Plan</h3>
              <p>Create a 4-year plan</p>
            </div>

            {/* 课程卡片 */}
            {tracks.map(track => {
              const IconComponent = track.icon;
              return (
                <div key={track.id} className="track-card">
                  <div className="card-header">
                    <div
                      className="card-icon"
                      style={{ backgroundColor: track.iconBg }}
                    >
                      <IconComponent
                        size={24}
                        style={{ color: track.iconColor }}
                      />
                    </div>
                    <button
                      className="favorite-button"
                      onClick={() => toggleFavorite(track.id)}
                    >
                      <Heart
                        size={20}
                        fill={favorites[track.id] ? '#f44336' : 'none'}
                        color={favorites[track.id] ? '#f44336' : '#999'}
                      />
                    </button>
                  </div>
                  <h3 className="card-title">{track.title}</h3>
                  <p className="card-course">{track.course}</p>
                  <div className="card-footer">
                    <span className="update-time">Updated {track.updated}</span>
                    <span className="progress-text">{track.progress}% complete</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
