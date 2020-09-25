import AppExeption from '../../src/scripts/globals/appExeption';
import Utils, { getLocalStorage } from '../../src/scripts/globals/appUtilities';

describe('Get Local Storage', () => {
    it('should fail when localStorage is not supported', () => {
        expect(
            () => getLocalStorage()
        ).not.toThrowError(AppExeption.LOCAL_STORAGE_NOT_SUPPORTED);
    });
});

describe('Set User Local Storage', () => {
    it('should throw error when set localStorage key is empty', () => {
        expect(
            () => Utils.setLCS('', 'analogy')
        ).toThrowError(AppExeption.LOCAL_STORAGE_KEY_CAN_NOT_BE_EMPTY);
    });
});

describe('Get User Local Storage', () => {
    it('should throw error when get localStorage key is empty', () => {
        expect(
            () => Utils.getLCS('')
        ).toThrowError(AppExeption.LOCAL_STORAGE_KEY_CAN_NOT_BE_EMPTY);
    });
});

describe('Generate Image Url Source', () => {
    it('should throw error when id is empty', () => {
        expect(
            () => Utils.genImgSrc('', 'small')
        ).toThrowError(AppExeption.IMAGE_ID_CAN_NOT_BE_EMPTY);
    });
});

describe('Generate Capitalize Each First Word', () => {
    it('should throw error when text is empty', () => {
        expect(
            () => Utils.capitalizeWords('')
        ).toThrowError(AppExeption.IMAGE_ID_CAN_NOT_BE_EMPTY);
    });
});