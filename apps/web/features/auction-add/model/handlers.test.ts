import { describe, it, expect, vi } from 'vitest';
import {
  handleInputChange,
  handleStartPriceInput,
} from './handlers';

describe('handlers', () => {
  describe('handleInputChange', () => {
    it('should call setValue with the input value and clear the field error', () => {
      const setValue = vi.fn();
      const setFieldErrors = vi.fn();
      const e = { target: { value: 'test value' } } as React.ChangeEvent<HTMLInputElement>;
      const field = 'testField';

      handleInputChange(e, setValue, field, setFieldErrors);

      expect(setValue).toHaveBeenCalledWith('test value');
      expect(setFieldErrors).toHaveBeenCalledWith(expect.any(Function));
      const updater = setFieldErrors.mock.calls[0][0];
      const prevState = { testField: 'error', otherField: 'no error' };
      expect(updater(prevState)).toEqual({ otherField: 'no error' });
    });
  });

  describe('handleStartPriceInput', () => {
    it('should call setStartPrice with the input value if it contains only numbers', () => {
      const setStartPrice = vi.fn();
      const setFieldErrors = vi.fn();
      const e = { target: { value: '12345' } } as React.ChangeEvent<HTMLInputElement>;

      handleStartPriceInput(e, setStartPrice, setFieldErrors);

      expect(setStartPrice).toHaveBeenCalledWith('12345');
      expect(setFieldErrors).toHaveBeenCalledWith(expect.any(Function));
      const updater = setFieldErrors.mock.calls[0][0];
      const prevState = { startPrice: 'error', otherField: 'no error' };
      expect(updater(prevState)).toEqual({ otherField: 'no error' });
    });

    it('should not call setStartPrice and alert if the input contains non-numeric characters', () => {
      const setStartPrice = vi.fn();
      const setFieldErrors = vi.fn();
      const e = { target: { value: '123a45' } } as React.ChangeEvent<HTMLInputElement>;
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

      handleStartPriceInput(e, setStartPrice, setFieldErrors);

      expect(setStartPrice).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalledWith('숫자만 입력할 수 있습니다.');
      expect(setFieldErrors).not.toHaveBeenCalled(); // setFieldErrors should not be called if validation fails

      alertSpy.mockRestore();
    });
  });
});
