import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { GoalInput, ProgressChart, SocialShareButton } from '@/components';
import { User } from '@/types';
import { useSession } from 'next-auth/react';

const DashboardPage = () => {
  const router = useRouter();
  const store = useStore();
  const { data: session } = useSession();
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  const handleGoalSelect = (goalId: number) => {
    setSelectedGoalId(goalId);
  };

  useEffect(() => {
    if (session?.user) {
      store.setUser(session.user);
    }
  }, [session]);

  const goals = store.goals.filter((goal) => goal.userId === store.user?.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Fitness Dashboard</h1>
      {session?.user && (
        <>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Goals</h2>
            <ul>
              {goals.map((goal) => (
                <li key={goal.id} className="cursor-pointer" onClick={() => handleGoalSelect(goal.id)}>
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-gray-600"> - Target: {goal.target}</span>
                  <span className="text-gray-600"> - Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>

          {selectedGoalId && (
            <div>
              <h2 className="text-xl font-bold mb-2">Progress for {goals.find((goal) => goal.id === selectedGoalId)?.name}</h2>
              <ProgressChart goalId={selectedGoalId} />
              <SocialShareButton goalId={selectedGoalId} />
            </div>
          )}

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Add New Goal</h2>
            <GoalInput userId={store.user?.id || 0} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;