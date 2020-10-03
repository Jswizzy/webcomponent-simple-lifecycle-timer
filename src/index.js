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

  update(elapsed) {}

  onUpdate(timestamp) {
    this.update(timestamp);
    this.#stop ||
      requestAnimationFrame((timestamp) => this.onUpdate(timestamp));
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

  update(timestamp) {
    if (this.start === undefined) {
      this.start = timestamp;
    }
    const elapsed = timestamp - this.start;
    console.log(this.timer + " " + elapsed);
    if (elapsed > 50) {
      this.start = timestamp;
      this.timer--;
      if (this.timer <= 0) {
        this.timer = 200;
      }
      this.style.width = this.timer + "px";
    }
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
