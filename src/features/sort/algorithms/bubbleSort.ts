import { SortStep, ElementState } from '../../../types';

export function* bubbleSort(arr: number[]): Generator<SortStep> {
  const elements = arr.map((value, index) => ({ value, state: 'default' as ElementState, index }));
  const n = elements.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      elements[j].state = 'comparing';
      elements[j + 1].state = 'comparing';

      comparisons++;
      yield {
        elements: elements.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `要素 ${elements[j].value} と ${elements[j + 1].value} を比較`,
      };

      if (elements[j].value > elements[j + 1].value) {
        elements[j].state = 'swapping';
        elements[j + 1].state = 'swapping';

        yield {
          elements: elements.map((el) => ({ ...el })),
          comparisons,
          swaps,
          description: `要素 ${elements[j].value} と ${elements[j + 1].value} を交換`,
        };

        [elements[j], elements[j + 1]] = [elements[j + 1], elements[j]];
        swaps++;
        swapped = true;
      }

      elements[j].state = 'default';
      elements[j + 1].state = 'default';
    }

    elements[n - i - 1].state = 'completed';

    if (!swapped) {
      for (let k = 0; k < n - i - 1; k++) {
        elements[k].state = 'completed';
      }
      break;
    }
  }

  for (let i = 0; i < n; i++) {
    elements[i].state = 'completed';
  }

  yield {
    elements: elements.map((el) => ({ ...el })),
    comparisons,
    swaps,
    description: 'ソート完了',
  };
}
