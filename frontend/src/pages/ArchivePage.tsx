import { Heart, Archive } from 'lucide-react';
import { Track } from '../types/Track';
import styles from '../styles/MainPage.module.css';

interface ArchivePageProps {
  tracks: Track[];
  favorites: Record<number, boolean>;
  toggleFavorite: (id: number) => void;
  toggleArchive: (id: number) => void;
}

const ArchivePage = ({ tracks, favorites, toggleFavorite, toggleArchive }: ArchivePageProps) => {
  const archivedTracks = tracks.filter(track => track.archived);

  if (archivedTracks.length === 0) {
    return (
      <div
        style={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          padding: '60px 20px',
          color: '#9ca3af',
        }}
      >
        <Archive size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
        <p style={{ fontSize: '18px', marginBottom: '8px' }}>No archived tracks</p>
        <p style={{ fontSize: '14px' }}>Archive tracks you're not currently working on</p>
      </div>
    );
  }

  return (
    <>
      {archivedTracks.map(track => {
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
                  title="Unarchive"
                >
                  <Archive size={20} fill="#6b7280" color="#6b7280" />
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

export default ArchivePage;
