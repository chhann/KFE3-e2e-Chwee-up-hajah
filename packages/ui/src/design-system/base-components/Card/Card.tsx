import Image from 'next/image';

export interface CardProps {
  imageSrc: string;
  title: string;
}

const Card = ({ imageSrc, title }: CardProps) => (
  <div className="rounded-lg shadow-md">
    <Image
      src={imageSrc}
      alt={title}
      width={300}
      height={200}
      className="w-full h-48 object-cover rounded-t-lg"
    />
    <h3 className="p-4 text-lg font-semibold">{title}</h3>
  </div>
);

export default Card;
