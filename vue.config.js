const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  indexPath: 'newtab.html',
  transpileDependencies: true,
  chainWebpack: config =>{
    config.optimization.delete('splitChunks');
  }
})
