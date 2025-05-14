window.addEventListener("DOMContentLoaded", () => {
  const createSketch = (containerId) => {
    let smoothX = 0;
    let smoothY = 0;

    return new p5((p) => {
      p.setup = function () {
        const canvas = p.createCanvas(40, 40, p.WEBGL); // Enable 3D
        canvas.parent(containerId);
        canvas.style('display', 'inline-block');
        canvas.style('vertical-align', 'middle');
        p.noFill();
        p.stroke(300);
        p.strokeWeight(0.5);
      };

      p.draw = function () {
        smoothX = smoothX + 0.01 * (p.mouseX - smoothX);
        smoothY = smoothY + 0.01 * (p.mouseY - smoothY);
        p.clear();
        p.rotateY(p.millis() / 2000); // Rotate over time
        // Rotate with mouse movements
        p.rotateX((0.2 * p.PI * smoothY) / p.height);
        p.rotateY((0.2 * p.PI * -smoothX) / p.width);
        p.sphere(20, 12, 12);
      };
    });
  };

  createSketch('sketch-left');
  createSketch('sketch-right');
});
