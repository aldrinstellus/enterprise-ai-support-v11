'use client';

import Image from 'next/image';

interface AvatarProps {
  name: string;
  initials?: string;
  size?: number;
  className?: string;
  variant?: 'profile' | 'chat';
}

export function Avatar({
  name,
  initials = 'SC',
  size = 40,
  className = '',
  variant = 'profile'
}: AvatarProps) {
  // Generate consistent avatar URL using DiceBear API
  // Using "lorelei" style for professional female avatars
  const seed = name.toLowerCase().replace(/\s+/g, '-');
  const avatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${seed}&backgroundColor=7c3aed&backgroundType=solid`;

  const sizeClass = variant === 'chat' ? 'w-8 h-8' : 'w-10 h-10';

  return (
    <div
      className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0 bg-primary ${className}`}
      style={size ? { width: size, height: size } : undefined}
    >
      <Image
        src={avatarUrl}
        alt={`${name}'s avatar`}
        width={size}
        height={size}
        className="w-full h-full object-cover"
        unoptimized // DiceBear SVGs don't need Next.js optimization
      />
    </div>
  );
}
