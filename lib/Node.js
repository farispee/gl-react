"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _typedarrayPool = require("typedarray-pool");

var _typedarrayPool2 = _interopRequireDefault(_typedarrayPool);

var _ndarray = require("ndarray");

var _ndarray2 = _interopRequireDefault(_ndarray);

var _Uniform = require("./Uniform");

var _Uniform2 = _interopRequireDefault(_Uniform);

var _Bus = require("./Bus");

var _Bus2 = _interopRequireDefault(_Bus);

var _Shaders = require("./Shaders");

var _Shaders2 = _interopRequireDefault(_Shaders);

var _invariantNoDependentsLoop = require("./helpers/invariantNoDependentsLoop");

var _invariantNoDependentsLoop2 = _interopRequireDefault(_invariantNoDependentsLoop);

var _genId = require("./genId");

var _genId2 = _interopRequireDefault(_genId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var blendFuncAliases = {
  zero: "ZERO",
  one: "ONE",
  "src color": "SRC_COLOR",
  "one minus src color": "ONE_MINUS_SRC_COLOR",
  "src alpha": "SRC_ALPHA",
  "one minus src alpha": "ONE_MINUS_SRC_ALPHA",
  "dst color": "DST_COLOR",
  "one minus dst color": "ONE_MINUS_DST_COLOR",
  "dst alpha": "DST_ALPHA",
  "one minus dst alpha": "ONE_MINUS_DST_ALPHA",
  "constant color": "CONSTANT_COLOR",
  "one minus constant color": "ONE_MINUS_CONSTANT_COLOR",
  "constant alpha": "CONSTANT_ALPHA",
  "one minus constant alpha": "ONE_MINUS_CONSTANT_ALPHA",
  "src alpha saturate": "SRC_ALPHA_SATURATE"
};

/**
 * The texture pixel interpolation mode.
 *
 * One of:
 * - `linear`
 * - `nearest`
 */


/**
 * A texture wrap mode define how the texture lookup repeat over edges.
 *
 * One of:
 * - `clamp to edge`
 * - `repeat`
 * - `mirrored repeat`
 */


/**
 * Options on a texture.
 * - interpolation define how the pixel lookup get mapped to screen.
 * - wrap define how the edge lookup behaves. It can be either a [x,y] wrap or a wrap value for both.
 */


/**
 * The GL blending function.
 *
 * One of:
 * - `zero`
 * - `one`
 * - `src color`
 * - `one minus src color`
 * - `src alpha`
 * - `one minus src alpha`
 * - `dst color`
 * - `one minus dst color`
 * - `dst alpha`
 * - `one minus dst alpha`
 * - `constant color`
 * - `one minus constant color`
 * - `constant alpha`
 * - `one minus constant alpha`
 * - `src alpha saturate`
 */


/**
 *
 */


/**
 * Array of 4 numbers. Useful to represent colors. *[ r, g, b, a ]*
 */


/**
 * The GL clear mode.
 */


/**
 * Uniforms is an map object from uniform name to a value.
 *
 * **The library support numerous uniform types via different formats.
 * Let's describe them:**
 *
 * ### int or float
 *
 * a JavaScript number
 *
 * ### bool
 *
 * a JavaScript Boolean
 *
 * ### int[], float[], bool[] arrays
 *
 * an array of the number (0/1 for bool can be used as well as bools)
 *
 * ### vec2, vec3, vec4
 *
 * an array of number, of size respectively 2, 3 and 4.
 *
 * > same is available for ivec* variants.
 *
 * ### mat2, mat3, mat4
 *
 * Similarly to vectorial types, you can pass an array of numbers.
 * For matrix, you actually define them in a flatten way (not arrays of arrays).
 *
 * ### sampler2D type (aka texture)
 *
 * The library support numerous and extensible uniform value format.
 *
 * **FIXME: to be documented.**
 *
 * ### struct types
 *
 * Consider it unsupported even though it *might* work since gl-react is based on `gl-shader`.
 *
 */


// not sure why, but we must define this for Flow to properly type check


var isBackbuffer = function isBackbuffer(obj) {
  if (obj === "Backbuffer") {
    console.warn('Backbuffer is deprecated, use Uniform.Backbuffer instead: `import {Uniform} from "gl-react"`');
    return true;
  }
  return obj === _Uniform2.default.Backbuffer;
};

var isBackbufferFrom = function isBackbufferFrom(obj) {
  return obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.type === "BackbufferFrom";
};

var isTextureSizeGetter = function isTextureSizeGetter(obj) {
  return obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj.type === "TextureSize";
};

var nodeWidthHeight = function nodeWidthHeight(_ref, _ref2) {
  var width = _ref.width,
      height = _ref.height;
  var glSizable = _ref2.glSizable;

  if (width && height) return [width, height];

  var _glSizable$getGLSize = glSizable.getGLSize(),
      _glSizable$getGLSize2 = _slicedToArray(_glSizable$getGLSize, 2),
      cw = _glSizable$getGLSize2[0],
      ch = _glSizable$getGLSize2[1];

  return [width || cw, height || ch];
};

var mapBlendFunc = function mapBlendFunc(gl, name) {
  // $FlowFixMe
  if (name in gl) return gl[name];
  if (name in blendFuncAliases) {
    var id = blendFuncAliases[name];
    // $FlowFixMe
    if (id in gl) return gl[id];
  }
  console.warn("Invalid blendFunc. Got:", name);
};

var parseWrap = function parseWrap(gl, w) {
  switch (w) {
    case "clamp to edge":
      return gl.CLAMP_TO_EDGE;
    case "repeat":
      return gl.REPEAT;
    case "mirrored repeat":
      return gl.MIRRORED_REPEAT;
    default:
      console.warn("Invalid wrap. Got:", w);
      return gl.CLAMP_TO_EDGE;
  }
};

var mergeArrays = function mergeArrays(a, b) {
  var t = [];
  var length = Math.max(a.length, b.length);
  for (var i = 0; i < length; i++) {
    t[i] = b[i] || a[i];
  }
  return t;
};

var parseInterpolation = function parseInterpolation(gl, i) {
  switch (i) {
    case "linear":
      return gl.LINEAR;
    case "nearest":
      return gl.NEAREST;
    default:
      console.warn("Invalid interpolation. Got:", i);
      return gl.LINEAR;
  }
};

// minimal version of gl-fbo
var createFBO = function createFBO(gl, width, height) {
  var handle = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, handle);
  var color = gl.createTexture();
  if (!color) throw new Error("createTexture returned null");
  gl.bindTexture(gl.TEXTURE_2D, color);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, color, 0);
  return {
    handle: handle,
    color: color,
    bind: function bind() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, handle);
      gl.viewport(0, 0, width, height);
    },
    syncSize: function syncSize(w, h) {
      if (w !== width || h !== height) {
        width = w;
        height = h;
        gl.bindTexture(gl.TEXTURE_2D, color);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      }
    },
    dispose: function dispose() {
      gl.deleteFramebuffer(handle);
      gl.deleteTexture(color);
    }
  };
};

