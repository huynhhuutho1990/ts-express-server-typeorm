const makeRandomString = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const slugify = (str: string, isRandomStr = false): string => {
  str = isRandomStr ? str + '-' + makeRandomString(10) : str;
  if (str) {
    str = String(str);
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');

    // remove invalid chars
    str = str.replace(/([^0-9a-z-\s])/g, '');

    // collapse whitespace and replace by -
    str = str.replace(/(\s+)/g, '-');

    // collapse dashes
    str = str.replace(/-+/g, '-');

    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');
    return str;
  }
  return null;
};

const isValidV4UUID = (uuid: string): boolean => {
  const uuidV4Regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;
  return uuidV4Regex.test(uuid);
};

const stringToBool = (val: string): boolean => {
  return val.toLowerCase() == 'true';
};

export { slugify, makeRandomString, isValidV4UUID, stringToBool };
