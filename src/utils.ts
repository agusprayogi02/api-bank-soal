import {ResultBack} from './resultBack';

export function makeid(length: number): string {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const handlingResult = (result, req, res, next) => {
  if (result instanceof Promise) {
    result
      .then(
        (data) =>
          data !== null && data !== undefined
            ? res.send(<ResultBack>{data: data, status: 200})
            : res.json(<ResultBack>{
                status: 400,
                data: new Error('Tidak ada Id yang sama dalam database!'),
              }),
        (err) =>
          res.json(<ResultBack>{
            status: 400,
            data: err,
          }),
      )
      .catch((err) =>
        res.json(<ResultBack>{
          status: 400,
          data: err,
        }),
      );
  } else if (result !== null && result !== undefined) {
    res.json(<ResultBack>{
      data: result,
      status: 200,
    });
  }
};
