'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { GoSearch } from 'react-icons/go';
import { Input } from '../../../../../packages/ui/src/design-system/base-components/Input/Input';
import { searchInputStyles } from '../styles/searchInput.styles';

export const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/auction/auction-list?search=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <form className={searchInputStyles.form} onSubmit={handleSearch}>
      <div className={searchInputStyles.inputWrapper}>
        <Input
          type="text"
          placeholder="검색어를 입력하세요..."
          aria-label="검색어를 입력하세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          size="sm"
          variants="ghost"
          type="submit"
          className={`${searchInputStyles.button.base}`}
        >
          <GoSearch className={searchInputStyles.icon} />
        </Button>
      </div>
    </form>
  );
};
