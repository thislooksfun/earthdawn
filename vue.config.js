const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('yaml')
      .test(/\.ya?ml$/)
      .use('js-yaml-loader')
      .loader('js-yaml-loader')
      .end()
    
    
    //this path is specific to my project
    config.resolve.alias
      .set('Disciplines$', path.join(__dirname, 'src/assets/earthdawn/disciplines'))
      .set('Talents$', path.join(__dirname, 'src/assets/earthdawn/talents'));
  },
}
