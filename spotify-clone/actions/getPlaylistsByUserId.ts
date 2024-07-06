import { Playlist } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getPlaylistsByUserId = async (): Promise<Playlist[]> => {
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
        .from('playlists')
        .select('*,users(*)')
        .eq('user_id', sessionData.user?.id)
        .order('created_at', { ascending: false });
    if (error) {
        console.log(error);
    }
    return (data as any) || [];
}
export default getPlaylistsByUserId;