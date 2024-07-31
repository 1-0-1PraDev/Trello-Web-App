import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfileImage: React.FC = () => {
  const { user } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user?.avatar?.url) {
      setAvatarUrl(user.avatar.url);
    } else {
      console.error('No avatar URL found:', user?.avatar);
    }
  }, [user]);
  console.log('user ', avatarUrl)
  return (
    <div className="user_icon">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="user img profile"
          style={{ width: '100px', height: '100px' }}
        />
      ) : (
        <img
          src="path/to/placeholder-image.png"
          alt="placeholder img"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}
    </div>
  );
};

export default ProfileImage;
