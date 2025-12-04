import type { Meta, StoryObj } from '@storybook/react';
import { BarChart } from './BarChart';
import '../../../../theme.css';

const meta: Meta<typeof BarChart> = {
  title: 'Features/BarChart',
  component: BarChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BarChart>;

export const Default: Story = {
  args: {
    elements: Array.from({ length: 20 }, (_, i) => ({
      value: Math.floor(Math.random() * 100) + 1,
      state: 'default' as const,
      index: i,
    })),
  },
};

export const WithComparing: Story = {
  args: {
    elements: Array.from({ length: 20 }, (_, i) => ({
      value: Math.floor(Math.random() * 100) + 1,
      state: i === 5 || i === 10 ? ('comparing' as const) : ('default' as const),
      index: i,
    })),
  },
};

export const WithSwapping: Story = {
  args: {
    elements: Array.from({ length: 20 }, (_, i) => ({
      value: Math.floor(Math.random() * 100) + 1,
      state: i === 7 || i === 12 ? ('swapping' as const) : ('default' as const),
      index: i,
    })),
  },
};

export const WithPivot: Story = {
  args: {
    elements: Array.from({ length: 20 }, (_, i) => ({
      value: Math.floor(Math.random() * 100) + 1,
      state: i === 15 ? ('pivot' as const) : ('default' as const),
      index: i,
    })),
  },
};

export const Completed: Story = {
  args: {
    elements: Array.from({ length: 20 }, (_, i) => ({
      value: i + 1,
      state: 'completed' as const,
      index: i,
    })),
  },
};
