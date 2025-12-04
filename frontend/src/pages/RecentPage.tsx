import { Heart, Archive, Plus } from 'lucide-react';
import { Track } from '../types/Track';
import styles from '../styles/MainPage.module.css';

interface RecentPageProps {
  tracks: Track[];
  favorites: Record<number, boolean>;
  toggleFavorite: (id: number) => void;
  toggleArchive: (id: number) => void;
}

const RecentPage = ({ tracks, favorites, toggleFavorite, toggleArchive }: RecentPageProps) => {
  const recentTracks = tracks.filter(track => !track.archived);

  return (
    <>
      {/* New Plan 卡片 */}
      <div className={`${styles['track-card']} ${styles['new-plan-card']}`}>
        <button className={styles['new-plan-button']}>
          <Plus size={32} />
        </button>
        <h3>New Plan</h3>
        <p>Create a 4-year plan</p>
      </div>

      {/* 课程卡片 */}
      {recentTracks.map(track => {
        const IconComponent = track.icon;
        return (
          <div key={track.id} className={styles['track-card']}>
            <div className={styles['card-header']}>
              <div className={styles['card-icon']} style={{ backgroundColor: track.iconBg }}>
                <IconComponent size={24} style={{ color: track.iconColor }} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className={styles['favorite-button']}
                  onClick={() => toggleFavorite(track.id)}
                  title={favorites[track.id] ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    size={20}
                    fill={favorites[track.id] ? '#f44336' : 'none'}
                    color={favorites[track.id] ? '#f44336' : '#999'}
                  />
                </button>
                <button
                  className={styles['favorite-button']}
                  onClick={() => toggleArchive(track.id)}
                  title="Archive"
                >
                  <Archive size={20} fill="none" color="#999" />
                </button>
              </div>
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
    </>
  );
};

export default RecentPage;
