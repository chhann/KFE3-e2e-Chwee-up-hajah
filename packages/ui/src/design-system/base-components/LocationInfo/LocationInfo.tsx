import { FaMapMarkerAlt } from 'react-icons/fa';
import { locationInfoStyle } from './LocationInfo.styles';

interface LocationInfoProps {
  address: string;
  addressDetail?: string;
}
const LocationInfo = ({ address, addressDetail }: LocationInfoProps) => {
  return (
    <div className={locationInfoStyle.locationInfoBasickStyle}>
      <FaMapMarkerAlt className={locationInfoStyle.locationInfoIconStyle} />
      <div className={locationInfoStyle.locationInfoTextStyle}>
        {address}
        {addressDetail}
      </div>
    </div>
  );
};

export default LocationInfo;