var defaultTextureOptions = {
  interpolation: "linear",
  wrap: ["clamp to edge", "clamp to edge"]
};

var applyTextureOptions = function applyTextureOptions(gl, partialOpts) {
  var opts = _extends({}, defaultTextureOptions, partialOpts);
  var filter = parseInterpolation(gl, opts.interpolation);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  var wrapS = void 0,
      wrapT = void 0;
  if (Array.isArray(opts.wrap)) {
    if (opts.wrap.length !== 2) {
      console.warn("textureOptions wrap: should be an array of 2 values. Got:", opts.wrap);
      wrapS = wrapT = gl.CLAMP_TO_EDGE;
    } else {
      wrapS = parseWrap(gl, opts.wrap[0]);
      wrapT = parseWrap(gl, opts.wrap[1]);
    }
  } else {
    wrapS = wrapT = parseWrap(gl, opts.wrap);
  }
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
};

var NodePropTypes = {
  shader: _propTypes2.default.object.isRequired,
  uniformsOptions: _propTypes2.default.object,
  uniforms: _propTypes2.default.object,
  ignoreUnusedUniforms: _propTypes2.default.any,
  sync: _propTypes2.default.bool,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  children: _propTypes2.default.any,
  backbuffering: _propTypes2.default.bool,
  blendFunc: _propTypes2.default.object,
  clear: _propTypes2.default.object,
  onDraw: _propTypes2.default.func
};

