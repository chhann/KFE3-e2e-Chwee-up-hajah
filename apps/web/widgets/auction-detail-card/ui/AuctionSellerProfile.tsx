import { Avatar } from '@repo/ui/design-system/base-components/Avatar/index';
import { LocationInfo } from '@repo/ui/design-system/base-components/LocationInfo/index';

import { AuctionDetail } from '@/types/db';
import { auctionSellerProfileStyle } from './style/AuctionSellerProfile.styles';

interface AuctionSellerProfileProps {
  user: AuctionDetail['seller'];
}

export const AuctionSellerProfile = ({ user }: AuctionSellerProfileProps) => {
  return (
    <section className={auctionSellerProfileStyle.auctionSellerProfileContainerStyle}>
      <h1 id="profile-header-title">판매자 정보</h1>
      <div className={auctionSellerProfileStyle.auctionSellerProfileInfoRowStyle}>
        <Avatar
          className={auctionSellerProfileStyle.auctionSellerProfileAvatarStyle}
          src={user.avatar}
          alt={`${user.username} 프로필 이미지`}
          name={user.username || '사용자'}
          size="lg"
        />
        <div className={auctionSellerProfileStyle.auctionSellerProfileInfoGrowStyle}>
          <header className={auctionSellerProfileStyle.auctionSellerProfileInfoHeaderStyle}>
            <h3 className={auctionSellerProfileStyle.auctionSellerProfileHeaderStyle}>
              {user.username}
            </h3>
          </header>
          <div className={auctionSellerProfileStyle.auctionSellerProfileScoreStyle}>
            온도 {user.score} · 판매 {user.selling_auction?.length || 0}
          </div>

          <LocationInfo address={user.address} />
        </div>
      </div>
    </section>
  );
};
