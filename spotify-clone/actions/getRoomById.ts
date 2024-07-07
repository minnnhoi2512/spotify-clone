import { Room } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getRoomById = async (id: number): Promise<Room> => {
    const idString = id.toString();
    const initRoom: Room = {
        id: '',
        created_at: '',
        name: '',
    }

    const supabase = createServerComponentClient({
        cookies: cookies
    });

    // Fetch room by ID
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', idString);

    if (error) {
        // console.log('Error fetching room:', error);
        return initRoom;
    }

    // Ensure data is returned and of expected type
    if (!data || data.length === 0) {
        // console.log('No room found with ID:', id);
        return initRoom;
    }

    return data[0] as Room;
}

export default getRoomById;
