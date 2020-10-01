import AppExeption from '../../src/scripts/globals/appExeption';
import Utils, { getLocalStorage } from '../../src/scripts/globals/appUtilities';

describe('Get Local Storage', () => {
    it('should success when localStorage supported', () => {
        expect(
            () => getLocalStorage()
        ).not.toThrowError(AppExeption.LOCAL_STORAGE_NOT_SUPPORTED);
    });

    it('should return Storage class correctly', () => {
        expect(
            getLocalStorage()
        ).toBeInstanceOf(Storage);
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

describe('Generate Image Source Url', () => {
    it('should throw error when id is empty', () => {
        expect(
            () => Utils.genImgSrc('', 'small')
        ).toThrowError(AppExeption.IMAGE_ID_CAN_NOT_BE_EMPTY);
    });

    it('should return actual image url', () => {
        const id = '10';
        const size = 'small';
        expect(
            Utils.genImgSrc(id, size)
        ).toEqual('https://dicoding-restaurant-api.el.r.appspot.com/images/small/10');
    });

    it('should return actual image url', () => {
        const id = '11';
        const size = 'medium';
        expect(
            Utils.genImgSrc(id, size)
        ).toEqual('https://dicoding-restaurant-api.el.r.appspot.com/images/medium/11');
    });

    it('should return actual image url', () => {
        const id = '12';
        const size = 'large';
        expect(
            Utils.genImgSrc(id, size)
        ).toEqual('https://dicoding-restaurant-api.el.r.appspot.com/images/large/12');
    });
});

describe('Generate Capitalize Each First Word', () => {
    it('should return actual text', () => {
        const text = 'something awesome happen!!';
        expect(
            Utils.capitalizeWords(text)
        ).toEqual('Something Awesome Happen!!');
    });
});