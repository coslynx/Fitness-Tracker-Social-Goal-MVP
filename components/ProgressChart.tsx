import { useStore } from '@/store';
import { LineController, LineElement, CategoryScale, Chart } from 'chart.js';
import { useState, useEffect } from 'react';

Chart.register(LineController, LineElement, CategoryScale);

interface ProgressChartProps {
  goalId: number;
}

const ProgressChart = ({ goalId }: ProgressChartProps) => {
  const store = useStore();
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: { label: string; data: number[] }[] }>({
    labels: [],
    datasets: [{ label: 'Progress', data: [] }],
  });

  useEffect(() => {
    const goal = store.goals.find((g) => g.id === goalId);

    if (!goal) {
      return;
    }

    const workouts = store.workouts.filter((w) => w.userId === goal.userId);

    if (workouts.length === 0) {
      return;
    }

    const labels: string[] = workouts.map((w) => w.date.toLocaleDateString());
    const progressData = workouts.map((w) => w.calories);

    setChartData({
      labels,
      datasets: [{ label: 'Progress', data: progressData }],
    });
  }, [goalId, store.goals, store.workouts]);

  useEffect(() => {
    const chartCanvas = document.getElementById('progressChart') as HTMLCanvasElement;

    if (!chartCanvas) {
      return;
    }

    const chart = new Chart(chartCanvas, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => chart.destroy();
  }, [chartData]);

  return (
    <div className="mt-4">
      <canvas id="progressChart" height={200} width={400} />
    </div>
  );
};

export default ProgressChart;