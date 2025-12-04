import { FC } from 'react';
import { SortAlgorithm, DataPattern, SORT_ALGORITHMS, DATA_PATTERNS } from '../../../../types';
import { Button } from '../../../../components/Button';
import { Select } from '../../../../components/Select';
import { Input } from '../../../../components/Input';
import { Slider } from '../../../../components/Slider';
import styles from './SortControls.module.css';

interface SortControlsProps {
  algorithm: SortAlgorithm;
  dataPattern: DataPattern;
  dataSize: number;
  speed: number;
  isRunning: boolean;
  isPaused: boolean;
  onAlgorithmChange: (algorithm: SortAlgorithm) => void;
  onDataPatternChange: (pattern: DataPattern) => void;
  onDataSizeChange: (size: number) => void;
  onSpeedChange: (speed: number) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export const SortControls: FC<SortControlsProps> = ({
  algorithm,
  dataPattern,
  dataSize,
  speed,
  isRunning,
  isPaused,
  onAlgorithmChange,
  onDataPatternChange,
  onDataSizeChange,
  onSpeedChange,
  onStart,
  onPause,
  onResume,
  onReset,
}) => {
  const algorithmOptions = Object.entries(SORT_ALGORITHMS).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));

  const patternOptions = Object.entries(DATA_PATTERNS).map(([key, value]) => ({
    value: key,
    label: value,
  }));

  const handleDataSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= 1000) {
      onDataSizeChange(value);
    }
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSpeedChange(parseInt(e.target.value, 10));
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Select
          label="アルゴリズム"
          options={algorithmOptions}
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value as SortAlgorithm)}
          disabled={isRunning}
        />
        <Select
          label="データパターン"
          options={patternOptions}
          value={dataPattern}
          onChange={(e) => onDataPatternChange(e.target.value as DataPattern)}
          disabled={isRunning}
        />
        <Input
          label="データサイズ"
          type="number"
          min="10"
          max="1000"
          value={dataSize}
          onChange={handleDataSizeChange}
          disabled={isRunning}
        />
      </div>
      <Slider
        label="アニメーション速度"
        min="1"
        max="100"
        value={speed}
        onChange={handleSpeedChange}
        showValue
      />
      <div className={styles.buttonGroup}>
        {!isRunning ? (
          <Button onClick={onStart}>実行</Button>
        ) : isPaused ? (
          <Button onClick={onResume}>再開</Button>
        ) : (
          <Button onClick={onPause}>一時停止</Button>
        )}
        <Button onClick={onReset} variant="secondary">
          リセット
        </Button>
      </div>
    </div>
  );
};
