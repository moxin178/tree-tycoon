export class Camera {
  constructor(viewWidth, viewHeight) {
    this.x = 0;
    this.y = 0;
    this.viewWidth = viewWidth;
    this.viewHeight = viewHeight;
    this.boundsWidth = 0;
    this.boundsHeight = 0;
    this.dragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragStartCameraX = 0;
    this.dragStartCameraY = 0;
    this.freeModeTimer = 0;
  }

  setBounds(width, height) {
    this.boundsWidth = width;
    this.boundsHeight = height;
  }

  update(target, dt = 1 / 60) {
    if (!this.dragging && this.freeModeTimer > 0) {
      this.freeModeTimer -= dt;
      if (this.freeModeTimer <= 0) {
        this.returnToTarget(target, dt);
      }
    } else if (!this.dragging) {
      this.returnToTarget(target, dt);
    }

    this.clamp();
  }

  returnToTarget(target, dt) {
    const targetX = target.x - this.viewWidth / 2;
    const targetY = target.y - this.viewHeight / 2;
    const speed = 5 * dt;
    this.x += (targetX - this.x) * speed;
    this.y += (targetY - this.y) * speed;
  }

  setDrag(screenX, screenY) {
    if (!this.dragging) {
      this.dragging = true;
      this.dragStartX = screenX;
      this.dragStartY = screenY;
      this.dragStartCameraX = this.x;
      this.dragStartCameraY = this.y;
    }
  }

  moveDrag(screenX, screenY) {
    if (this.dragging) {
      this.x = this.dragStartCameraX + (this.dragStartX - screenX);
      this.y = this.dragStartCameraY + (this.dragStartY - screenY);
      this.freeModeTimer = 3;
    }
  }

  endDrag() {
    this.dragging = false;
    this.freeModeTimer = 3;
  }

  clamp() {
    const maxX = Math.max(0, this.boundsWidth - this.viewWidth);
    const maxY = Math.max(0, this.boundsHeight - this.viewHeight);
    this.x = Math.max(0, Math.min(this.x, maxX));
    this.y = Math.max(0, Math.min(this.y, maxY));
  }

  worldToScreen(worldX, worldY) {
    return {
      x: worldX - this.x,
      y: worldY - this.y,
    };
  }

  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.x,
      y: screenY + this.y,
    };
  }
}
