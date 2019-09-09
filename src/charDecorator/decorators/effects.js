function deepFindAll(obj, key, cb) {
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      const el = obj[k];
      if (k == key) {
        cb(el);
      } else if (typeof el === "object") {
        deepFindAll(el, key, cb);
      }
    }
  }
}

// TODO: Track where effects come from
export default function(char) {
  char._effects = {
    // This is a common effect, so we add a shortcut
    _sum: function(efct) {
      return (this[efct] || [0]).reduce((s, n) => s + n);
    },
  };

  deepFindAll(char, "effects!", mods => {
    for (const mod in mods) {
      char._effects[mod] = char._effects[mod] || [];
      char._effects[mod].push(mods[mod]);
    }
  });
}
