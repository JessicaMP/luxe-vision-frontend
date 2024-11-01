import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Studio } from '@/types';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CardRecommend({ studio }: { studio: Studio }) {
  return (
    <Card className="min-w-[250px] min-h-[250px] h-[300px] text-white border-0 grid grid-cols-3 sm:grid-cols-2 overflow-hidden">
      <CardContent className="p-0">
        <img
          alt="title"
          className="rounded-lg h-full drop-shadow-[20px_0_20px_rgba(0,0,0,0.15)]"
          src={studio.portfolioPhotos[0].image}
          draggable={false}
          style={{
            objectFit: 'cover',
          }}
        />
      </CardContent>
      <CardFooter className="p-4 bg-white flex flex-col gap-4 col-span-2 sm:col-span-1">
        <Avatar
          alt="logo"
          src={studio.profileImage}
          sx={{ width: 70, height: 70 }}
        />
        <h3 className="text-sm text-black truncate">{studio.studioName}</h3>

        <p className="text-lg text-black font-bold text-center leading-5 w-full">

          {studio.studioSpecialties[0].specialty.specialtyName}
        </p>
        <p className="text-sm text-gray-500 text-center">
          {studio.location.city + ', ' + studio.location.state}
        </p>
        <Link to={`/studio/${studio.id}`} className="text-sm text-red-500">
          Show details
        </Link>
      </CardFooter>
    </Card>
  );
}
