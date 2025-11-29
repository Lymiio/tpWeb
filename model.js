function Drawing() {
  this.forms = [];
}

function Line(xInitial, yInitial, xFinal, yFinal, color, lineWidth) {
  this.xInitial = xInitial;
  this.yInitial = yInitial;
  this.xFinal = xFinal;
  this.yFinal = yFinal;
  this.color = color;
  this.lineWidth = lineWidth;
}

function Rectangle(x, y, width, height, color, lineWidth) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.lineWidth = lineWidth;
}

Rectangle.prototype.getInitX = function() { return this.x; };
Rectangle.prototype.getInitY = function() { return this.y; };
Rectangle.prototype.getFinalX = function() { return this.x + this.width; };
Rectangle.prototype.getFinalY = function() { return this.y + this.height; };

Line.prototype.getInitX = function() { return this.xInitial; };
Line.prototype.getInitY = function() { return this.yInitial; };
Line.prototype.getFinalX = function() { return this.xFinal; };
Line.prototype.getFinalY = function() { return this.yFinal; };

Drawing.prototype.getForms = function() {
  return this.forms;
};