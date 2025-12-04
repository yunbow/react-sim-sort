import { SortStep, SortElement, ElementState } from '../../../types';

export function* quickSort(arr: number[]): Generator<SortStep> {
  const elements = arr.map((value, index) => ({ value, state: 'default' as ElementState, index }));
  let comparisons = 0;
  let swaps = 0;

  yield* quickSortHelper(elements, 0, elements.length - 1);

  for (let i = 0; i < elements.length; i++) {
    elements[i].state = 'completed';
  }

  yield {
    elements: elements.map((el) => ({ ...el })),
    comparisons,
    swaps,
    description: 'ソート完了',
  };

  function* quickSortHelper(
    arr: SortElement[],
    low: number,
    high: number
  ): Generator<SortStep> {
    if (low < high) {
      const pi = yield* partition(arr, low, high);
      yield* quickSortHelper(arr, low, pi - 1);
      yield* quickSortHelper(arr, pi + 1, high);
    }
  }

  function* partition(arr: SortElement[], low: number, high: number): Generator<SortStep, number> {
    const pivot = arr[high].value;
    arr[high].state = 'pivot';

    yield {
      elements: arr.map((el) => ({ ...el })),
      comparisons,
      swaps,
      description: `ピボット: ${pivot}`,
    };

    let i = low - 1;

    for (let j = low; j < high; j++) {
      arr[j].state = 'comparing';
      comparisons++;

      yield {
        elements: arr.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `${arr[j].value} とピボット ${pivot} を比較`,
      };

      if (arr[j].value < pivot) {
        i++;

        if (i !== j) {
          arr[i].state = 'swapping';
          arr[j].state = 'swapping';

          yield {
            elements: arr.map((el) => ({ ...el })),
            comparisons,
            swaps,
            description: `${arr[i].value} と ${arr[j].value} を交換`,
          };

          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
        }

        if (i < high) arr[i].state = 'default';
        if (j < high) arr[j].state = 'default';
      } else {
        arr[j].state = 'default';
      }
    }

    i++;
    arr[i].state = 'swapping';
    arr[high].state = 'swapping';

    yield {
      elements: arr.map((el) => ({ ...el })),
      comparisons,
      swaps,
      description: `ピボット ${pivot} を位置 ${i} に配置`,
    };

    [arr[i], arr[high]] = [arr[high], arr[i]];
    swaps++;

    arr[i].state = 'completed';

    return i;
  }
}
