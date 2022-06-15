const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  indexPath: 'newtab.html',
  transpileDependencies: true,
  chainWebpack: config =>{
    config.optimization.delete('splitChunks')
  }
})
