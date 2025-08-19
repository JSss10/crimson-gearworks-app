import TimelineScroller from "@/components/features/timeline-scroller";
import styles from "@/styles/game-updates/index.module.css";

export default function GameUpdatesPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title} aria-label="Game updates">
        <span>Game</span> updates
      </h1>
      <TimelineScroller />
    </main>
  );
}