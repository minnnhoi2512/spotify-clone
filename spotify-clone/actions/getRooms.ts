import { Room } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getRooms = async (): Promise<Room[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });
    const { data: sessionData, error: sessionError } = await supabase
        .auth
        .getUser();
    if (sessionError) {
        console.log(sessionError.message);
        return [];
    }
    const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        console.log(error);
    }
    return (data as any) || [];
}
export default getRooms;