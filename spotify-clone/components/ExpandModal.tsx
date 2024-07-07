"use client"

import useAuthModal from '@/hooks/useAuthModal';
import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from '@/hooks/useUser';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ArchiveBoxXMarkIcon,
    PencilIcon,
    Square2StackIcon,
    TrashIcon,
} from '@heroicons/react/16/solid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbPlaylistAdd } from 'react-icons/tb';

export default function ExpandModal() {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const onAddSong = () => {
        if (!user) {
            return authModal.onOpen();
        }

        return uploadModal.onOpen();
    };
    const onCreatePlaylist = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        return await createNewPlaylist();
    };
    const onCreateNewRoom = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        return await createNewRoom();
    };
    const createNewPlaylist = async () => {
        const {
            error: supabaseError
        } = await supabaseClient
            .from('playlists')
            .insert({
                user_id: user?.id,
                songs: {},
                name: `My new playlist`,
                private_status: true,
                description: null,
                image_path: null,
            });
        if (supabaseError) {
            return toast.error(supabaseError.message);
        }
        router.refresh();
        return toast.success('Playlist created!!!');       
    }
    const createNewRoom = async () => {
        const {
            error: supabaseError
        } = await supabaseClient
            .from('rooms')
            .insert({
                name: `Vô đây nghe nhạc nè`,
            });
        if (supabaseError) {
            return toast.error(supabaseError.message);
        }
        router.refresh();
        return toast.success('New room created!!!');   
      };


    return (
        <div className="relative">
            <Menu>
                <MenuButton className="focus:outline-none ">
                    <AiOutlinePlus
                        size={20}
                        className="text-neutral-400 hover:text-white transition"
                    />
                </MenuButton>

                <MenuItems
                    transition
                    className=" absolute right-0 z-50 w-52 mt-2 origin-top-right rounded-xl border border-black/5 bg-neutral-800 p-1 text-sm/6 text-white shadow-lg focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem >
                        <button
                            onClick={onAddSong}
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <PencilIcon className="h-5 w-5 text-white/30" />
                            Add song
                            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
                        </button>
                    </MenuItem>
                    {/* <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                <Square2StackIcon className="h-5 w-5 text-white/30" />
                                Duplicate
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘D</kbd>
                            </button>
                        </MenuItem> */}
                    <div className="my-1 h-px bg-white/5" />
                    {/* <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                <ArchiveBoxXMarkIcon className="h-5 w-5 text-white/30" />
                                Archive
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
                            </button>
                        </MenuItem> */}
                    <MenuItem>
                        <button
                            onClick={onCreatePlaylist}
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <TbPlaylistAdd className="h-5 w-5 text-white/30" />
                            Create playlist
                            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘C</kbd>
                        </button>
                    </MenuItem>
                    <div className="my-1 h-px bg-white/5" />
                    {/* <MenuItem>
                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                <ArchiveBoxXMarkIcon className="h-5 w-5 text-white/30" />
                                Archive
                                <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘A</kbd>
                            </button>
                        </MenuItem> */}
                    <MenuItem>
                        <button
                            onClick={onCreateNewRoom}
                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                            <TbPlaylistAdd className="h-5 w-5 text-white/30" />
                            Create new room
                            <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">⌘C</kbd>
                        </button>
                    </MenuItem>
                </MenuItems>

            </Menu>
        </div>
    );
}
