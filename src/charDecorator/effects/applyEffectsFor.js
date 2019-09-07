import collectEffectsFor from './collectEffectsFor'

// import effectApplicators from './applicators'

export default function (char, obj) {
  const effects = collectEffectsFor(char);
  console.log(`effects for ${char.name}`, effects);

  console.log('obj before', obj);
  
  
  
  // TODO: Figure out how to do this
  // apply to obj or char?
  // if apply to char, make deep clone first
  
  
  
  // for (const effect in effects) {
  //   const applicator = effectApplicators[effect];
  //   if (applicator == null) continue;
    
  //   const vals = effects[effect];
  //   for (const val of vals) {
  //     applicator(obj, val);
  //   }
  // }
  
  
  // for (const effect in obj) {
  //   console.log(mod);
  //   const applicator = effectApplicators[mod];
  //   if (applicator == null) continue;
    
  //   const mods = effects[key];
  //   if (mods == null) continue;
  //   for (const mod of mods) {
  //     obj[key] = applicator(obj[mod]);
  //   }
  // }
  console.log('obj after', obj);

  return obj;
}