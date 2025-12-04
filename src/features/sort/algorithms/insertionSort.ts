import { SortStep, ElementState } from '../../../types';

export function* insertionSort(arr: number[]): Generator<SortStep> {
  const elements = arr.map((value, index) => ({ value, state: 'default' as ElementState, index }));
  const n = elements.length;
  let comparisons = 0;
  let swaps = 0;

  elements[0].state = 'completed';

  yield {
    elements: elements.map((el) => ({ ...el })),
    comparisons,
    swaps,
    description: '最初の要素はソート済み',
  };

  for (let i = 1; i < n; i++) {
    const key = elements[i].value;
    elements[i].state = 'working';

    yield {
      elements: elements.map((el) => ({ ...el })),
      comparisons,
      swaps,
      description: `${key} を適切な位置に挿入`,
    };

    let j = i - 1;

    while (j >= 0) {
      elements[j].state = 'comparing';
      comparisons++;

      yield {
        elements: elements.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `${key} と ${elements[j].value} を比較`,
      };

      if (elements[j].value <= key) {
        elements[j].state = 'completed';
        break;
      }

      elements[j].state = 'swapping';
      elements[j + 1].state = 'swapping';

      yield {
        elements: elements.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `${elements[j].value} を右に移動`,
      };

      elements[j + 1] = elements[j];
      elements[j].state = 'completed';
      swaps++;
      j--;
    }

    elements[j + 1] = { value: key, state: 'completed', index: j + 1 };

    yield {
      elements: elements.map((el) => ({ ...el })),
      comparisons,
      swaps,
      description: `${key} を位置 ${j + 1} に挿入完了`,
    };
  }

  yield {
    elements: elements.map((el) => ({ ...el })),
    comparisons,
    swaps,
    description: 'ソート完了',
  };
}
