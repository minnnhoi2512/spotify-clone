"use client"

import { Playlist } from "@/types";
import { TbPlaylist } from "react-icons/tb";
import ExpandModal from "./ExpandModal";
import PlaylistItem from "./PlaylistItem";
import { useState } from "react";

interface LibraryProps {
    playlists: Playlist[],
}

const Library: React.FC<LibraryProps> = ({
    playlists
}) => {
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

    const handlePlaylistItemClick = (id: any) => {
        setSelectedPlaylistId(id);
    };
    if (playlists.length === 0) {
        return (
            <div className="flex flex-col">
                <div className="
        flex
        items-center
        justify-between
        px-5
        pt-4
        ">
                    <div className="
            inline-flex 
            items-center 
            gap-x-2
           
            ">
                        <TbPlaylist className="text-neutral-400" size={26} />
                        <p className="
                text-neutral-400
                font-medium
                text-md
               
                    ">
                            Your Library
                        </p>
                    </div>
                    <ExpandModal></ExpandModal>
                </div>
                <div className="
        flex
        flex-col
        gap-y-2
        mt-4
        px-3
        ">
                </div>
            </div>
        )
    }
    return (

        <div className="flex flex-col">
            <div className="
            flex
            items-center
            justify-between
            px-5
            pt-4
            ">
                <div className="
                inline-flex 
                items-center 
                gap-x-2
               
                ">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="
                    text-neutral-400
                    font-medium
                    text-md
                   
                        ">
                        Your Library
                    </p>
                </div>
                <ExpandModal></ExpandModal>
            </div>
            <div className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
            ">
                {playlists.map((item) => (
                    <PlaylistItem
                        key={item.id}
                        data={item}
                        onClick={handlePlaylistItemClick}
                        isSelected={item.id === selectedPlaylistId}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;