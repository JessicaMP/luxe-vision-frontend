import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar } from '@mui/material';

interface CardProps {
  title: string;
  image: string;
  logoImg: string;
  category: string;
  location: string;
}

export default function CardRecommend({ card }: { card: CardProps }) {
  return (
    <Card className="min-w-[250px] min-h-[250px] text-white border-0 grid grid-cols-2 overflow-hidden">
      <CardContent className="p-0">
        <img
          alt="title"
          className="rounded-lg h-full"
          src={card.image}
          style={{
            objectFit: 'cover',
          }}
        />
      </CardContent>
      <CardFooter className="p-4 bg-white flex flex-col gap-4">
        <Avatar alt="logo" src={card.logoImg} sx={{ width: 70, height: 70 }} />
        <h3 className="text-sm text-black">{card.title}</h3>
        <p className="text-lg text-black font-bold">{card.category}</p>
        <p className="text-sm text-gray-500">{card.location}</p>
        <p className="text-sm text-red-500"> Ver detalles</p>
      </CardFooter>
    </Card>
  );
}
