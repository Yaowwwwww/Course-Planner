import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import {
  Clock,
  Heart,
  FileText,
  Archive,
  Bell,
  Settings,
  Computer,
  Calculator,
  Beaker,
  BookOpen,
  Brain,
} from 'lucide-react';
import { Track, TabType } from '../types/Track';
import RecentPage from './RecentPage';
import FavoritesPage from './FavoritesPage';
import ArchivePage from './ArchivePage';
import styles from '../styles/MainPage.module.css';

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 根据URL路径确定当前tab
  const getActiveTab = (): TabType => {
    const path = location.pathname;
    if (path === '/favorites') return 'favorites';
    if (path === '/archive') return 'archive';
    return 'recent';
  };

  const [activeTab, setActiveTab] = useState<TabType>(getActiveTab());
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  // 监听URL变化,更新activeTab
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  // 模拟数据 - 后端API准备好后会替换
  const mockTracks: Track[] = [
    {
      id: 1,
      title: 'Track 1',
      course: 'Computer Science',
      icon: Computer,
      iconBg: '#E3F2FD',
      iconColor: '#2196F3',
      updated: '2 days ago',
      progress: 75,
      favorite: false,
      archived: false
    },
    {
      id: 2,
      title: 'Track 2',
      course: 'Data Science',
      icon: Calculator,
      iconBg: '#E8F5E9',
      iconColor: '#4CAF50',
      updated: '1 week ago',
      progress: 60,
      favorite: true,
      archived: false
    },
    {
      id: 3,
      title: 'Track 3',
      course: 'Mathematics',
      icon: Calculator,
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
      updated: '3 days ago',
      progress: 45,
      favorite: false,
      archived: false
    },
    {
      id: 4,
      title: 'Track 4',
      course: 'Music',
      icon: BookOpen,
      iconBg: '#FECDD3',
      iconColor: '#F43F5E',
      updated: '5 days ago',
      progress: 90,
      favorite: true,
      archived: false
    },
    {
      id: 5,
      title: 'Track 5',
      course: 'Art',
      icon: Beaker,
      iconBg: '#DDD6FE',
      iconColor: '#8B5CF6',
      updated: '1 week ago',
      progress: 30,
      favorite: false,
      archived: false
    },
    {
      id: 6,
      title: 'Track 6',
      course: 'Cognitive Science',
      icon: Brain,
      iconBg: '#EDE7F6',
      iconColor: '#673AB7',
      updated: '4 days ago',
      progress: 55,
      favorite: false,
      archived: false
    }
  ];

  // useEffect: 页面加载时获取tracks数据
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);

        // TODO: 后端API准备好后,取消注释并填入正确的URL
        // const response = await axios.get('YOUR_API_URL_HERE/tracks');
        // setTracks(response.data);

        // 暂时使用模拟数据
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        setTracks(mockTracks);

      } catch (error) {
        console.error('获取tracks数据失败:', error);
        // 出错时使用模拟数据
        setTracks(mockTracks);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []); // [] 表示只在组件加载时执行一次

  const [favorites, setFavorites] = useState<Record<number, boolean>>({});

  // 当tracks数据加载完成后,初始化favorites
  useEffect(() => {
    if (tracks.length > 0) {
      const initialFavorites = tracks.reduce((acc, track) => {
        acc[track.id] = track.favorite;
        return acc;
      }, {} as Record<number, boolean>);
      setFavorites(initialFavorites);
    }
  }, [tracks]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleArchive = (id: number) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === id ? { ...track, archived: !track.archived } : track
      )
    );
  };

  // 加载中状态
  if (loading) {
    return (
      <div className={styles['main-page']}>
        <aside className={styles.sidebar}>
          <div className={styles['sidebar-header']}>
            <div className={styles.logo}>
              <div className={styles['logo-icon']}>
                <FileText size={24} />
              </div>
              <span className={styles['logo-text']}>Course Planner</span>
            </div>
          </div>
        </aside>
        <main className={styles['main-content']}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '18px', color: '#6b7280' }}>加载中...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
            onClick={() => navigate('/')}
          >
            <Clock size={20} />
            <span>Recent</span>
          </button>
          <button
            className={`${styles['nav-item']} ${activeTab === 'favorites' ? styles.active : ''}`}
            onClick={() => navigate('/favorites')}
          >
            <Heart size={20} />
            <span>Favorites</span>
          </button>
          <button
            className={`${styles['nav-item']} ${activeTab === 'archive' ? styles.active : ''}`}
            onClick={() => navigate('/archive')}
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
            <h1>Hi, Student!</h1>
            <p>Welcome back to your planner dashboard</p>
          </div>

          <div className={styles['section-header']}>
            <h2>
              {activeTab === 'recent' && 'Recent'}
              {activeTab === 'favorites' && 'Favorites'}
              {activeTab === 'archive' && 'Archive'}
            </h2>
            <button className={styles['view-all-btn']}>View all</button>
          </div>

          {/* 课程卡片网格 */}
          <div className={styles['tracks-grid']}>
            {activeTab === 'recent' && (
              <RecentPage
                tracks={tracks}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                toggleArchive={toggleArchive}
              />
            )}
            {activeTab === 'favorites' && (
              <FavoritesPage
                tracks={tracks}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                toggleArchive={toggleArchive}
              />
            )}
            {activeTab === 'archive' && (
              <ArchivePage
                tracks={tracks}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                toggleArchive={toggleArchive}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
