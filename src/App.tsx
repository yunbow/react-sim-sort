import { useState } from 'react';
import { SortSimulator } from './features/sort/SortSimulator';
import { ComparisonMode } from './features/sort/ComparisonMode';
import { Button } from './components/Button';
import './theme.css';
import './App.css';

type ViewMode = 'single' | 'comparison';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('single');

  return (
    <div>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>
          ソートアルゴリズム シミュレーター
        </h1>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button
            variant={viewMode === 'single' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('single')}
          >
            シングルモード
          </Button>
          <Button
            variant={viewMode === 'comparison' ? 'primary' : 'secondary'}
            onClick={() => setViewMode('comparison')}
          >
            比較モード
          </Button>
        </div>
      </header>

      <main>
        {viewMode === 'single' ? <SortSimulator /> : <ComparisonMode />}
      </main>
    </div>
  );
}

export default App;
