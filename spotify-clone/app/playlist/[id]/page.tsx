import Header from "@/components/Header";

const PlaylistDetails = ({ params }: {
    params: { id: number }
}) => {

    return (
        <div>
            <Header>
                Playlist Details {params.id}
            </Header>
        </div>
    );
};

export default PlaylistDetails;