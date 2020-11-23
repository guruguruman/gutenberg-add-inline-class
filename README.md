# Gutenberg Add Inline Class

![gutenberg-add-inline-class-plugin-working-preview](https://user-images.githubusercontent.com/425412/99971866-22393c80-2de1-11eb-8c06-5e70236748c3.png)

Gutenberg Add Inline Class is a WordPress plugin which enable users to edit rich text with custom class in Gutenberg editor. This is useful if you want to append class attributes into a part of rich text.

## Installation

Gutenberg Add Inline Class can be installed by uploading zipped plugin file via WordPress plugin page. You can download zip file from [GitHub release page](https://github.com/guruguruman/gutenberg-add-inline-class/releases).

## Building

Gutenberg Add Inline Class contain files that need to be built. For this you'll need Node, and Yarn installed. Install required modules with:

```
make script/deps && make script/build
```

### Running

To check plugin behavior you can run local enviroment with:

```
make env/start
```

### Releasing

Finally, to produce a release copy under `dist` directory:

```
make archive
```

## Support

Please raise any bug reports or enhancement requests here. Pull requests are always welcome.
