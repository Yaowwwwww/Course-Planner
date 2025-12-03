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
  Beaker,
  BookOpen,
  Brain,
  LucideIcon
} from 'lucide-react';
import styles from './MainPage.module.css';

interface Track {
  id: number;
  title: string;
  course: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  updated: string;
  progress: number;
  favorite: boolean;
}

type TabType = 'recent' | 'favorites' | 'templates' | 'archive';

const MainPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('recent');

  const tracks: Track[] = [
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
      icon: Beaker,
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

  const [favorites, setFavorites] = useState<Record<number, boolean>>(
    tracks.reduce((acc, track) => {
      acc[track.id] = track.favorite;
      return acc;
    }, {} as Record<number, boolean>)
  );

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className={styles['main-page']}>
      {/* 左侧导航栏 */}
      <aside className={styles.sidebar}>
        <div className={styles['sidebar-header']}>
          <div className={styles.logo}>
            <div className={styles['logo-icon']}>
              <FileText size={24} />
            </div>
            <span className={styles['logo-text']}>Course Planner</span>
          </div>
        </div>

        <nav className={styles['sidebar-nav']}>
          <button
            className={`${styles['nav-item']} ${activeTab === 'recent' ? styles.active : ''}`}
            onClick={() => setActiveTab('recent')}
          >
            <Clock size={20} />
            <span>Recent</span>
          </button>
          <button
            className={`${styles['nav-item']} ${activeTab === 'favorites' ? styles.active : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            <Heart size={20} />
            <span>Favorites</span>
          </button>
          <button
            className={`${styles['nav-item']} ${activeTab === 'templates' ? styles.active : ''}`}
            onClick={() => setActiveTab('templates')}
          >
            <FileText size={20} />
            <span>Templates</span>
          </button>
          <button
            className={`${styles['nav-item']} ${activeTab === 'archive' ? styles.active : ''}`}
            onClick={() => setActiveTab('archive')}
          >
            <Archive size={20} />
            <span>Archive</span>
          </button>
        </nav>
      </aside>

      {/* 主内容区域 */}
      <main className={styles['main-content']}>
        {/* 顶部导航栏 */}
        <header className={styles['top-header']}>
          <div className={styles['header-spacer']}></div>
          <div className={styles['header-actions']}>
            <button className={styles['icon-button']}>
              <Bell size={20} />
            </button>
            <button className={styles['icon-button']}>
              <Settings size={20} />
            </button>
            <div className={styles['user-avatar']}>
              <img
                src="https://via.placeholder.com/40"
                alt="User"
              />
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <div className={styles['content-area']}>
          <div className={styles['welcome-section']}>
            <h1>Hi, Maria!</h1>
            <p>Welcome back to your planner dashboard</p>
          </div>

          <div className={styles['section-header']}>
            <h2>Recent</h2>
            <button className={styles['view-all-btn']}>View all</button>
          </div>

          {/* 课程卡片网格 */}
          <div className={styles['tracks-grid']}>
            {/* New Plan 卡片 */}
            <div className={`${styles['track-card']} ${styles['new-plan-card']}`}>
              <button className={styles['new-plan-button']}>
                <Plus size={32} />
              </button>
              <h3>New Plan</h3>
              <p>Create a 4-year plan</p>
            </div>

            {/* 课程卡片 */}
            {tracks.map(track => {
              const IconComponent = track.icon;
              return (
                <div key={track.id} className={styles['track-card']}>
                  <div className={styles['card-header']}>
                    <div
                      className={styles['card-icon']}
                      style={{ backgroundColor: track.iconBg }}
                    >
                      <IconComponent
                        size={24}
                        style={{ color: track.iconColor }}
                      />
                    </div>
                    <button
                      className={styles['favorite-button']}
                      onClick={() => toggleFavorite(track.id)}
                    >
                      <Heart
                        size={20}
                        fill={favorites[track.id] ? '#f44336' : 'none'}
                        color={favorites[track.id] ? '#f44336' : '#999'}
                      />
                    </button>
                  </div>
                  <h3 className={styles['card-title']}>{track.title}</h3>
                  <p className={styles['card-course']}>{track.course}</p>
                  <div className={styles['card-footer']}>
                    <span className={styles['update-time']}>Updated {track.updated}</span>
                    <span className={styles['progress-text']}>{track.progress}% complete</span>
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
