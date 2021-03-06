"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _invariant = require("invariant");

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

var _invariantNoDependentsLoop = require("./helpers/invariantNoDependentsLoop");

var _invariantNoDependentsLoop2 = _interopRequireDefault(_invariantNoDependentsLoop);

var _genId = require("./genId");

var _genId2 = _interopRequireDefault(_genId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * a **Bus is a container to "cache" and re-use content** (tree of Node, canvas, video,...) somewhere else in your GL graph.
 * To use it, use the Bus `ref`:
 * - provide it in another Node texture uniform so you can share computation (send a Node texture to multiple Nodes dependent) (more exactly, a working pattern is to give a `()=>ref` function that will be resolved in `DidUpdate` lifecycle)
 * - You have a `capture()` method to snapshot the underlying Node (because Node can be hidden being nested React components).
 *
 *
 * @prop {any} children the content to render. It can also be a function that takes a redraw function and render an element.
 * @prop {string} [uniform] In case you want to explicitely draw Bus directly into a uniform, you can give the uniform name of the parent node.
 * If this prop is not used, the Bus does not directly belong to a Node and a ref can be used to indirectly give a texture to a node.
 * `uniform` is equivalent to directly pass your VDOM inside the Node uniforms prop.
 *
 * **Usage Example**
 *
 * [![](https://github.com/ProjectSeptemberInc/gl-react/raw/master/docs/examples/blur.gif)](/blurmapmouse)
 *
 * @example
 *
 * <Surface ...>
 *   <Bus ref="myBus">
 *     //here, glEffects or content like a canvas/video...
 *   </Bus>
 *   <Node uniforms={{
 *     texture: () => this.refs.myBus
 *   }} ... />
 * </Surface>
 *
 */
var Bus = function (_Component) {
  _inherits(Bus, _Component);

  function Bus() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Bus);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bus.__proto__ || Object.getPrototypeOf(Bus)).call.apply(_ref, [this].concat(args))), _this), _this.id = (0, _genId2.default)(), _this.dependents = [], _this.glNode = null, _this.onRef = function (ref) {
      _this.glBusRootNode = ref;
    }, _this.redraw = function () {
      _this.dependents.forEach(function (d) {
        return d.redraw();
      });
    }, _this._draw = function () {
      // FIXME: _draw() on a Bus? (would a third party need this?)
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bus, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          uniform = _props.uniform,
          index = _props.index;

      if (uniform) {
        var _glParent = this.context.glParent;

        (0, _invariant2.default)(_glParent instanceof _Node2.default, 'a <Bus uniform=".." /> needs to be inside a Node');
        _glParent._addUniformBus(this, uniform, index);
      }
      this.redraw();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _props2 = this.props,
          uniform = _props2.uniform,
          index = _props2.index;

      if (uniform) {
        var _glParent2 = this.context.glParent;

        (0, _invariant2.default)(_glParent2 instanceof _Node2.default, 'a <Bus uniform=".." /> needs to be inside a Node');
        _glParent2._removeUniformBus(this, uniform, index);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(_ref2) {
      var oldUniform = _ref2.uniform,
          oldIndex = _ref2.index;
      var _props3 = this.props,
          uniform = _props3.uniform,
          index = _props3.index;

      if (uniform && (uniform !== oldUniform || index !== oldIndex)) {
        var _glParent3 = this.context.glParent;

        (0, _invariant2.default)(_glParent3 instanceof _Node2.default, 'a <Bus uniform=".." /> needs to be inside a Node');
        if (oldUniform) _glParent3._removeUniformBus(this, oldUniform, oldIndex);
        _glParent3._addUniformBus(this, uniform, index);
      }
      this.redraw();
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      return {
        glParent: this
      };
    }
  }, {
    key: "_addGLNodeChild",
    value: function _addGLNodeChild(node) {
      this.glNode = node;
      this.context.glParent.redraw();
    }
  }, {
    key: "_removeGLNodeChild",
    value: function _removeGLNodeChild(node) {
      this.glNode = null;
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
      if (i !== -1) this.dependents.splice(i, 1);
    }
  }, {
    key: "getGLRenderableNode",
    value: function getGLRenderableNode() {
      return this.glNode;
    }
  }, {
    key: "getGLRenderableContent",
    value: function getGLRenderableContent() {
      var mapRenderableContent = this.context.glSurface.mapRenderableContent;
      var glBusRootNode = this.glBusRootNode;

      return glBusRootNode && mapRenderableContent ? mapRenderableContent(glBusRootNode) : null;
    }
  }, {
    key: "getGLName",
    value: function getGLName() {
      return "Bus(" + (this.glNode ? this.glNode.getGLName() : String(this.getGLRenderableContent())) + ")";
    }
  }, {
    key: "getGLShortName",
    value: function getGLShortName() {
      var content = this.getGLRenderableContent();
      var shortContentName = String(content && content.constructor && content.constructor.name || content);
      return "Bus(" + (this.glNode ? this.glNode.getGLShortName() : shortContentName) + ")";
    }

    /**
     * Capture the underlying Node pixels.
     * NB it only works for nodes, not for content like video/canvas.
     */

  }, {
    key: "capture",
    value: function capture(x, y, w, h) {
      (0, _invariant2.default)(this.glNode, "Bus does not contain any Node");
      return this.glNode.capture(x, y, w, h);
    }

    /**
     * Schedule a redraw of all nodes that depends on this Bus.
     *
     * @function
     */

  }, {
    key: "_onContextLost",
    value: function _onContextLost() {
      var glNode = this.glNode;

      if (glNode) glNode._onContextLost();
    }
  }, {
    key: "_onContextRestored",
    value: function _onContextRestored(gl) {
      var glNode = this.glNode;

      if (glNode) glNode._onContextRestored(gl);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      var _context$glSurface = this.context.glSurface,
          RenderLessElement = _context$glSurface.RenderLessElement,
          mapRenderableContent = _context$glSurface.mapRenderableContent;

      return _react2.default.createElement(
        RenderLessElement,
        { ref: mapRenderableContent ? this.onRef : undefined },
        typeof children === "function" ? children(this.redraw) : children
      );
    }
  }]);

  return Bus;
}(_react.Component);

Bus.defaultProps = {
  index: 0
};
Bus.contextTypes = {
  glParent: _propTypes2.default.object.isRequired,
  glSurface: _propTypes2.default.object.isRequired
};
Bus.childContextTypes = {
  glParent: _propTypes2.default.object.isRequired
};
exports.default = Bus;
//# sourceMappingURL=Bus.js.map