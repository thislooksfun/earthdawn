// Import manually so we can manually define order
import staticDecorators from './static'
import effects from './effects'
import attributes from './attributes'
import dynamicDecorators from './dynamic'

// Manually define order
export default [
  ...staticDecorators,
  effects,
  attributes,
  ...dynamicDecorators,
]