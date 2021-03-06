import { MockRequest, MockStatusError } from '@pixelmon/mock';
// import * as Mock from 'mockjs';

const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const userNames = 'Tom|Jack|Thomas|Tompson|Curry|Kobe|Mike|John|Jordon|Brant|Jams|Cuke|Steph|Mathias|Buus'.split('|');
// 输出结果

export const USERS = {
  // 支持值为 Object 和 Array
  'GET /users': (req: MockRequest) => {
    const totalSize = +(req.queryString.total || 100);
    const size = +(req.queryString.size || 10);
    const res: any = {
      data: [],
      totalSize,
      totalPage: totalSize / size,
    };
    const onlyList = req.queryString!.field === 'list';
    let num = onlyList ? size : +req.queryString.ps;
    if (isNaN(num) || num <= 0) {
      num = size;
    }
    for (let i = 0; i < num; i++) {
      const uuid = Math.random()
        .toString(16)
        .substr(2);
      res.data.push({
        id: uuid,
        thumbnail: `https://randomuser.me/api/portraits/thumb/${r(0, 1) === 0 ? 'men' : 'women'}/${r(1, 50)}.jpg`,
        name: `${userNames[r(1, 10)]}${uuid.substr(10)}`,
        fullname: {
          last: `last-${r(1, 10)}`,
          first: `first-${r(10, 20)}`,
        },
        nat: ['CH', 'US', 'DE'][i % 3],
        birthday: `${r(1981, 2010)}-0${r(1, 9)}-0${r(1, 9)}`,
        gender: ['male', 'female'][i % 2],
        email: `${userNames[r(1, 10)]}${r(1, 10)}@qq.com`,
        phone: `1${r(30, 100)}${r(10000001, 99999999)}`,
        price: r(10, 10000000),
        registered: new Date(),
        pictures: [
          'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
          'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
          'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
          'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
        ],
      });
    }
    return onlyList ? res.data : res;
  },
  'GET /user/check/': () => false,
  'GET /user/check/:name': (req: MockRequest) => req.params.name === 'cipchk',
  // GET POST 可省略
  // '/users/1': Mock.mock({ id: 1, 'rank|3': '★★★' }),
  // 发送 Status 错误
  '/500': () => {
    throw new MockStatusError(500);
  },
  '/404': () => {
    throw new MockStatusError(404);
  },
  '/user/:id': (req: MockRequest) => {
    return { id: req.params.id, name: 'detail' };
  },
  '/user/:id/edit': (req: MockRequest) => {
    return { id: req.params.id, name: 'edit' };
  },
  '/user/:id/upload': (req: MockRequest) => {
    return { id: req.params.id, name: 'upload' };
  },
};
