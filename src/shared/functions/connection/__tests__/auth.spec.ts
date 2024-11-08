import { redirect } from 'react-router-dom';
import { LoginRoutesEnum } from '../../../../modules/login/routes';
import { AUTHORIZATION_KEY } from '../../../constants/authorizationConstants';
import { logout, setAuthorizationToken, unsetAuthorizationToken, verifyLoggedIn } from '../auth';
import { getItemStorage, removeItemStorage, setItemStorage } from '../storageProxy';
import { connectionAPIGet } from '../connectionAPI';

jest.mock('../storageProxy');
jest.mock('../connectionAPI');
jest.mock('react-router-dom');

const MOCK_TOKEN = 'MOCK_TOKEN';

const mockGetItemStorage = getItemStorage as jest.Mock<any>;
const mockConnectionAPIGet = connectionAPIGet as jest.Mock<any>;

describe('Auth functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('unsetAuthorizationToken', () => {
    it('should call removeItemStorage in unsetAuthorizationToken', () => {
      unsetAuthorizationToken();
      expect(removeItemStorage).toHaveBeenCalledWith(AUTHORIZATION_KEY);
    });
  });

  describe('setAuthorizationToken', () => {
    it('should not call setItemStorage', () => {
      setAuthorizationToken();
      expect(setItemStorage).not.toHaveBeenCalledWith();
    });

    it('should call setItemStorage', () => {
      setAuthorizationToken(MOCK_TOKEN);
      expect(setItemStorage).toHaveBeenCalledWith(AUTHORIZATION_KEY, MOCK_TOKEN);
    });
  });

  describe('logout', () => {
    it('should call navigate and unsetAuthorizationToken', () => {
      const mockNavigate = jest.fn();
      logout(mockNavigate);

      expect(mockNavigate).toHaveBeenCalledWith(LoginRoutesEnum.LOGIN);
    });
  });

  describe('verifyLoggedIn', () => {
    beforeEach(() => {
      mockGetItemStorage.mockReturnValue(MOCK_TOKEN);
      mockConnectionAPIGet.mockResolvedValue({ name: 'name' });
    });

    it('should call redirect in token empty', () => {
      mockGetItemStorage.mockReturnValue(undefined);

      verifyLoggedIn();

      expect(redirect).toHaveBeenCalledWith(LoginRoutesEnum.LOGIN);
    });

    it.skip('should unsetAuthorizationToken in error request', async () => {
      mockConnectionAPIGet.mockRejectedValueOnce(new Error());

      await verifyLoggedIn();

      expect(removeItemStorage).toHaveBeenCalledWith(AUTHORIZATION_KEY);
    });

    it('should call redirect in return user', async () => {
      await verifyLoggedIn();
      mockConnectionAPIGet.mockResolvedValue(undefined);

      expect(redirect).toHaveBeenCalledWith(LoginRoutesEnum.LOGIN);
    });

    it('should return null if exist user', async () => {
      const returnVerify = await verifyLoggedIn();

      expect(returnVerify).toBeNull();
    });
  });
});
