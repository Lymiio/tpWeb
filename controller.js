
var editingMode = { rect: 0, line: 1 };

function Pencil(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = 0;
    this.isDragging = false;

    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.

    // Mode (rectangle ou ligne)
    document.getElementById('butRect').onclick = () => {
        this.currEditingMode = editingMode.rect;
    };
    document.getElementById('butLine').onclick = () => {
        this.currEditingMode = editingMode.line;
    };

    // Couleur
    document.getElementById('colour').onchange = (e) => {
        this.currColour = e.target.value;
    };

    // Largeur du trait
    document.getElementById('spinnerWidth').onchange = (e) => {
        this.currLineWidth = parseInt(e.target.value, 10);
    };

    new DnD(canvas, this);

    // Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd

    this.onInteractionStart = (dnd) => {
      this.isDragging = true; // début du drag
      if (this.currEditingMode === editingMode.line) {
        this.currentShape = new Line(
          dnd.xInitial, dnd.yInitial,
          dnd.xInitial, dnd.yInitial,
          this.currColour, this.currLineWidth
        );
      } else if (this.currEditingMode === editingMode.rect) {
        this.currentShape = new Rectangle(
          dnd.xInitial, dnd.yInitial,
          0, 0,
          this.currColour, this.currLineWidth
        );
      }
    };

  this.onInteractionUpdate = (dnd) => {
      if (this.currentShape) {
        if (this.currEditingMode === editingMode.line) {
          this.currentShape.xFinal = dnd.xFinal;
          this.currentShape.yFinal = dnd.yFinal;
        } else if (this.currEditingMode === editingMode.rect) {
          var x = Math.min(dnd.xInitial, dnd.xFinal);
          var y = Math.min(dnd.yInitial, dnd.yFinal);
          var w = Math.abs(dnd.xFinal - dnd.xInitial);
          var h = Math.abs(dnd.yFinal - dnd.yInitial);
          this.currentShape.x = x;
          this.currentShape.y = y;
          this.currentShape.width = w;
          this.currentShape.height = h;
        }
        drawing.paint(ctx);
        if (this.currentShape && typeof this.currentShape.paint === 'function') {
          this.currentShape.paint(ctx);
        }
      }
    };
  
  this.onInteractionEnd = (dnd) => {
      this.isDragging = false;
      if (this.currentShape) {
        drawing.forms.push(this.currentShape);
        drawing.paint(ctx);
        if (typeof updateShapeList === 'function') {
          updateShapeList(drawing, ctx);
        }
        this.currentShape = null;
      }
    };
}

