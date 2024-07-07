import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./PageContent";
import getRooms from "@/actions/getRooms";
import { Room } from "@/types";


export default async function Home() {
  const songs = await getSongs();
  const rooms: Room[] = await getRooms();
  return (
    <div className="
    bg-neutral-700
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    ">
      <Header>
        <div className="
    mb-2
    ">
          <h1 className="
          text-white
          text-3xl
          font-semibold
          "
          >Welcome back</h1>
          <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4
          ">
            <ListItem
              image="/images/liked.jpg"
              name="Liked Songs"
              href="/liked" />
            {rooms.map((room) => (
              <ListItem
                key={room.id} // Thêm key để React có thể quản lý các phần tử danh sách tốt hơn
                image="/images/okok.jpg"
                name={room.name}
                href={`/room/${room.id}`}
              />
            ))}

          </div>
        </div>
      </Header>
      <div className="
      mt-2 
      mb-7 
      px-6">
        <div className="
        flex 
        justify-between 
        items-center">
          <h1 className="
          text-white 
          text-2xl 
          font-semibold
          ">Newest songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
