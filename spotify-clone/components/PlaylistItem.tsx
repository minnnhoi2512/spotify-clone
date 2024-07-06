import { useState } from 'react';
import useLoadImagePlaylist from '@/hooks/useLoadImagePlaylist';
import { Playlist } from '@/types';
import Image from 'next/image';
import defaultFavoriteImage from '../public/images/liked.jpg';
import { useRouter } from 'next/navigation';

interface PlaylistItemProps {
    data: Playlist;
    onClick?: (id: string) => void;
    isSelected: boolean;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ data, onClick, isSelected }) => {
    const imageUrl = useLoadImagePlaylist(data);
    const router = useRouter();
    const handleClick = () => {
        router.push(`/playlist/${data.id}`);
    };

    return (
        <div
            onClick={handleClick}
            className={`
                flex
                items-center
                gap-x-3
                cursor-pointer
                ${isSelected ? 'bg-neutral-800/50' : 'hover:bg-neutral-800/50'}
                w-full
                p-2
                rounded-md
            `}
        >
            <div
                className="
                    relative
                    rounded-md
                    min-h-[48px]
                    min-w-[48px]
                    overflow-hidden
                "
            >
                <Image
                    fill
                    className="object-cover"
                    src={defaultFavoriteImage}
                    alt="Image"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white">{data.name}</p>
                <p className="text-neutral-400 text-sm truncate">
                    Playlist * {data.users.full_name == null ? 'You' : data.users.full_name}
                </p>
            </div>
        </div>
    );
};

export default PlaylistItem;
