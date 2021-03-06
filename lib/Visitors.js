"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _globalVisitors = global.__glReactGlobalVisitor = global.__glReactGlobalVisitor || [];

/**
 * Utility to visit the Surface & Node draw lifecycle (used for logging and testing)
 * @namespace
 */

var Visitors = {
  /**
   * @memberof Visitors
   */
  add: function add(visitor) {
    _globalVisitors.push(visitor);
  },

  /**
   * @memberof Visitors
   */
  remove: function remove(visitor) {
    var i = _globalVisitors.indexOf(visitor);
    if (i !== -1) _globalVisitors.splice(i, 1);
  },
  get: function get() {
    return _globalVisitors;
  }
};

exports.default = Visitors;
//# sourceMappingURL=Visitors.js.map