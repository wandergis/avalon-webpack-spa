module.exports = function(source) {
	this.cacheable && this.cacheable();
	source = source.replace(/css!/g, "");
	this.callback(null, source);
};