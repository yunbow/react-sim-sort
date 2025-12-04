import { FC } from 'react';
import { SortStats as Stats, SortComplexity } from '../../../../types';
import styles from './SortStats.module.css';

interface SortStatsProps {
  stats: Stats;
  complexity?: SortComplexity;
  description?: string;
  isCompleted?: boolean;
}

export const SortStats: FC<SortStatsProps> = ({ stats, complexity, description, isCompleted }) => {
  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <div className={styles.statItem}>
          <span className={styles.label}>ステップ数</span>
          <span className={styles.value}>{stats.steps}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.label}>比較回数</span>
          <span className={styles.value}>{stats.comparisons}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.label}>交換回数</span>
          <span className={styles.value}>{stats.swaps}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.label}>実行時間</span>
          <span className={styles.value}>{stats.elapsedTime.toFixed(2)} ms</span>
        </div>
      </div>

      {complexity && (
        <div className={styles.complexity}>
          <h3 className={styles.complexityTitle}>計算量</h3>
          <div className={styles.complexityGrid}>
            <div className={styles.complexityItem}>
              <span className={styles.complexityLabel}>最良</span>
              <span className={styles.complexityValue}>{complexity.best}</span>
            </div>
            <div className={styles.complexityItem}>
              <span className={styles.complexityLabel}>平均</span>
              <span className={styles.complexityValue}>{complexity.average}</span>
            </div>
            <div className={styles.complexityItem}>
              <span className={styles.complexityLabel}>最悪</span>
              <span className={styles.complexityValue}>{complexity.worst}</span>
            </div>
          </div>
        </div>
      )}

      {description && (
        <div className={styles.description}>
          <span className={styles.descriptionLabel}>状態:</span>
          <span className={styles.descriptionText}>{description}</span>
        </div>
      )}

      {isCompleted && <div className={styles.completedBadge}>ソート完了</div>}
    </div>
  );
};
