(function(global) {
  var namespace = global.MoGo || (global.MoGo = {});

  global.createModule = function(name, callback) {
    var module = namespace[name] || (namespace[name] = {});
    callback(module);
  };

  global.require = function(name) {
    var module = namespace[name];
    if (!module) throw new Error('missing dependency: ' + name);
    return module;
  };
})(this);
