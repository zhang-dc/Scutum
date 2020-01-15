const glob = require('glob')
const path = require('path')
const merge = require('webpack-merge')

function resolve (dir) {
  return path.join(__dirname, dir)
}

function scanEntries() {
  let entryPath = 'src/views/*/index.html'
  let entries = {}
  glob.sync(entryPath).forEach(function(entry) {
    let filename = /src\/views\/(\S+)\/index.html/.exec(entry)[1]
    entries[filename] = {
      entry: 'src/views/' + filename + '/index.ts',
      template: entry,
      filename: filename,
    chunks: ["chunk-vendors", "chunk-common", filename]
    }
    if (process.env.NODE_ENV === "production") {
      entries[filename] = merge(entries[filename], {
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: "dependency"
      })
    }
  })
  return entries
}

module.exports = {
  runtimeCompiler: true,
  lintOnSave: true,
  productionSourceMap: false,
  pages: scanEntries(),
  devServer: {
    index: '/index', 
    host: '0.0.0.0',
    port: 8081,
  },
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('~', resolve('src/common'))
      .set('index', resolve('src/views/index'))
      .set('admin', resolve('src/views/admin'))
  },
  css: {
    loaderOptions: {
      stylus: {
        import: [path.resolve(__dirname, "src/common/style/theme")]
      }
    }
  },
  transpileDependencies: [
    "vuetify"
  ]
}