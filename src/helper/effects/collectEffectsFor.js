import injectInfosInto from '@/helper/injectInfos'

function deepFindAll(obj, key, cb) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const el = obj[k];
      if (k == key) {
        cb(el);
      } else if (typeof el === 'object') {
        deepFindAll(el, key, cb);
      }
    }
  }
}

export default function (char) {
  const effects = {}
  deepFindAll(injectInfosInto(char), 'effects!', (mods) => {
    for (const mod in mods) {
      effects[mod] = effects[mod] || [];
      effects[mod].push(mods[mod]);
    }
  })
  return effects
}