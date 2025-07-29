'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import { Button } from '@repo/ui/design-system/base-components/Button/index';
import { useRouter } from 'next/navigation';
import { GoSearch } from 'react-icons/go';
import { IoIosClose } from 'react-icons/io';

import { Input } from '../../../../../packages/ui/src/design-system/base-components/Input/Input';
import { searchInputStyles } from '../styles/searchInput.styles';

interface Props {
  setCategory: Dispatch<SetStateAction<string>>;
}

export const SearchInput = ({ setCategory }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/auction/auction-list?search=${encodeURIComponent(value.trim())}`);
    }
  };

  return (
    <>
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
      <div
        onClick={() => {
          setValue('');
          setCategory('all');
          router.push('/auction/auction-list');
        }}
        className={searchInputStyles.resetSearch}
      >
        검색어 초기화
        <IoIosClose />
      </div>
    </>
  );
};
