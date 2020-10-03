import "./styles.scss";

class RenderComponent extends HTMLElement {
  #stop = false;
  get stop() {
    return this.#stop;
  }
  set stop(val) {
    this.#stop = val;
    this.onUpdate();
  }

  constructor() {
    super();
    this.onUpdate();
  }

  update() {}

  onUpdate() {
    this.update();
    this.#stop || requestAnimationFrame(() => this.onUpdate());
  }

  disconnectedCallback() {
    this.#stop = true;
  }
}

class CleanupComponent extends RenderComponent {
  connectedCallback() {
    this.timer = 200;
    this.style.backgroundColor = "green";
    this.style.display = "inline-block";
    this.style.height = "50px";
  }

  update() {
    console.log(this.timer);
    this.timer--;
    if (this.timer <= 0) {
      this.timer = 200;
    }
    this.style.width = this.timer + "px";
  }
}

if (!customElements.get("cleanup-component")) {
  customElements.define("cleanup-component", CleanupComponent);
}

let cleanupComponent = document.createElement("cleanup-component");
let app = document.querySelector("#app");
let btn = document.createElement("button");
btn.innerText = "Remove";
btn.addEventListener(
  "click",
  () => (cleanupComponent.stop = !cleanupComponent.stop)
);
app.append(cleanupComponent);
app.append(btn);
