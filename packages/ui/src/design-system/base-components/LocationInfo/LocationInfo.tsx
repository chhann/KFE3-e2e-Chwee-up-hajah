import { FaMapMarkerAlt } from 'react-icons/fa';

interface LocationInfoProps {
  address: string;
  addressDetail?: string;
}
const LocationInfo = ({ address, addressDetail }: LocationInfoProps) => {
  return (
    <div className="flex items-center justify-start text-xs">
      <FaMapMarkerAlt className="mr-1 size-4 text-pink-500" />
      <div className="truncate">
        {address}
        {addressDetail}
      </div>
    </div>
  );
};

export default LocationInfo;
