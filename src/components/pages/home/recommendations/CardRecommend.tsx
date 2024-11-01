import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Studio } from '@/types';
import { Avatar } from '@mui/material';

export default function CardRecommend({ studio }: { studio: Studio }) {
  return (
    <Card className="min-w-[250px] min-h-[250px] text-white border-0 grid grid-cols-2 overflow-hidden">
      <CardContent className="p-0">
        <img
          alt="title"
          className="rounded-lg h-full"
          src={studio.profileImage}
          draggable={false}
          style={{
            objectFit: 'cover',
          }}
        />
      </CardContent>
      <CardFooter className="p-4 bg-white flex flex-col gap-4">
        <Avatar
          alt="logo"
          src={studio.profileImage}
          sx={{ width: 70, height: 70 }}
        />
        <h3 className="text-sm text-black truncate">{studio.studioName}</h3>
        <p className="text-lg text-black font-bold truncate">
          {studio.studioSpecialties[0].specialty.specialtyName}
        </p>
        <p className="text-sm text-gray-500">
          {studio.location.city + ', ' + studio.location.state}
        </p>
        <p className="text-sm text-red-500"> Ver detalles</p>
      </CardFooter>
    </Card>
  );
}
