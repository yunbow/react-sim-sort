import type { Meta, StoryObj } from '@storybook/react';
import { SortSimulator } from './SortSimulator';
import '../../../theme.css';

const meta: Meta<typeof SortSimulator> = {
  title: 'Features/SortSimulator',
  component: SortSimulator,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SortSimulator>;

export const BubbleSort: Story = {
  args: {
    initialAlgorithm: 'bubble',
  },
};

export const SelectionSort: Story = {
  args: {
    initialAlgorithm: 'selection',
  },
};

export const InsertionSort: Story = {
  args: {
    initialAlgorithm: 'insertion',
  },
};

export const QuickSort: Story = {
  args: {
    initialAlgorithm: 'quick',
  },
};

export const MergeSort: Story = {
  args: {
    initialAlgorithm: 'merge',
  },
};
