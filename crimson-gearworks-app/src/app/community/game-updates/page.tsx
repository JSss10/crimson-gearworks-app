import TimelineScroller from '@/components/game-updates/timelineScroller';
import styles from '@/styles/gameUpdates.module.css';

export default function GameUpdatesPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>
        <span>Game</span> updates
      </h1>
      <TimelineScroller />
    </main>
  );
}