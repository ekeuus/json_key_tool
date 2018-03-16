const isObject = val =>
	typeof val === 'object' && !Array.isArray(val);

const paths = (obj = {}) =>
	Object.entries(obj)
		.reduce(
			(product, [key, value]) =>
				(isObject(value) ?
					product.concat([
						[key, paths(value)], // adds [root, [children]] list
					]) :
					product.concat([key])), // adds [child] list
			[],
		);

const addDelimiter = (a, b) =>
	(a ? `${a}.${b}` : b);

const pathToString = ([root, children]) => {
	const result = [];

	children.forEach((child) => {
		if (Array.isArray(child)) {
			const childPaths = pathToString(child);
			const childPathsDelimited = childPaths.map(path => addDelimiter(root, path));
			result.push(...childPathsDelimited);
		} else {
			result.push(addDelimiter(root, child));
		}
	});

	return result;
};

const getValuesForKeys = (keys, file) =>
	keys.map(translation => ({
		value: [...translation.split('.')]
			.reduce((path, key) =>
				path[key], file),
		key: translation,
    }));
    
export default {
	getValuesForKeys,
	paths,
	pathToString,
}
