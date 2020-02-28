BuildBoard();
DrawBoard();

Object.defineProperty(window, '\0', {
  get: function() {
  	console.log("test");
  	return "test";
  }
});