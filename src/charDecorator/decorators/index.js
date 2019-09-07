// // Import manually so we can manually define order
import beforeAttrs from './beforeAttrs'
import attributes from './attributes'
import afterAttrs from './afterAttrs'

// Manually define order
export default [
  ...beforeAttrs,
  attributes,
  ...afterAttrs,
]