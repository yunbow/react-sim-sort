import { FC } from 'react';
import { SortAlgorithm, SORT_ALGORITHMS } from '../../../types';
import { useSortSimulator } from '../hooks/useSortSimulator';
import { BarChart } from '../components/BarChart';
import { SortControls } from '../components/SortControls';
import { SortStats } from '../components/SortStats';
import styles from './SortSimulator.module.css';

interface SortSimulatorProps {
  initialAlgorithm?: SortAlgorithm;
}

export const SortSimulator: FC<SortSimulatorProps> = ({ initialAlgorithm = 'bubble' }) => {
  const {
    algorithm,
    dataPattern,
    dataSize,
    speed,
    isRunning,
    isPaused,
    isCompleted,
    elements,
    stats,
    description,
    setAlgorithm,
    setDataPattern,
    setDataSize,
    setSpeed,
    start,
    pause,
    resume,
    reset,
  } = useSortSimulator(initialAlgorithm);

  const complexity = SORT_ALGORITHMS[algorithm].complexity;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{SORT_ALGORITHMS[algorithm].name}</h2>
      <BarChart elements={elements} />
      <SortControls
        algorithm={algorithm}
        dataPattern={dataPattern}
        dataSize={dataSize}
        speed={speed}
        isRunning={isRunning}
        isPaused={isPaused}
        onAlgorithmChange={setAlgorithm}
        onDataPatternChange={setDataPattern}
        onDataSizeChange={setDataSize}
        onSpeedChange={setSpeed}
        onStart={start}
        onPause={pause}
        onResume={resume}
        onReset={reset}
      />
      <SortStats
        stats={stats}
        complexity={complexity}
        description={description}
        isCompleted={isCompleted}
      />
    </div>
  );
};
