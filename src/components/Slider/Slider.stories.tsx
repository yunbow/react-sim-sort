import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    value: 50,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Speed',
    min: 0,
    max: 100,
    value: 50,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Speed',
    min: 0,
    max: 100,
    value: 75,
    showValue: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Slider',
    min: 0,
    max: 100,
    value: 50,
    disabled: true,
  },
};
