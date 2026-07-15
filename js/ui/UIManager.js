import { BuildMenu } from './BuildMenu.js';

export class UIManager {
  constructor(game) {
    this.game = game;
    this.panel = this.getElement('panel');
    this.panelTitle = this.getElement('panel-title');
    this.panelContent = this.getElement('panel-content');
    this.panelClose = this.getElement('panel-close');

    if (this.panelClose) {
      this.panelClose.addEventListener('click', () => this.hidePanel());
    }

    const buildBtn = this.getElement('build-btn');
    if (buildBtn) {
      buildBtn.addEventListener('click', () => {
        this.showPanel('建造', BuildMenu.render());
      });
    }
  }

  getElement(id) {
    if (typeof document === 'undefined') return null;
    return document.getElementById(id);
  }

  updateResourceBar() {
    this.setText('gold', this.game.economy.gold);
    this.setText('diamonds', this.game.economy.diamonds);

    const totalWorkers = this.game.buildings.reduce((sum, b) => sum + b.workers.length, 0);
    const maxWorkers = this.game.buildings.reduce((sum, b) => sum + b.getMaxWorkers(), 0);
    this.setText('workers', `${totalWorkers}/${maxWorkers}`);
  }

  setText(id, value) {
    const el = this.getElement(id);
    if (el) el.textContent = value;
  }

  showPanel(title, contentHtml) {
    if (this.panelTitle) this.panelTitle.textContent = title;
    if (this.panelContent) this.panelContent.innerHTML = contentHtml;
    if (this.panel) this.panel.classList.remove('hidden');
  }

  hidePanel() {
    if (this.panel) this.panel.classList.add('hidden');
  }

  showNotification(text) {
    if (typeof document === 'undefined') return;
    const area = document.getElementById('notification-area');
    if (!area) return;
    const el = document.createElement('div');
    el.className = 'notification';
    el.textContent = text;
    area.appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
}
