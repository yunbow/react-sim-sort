import { SortStep, SortElement, ElementState } from '../../../types';

export function* mergeSort(arr: number[]): Generator<SortStep> {
  const elements = arr.map((value, index) => ({ value, state: 'default' as ElementState, index }));
  let comparisons = 0;
  let swaps = 0;

  yield* mergeSortHelper(elements, 0, elements.length - 1);

  for (let i = 0; i < elements.length; i++) {
    elements[i].state = 'completed';
  }

  yield {
    elements: elements.map((el) => ({ ...el })),
    comparisons,
    swaps,
    description: 'ソート完了',
  };

  function* mergeSortHelper(
    arr: SortElement[],
    left: number,
    right: number
  ): Generator<SortStep> {
    if (left >= right) {
      return;
    }

    const mid = Math.floor((left + right) / 2);

    yield* mergeSortHelper(arr, left, mid);
    yield* mergeSortHelper(arr, mid + 1, right);
    yield* merge(arr, left, mid, right);
  }

  function* merge(
    arr: SortElement[],
    left: number,
    mid: number,
    right: number
  ): Generator<SortStep> {
    const leftArr: SortElement[] = [];
    const rightArr: SortElement[] = [];

    for (let i = left; i <= mid; i++) {
      leftArr.push({ ...arr[i] });
      arr[i].state = 'working';
    }

    for (let i = mid + 1; i <= right; i++) {
      rightArr.push({ ...arr[i] });
      arr[i].state = 'comparing';
    }

    yield {
      elements: arr.map((el) => ({ ...el })),
      comparisons,
      swaps,
      description: `範囲 [${left}, ${mid}] と [${mid + 1}, ${right}] をマージ`,
    };

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;

      yield {
        elements: arr.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `左配列の ${leftArr[i].value} と右配列の ${rightArr[j].value} を比較`,
      };

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = { ...leftArr[i], state: 'swapping', index: k };
        i++;
      } else {
        arr[k] = { ...rightArr[j], state: 'swapping', index: k };
        j++;
      }

      swaps++;

      yield {
        elements: arr.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `位置 ${k} に ${arr[k].value} を配置`,
      };

      arr[k].state = 'default';
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = { ...leftArr[i], state: 'swapping', index: k };
      yield {
        elements: arr.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `残りの左配列を配置: ${arr[k].value}`,
      };
      arr[k].state = 'default';
      i++;
      k++;
      swaps++;
    }

    while (j < rightArr.length) {
      arr[k] = { ...rightArr[j], state: 'swapping', index: k };
      yield {
        elements: arr.map((el) => ({ ...el })),
        comparisons,
        swaps,
        description: `残りの右配列を配置: ${arr[k].value}`,
      };
      arr[k].state = 'default';
      j++;
      k++;
      swaps++;
    }
  }
}
