import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  videoId: string;
  onVideoEnd?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, onVideoEnd }) => {
  const playerRef = useRef<YT.Player | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }
    
    const loadPlayer = () => {
      // If YouTube API is ready, create player
      if (window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(containerRef.current!, {
          videoId,
          playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onStateChange: (event) => {
              // Call onVideoEnd when video ends (state 0)
              if (event.data === 0 && onVideoEnd) {
                onVideoEnd();
              }
            },
          },
        });
      } else {
        // If not ready, wait and try again
        setTimeout(loadPlayer, 100);
      }
    };

    // Initialize player when component mounts or videoId changes
    if (containerRef.current) {
      // If player already exists, destroy it first
      if (playerRef.current) {
        playerRef.current.destroy();
      }
      
      // Create empty div for player
      containerRef.current.innerHTML = '';
      const playerDiv = document.createElement('div');
      containerRef.current.appendChild(playerDiv);
      
      // Load player
      if (window.YT && window.YT.Player) {
        loadPlayer();
      } else {
        // Setup callback for when API loads
        window.onYouTubeIframeAPIReady = loadPlayer;
      }
    }

    return () => {
      // Cleanup player when component unmounts or videoId changes
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [videoId, onVideoEnd]);

  return (
    <div className="aspect-video bg-gray-100 w-full rounded-lg overflow-hidden shadow-md">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

// Add YouTube Player typings
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default VideoPlayer;