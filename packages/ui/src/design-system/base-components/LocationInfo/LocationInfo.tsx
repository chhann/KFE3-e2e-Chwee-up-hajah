import { FaMapMarkerAlt } from 'react-icons/fa';
import { locationInfoStyle } from './LocationInfo.styles';

interface LocationInfoProps {
  address: string | null | undefined;
  addressDetail?: string | null;
}
const LocationInfo = ({ address, addressDetail }: LocationInfoProps) => {
  const safeAddress =
    typeof address === 'string' && address.trim() !== '' ? address : '주소 정보 없음';
  const safeDetail =
    typeof addressDetail === 'string' && addressDetail.trim() !== '' ? ` ${addressDetail}` : '';

  return (
    <div className={locationInfoStyle.locationInfoBasicStyle}>
      <FaMapMarkerAlt className={locationInfoStyle.locationInfoIconStyle} />
      <div className={locationInfoStyle.locationInfoTextStyle}>
        {safeAddress}
        {safeDetail}
      </div>
    </div>
  );
};

export default LocationInfo;
