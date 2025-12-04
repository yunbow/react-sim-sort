import { useState, useRef, useCallback, useEffect } from 'react';
import { SortAlgorithm, DataPattern, SortElement, SortStats, SortStep, ElementState } from '../../../types';
import { generateData } from '../utils/dataGenerator';
import { getSortAlgorithm } from '../algorithms';

export function useSortSimulator(initialAlgorithm: SortAlgorithm = 'bubble') {
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>(initialAlgorithm);
  const [dataPattern, setDataPattern] = useState<DataPattern>('random');
  const [dataSize, setDataSize] = useState(100);
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [elements, setElements] = useState<SortElement[]>([]);
  const [stats, setStats] = useState<SortStats>({
    comparisons: 0,
    swaps: 0,
    elapsedTime: 0,
    steps: 0,
  });
  const [description, setDescription] = useState('');
  const [sharedData, setSharedDataState] = useState<number[] | null>(null);

  const generatorRef = useRef<Generator<SortStep> | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);

  const initializeData = useCallback(() => {
    const data = sharedData || generateData(dataSize, dataPattern);
    const initialElements = data.map((value, index) => ({
      value,
      state: 'default' as ElementState,
      index,
    }));
    setElements(initialElements);
    setStats({
      comparisons: 0,
      swaps: 0,
      elapsedTime: 0,
      steps: 0,
    });
    setDescription('');
    setIsCompleted(false);
  }, [dataSize, dataPattern, sharedData]);

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const start = useCallback(() => {
    if (isRunning) return;

    const data = elements.map((el) => el.value);
    generatorRef.current = getSortAlgorithm(algorithm, data);
    setIsRunning(true);
    setIsPaused(false);
    setIsCompleted(false);
    startTimeRef.current = performance.now();
    pausedTimeRef.current = 0;

    const animate = () => {
      if (!generatorRef.current) return;

      const result = generatorRef.current.next();

      if (!result.done) {
        const step = result.value;
        setElements(step.elements);
        setStats((prev) => ({
          ...prev,
          comparisons: step.comparisons,
          swaps: step.swaps,
          steps: prev.steps + 1,
          elapsedTime: performance.now() - startTimeRef.current - pausedTimeRef.current,
        }));
        setDescription(step.description);

        const delay = Math.max(10, 200 - speed * 2);
        animationRef.current = window.setTimeout(animate, delay);
      } else {
        setIsRunning(false);
        setIsCompleted(true);
        setStats((prev) => ({
          ...prev,
          elapsedTime: performance.now() - startTimeRef.current - pausedTimeRef.current,
        }));
      }
    };

    animate();
  }, [algorithm, elements, isRunning, speed]);

  const pause = useCallback(() => {
    if (!isRunning || isPaused) return;

    if (animationRef.current !== null) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    setIsPaused(true);
    pausedTimeRef.current += performance.now() - startTimeRef.current - pausedTimeRef.current;
  }, [isRunning, isPaused]);

  const resume = useCallback(() => {
    if (!isRunning || !isPaused) return;

    setIsPaused(false);
    startTimeRef.current = performance.now();

    const animate = () => {
      if (!generatorRef.current) return;

      const result = generatorRef.current.next();

      if (!result.done) {
        const step = result.value;
        setElements(step.elements);
        setStats((prev) => ({
          ...prev,
          comparisons: step.comparisons,
          swaps: step.swaps,
          steps: prev.steps + 1,
          elapsedTime: pausedTimeRef.current + (performance.now() - startTimeRef.current),
        }));
        setDescription(step.description);

        const delay = Math.max(10, 200 - speed * 2);
        animationRef.current = window.setTimeout(animate, delay);
      } else {
        setIsRunning(false);
        setIsCompleted(true);
        setStats((prev) => ({
          ...prev,
          elapsedTime: pausedTimeRef.current + (performance.now() - startTimeRef.current),
        }));
      }
    };

    animate();
  }, [isRunning, isPaused, speed]);

  const reset = useCallback(() => {
    if (animationRef.current !== null) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }

    generatorRef.current = null;
    setIsRunning(false);
    setIsPaused(false);
    initializeData();
  }, [initializeData]);

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const setSharedData = useCallback((data: number[] | null) => {
    setSharedDataState(data);
  }, []);

  return {
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
    setSharedData,
    start,
    pause,
    resume,
    reset,
  };
}
