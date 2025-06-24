import { FaMapMarkerAlt } from 'react-icons/fa';

const LocationInfo = ({ locationName }: { locationName: string }) => {
  return (
    <div className="flex items-center justify-start text-xs">
      <FaMapMarkerAlt className="mr-1 size-4 text-pink-500" />
      <span>{locationName}</span>
    </div>
  );
};

export default LocationInfo;