/**
 * `<Node>` is the primitive that renders a shader program into a Framebuffer.
 * It can be composed with other `Node` via using a sampler2D uniforms.
 *
 * @prop {ShaderIdentifier} shader - created with `Shaders.create`
 * @prop {Uniforms} [uniforms] - uniform values that gets passed to the fragment shader.
 * @prop {Object} [uniformsOptions] - allows to configure things like interpolation of a sampler2D texture.
 * @prop {number} [width] - the width in in real pixels unit (unlike Surface, no pixel ratio)
 * @prop {number} [height] - the height in in real pixels unit (unlike Surface, no pixel ratio)
 * @prop {bool} [sync] - If true, a React update will always force a sync redraw of the Node framebuffer.
 * @prop {bool} [backbuffering] - enable the backbuffering that allows to use `Backbuffer` in uniforms to get the previous framebuffer texture state in the fragment shader.
 * @prop {BlendFuncSrcDst} [blendFunc] - configure the blending function to use
 * @prop {Clear} [clear] - configure the clear to use (color,...)
 * @prop {Function} [onDraw] - a callback called each time a draw was produced for this Node.
 * @prop {any} [children] - in advanced use-cases, you can render things like Bus or contents to be used by Node
 * @prop {any} [ignoreUnusedUniforms] - ignore all or some uniforms to be warned if they are not existing or used in the actual shader code (by default it's good for dev to warn them but they are usecase where it's not easy to know, like if the GLSL code come from the user). boolean to ignore all or whitelist array of uniforms name to ignore.
 * @example
 *  <Node shader={shaders.helloGL} />
 */

