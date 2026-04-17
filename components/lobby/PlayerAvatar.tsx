"use client";

interface PlayerAvatarProps {
  name: string;
  color: string;
  size?: "sm" | "md" | "lg";
}

export default function PlayerAvatar({ name, color, size = "md" }: PlayerAvatarProps) {
  const sizes = { sm: "w-8 h-8 text-sm", md: "w-10 h-10 text-base", lg: "w-14 h-14 text-xl" };
  return (
    <div
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold text-white shadow-lg flex-shrink-0`}
      style={{ backgroundColor: color }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
