export type SortAlgorithm =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'quick'
  | 'merge';

export type DataPattern =
  | 'random'
  | 'sorted'
  | 'reversed'
  | 'duplicates'
  | 'mountain'
  | 'nearlySorted';

export type ElementState =
  | 'default'
  | 'comparing'
  | 'swapping'
  | 'working'
  | 'pivot'
  | 'completed';

export interface SortElement {
  value: number;
  state: ElementState;
  index: number;
}

export interface SortStep {
  elements: SortElement[];
  comparisons: number;
  swaps: number;
  description: string;
}

export interface SortStats {
  comparisons: number;
  swaps: number;
  elapsedTime: number;
  steps: number;
}

export interface SortComplexity {
  worst: string;
  average: string;
  best: string;
}

export const SORT_ALGORITHMS: Record<SortAlgorithm, { name: string; complexity: SortComplexity }> = {
  bubble: {
    name: 'バブルソート',
    complexity: { worst: 'O(n²)', average: 'O(n²)', best: 'O(n)' },
  },
  selection: {
    name: '選択ソート',
    complexity: { worst: 'O(n²)', average: 'O(n²)', best: 'O(n²)' },
  },
  insertion: {
    name: '挿入ソート',
    complexity: { worst: 'O(n²)', average: 'O(n²)', best: 'O(n)' },
  },
  quick: {
    name: 'クイックソート',
    complexity: { worst: 'O(n²)', average: 'O(n log n)', best: 'O(n log n)' },
  },
  merge: {
    name: 'マージソート',
    complexity: { worst: 'O(n log n)', average: 'O(n log n)', best: 'O(n log n)' },
  },
};

export const DATA_PATTERNS: Record<DataPattern, string> = {
  random: 'ランダム',
  sorted: 'ソート済み',
  reversed: '逆順',
  duplicates: '重複が多い',
  mountain: '山型',
  nearlySorted: 'ほぼソート済み',
};

export const ELEMENT_STATE_COLORS: Record<ElementState, string> = {
  default: 'var(--color-default)',
  comparing: 'var(--color-comparing)',
  swapping: 'var(--color-swapping)',
  working: 'var(--color-working)',
  pivot: 'var(--color-pivot)',
  completed: 'var(--color-completed)',
};
