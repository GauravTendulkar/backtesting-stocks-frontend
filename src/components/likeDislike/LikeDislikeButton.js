import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { backendUrl } from '@/json-data/backendServer';

const LikeDislikeButton = ({ contentId, initialLikes, initialDislikes }) => {
    const { data: session, status } = useSession();
    // const status = "authenticated"
    const [likes, setLikes] = useState(initialLikes);
    const [dislikes, setDislikes] = useState(initialDislikes);
    const [userVote, setUserVote] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // console.log("status", status)
        if (status === 'authenticated') {
            fetchUserVote();
        }
    }, [status, contentId]);

    const fetchUserVote = async () => {
        // console.log("fetchUserVote", session?.user?.email, contentId)
        try {
            const response = await axios.post(`${backendUrl}api/likes-dislikes/get-vote`, {
                user_email: session?.user?.email,
                contentId: contentId
            });

            setUserVote(response?.data?.vote);
        } catch (error) {
            console.error('Failed to fetch user vote:', error);
        }
        // setUserVote("dislike");
    };

    const handleVote = async (voteType) => {
        console.log(voteType)
        if (isLoading || status !== 'authenticated') return;

        setIsLoading(true);
        try {
            const response = await axios.put(`${backendUrl}api/likes-dislikes/update-vote`, {
                user_email: session?.user?.email,
                contentId: contentId,
                vote: voteType
            });
            console.log(response)
            setLikes(response.data.likes);
            setDislikes(response.data.dislikes);
            setUserVote(response.data.vote);
        } catch (error) {
            console.error('Vote failed:', error);
        } finally {
            // sleep(5000)
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => handleVote(userVote === 'like' ? null : 'like')}
                disabled={isLoading || status !== 'authenticated'}
                className={`p-2 rounded ${userVote === 'like' ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}
            >
                👍 {likes}
            </button>
            <button
                onClick={() => handleVote(userVote === 'dislike' ? null : 'dislike')}
                disabled={isLoading || status !== 'authenticated'}
                className={`p-2 rounded ${userVote === 'dislike' ? 'bg-red-500 text-white' : 'bg-gray-200'
                    }`}
            >
                👎 {dislikes}
            </button>
        </div>
    );
};

export default LikeDislikeButton;