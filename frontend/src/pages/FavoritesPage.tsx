import { Heart, Archive } from 'lucide-react';
import { Track } from '../types/Track';
import styles from '../styles/MainPage.module.css';

interface FavoritesPageProps {
  tracks: Track[];
  favorites: Record<string, boolean>;
  toggleFavorite: (id: string) => void | Promise<void>;
  toggleArchive: (id: string) => void | Promise<void>;
}

const FavoritesPage = ({ tracks, favorites, toggleFavorite, toggleArchive }: FavoritesPageProps) => {
  const favoriteTracks = tracks.filter(track => favorites[track.id] && !track.archived);

  if (favoriteTracks.length === 0) {
    return (
      <div
        style={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          padding: '60px 20px',
          color: '#9ca3af',
        }}
      >
        <Heart size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
        <p style={{ fontSize: '18px', marginBottom: '8px' }}>No favorites yet</p>
        <p style={{ fontSize: '14px' }}>
          Click the heart icon on any track to add it to your favorites
        </p>
      </div>
    );
  }

  return (
    <>
      {favoriteTracks.map(track => {
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
                  title="Remove from favorites"
                >
                  <Heart size={20} fill="#f44336" color="#f44336" />
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

export default FavoritesPage;
