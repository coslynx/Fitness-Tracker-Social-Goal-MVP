import { useStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SocialMediaIcon } from '../SocialMediaIcon';

interface SocialShareButtonProps {
  goalId: number;
}

const SocialShareButton = ({ goalId }: SocialShareButtonProps) => {
  const router = useRouter();
  const store = useStore();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');

  const handleOpenShareModal = async () => {
    const goal = store.goals.find((g) => g.id === goalId);
    if (!goal) {
      return;
    }
    const shareUrl = `${process.env.NEXT_PUBLIC_SITE}/dashboard?goalId=${goal.id}`;
    setShareLink(shareUrl);
    setIsShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsShareModalOpen(false);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleOpenShareModal}
        className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Share Progress
      </button>
      {isShareModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Share Your Progress</h2>
            <p className="mb-4">
              Share your progress on your fitness goals with your friends!
            </p>
            <div className="flex space-x-4">
              <SocialMediaIcon
                type="facebook"
                url={shareLink}
                handleClose={handleCloseShareModal}
              />
              <SocialMediaIcon
                type="twitter"
                url={shareLink}
                handleClose={handleCloseShareModal}
              />
              <SocialMediaIcon
                type="instagram"
                url={shareLink}
                handleClose={handleCloseShareModal}
              />
            </div>
            <button
              onClick={handleCloseShareModal}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShareButton;