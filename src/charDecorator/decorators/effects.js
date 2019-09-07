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
  char._effects = {}
  deepFindAll(char, 'effects!', (mods) => {
    for (const mod in mods) {
      char._effects[mod] = char._effects[mod] || [];
      char._effects[mod].push(mods[mod]);
    }
  })
}