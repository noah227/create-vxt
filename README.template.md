# create-vxt

## Development

### Manifest

* Most modules need to be properly configured in manifest.json
    * For example, side-panel is not configured as the default in the Vite build entry or in the manifest file, if you
      need side-panel in your app, then you need to config it both in Vite build entry and manifest file

* About manifest, see [ChromeDocs/Manifest](https://developer.chrome.google.cn/docs/extensions/reference/manifest)

### File build config

There are two things that may get your attention (both in vite.config.ts):

* build.rolldownOptions.[input|output]
* viteStaticCopy#targets [How to config?](https://www.npmjs.com/package/vite-plugin-static-copy?activeTab=readme)

## Examples

* [?]() A contextmenu extension
* [?]() A side-panel extension(list links within this page)
* [?]() ...

## Contact

[issue]()