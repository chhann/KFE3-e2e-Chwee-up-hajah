export const NotificationListItem = ({
  title,
  description,
  time,
  price,
  ariaLabel,
}: {
  title: string;
  description: string;
  time: string;
  price?: string;
  ariaLabel: string;
}) => (
  <article
    className="w-full space-y-1 rounded-[6px] bg-white py-2 pl-2 pr-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] focus-within:ring-2 focus-within:ring-blue-500"
    tabIndex={0}
    role="button"
    aria-label={ariaLabel}
  >
    <h4 className="block w-[250px] truncate text-base font-bold">{title}</h4>
    <p className="text-neutral-40 block w-[240px] truncate text-xs">{description}</p>
    <div className="flex items-end justify-between">
      {price && (
        <div>
          <span className="mr-1 text-[12px]" aria-label="낙찰 가격">
            낙찰가
          </span>
          <strong className="text-base">{price}</strong>
        </div>
      )}
      <time className="text-neutral-40 flex-1 text-right text-[10px]">{time}</time>
    </div>
  </article>
);
