import { SortAlgorithm, SortStep } from '../../../types';
import { bubbleSort } from './bubbleSort';
import { selectionSort } from './selectionSort';
import { insertionSort } from './insertionSort';
import { quickSort } from './quickSort';
import { mergeSort } from './mergeSort';

export function getSortAlgorithm(
  algorithm: SortAlgorithm,
  data: number[]
): Generator<SortStep> {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort(data);
    case 'selection':
      return selectionSort(data);
    case 'insertion':
      return insertionSort(data);
    case 'quick':
      return quickSort(data);
    case 'merge':
      return mergeSort(data);
    default:
      return bubbleSort(data);
  }
}

export { bubbleSort, selectionSort, insertionSort, quickSort, mergeSort };
