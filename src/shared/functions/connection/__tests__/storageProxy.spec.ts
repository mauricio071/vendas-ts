import { getItemStorage, removeItemStorage, setItemStorage } from '../storageProxy';

const MOCK_KEY = 'MOCK_KEY';
const MOCK_VALUE = 'MOCK_VALUE';

describe('storageProxy', () => {
  it('should save in localStorage and return of localstorage', () => {
    setItemStorage(MOCK_KEY, MOCK_VALUE);

    expect(getItemStorage(MOCK_KEY)).toEqual(MOCK_VALUE);
  });

  it('should remove of localStorage', () => {
    setItemStorage(MOCK_KEY, MOCK_VALUE);

    removeItemStorage(MOCK_KEY);

    expect(getItemStorage(MOCK_KEY)).toEqual(null);
  });
});
