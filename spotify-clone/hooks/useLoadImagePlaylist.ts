import { Playlist } from '@/types';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


const useLoadImagePlaylist = (playlist: Playlist) => {
    const supabaseClient = useSupabaseClient();
    if (!playlist) {
        return null;
    }
    const { data: imageData } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(playlist.image_path);
    // console.log(imageData.publicUrl);
    return imageData.publicUrl;
}
export default useLoadImagePlaylist;