var Node = function (_Component) {
  _inherits(Node, _Component);

  function Node() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, Node);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = Node.__proto__ || Object.getPrototypeOf(Node)).call.apply(_ref3, [this].concat(args))), _this), _this.drawProps = _this.props, _this._needsRedraw = false, _this.id = (0, _genId2.default)(), _this.uniformsBus = {}, _this.dependencies = [], _this.dependents = [], _this._resolveElement = function (uniform, value, index) {
      if (!_react2.default.isValidElement(value)) {
        if (typeof value === "function") {
          value = value(_this.redraw);
          if (!_react2.default.isValidElement(value)) {
            return; // the function don't return an Element, skip
          }
        } else {
            return; // the value isn't an Element, skip
          }
      }
      return _react2.default.createElement(
        _Bus2.default,
        {
          key: uniform + (index ? "." + index : ""),
          uniform: uniform,
          index: index
        },
        value
      );
    }, _this._renderUniformElement = function (key) {
      var uniforms = _this.props.uniforms;

      var value = uniforms[key];
      return Array.isArray(value) ? value.map(function (v, i) {
        return _this._resolveElement(key, v, i);
      }) : _this._resolveElement(key, value, 0);
    }, _this.redraw = function () {
      if (!_this._needsRedraw) {
        _this._needsRedraw = true;
        _this.dependents.forEach(function (d) {
          return d.redraw();
        });
      }
    }, _this.flush = function () {
      _this.context.glSurface._draw();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  } // Node this instance depends on
  // Node/Surface that depends on this instance

  _createClass(Node, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        glParent: this,
        glSizable: this
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var gl = this.context.glSurface.gl;

      if (gl) this._prepareGLObjects(gl);
      this.context.glParent._addGLNodeChild(this);
      this.redraw();
      if (this.props.sync) this.flush();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;

      var capturePixelsArray = this.capturePixelsArray;

      this._destroyGLObjects();
      if (capturePixelsArray) {
        _typedarrayPool2.default.freeUint8(capturePixelsArray);
      }
      this._needsRedraw = false;
      this.context.glParent._removeGLNodeChild(this);
      this.dependencies.forEach(function (d) {
        return d._removeDependent(_this2);
      });
    }
  }, {
    key: "_syncNextDrawProps",
    value: function _syncNextDrawProps(nextProps, nextContext) {
      var nextWidthHeight = nodeWidthHeight(nextProps, nextContext);
      if (this.framebuffer) {
        var _framebuffer;

        (_framebuffer = this.framebuffer).syncSize.apply(_framebuffer, _toConsumableArray(nextWidthHeight));
      }
      if (this.backbuffer) {
        var _backbuffer;

        (_backbuffer = this.backbuffer).syncSize.apply(_backbuffer, _toConsumableArray(nextWidthHeight));
      }
      (0, _invariant2.default)(nextProps.backbuffering === this.drawProps.backbuffering, "Node backbuffering prop must not changed. (not yet supported)");
      this.drawProps = nextProps;
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          uniforms = _props.uniforms;
      var RenderLessElement = this.context.glSurface.RenderLessElement;

      return _react2.default.createElement(
        RenderLessElement,
        null,
        children,
        Object.keys(uniforms).map(this._renderUniformElement)
      );
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this._syncNextDrawProps(this.props, this.context);
      this.redraw();
      if (this.props.sync) this.flush();
    }
  }, {
    key: "getGLShortName",
    value: function getGLShortName() {
      var shader = this.drawProps.shader;

      var shaderName = (0, _Shaders.isShaderIdentifier)(shader) ? // $FlowFixMe FIXME
      _Shaders2.default.getShortName(shader) : "<inline>";
      return "Node(" + shaderName + ")";
    }
  }, {
    key: "getGLName",
    value: function getGLName() {
      var shader = this.drawProps.shader;

      var shaderName = (0, _Shaders.isShaderIdentifier)(shader) ? // $FlowFixMe FIXME
      _Shaders2.default.getName(shader) : "<inline>";
      return "Node#" + this.id + "(" + shaderName + ")";
    }
  }, {
    key: "getGLSize",
    value: function getGLSize() {
      return nodeWidthHeight(this.drawProps, this.context);
    }
  }, {
    key: "getGLOutput",
    value: function getGLOutput() {
      var framebuffer = this.framebuffer;

      (0, _invariant2.default)(framebuffer, "Node#getGLOutput: framebuffer is not defined. It cannot be called on a root Node");
      return framebuffer.color;
    }
  }, {
    key: "getGLBackbufferOutput",
    value: function getGLBackbufferOutput() {
      var backbuffer = this.backbuffer;

      (0, _invariant2.default)(backbuffer, "Node#getGLBackbufferOutput: backbuffer is not defined. Make sure `backbuffering` prop is defined");
      return backbuffer.color;
    }

    /**
     * Imperatively set the props with a partial subset of props to apply.
     * This is an escape hatch to perform a redraw with different props without having to trigger a new React draw. Only use it when reaching a performance bottleneck.
     * NB: at any time, render() needs to consistently render the same props you set in setDrawProps to avoid any potential blink (if a React draw would occur).
     * @param {Props} patch a subset of props to apply on top of the previous draw props.
     */

  }, {
    key: "setDrawProps",
    value: function setDrawProps(patch) {
      // $FlowFixMe
      var nextProps = _extends({}, this.drawProps, patch);
      this._syncNextDrawProps(nextProps, this.context);
      this.redraw();
      if (nextProps.sync) this.flush();
    }

    /**
     * Capture the node pixels.
     * Without parameters, it will capture the full rectangle,
     * otherwise you can provide (x, y) or (x, y, w, h) to provide a subset of this rectangle.
     */

  }, {
    key: "capture",
    value: function capture(x, y, w, h) {
      var _getGLSize = this.getGLSize(),
          _getGLSize2 = _slicedToArray(_getGLSize, 2),
          width = _getGLSize2[0],
          height = _getGLSize2[1];

      var gl = this.context.glSurface.gl;

      (0, _invariant2.default)(gl, "gl is no longer available");
      if (x === undefined) x = 0;
      if (y === undefined) y = 0;
      if (w === undefined) w = width - x;
      if (h === undefined) h = height - y;
      (0, _invariant2.default)(x >= 0 && x + w <= width && y >= 0 && y + h <= height, "capture(%s,%s,%s,%s): requested rectangle is out of bounds (%s,%s)", x, y, w, h, width, height);
      var size = w * h * 4;
      var pixels = this._captureAlloc(size);
      this._bind();
      gl.readPixels(x, y, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      return (0, _ndarray2.default)(pixels, [h, w, 4]).step(-1, 1, 1).transpose(1, 0, 2);
    }

    /**
     * Schedule a redraw of this node and all dependent nodes.
     *
     * @function
     */


    /**
     * Force the redraw (if any) to happen now, synchronously.
     *
     * @function
     */

  }, {
    key: "_destroyGLObjects",
    value: function _destroyGLObjects() {
      var glSurface = this.context.glSurface;

      if (glSurface.glIsAvailable()) {
        // We should only dispose() if gl is still here.
        // otherwise, GL should already have free resources.
        // (also workaround for https://github.com/stackgl/headless-gl/issues/90)
        var framebuffer = this.framebuffer,
            backbuffer = this.backbuffer,
            _shader = this._shader;

        if (_shader) {
          _shader.dispose();
        }
        if (framebuffer) {
          framebuffer.dispose();
        }
        if (backbuffer) {
          backbuffer.dispose();
        }
      }
      delete this._shader;
      delete this.framebuffer;
      delete this.backbuffer;
    }
  }, {
    key: "_prepareGLObjects",
    value: function _prepareGLObjects(gl) {
      var _getGLSize3 = this.getGLSize(),
          _getGLSize4 = _slicedToArray(_getGLSize3, 2),
          width = _getGLSize4[0],
          height = _getGLSize4[1];

      var _context = this.context,
          glParent = _context.glParent,
          glSurface = _context.glSurface;

      if (glParent === glSurface) {
        // my parent IS the glSurface, should prevent from creating a FBO.
        // when a FBO is not created, _draw() happens on the final Canvas (null fbo)
        // NB we can just do this in WillMount because this context will not change.
        (0, _invariant2.default)(!this.drawProps.backbuffering, "`backbuffering` is currently not supported for a Root Node. " + "Try to wrap %s in a <LinearCopy> or <NearestCopy>.", this.getGLName());
      } else {
        var fbo = createFBO(gl, width, height);
        this.framebuffer = fbo;
        if (this.drawProps.backbuffering) {
          var _fbo = createFBO(gl, width, height);
          this.backbuffer = _fbo;
        }
      }
    }
  }, {
    key: "_onContextLost",
    value: function _onContextLost() {
      this.dependencies.forEach(function (d) {
        return d._onContextLost();
      });
      this._destroyGLObjects();
    }
  }, {
    key: "_onContextRestored",
    value: function _onContextRestored(gl) {
      this._prepareGLObjects(gl);
      this.dependencies.forEach(function (d) {
        return d._onContextRestored(gl);
      });
      this._needsRedraw = true;
    }
  }, {
    key: "_addGLNodeChild",
    value: function _addGLNodeChild(node) {}
  }, {
    key: "_removeGLNodeChild",
    value: function _removeGLNodeChild(node) {}
  }, {
    key: "_addUniformBus",
    value: function _addUniformBus(uniformBus, uniformName, index) {
      var array = this.uniformsBus[uniformName] || (this.uniformsBus[uniformName] = []);
      array[index] = uniformBus;
    }
  }, {
    key: "_removeUniformBus",
    value: function _removeUniformBus(uniformBus, uniformName, index) {
      var array = this.uniformsBus[uniformName] || (this.uniformsBus[uniformName] = []);
      if (array[index] === uniformBus) {
        array[index] = null;
      }
    }
  }, {
    key: "_addDependent",
    value: function _addDependent(node) {
      var i = this.dependents.indexOf(node);
      if (i === -1) {
        (0, _invariantNoDependentsLoop2.default)(this, node);
        this.dependents.push(node);
      }
    }
  }, {
    key: "_removeDependent",
    value: function _removeDependent(node) {
      var i = this.dependents.indexOf(node);
      if (i !== -1) {
        this.dependents.splice(i, 1);
      }
    }
  }, {
    key: "_syncDependencies",
    value: function _syncDependencies(newdeps) {
      var _this3 = this;

      var olddeps = this.dependencies;
      var additions = newdeps.filter(function (node) {
        return olddeps.indexOf(node) === -1;
      });
      var deletions = olddeps.filter(function (node) {
        return newdeps.indexOf(node) === -1;
      });
      additions.forEach(function (d) {
        return d._addDependent(_this3);
      });
      deletions.forEach(function (d) {
        return d._removeDependent(_this3);
      });
      this.dependencies = newdeps;
      return [additions, deletions];
    }
  }, {
    key: "_bind",
    value: function _bind() {
      if (this.framebuffer) {
        this.framebuffer.bind();
      } else {
        this.context.glSurface._bindRootNode();
      }
    }
  }, {
    key: "_captureAlloc",
    value: function _captureAlloc(size) {
      var capturePixelsArray = this.capturePixelsArray;

      if (capturePixelsArray && size !== capturePixelsArray.length) {
        _typedarrayPool2.default.freeUint8(capturePixelsArray);
        capturePixelsArray = null;
      }
      var pixels = capturePixelsArray || _typedarrayPool2.default.mallocUint8(size);
      this.capturePixelsArray = pixels;
      return pixels;
    }
  }, {
    key: "_getShader",
    // in case of inline shader, a Node currently hold a Node

    value: function _getShader(shaderProp) {
      var glSurface = this.context.glSurface;

      var nodeName = this.getGLName();
      (0, _invariant2.default)(shaderProp, nodeName + ": shader prop must be provided");
      if ((0, _Shaders.isShaderIdentifier)(shaderProp)) {
        // $FlowFixMe
        return glSurface._getShader(shaderProp);
      }

      var shaderInfo = (0, _Shaders.shaderDefinitionToShaderInfo)((0, _Shaders.ensureShaderDefinition)(shaderProp, " in " + nodeName));
      var latestShaderInfo = this._latestShaderInfo;
      var shader = this._shader;
      if (!shader || !latestShaderInfo || !(0, _Shaders.shaderInfoEquals)(latestShaderInfo, shaderInfo)) {
        if (shader) {
          shader.dispose();
          delete this._shader;
        }
        shader = glSurface._makeShader(shaderInfo);
        this._latestShaderInfo = shaderInfo;
        this._shader = shader;
      }
      return shader;
    }
  }, {
    key: "_draw",
    value: function _draw() {
      var _this4 = this;

      var glSurface = this.context.glSurface;
      var gl = glSurface.gl;

      var visitors = glSurface.getVisitors();
      var nodeName = this.getGLName();
      if (!gl || !this._needsRedraw) {
        visitors.forEach(function (v) {
          return v.onNodeDrawSkipped(_this4);
        });
        return;
      }

      var _drawProps = this.drawProps,
          backbuffering = _drawProps.backbuffering,
          uniforms = _drawProps.uniforms,
          uniformsOptions = _drawProps.uniformsOptions,
          shaderProp = _drawProps.shader,
          blendFunc = _drawProps.blendFunc,
          clear = _drawProps.clear,
          onDraw = _drawProps.onDraw,
          ignoreUnusedUniforms = _drawProps.ignoreUnusedUniforms;

      //~ PREPARE phase

      if (!this.framebuffer) {
        var glSizable = this.context.glSizable;

        var _glSizable$getGLSize3 = glSizable.getGLSize(),
            _glSizable$getGLSize4 = _slicedToArray(_glSizable$getGLSize3, 2),
            _width = _glSizable$getGLSize4[0],
            _height = _glSizable$getGLSize4[1];

        var _getGLSize5 = this.getGLSize(),
            _getGLSize6 = _slicedToArray(_getGLSize5, 2),
            nw = _getGLSize6[0],
            nh = _getGLSize6[1];

        (0, _invariant2.default)(nw === _width && nh === _height, nodeName + " is root but have overrided {width=%s,height=%s} which doesn't match Surface size {width=%s,height=%s}. " + "Try to wrap your Node in a <NearestCopy> or <LinearCopy>", nw, nh, _width, _height);
      }

      var shader = this._getShader(shaderProp);

      this._needsRedraw = false; // FIXME what's the correct position of this line?

      var types = shader.types;

      var glRedrawableDependencies = [];
      var pendingTextures = [];
      var units = 0;
      var usedUniforms = Object.keys(types.uniforms);
      var providedUniforms = Object.keys(uniforms);
      var uniformsBus = this.uniformsBus;

      for (var k in uniformsBus) {
        if (!(k in uniforms)) {
          providedUniforms.push(k);
        }
      }
      var textureUnits = new Map();

      var prepareTexture = function prepareTexture(initialObj, uniformOptions, uniformKeyName) {
        var obj = initialObj,
            dependency = void 0,
            result = void 0;

        if (typeof obj === "function") {
          // texture uniform can be a function that resolves the object at draw time.
          obj = obj(_this4.redraw);
        }

        if (!obj) {
          if (obj === undefined) {
            console.warn(nodeName + ", uniform '" + uniformKeyName + "' is undefined." + "If you explicitely want to clear a texture, set it to null.");
          }
        } else if (isBackbuffer(obj)) {
          // maybe it's backbuffer?
          if (!_this4.drawProps.backbuffering) {
            console.warn(nodeName + ", uniform " + uniformKeyName + ": you must set `backbuffering` on Node when using Backbuffer");
          }
          result = { glNode: _this4, glNodePickBackbuffer: true };
        } else if (isBackbufferFrom(obj)) {
          // backbuffer of another node/bus
          (0, _invariant2.default)((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object", "invalid backbufferFromNode. Got: %s", obj);
          var node = obj.node;
          if (node instanceof _Bus2.default) {
            node = node.getGLRenderableNode();
            (0, _invariant2.default)(node, "backbufferFromNode(bus) but bus.getGLRenderableNode() is %s", node);
          }
          (0, _invariant2.default)(node instanceof Node, "invalid backbufferFromNode(obj): obj must be an instanceof Node or Bus. Got: %s", obj);
          if (!node.drawProps.backbuffering) {
            console.warn(nodeName + ", uniform " + uniformKeyName + ": you must set `backbuffering` on the Node referenced in backbufferFrom(" + node.getGLName() + ")");
          }
          result = { glNode: node, glNodePickBackbuffer: true };
        } else if (obj instanceof Node) {
          // maybe it's a Node?
          dependency = obj;
          result = { glNode: obj };
        } else if (obj instanceof _Bus2.default) {
          // maybe it's a Bus?
          // to a node?
          var _node = obj.getGLRenderableNode();
          if (_node) {
            dependency = _node;
            result = { glNode: _node };
          } else {
            // to a DOM/native element? (like <canvas>, <video>, ...)
            dependency = obj;
            var renderable = obj.getGLRenderableContent();
            if (!renderable) {
              console.warn(nodeName + ", uniform " + uniformKeyName + ": child is not renderable. Got:", renderable);
              result = { directTexture: null };
            } else {
              obj = renderable;
            }
          }
        }

        // In any remaining cases, we are asking texture loaders
        // to concretely resolve the Texture.
        if (!result && obj) {
          var _glSurface$_resolveTe = glSurface._resolveTextureLoader(obj),
              loader = _glSurface$_resolveTe.loader,
              input = _glSurface$_resolveTe.input;

          if (!loader) {
            console.warn(nodeName + ", uniform " + uniformKeyName + ": no loader found for value", input, obj);
          } else {
            var t = loader.get(input);
            if (t) {
              loader.update(input);
              result = {
                directTexture: t.texture,
                directTextureSize: [t.width, t.height]
              };
            } else {
              // otherwise, we will have to load it and postpone the rendering.
              var p = loader.load(input);
              pendingTextures.push(p);
            }
          }
        }

        // we also accumulate a dep, that will be used to build the gl graph.
        if (dependency) glRedrawableDependencies.push(dependency);

        var textureOptions = result ? uniformOptions : null;
        var getMetaInfo = function getMetaInfo() {
          return {
            initialObj: initialObj,
            obj: obj,
            dependency: dependency,
            textureOptions: textureOptions
          };
        };
        var getSize = function getSize() {
          var fallback = [2, 2];
          return result ? "directTextureSize" in result ? result.directTextureSize : result.glNode ? result.glNode.getGLSize() : fallback : fallback;
        };
        var prepare = function prepare() {
          var texture = result && (result.directTexture || result.glNode && (result.glNodePickBackbuffer ? result.glNode.getGLBackbufferOutput() : result.glNode.getGLOutput())) || glSurface.getEmptyTexture();
          if (textureUnits.has(texture)) {
            // FIXME different uniform options on a same texture is not supported
            return textureUnits.get(texture);
          }
          var value = units++;
          gl.activeTexture(gl.TEXTURE0 + value);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          applyTextureOptions(gl, textureOptions);
          textureUnits.set(texture, value);
          return value;
        };
        return {
          getMetaInfo: getMetaInfo,
          getSize: getSize,
          prepare: prepare
        };
      };

      var prepareUniform = function prepareUniform(key) {
        var uniformType = types.uniforms[key];
        if (!uniformType) {
          var ignoredWarn = ignoreUnusedUniforms === true || ignoreUnusedUniforms instanceof Array && ignoreUnusedUniforms.includes(key);
          if (!ignoredWarn) {
            console.warn(nodeName + " uniform '" + key + "' is not declared, nor used, in your shader code");
          }
          return { key: key, value: undefined };
        }
        var uniformValue = uniforms[key];
        usedUniforms.splice(usedUniforms.indexOf(key), 1);

        if (uniformType === "sampler2D") {
          var uniformBus = uniformsBus[key];

          var _prepareTexture = prepareTexture(uniformBus && uniformBus[0] || uniformValue, uniformsOptions[key], key),
              getMetaInfo = _prepareTexture.getMetaInfo,
              prepare = _prepareTexture.prepare;

          return {
            key: key,
            type: uniformType,
            getMetaInfo: getMetaInfo,
            prepare: prepare
          };
        } else if (uniformValue === _Uniform2.default.Resolution) {
          return {
            key: key,
            type: uniformType,
            value: _this4.getGLSize()
          };
        } else if (isTextureSizeGetter(uniformValue)) {
          (0, _invariant2.default)(uniformValue && (typeof uniformValue === "undefined" ? "undefined" : _typeof(uniformValue)) === "object", "unexpected textureSize object. Got: %s", uniformValue);

          var _prepareTexture2 = prepareTexture(uniformValue.obj, null, key),
              getSize = _prepareTexture2.getSize;

          var size = getSize();
          if (!size) {
            console.warn(nodeName + ", uniform " + key + ": texture size is undetermined");
          }
          var value = uniformValue.ratio ? size ? size[0] / size[1] : 1 : size || [0, 0];
          return {
            key: key,
            type: uniformType,
            value: value
          };
        } else if (Array.isArray(uniformType) && uniformType[0] === "sampler2D") {
          var values = void 0;
          var _uniformBus = uniformsBus[key];
          var v = mergeArrays(Array.isArray(uniformValue) ? uniformValue : [], Array.isArray(_uniformBus) ? _uniformBus : []);
          if (!v.length) {
            console.warn(nodeName + ", uniform '" + key + "' should be an array of textures.");
            values = uniformType.map(function () {
              return null;
            });
          } else if (v.length !== uniformType.length) {
            console.warn(nodeName + ", uniform '" + key + "' should be an array of exactly " + uniformType.length + " textures (not " + v.length + ").");
            values = uniformType.map(function () {
              return null;
            });
          } else {
            values = v;
          }

          var uniformOptions = uniformsOptions[key]; // TODO support array of options as well
          var all = values.map(function (value, i) {
            return prepareTexture(value, uniformOptions, key + "[" + i + "]");
          });

          return {
            key: key,
            type: uniformType,
            getMetaInfo: function getMetaInfo() {
              return all.reduce(function (acc, o) {
                return acc.concat(o.getMetaInfo());
              }, []);
            },
            prepare: function prepare() {
              return all.map(function (o) {
                return o.prepare();
              });
            }
          };
        } else {
          if (uniformValue === undefined) {
            console.warn(nodeName + ", uniform '" + key + "' is undefined.");
          }
          return {
            key: key,
            type: uniformType,
            value: uniformValue
          };
        }
      };
      var preparedUniforms = providedUniforms.map(prepareUniform);

      if (usedUniforms.length !== 0) {
        console.warn(nodeName + ": Missing uniforms: " + usedUniforms.map(function (u) {
          return "'" + u + "'";
        }).join(", ") + "\n" + "all uniforms must be provided " + "because implementations might share and reuse a Shader Program");
      }

      // if some textures are not ready, we freeze the rendering so it doesn't blink
      if (pendingTextures.length > 0) {
        Promise.all(pendingTextures).then(this.redraw);
        // ^ FIXME "cancel" this promise if we ever come back in _draw()
        visitors.forEach(function (v) {
          return v.onNodeDrawSkipped(_this4);
        });
        return;
      }

      //~ the draw will happen, there is no more interruption cases.
      visitors.forEach(function (v) {
        return v.onNodeDrawStart(_this4);
      });

      var _syncDependencies2 = this._syncDependencies(glRedrawableDependencies),
          _syncDependencies3 = _slicedToArray(_syncDependencies2, 2),
          additions = _syncDependencies3[0],
          deletions = _syncDependencies3[1];

      visitors.forEach(function (v) {
        return v.onNodeSyncDeps(_this4, additions, deletions);
      });

      if (backbuffering) {
        // swap framebuffer and backbuffer
        var backbuffer = this.backbuffer,
            framebuffer = this.framebuffer;

        this.backbuffer = framebuffer;
        if (backbuffer) {
          this.framebuffer = backbuffer;
        }
      }

      //~ DRAW dependencies step
      var drawDep = function drawDep(d) {
        return d._draw();
      };
      this.dependencies.forEach(drawDep);

      //~ DRAW this node step

      visitors.forEach(function (v) {
        return v.onNodeDraw(_this4, preparedUniforms);
      });

      shader.bind();
      this._bind();
      preparedUniforms.forEach(function (obj) {
        var value = obj.prepare ? obj.prepare() : obj.value;
        if (value !== undefined) {
          shader.uniforms[obj.key] = value;
        }
      });

      if (blendFunc) {
        var _src = mapBlendFunc(gl, blendFunc.src);
        var _dst = mapBlendFunc(gl, blendFunc.dst);
        if (_src && _dst) gl.blendFunc(_src, _dst);
      }

      if (clear) {
        gl.clearColor.apply(gl, _toConsumableArray(clear.color));
        gl.clear(gl.COLOR_BUFFER_BIT);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (onDraw) onDraw();

      visitors.forEach(function (v) {
        return v.onNodeDrawEnd(_this4);
      });
    }
  }]);

  return Node;
}(_react.Component);

Node.propTypes = NodePropTypes;
Node.defaultProps = {
  uniformsOptions: {},
  uniforms: {},
  blendFunc: {
    // FIXME should this actually just be null by default? opt-in?
    src: "src alpha",
    dst: "one minus src alpha"
  },
  clear: {
    color: [0, 0, 0, 0]
  }
};
Node.contextTypes = {
  glParent: _propTypes2.default.object.isRequired,
  glSurface: _propTypes2.default.object.isRequired,
  glSizable: _propTypes2.default.object.isRequired
};
Node.childContextTypes = {
  glParent: _propTypes2.default.object.isRequired,
  glSizable: _propTypes2.default.object.isRequired
};
exports.default = Node;
//# sourceMappingURL=Node.js.map