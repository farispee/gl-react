"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _templateObject = _taggedTemplateLiteral(["\nattribute vec2 _p;\nvarying vec2 uv;\nvoid main() {\ngl_Position = vec4(_p,0.0,1.0);\nuv = vec2(0.5, 0.5) * (_p+vec2(1.0, 1.0));\n}"], ["\nattribute vec2 _p;\nvarying vec2 uv;\nvoid main() {\ngl_Position = vec4(_p,0.0,1.0);\nuv = vec2(0.5, 0.5) * (_p+vec2(1.0, 1.0));\n}"]);

exports.isShaderIdentifier = isShaderIdentifier;
exports.ensureShaderDefinition = ensureShaderDefinition;
exports.shaderDefinitionToShaderInfo = shaderDefinitionToShaderInfo;
exports.shaderInfoEquals = shaderInfoEquals;

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _GLSL = require("./GLSL");

var _GLSL2 = _interopRequireDefault(_GLSL);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ShaderID = "ShaderID";

/**
 * An object that contains a `frag` GLSLCode.
 * @example
 *  {
 *    frag: GLSL`...`
 *  }
 */


/**
 *
 */


/**
 * An object map from a key string to a **ShaderDefinition**.
 * @example
 *  {
 *    helloGL: {
 *      frag: GLSL`...`
 *    }
 *  }
 */


/**
 * An object map from a key string to a **ShaderIdentifier** that you can pass to `<Node shader>`
 */


var shaderDefinitions = {};
var shaderNames = {};
var shaderResults = {};

var genShaderId = function (i) {
  return function () {
    return (++i).toString();
  };
}(0);

var staticVert = (0, _GLSL2.default)(_templateObject);

function isShaderIdentifier(shaderIdentifier) {
  return (typeof shaderIdentifier === "undefined" ? "undefined" : _typeof(shaderIdentifier)) === "object" && !!shaderIdentifier && shaderIdentifier.type === ShaderID && typeof shaderIdentifier.id === "string";
}

function ensureShaderDefinition(definition) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

  (0, _invariant2.default)(definition && typeof definition.frag === "string", "A `frag` GLSL code (string) is required" + ctx);
  return definition;
}

function shaderDefinitionToShaderInfo(definition) {
  return {
    frag: definition.frag,
    vert: definition.vert || staticVert // FIXME this is somewhat experimental for now, vert implement needs to expect a _p attribute
  };
}

function shaderInfoEquals(s1, s2) {
  return s1.frag === s2.frag && s1.vert === s2.vert;
}

/**
 * Define shaders statically.
 * @namespace
 */
var Shaders = global.__glReactShaders = global.__glReactShaders || {
  /**
   * @memberof Shaders
   * @param {ShadersDefinition} shadersDef - an object that statically define all shaders.
   * @returns {ShadersSheet}, an object map that returns a ShaderIdentifier for each shader key defined in the shaders definition.
   * @example
   *  const shaders = Shaders.create({
   *    helloGL: {
   *      frag: GLSL`...`
   *    }
   *  });
   *  ...
   *  <Node shader={shaders.helloGL} />
   */
  create: function create(shadersDef) {
    var sheet = {};
    Object.keys(shadersDef).forEach(function (k) {
      var definition = ensureShaderDefinition(shadersDef[k], " in Shaders.create({ " + k + ": ... })");
      var id = genShaderId();
      var shaderId = Object.freeze({ type: ShaderID, id: id });
      shaderDefinitions[id] = definition;
      shaderNames[id] = k;
      sheet[k] = shaderId;
      var result = shaderDefinitionToShaderInfo(definition);
      shaderResults[id] = result;
    });
    return sheet;
  },
  getName: function getName(shaderIdentifier) {
    return (shaderNames[shaderIdentifier.id] || "???") + ("#" + String(shaderIdentifier.id));
  },
  getShortName: function getShortName(shaderIdentifier) {
    return shaderNames[shaderIdentifier.id] || "???";
  },
  get: function get(shaderIdentifier) {
    (0, _invariant2.default)(shaderIdentifier.id in shaderDefinitions, "Shader %s does not exist. Make sure you don't have gl-react dup issue: `npm ls gl-react`", shaderIdentifier.id);
    return shaderResults[shaderIdentifier.id];
  }
};
exports.default = Shaders;
//# sourceMappingURL=Shaders.js.map