import { DataPattern } from '../../../types';

export function generateData(size: number, pattern: DataPattern): number[] {
  switch (pattern) {
    case 'random':
      return generateRandom(size);
    case 'sorted':
      return generateSorted(size);
    case 'reversed':
      return generateReversed(size);
    case 'duplicates':
      return generateDuplicates(size);
    case 'mountain':
      return generateMountain(size);
    case 'nearlySorted':
      return generateNearlySorted(size);
    default:
      return generateRandom(size);
  }
}

function generateRandom(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * size) + 1);
}

function generateSorted(size: number): number[] {
  return Array.from({ length: size }, (_, i) => i + 1);
}

function generateReversed(size: number): number[] {
  return Array.from({ length: size }, (_, i) => size - i);
}

function generateDuplicates(size: number): number[] {
  const uniqueCount = Math.max(5, Math.floor(size / 10));
  return Array.from({ length: size }, () => Math.floor(Math.random() * uniqueCount) + 1);
}

function generateMountain(size: number): number[] {
  const mid = Math.floor(size / 2);
  return Array.from({ length: size }, (_, i) => {
    if (i <= mid) {
      return i + 1;
    }
    return size - i;
  });
}

function generateNearlySorted(size: number): number[] {
  const sorted = generateSorted(size);
  const swapCount = Math.max(1, Math.floor(size * 0.05));

  for (let i = 0; i < swapCount; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [sorted[idx1], sorted[idx2]] = [sorted[idx2], sorted[idx1]];
  }

  return sorted;
}
