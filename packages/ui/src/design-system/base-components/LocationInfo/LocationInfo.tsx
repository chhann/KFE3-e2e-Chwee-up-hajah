import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  locationInfoIconStyle,
  locationInfoStyle,
  locationInfoTextStyle,
} from './LocationInfo.styles';

interface LocationInfoProps {
  address: string;
  addressDetail?: string;
}
const LocationInfo = ({ address, addressDetail }: LocationInfoProps) => {
  return (
    <div className={locationInfoStyle}>
      <FaMapMarkerAlt className={locationInfoIconStyle} />
      <div className={locationInfoTextStyle}>
        {address}
        {addressDetail}
      </div>
    </div>
  );
};

export default LocationInfo;
