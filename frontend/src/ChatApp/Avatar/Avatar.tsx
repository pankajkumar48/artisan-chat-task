import React from 'react';

interface AvatarProps {
  size?: number; // Optional prop to set the size of the avatar
  is_chat_owner?: boolean; // Optional prop to determine if the avatar is for the chat owner
}

const Avatar: React.FC<AvatarProps> = ({ size = 10, is_chat_owner = true }) => {
  const sizeClass = `w-${size} h-${size}`;

  return (
    <div className={`relative ${sizeClass} overflow-hidden bg-gray-100 rounded-full flex items-center justify-center`}>
      {is_chat_owner ? (
        <svg
          className={`text-gray-400`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          className={`text-gray-400`}
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2a1 1 0 011 1v1h2.5a1.5 1.5 0 010 3H17v2h1a1 1 0 011 1v8a1 1 0 01-1 1h-1v1.5a1.5 1.5 0 01-3 0V19H10v1.5a1.5 1.5 0 01-3 0V19H6a1 1 0 01-1-1v-8a1 1 0 011-1h1V7h1.5a1.5 1.5 0 010-3H11V3a1 1 0 011-1zm-1 4H9v2h6V6h-2V4h-2v2zm-4 6a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2zM7 14v4h10v-4H7z"/>
        </svg>
      )}
    </div>
  );
};

export default Avatar;