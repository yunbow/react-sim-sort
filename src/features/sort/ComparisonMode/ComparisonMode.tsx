import { FC, useState, useEffect, useMemo } from 'react';
import { SortAlgorithm, DataPattern } from '../../../types';
import { useSortSimulator } from '../hooks/useSortSimulator';
import { BarChart } from '../components/BarChart';
import { SortControls } from '../components/SortControls';
import { SortStats } from '../components/SortStats';
import { Select } from '../../../components/Select';
import { SORT_ALGORITHMS } from '../../../types';
import { generateData } from '../utils/dataGenerator';
import styles from './ComparisonMode.module.css';

export const ComparisonMode: FC = () => {
  const [leftAlgorithm, setLeftAlgorithm] = useState<SortAlgorithm>('bubble');
  const [rightAlgorithm, setRightAlgorithm] = useState<SortAlgorithm>('quick');
  const [sharedDataPattern, setSharedDataPattern] = useState<DataPattern>('random');
  const [sharedDataSize, setSharedDataSize] = useState(100);
  const [sharedSpeed, setSharedSpeed] = useState(50);
  const [sharedDataKey, setSharedDataKey] = useState(0);

  const sharedData = useMemo(() => {
    return generateData(sharedDataSize, sharedDataPattern);
  }, [sharedDataSize, sharedDataPattern, sharedDataKey]);

  const left = useSortSimulator(leftAlgorithm);
  const right = useSortSimulator(rightAlgorithm);

  useEffect(() => {
    left.setAlgorithm(leftAlgorithm);
  }, [leftAlgorithm, left]);

  useEffect(() => {
    right.setAlgorithm(rightAlgorithm);
  }, [rightAlgorithm, right]);

  useEffect(() => {
    left.setDataPattern(sharedDataPattern);
    right.setDataPattern(sharedDataPattern);
  }, [sharedDataPattern, left, right]);

  useEffect(() => {
    left.setDataSize(sharedDataSize);
    right.setDataSize(sharedDataSize);
  }, [sharedDataSize, left, right]);

  useEffect(() => {
    left.setSpeed(sharedSpeed);
    right.setSpeed(sharedSpeed);
  }, [sharedSpeed, left, right]);

  useEffect(() => {
    left.setSharedData(sharedData);
    right.setSharedData(sharedData);
  }, [sharedData, left, right]);

  const handleReset = () => {
    setSharedDataKey((prev) => prev + 1);
    left.reset();
    right.reset();
  };

  const handleStart = () => {
    left.start();
    right.start();
  };

  const handlePause = () => {
    left.pause();
    right.pause();
  };

  const handleResume = () => {
    left.resume();
    right.resume();
  };

  const algorithmOptions = Object.entries(SORT_ALGORITHMS).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));

  const isRunning = left.isRunning || right.isRunning;
  const isPaused = left.isPaused && right.isPaused;

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>アルゴリズム比較モード</h1>

      <div className={styles.algorithmSelectors}>
        <Select
          label="左側のアルゴリズム"
          options={algorithmOptions}
          value={leftAlgorithm}
          onChange={(e) => setLeftAlgorithm(e.target.value as SortAlgorithm)}
          disabled={isRunning}
        />
        <Select
          label="右側のアルゴリズム"
          options={algorithmOptions}
          value={rightAlgorithm}
          onChange={(e) => setRightAlgorithm(e.target.value as SortAlgorithm)}
          disabled={isRunning}
        />
      </div>

      <SortControls
        algorithm={leftAlgorithm}
        dataPattern={sharedDataPattern}
        dataSize={sharedDataSize}
        speed={sharedSpeed}
        isRunning={isRunning}
        isPaused={isPaused}
        onAlgorithmChange={setLeftAlgorithm}
        onDataPatternChange={setSharedDataPattern}
        onDataSizeChange={setSharedDataSize}
        onSpeedChange={setSharedSpeed}
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
      />

      <div className={styles.simulators}>
        <div className={styles.simulator}>
          <h2 className={styles.title}>{SORT_ALGORITHMS[leftAlgorithm].name}</h2>
          <BarChart elements={left.elements} />
          <SortStats
            stats={left.stats}
            complexity={SORT_ALGORITHMS[leftAlgorithm].complexity}
            description={left.description}
            isCompleted={left.isCompleted}
          />
        </div>

        <div className={styles.simulator}>
          <h2 className={styles.title}>{SORT_ALGORITHMS[rightAlgorithm].name}</h2>
          <BarChart elements={right.elements} />
          <SortStats
            stats={right.stats}
            complexity={SORT_ALGORITHMS[rightAlgorithm].complexity}
            description={right.description}
            isCompleted={right.isCompleted}
          />
        </div>
      </div>
    </div>
  );
};
