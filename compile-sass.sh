compile() {
  node-sass scss --output css --output-style compressed --source-map-contents $@
}

compile

if [ "$1" == watch ]; then
  compile --watch
fi
