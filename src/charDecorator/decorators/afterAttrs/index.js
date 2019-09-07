const files = require.context('.', false, /\.js$/)
const decorators = []

files.keys().forEach(key => {
  if (key === './index.js') return
  decorators.push(files(key).default)
})

console.log('decorators', decorators)

export default decorators