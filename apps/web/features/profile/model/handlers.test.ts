import { profileSchema } from '@/shared/lib/validators/profileSchema';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { handleInputChange, handleSubmit } from './handlers';

// Mock profileSchema
vi.mock('@/lib/validators/profileSchema', () => ({
  profileSchema: {
    safeParse: vi.fn(),
  },
}));

describe('profile handlers', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('handleInputChange', () => {
    it('should update the specified field in the state', () => {
      const setEnteredValues = vi.fn();
      const identifier = 'username';
      const value = 'newUsername';

      handleInputChange(identifier, value, setEnteredValues);

      expect(setEnteredValues).toHaveBeenCalledWith(expect.any(Function));
      const updater = setEnteredValues.mock.calls[0][0];
      const prevState = { username: 'oldUsername', address: 'oldAddress' };
      expect(updater(prevState)).toEqual({
        username: 'newUsername',
        address: 'oldAddress',
      });
    });
  });

  describe('handleSubmit', () => {
    const mockUser = { user_id: 'user-123' };
    const mockEnteredValues = {
      username: 'testuser',
      address: 'test address',
      addressDetail: 'test detail',
    };
    const mockAvatarUrl = 'test_avatar.jpg';
    const mockSetFieldErrors = vi.fn();
    const mockUpdateProfileMutation = {
      mutate: vi.fn(),
      isPending: false,
    };
    const mockEvent = { preventDefault: vi.fn() } as unknown as React.FormEvent;

    it('should prevent default form submission', async () => {
      (profileSchema.safeParse as vi.Mock).mockReturnValue({
        success: true,
        data: { ...mockEnteredValues, avatarUrl: mockAvatarUrl },
      });

      await handleSubmit(
        mockEvent,
        mockUser,
        mockEnteredValues,
        mockAvatarUrl,
        mockSetFieldErrors,
        mockUpdateProfileMutation
      );

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should call setFieldErrors on validation failure', async () => {
      const mockErrors = { username: { _errors: ['Required'] } };
      (profileSchema.safeParse as vi.Mock).mockReturnValue({
        success: false,
        error: { format: () => mockErrors },
      });

      await handleSubmit(
        mockEvent,
        mockUser,
        mockEnteredValues,
        mockAvatarUrl,
        mockSetFieldErrors,
        mockUpdateProfileMutation
      );

      expect(mockSetFieldErrors).toHaveBeenCalledWith(mockErrors);
      expect(mockUpdateProfileMutation.mutate).not.toHaveBeenCalled();
    });

    it('should call updateProfileMutation.mutate on successful validation', async () => {
      (profileSchema.safeParse as vi.Mock).mockReturnValue({
        success: true,
        data: { ...mockEnteredValues, avatarUrl: mockAvatarUrl },
      });

      await handleSubmit(
        mockEvent,
        mockUser,
        mockEnteredValues,
        mockAvatarUrl,
        mockSetFieldErrors,
        mockUpdateProfileMutation
      );

      expect(mockUpdateProfileMutation.mutate).toHaveBeenCalledTimes(1);
      expect(mockUpdateProfileMutation.mutate).toHaveBeenCalledWith({
        id: mockUser.user_id,
        username: mockEnteredValues.username,
        address: mockEnteredValues.address,
        addressDetail: mockEnteredValues.addressDetail,
        avatarUrl: mockAvatarUrl,
      });
      expect(mockSetFieldErrors).not.toHaveBeenCalled();
    });
  });
});
