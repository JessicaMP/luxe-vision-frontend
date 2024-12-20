import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  image: string;
  id: number;
  className?: string;
}

export default function CardSpeciality({ title, image, id }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/listSpecialtyStudios/" + id);
  };

  return (
    <Card
      onClick={handleClick}
      key={id}
      className="smm:max-w-[250px] overflow-hidden bg-[#323232] text-white border-[#323232] border-8 border-y-8 h-full cursor-pointer"
    >
      <CardContent className="p-0">
        <div className="relative aspect-square">
          <img
            alt={title}
            className="object-cover"
            height="300"
            src={image}
            style={{
              aspectRatio: "300/300",
              objectFit: "cover",
            }}
            width="300"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 justify-center bg-[#323232]">
        <h3 className="text-lg font-bold">{title}</h3>
      </CardFooter>
    </Card>
  );
}
