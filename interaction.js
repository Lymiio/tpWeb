// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
  this.xInitial = 0;
  this.yInitial = 0;
  this.xFinal = 0;
  this.yFinal = 0;
  this.dragging = false;

  this.onMouseDown = (evt) => {
    let pos = getMousePosition(canvas, evt);
    this.xInitial = pos.x;
    this.yInitial = pos.y;
    this.dragging = true;

    console.log("Start:", this.xInitial, this.yInitial);

    if (interactor && interactor.onInteractionStart) {
      interactor.onInteractionStart(this);
    }
  };
  if (interactor && interactor.onInteractionStart) {
    interactor.onInteractionStart(this);
}


  this.onMouseMove = (evt) => {
    if (this.dragging) {
      let pos = getMousePosition(canvas, evt);
      this.xFinal = pos.x;
      this.yFinal = pos.y;

      console.log("Move:", this.xFinal, this.yFinal);

      if (interactor && interactor.onInteractionUpdate) {
        interactor.onInteractionUpdate(this);
      }
    }
  };

  this.onMouseUp = (evt) => {
    if (this.dragging) {
      let pos = getMousePosition(canvas, evt);
      this.xFinal = pos.x;
      this.yFinal = pos.y;
      this.dragging = false;

      console.log("End:", this.xFinal, this.yFinal);

      if (interactor && interactor.onInteractionEnd) {
        interactor.onInteractionEnd(this);
      }
    }
  };

  canvas.addEventListener("mousedown", this.onMouseDown, false);
  canvas.addEventListener("mousemove", this.onMouseMove, false);
  canvas.addEventListener("mouseup", this.onMouseUp, false);
}


function getMousePosition(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};