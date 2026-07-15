export class InputManager {
  constructor(camera, canvas) {
    this.camera = camera;
    this.canvas = canvas;
    this.clickHandlers = [];
    this.dragStartHandlers = [];
    this.dragMoveHandlers = [];
    this.dragEndHandlers = [];
    this.isDragging = false;
    this.dragThreshold = 5;
    this.startX = 0;
    this.startY = 0;

    if (canvas) {
      this.bindEvents(canvas);
    }
  }

  bindEvents(canvas) {
    canvas.addEventListener('mousedown', (e) => this.onPointerDown(e));
    canvas.addEventListener('mousemove', (e) => this.onPointerMove(e));
    canvas.addEventListener('mouseup', (e) => this.onPointerUp(e));
  }

  onPointerDown(e) {
    this.isDragging = false;
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.camera.setDrag(e.offsetX, e.offsetY);
  }

  onPointerMove(e) {
    const dx = e.offsetX - this.startX;
    const dy = e.offsetY - this.startY;
    if (Math.sqrt(dx * dx + dy * dy) > this.dragThreshold) {
      this.isDragging = true;
    }
    this.camera.moveDrag(e.offsetX, e.offsetY);
  }

  onPointerUp(e) {
    this.camera.endDrag();
    if (!this.isDragging) {
      const worldPos = this.screenToWorld(e.offsetX, e.offsetY);
      this.clickHandlers.forEach(cb => cb(worldPos));
    }
  }

  screenToWorld(screenX, screenY) {
    return this.camera.screenToWorld(screenX, screenY);
  }

  onClick(callback) {
    this.clickHandlers.push(callback);
  }
}
