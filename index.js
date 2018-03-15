'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isObject = function isObject(val) {
	return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' && !Array.isArray(val);
};

var paths = function paths() {
	var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	return Object.entries(obj).reduce(function (product, _ref) {
		var _ref2 = _slicedToArray(_ref, 2),
		    key = _ref2[0],
		    value = _ref2[1];

		return isObject(value) ? product.concat([[key, paths(value)]] // adds [root, [children]] list
		) : product.concat([key]);
	}, // adds [child] list
	[]);
};

var addDelimiter = function addDelimiter(a, b) {
	return a ? a + '.' + b : b;
};

var pathToString = function pathToString(_ref3) {
	var _ref4 = _slicedToArray(_ref3, 2),
	    root = _ref4[0],
	    children = _ref4[1];

	var result = [];

	children.forEach(function (child) {
		if (Array.isArray(child)) {
			var childPaths = pathToString(child);
			var childPathsDelimited = childPaths.map(function (path) {
				return addDelimiter(root, path);
			});
			result.push.apply(result, _toConsumableArray(childPathsDelimited));
		} else {
			result.push(addDelimiter(root, child));
		}
	});

	return result;
};

var getValuesForKeys = function getValuesForKeys(keys, file) {
	return keys.map(function (translation) {
		return {
			value: [].concat(_toConsumableArray(translation.split('.'))).reduce(function (path, key) {
				return path[key];
			}, file),
			key: translation
		};
	});
};

exports.default = {
	pathToString: pathToString,
	paths: paths,
	getValuesForKeys: getValuesForKeys
};