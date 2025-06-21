import { ReactNode } from 'react';
import { IconType } from 'react-icons';

export const NotificationSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: IconType;
  title: string;
  children: ReactNode;
}) => (
  <section className="mb-9">
    <header className="text-neutral-70 mb-2 flex items-center">
      <Icon className="mr-1 size-5" aria-hidden="true" />
      <h3 className="text-sm">{title}</h3>
    </header>
    <ul role="list" className="space-y-4">
      {children}
    </ul>
  </section>
);
