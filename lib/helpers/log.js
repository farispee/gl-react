"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

// https://github.com/adamschwartz/log/blob/master/log.js
/* eslint-disable */

var _ref = typeof navigator !== "undefined" ? navigator : { userAgent: "", vendor: "" },
    userAgent = _ref.userAgent,
    vendor = _ref.vendor;

var exportedLog, ffSupport, formats, getOrderedMatches, hasMatches, isFF, isIE, isOpera, isSafari, log, makeArray, operaSupport, safariSupport, stringToArgs, _log;

log = function log() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (arg) {
    if (typeof arg === "string") {
      return args = args.concat(stringToArgs(arg));
    } else {
      return args.push(arg);
    }
  });
  return _log.apply(window, args);
};

_log = function _log() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return Function.prototype.apply.call(console.log, console, args);
};

formats = [{
  regex: /\*([^\*]+)\*/,
  replacer: function replacer(m, p1) {
    return "%c" + p1 + "%c";
  },
  styles: function styles() {
    return ["font-style: italic", ""];
  }
}, {
  regex: /_([^_]+)_/,
  replacer: function replacer(m, p1) {
    return "%c" + p1 + "%c";
  },
  styles: function styles() {
    return ["font-weight: bold", ""];
  }
}, {
  regex: /`([^`]+)`/,
  replacer: function replacer(m, p1) {
    return "%c" + p1 + "%c";
  },
  styles: function styles() {
    return ["background: rgb(255, 255, 219); padding: 1px 5px; border: 1px solid rgba(0, 0, 0, 0.1)", ""];
  }
}, {
  regex: /\[c=(?:"|')?((?:(?!(?:"|')\]).)*)(?:"|')?\]((?:(?!\[c\]).)*)\[c\]/,
  replacer: function replacer(m, p1, p2) {
    return "%c" + p2 + "%c";
  },
  styles: function styles(match) {
    return [match[1], ""];
  }
}];

formats;

hasMatches = function hasMatches(str) {
  var _hasMatches;
  _hasMatches = false;
  formats.forEach(function (format) {
    if (format.regex.test(str)) {
      return _hasMatches = true;
    }
  });
  return _hasMatches;
};

getOrderedMatches = function getOrderedMatches(str) {
  var matches;
  matches = [];
  formats.forEach(function (format) {
    var match;
    match = str.match(format.regex);
    if (match) {
      return matches.push({
        format: format,
        match: match
      });
    }
  });
  return matches.sort(function (a, b) {
    // $FlowFixMe
    return a.match.index - b.match.index;
  });
};

stringToArgs = function stringToArgs(str) {
  var firstMatch, matches, styles;
  styles = [];
  while (hasMatches(str)) {
    matches = getOrderedMatches(str);
    firstMatch = matches[0];
    str = str.replace(firstMatch.format.regex, firstMatch.format.replacer);
    styles = styles.concat(firstMatch.format.styles(firstMatch.match));
  }
  return [str].concat(styles);
};

isSafari = function isSafari() {
  return (/Safari/.test(userAgent) && /Apple Computer/.test(vendor)
  );
};

isOpera = function isOpera() {
  return (/OPR/.test(userAgent) && /Opera/.test(vendor)
  );
};

isFF = function isFF() {
  return (/Firefox/.test(userAgent)
  );
};

isIE = function isIE() {
  return (/MSIE/.test(userAgent)
  );
};

safariSupport = function safariSupport() {
  var m;
  m = userAgent.match(/AppleWebKit\/(\d+)\.(\d+)(\.|\+|\s)/);
  if (!m) {
    return false;
  }
  return 537.38 <= parseInt(m[1], 10) + parseInt(m[2], 10) / 100;
};

operaSupport = function operaSupport() {
  var m;
  m = userAgent.match(/OPR\/(\d+)\./);
  if (!m) {
    return false;
  }
  return 15 <= parseInt(m[1], 10);
};

ffSupport = function ffSupport() {
  return typeof window !== "undefined" && (window.console.firebug || window.console.exception);
};

if (isIE() || isFF() && !ffSupport() || isOpera() && !operaSupport() || isSafari() && !safariSupport()) {
  exportedLog = _log;
} else {
  exportedLog = log;
}

exportedLog.l = _log;

exports.default = exportedLog;
//# sourceMappingURL=log.js.map