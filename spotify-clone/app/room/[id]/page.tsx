import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";
import Image from "next/image";
import RoomContent from "./RoomContent";
import getRoomById from "@/actions/getRoomById";
import { Room } from "@/types";

export const revalidate = 0;

const Liked = async ({ params }: {
    params: { id: number }
}) => {

    const room : Room = await getRoomById(params.id);
    console.log(params);
    const songs = await getLikedSongs();
    console.log(room);
    return (
        <div
            className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
        "
        >
            <Header>
                <div className="mt-20">
                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        gap-x-5
                        ">
                        <div className="
                        relative
                        h-32
                        w-32
                        lg:h-44
                        lg:w-44
                        ">
                            <Image
                                fill
                                src="/images/liked.jpg"
                                alt="Playlist"
                                className="object-cover"
                            ></Image>
                        </div>
                        <div className="
                        flex
                        flex-col
                        gap-y-2
                        mt-4
                        md:mt-0
                        ">
                            <p className="
                            hidden 
                            md:block
                            font-semibold
                            text-sm
                            ">
                                Playlist
                            </p>
                            <h1 className="
                            text-white
                            text-4xl
                            sm:text-5xl
                            lg:text-7xl
                            font-bold
                            ">
                                {room.name}
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            <RoomContent songs={songs} room_id={room.id} />
        </div>
    );
};

export default Liked;