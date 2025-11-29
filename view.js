
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Rectangle.prototype.paint = function(ctx) {
  ctx.save();
  ctx.strokeStyle = this.color || "#000000";
  ctx.lineWidth = this.lineWidth || 5;
  ctx.beginPath();
  ctx.rect(this.getInitX(), this.getInitY(), this.width, this.height);
  ctx.stroke();
  ctx.restore();
};

Line.prototype.paint = function(ctx) {  
  ctx.save();
  ctx.strokeStyle = this.color || "#000000";
  ctx.lineWidth = this.lineWidth || 5;
  ctx.beginPath();
  ctx.moveTo(this.getInitX(), this.getInitY());
  ctx.lineTo(this.getFinalX(), this.getFinalY());
  ctx.stroke();
  ctx.restore();
};

Drawing.prototype.paint = function(ctx) {
  ctx.fillStyle = '#F0F0F0';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  this.getForms().forEach(function (f) {
    f.paint(ctx);
  });
};


function updateShapeList(drawing, ctx) {
  var container = document.getElementById('shapeList');
  if (!container) return;
  container.innerHTML = '';

  drawing.getForms().forEach(function(form, idx) {
    var item = document.createElement('div');
    item.className = 'shape-item';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-default';
    var span = document.createElement('span');
    span.className = 'glyphicon glyphicon-remove-sign';
    btn.appendChild(span);

    var labelText = 'Forme inconnue';
    if (form instanceof Line) {
      labelText = 'Ligne (' + form.getInitX() + ',' + form.getInitY() + ') - (' + form.getFinalX() + ',' + form.getFinalY() + ')';
    } else if (form instanceof Rectangle) {
      labelText = 'Rectangle (' + form.getInitX() + ',' + form.getInitY() + ') ' + form.width + 'x' + form.height;
    }

    btn.addEventListener('click', function() {
      var currentIndex = drawing.getForms().indexOf(form);
      if (currentIndex !== -1) {
        drawing.getForms().splice(currentIndex, 1);
        drawing.paint(ctx);
        updateShapeList(drawing, ctx);
      }
    });

    var textNode = document.createTextNode(' ' + labelText);
    item.appendChild(btn);
    item.appendChild(textNode);
    container.appendChild(item);
  });
}