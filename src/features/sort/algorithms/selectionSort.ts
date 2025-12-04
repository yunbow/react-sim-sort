import { SortStep, ElementState } from '../../../types';

export function* selectionSort(arr: number[]): Generator<SortStep> {
  const elements = arr.map((value, index) => ({ value, state: 'default' as ElementState, index }));
  const n = elements.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    elements[i].state = 'working';

    yield {
      elements: elements.map((el) => ({ ...el })),
      comparisons,
      swaps,
      description: `位置 ${i} から最小値を探索`,
    };

    for (let j = i + 1; j < n; j++) {
      elements[j].state = 'comparing';
      comparisons++;

      yield {
        elements: elements.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `最小値候補: ${elements[minIdx].value}, 比較中: ${elements[j].value}`,
      };

      if (elements[j].value < elements[minIdx].value) {
        if (minIdx !== i) {
          elements[minIdx].state = 'default';
        }
        minIdx = j;
        elements[minIdx].state = 'working';
      } else {
        elements[j].state = 'default';
      }
    }

    if (minIdx !== i) {
      elements[i].state = 'swapping';
      elements[minIdx].state = 'swapping';

      yield {
        elements: elements.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `最小値 ${elements[minIdx].value} を位置 ${i} に移動`,
      };

      [elements[i], elements[minIdx]] = [elements[minIdx], elements[i]];
      swaps++;
    }

    elements[i].state = 'completed';
    if (minIdx !== i) {
      elements[minIdx].state = 'default';
    }
  }

  elements[n - 1].state = 'completed';

  yield {
    elements: elements.map((el) => ({ ...el })),
    comparisons,
    swaps,
    description: 'ソート完了',
  };
}
