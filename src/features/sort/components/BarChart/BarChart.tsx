import { FC } from 'react';
import { SortElement, ELEMENT_STATE_COLORS } from '../../../../types';
import styles from './BarChart.module.css';

interface BarChartProps {
  elements: SortElement[];
}

export const BarChart: FC<BarChartProps> = ({ elements }) => {
  const maxValue = Math.max(...elements.map((el) => el.value), 1);

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        {elements.map((element, index) => (
          <div
            key={index}
            className={styles.barWrapper}
            style={{
              height: `${(element.value / maxValue) * 100}%`,
            }}
          >
            <div
              className={styles.bar}
              style={{
                backgroundColor: ELEMENT_STATE_COLORS[element.state],
              }}
              title={`値: ${element.value}, 状態: ${element.state}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
