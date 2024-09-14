import { useState } from 'react';
import { useStore } from '@/store';
import { useRouter } from 'next/navigation';

interface GoalInputProps {
  userId: number;
}

const GoalInput = ({ userId }: GoalInputProps) => {
  const store = useStore();
  const router = useRouter();
  const [name, setName] = useState('');
  const [target, setTarget] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const newGoal = await store.createGoal({
        name,
        target,
        deadline,
        userId,
      });

      if (newGoal) {
        router.push(`/dashboard?goalId=${newGoal.id}`);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      // Handle error display or user feedback
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Goal Name
          </label>
          <input
            type="text"
            id="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="target" className="block text-gray-700 font-bold mb-2">
            Target
          </label>
          <input
            type="text"
            id="target"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-gray-700 font-bold mb-2">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={deadline ? deadline.toISOString().slice(0, 10) : ''}
            onChange={(e) => setDeadline(new Date(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Add Goal'}
        </button>
      </form>
    </div>
  );
};

export default GoalInput;