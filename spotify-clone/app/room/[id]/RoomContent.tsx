"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import PlayButton from "@/components/PlayButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Howl } from "howler";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface RoomContentProps {
    songs: Song[],
    room_id: string,
}

const RoomContent: React.FC<RoomContentProps> = ({ songs, room_id }) => {
    const onPlay = useOnPlay(songs);
    const router = useRouter();
    const [sound, setSound] = useState<Howl | null>(null);
    const { isLoading, user } = useUser();
    const supabaseClient = useSupabaseClient();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    useEffect(() => {
        if (songs.length > 0) {
            const url = songs[0].song_path;
            const newSound = new Howl({
                src: [url],
                format: ['mp3'],
            });

            setSound(newSound);
        }
    }, [songs]);

    useEffect(() => {
        if (sound) {
            const syncPlayback = async () => {
                const { data, error } = await supabaseClient
                    .from('playState')
                    .select('*')
                    .eq('room_id', room_id)
                    .order('updated_at', { ascending: false })
                    .limit(1);

                if (error) {
                    console.error('Error fetching play state:', error);
                    return;
                }

                if (data.length > 0) {
                    const { currentTime, isPlaying } = data[0];
                    sound.seek(currentTime);

                    if (isPlaying) {
                        sound.play();
                    } else {
                        sound.pause();
                    }
                }
            };

            syncPlayback();

            const subscription = supabaseClient
                .channel('custom-all-channel')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'playState', filter: `room_id=eq.${room_id}` }, (payload: any) => {
                    const { currentTime, isPlaying } = payload.new;
                    sound.seek(currentTime);

                    if (isPlaying) {
                        sound.play();
                    } else {
                        sound.pause();
                    }
                })
                .subscribe();

            return () => {
                supabaseClient.removeChannel(subscription);
            };
        }
    }, [sound, room_id, supabaseClient]);

    const updatePlayState = async (isPlaying: boolean) => {
        
        if (sound != null) {
            const currentTime = sound.seek() as number;
            console.log(sound.seek());
            await supabaseClient
                .from('playState')
                .insert([{ room_id, currentTime, isPlaying }]);
        }
    };

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs live.
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            <div className="bg-black">
                <button onClick={() => updatePlayState(true)} >Play</button>
                <button onClick={() => updatePlayState(false)}>Pause</button>
            </div>
            {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-x-4 w-full">
                    <div className="flex-1">
                        <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
};

export default RoomContent;
