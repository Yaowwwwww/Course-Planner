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
  LucideIcon,
} from 'lucide-react';
import { Track, TrackFromAPI, TabType } from '../types/Track';
import RecentPage from './RecentPage';
import FavoritesPage from './FavoritesPage';
import ArchivePage from './ArchivePage';
import styles from '../styles/MainPage.module.css';

const API_BASE_URL = 'http://localhost:5001/api';

// 图标名称到组件的映射
const iconMap: Record<string, LucideIcon> = {
  Computer,
  Calculator,
  Beaker,
  BookOpen,
  Brain,
};

// 将时间戳转换为 "X days ago" 格式
const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return '1 week ago';
  return `${Math.floor(days / 7)} weeks ago`;
};

// 将 API 返回的数据转换为前端使用的格式
const transformTrackData = (apiTrack: TrackFromAPI): Track => ({
  id: apiTrack._id,
  title: apiTrack.title,
  course: apiTrack.Field,
  icon: iconMap[apiTrack.iconName] || Computer,
  iconBg: apiTrack.iconBg,
  iconColor: apiTrack.iconColor,
  updated: formatTimeAgo(apiTrack['Update-Date']),
  progress: apiTrack['Percent-Complete'],
  favorite: apiTrack.like,
  archived: apiTrack.archive,
});

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

  // 获取 tracks 数据的函数
  const fetchTracks = async () => {
    try {
      setLoading(true);
      const response = await axios.get<TrackFromAPI[]>(`${API_BASE_URL}/tracks`);
      const transformedTracks = response.data.map(transformTrackData);
      setTracks(transformedTracks);
    } catch (error) {
      console.error('获取tracks数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 页面加载时获取tracks数据
  useEffect(() => {
    fetchTracks();
  }, []);

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // 当tracks数据加载完成后,初始化favorites
  useEffect(() => {
    if (tracks.length > 0) {
      const initialFavorites = tracks.reduce((acc, track) => {
        acc[track.id] = track.favorite;
        return acc;
      }, {} as Record<string, boolean>);
      setFavorites(initialFavorites);
    }
  }, [tracks]);

  // 切换收藏状态 - 调用 API
  const toggleFavorite = async (id: string) => {
    console.log('toggleFavorite 被调用, id:', id);
    try {
      // 先乐观更新 UI
      setFavorites(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
      
      // 调用 API
      console.log('正在调用 API:', `${API_BASE_URL}/tracks/${id}/like`);
      const response = await axios.patch(`${API_BASE_URL}/tracks/${id}/like`);
      console.log('API 响应:', response.data);
      
      // 更新 tracks 状态
      setTracks(prevTracks =>
        prevTracks.map(track =>
          track.id === id ? { ...track, favorite: !track.favorite } : track
        )
      );
    } catch (error) {
      console.error('切换收藏状态失败:', error);
      // 回滚 UI
      setFavorites(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  // 切换归档状态 - 调用 API
  const toggleArchive = async (id: string) => {
    console.log('toggleArchive 被调用, id:', id);
    try {
      // 先乐观更新 UI
      setTracks(prevTracks =>
        prevTracks.map(track =>
          track.id === id ? { ...track, archived: !track.archived } : track
        )
      );
      
      // 调用 API
      console.log('正在调用 API:', `${API_BASE_URL}/tracks/${id}/archive`);
      const response = await axios.patch(`${API_BASE_URL}/tracks/${id}/archive`);
      console.log('API 响应:', response.data);
    } catch (error) {
      console.error('切换归档状态失败:', error);
      // 回滚 UI
      setTracks(prevTracks =>
        prevTracks.map(track =>
          track.id === id ? { ...track, archived: !track.archived } : track
        )
      );
    }
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
