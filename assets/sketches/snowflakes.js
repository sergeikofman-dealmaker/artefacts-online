window.addEventListener("DOMContentLoaded", () => {
    const createSketch = (containerId) => {
        console.log('snowflakes');
        return new p5((p) => {

            let snowflakes = [];

            p.setup = function () {
                const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent(containerId);
                canvas.style('position', 'fixed');
                canvas.style('top', '0');
                canvas.style('left', '0');
                canvas.style('z-index', '-1'); // make sure it's *behind* your page content
                canvas.style('pointer-events', 'none'); // optional: lets clicks pass through
              
                p.angleMode(p.DEGREES);
                p.newSnowflakes = function () {
                  snowflakes.push(new Snowflake());
                  console.log('new snowflake');
                };

                window.setInterval(p.newSnowflakes, 600);
              
                p.describe('Snowflakes falling on a black background.');
            }

            p.draw = function() {
                p.clear();

                let currentTime = p.frameCount / 60;
              
                for (let flake of snowflakes) {
                  flake.update(currentTime);
                  flake.display();
                }
            }

            class Snowflake {
                constructor() {
                    this.posX = 0;
                    this.posY = p.random(p.height, 0);
                    this.initialAngle = p.random(0, 360);
                    this.size = p.random(2, 5);
                    this.radius = p.random(-p.width / 2, p.width / 2);
                    this.color = p.color(p.random(200, 256), p.random(200, 256), p.random(200, 256));
                    this.alpha = 100;
                }
            
                update(time) {
                    let angularSpeed = 10;
                    let angle = this.initialAngle + angularSpeed * time;
                    this.posX = p.width / 2 + this.radius * p.sin(angle);
                    let ySpeed = 1 / this.size;
                    this.posY += -ySpeed;
                    this.size *= 0.995;
                    this.size = p.max(this.size, 0.5);
                    this.alpha *= 0.99;
                    this.alpha = p.max(this.alpha, 0);
                }
            
                display() {
                    p.fill(this.color, this.alpha);
                    p.noStroke();
                    p.ellipse(this.posX, this.posY, this.size);
                }
            }
        });
    }

    createSketch('full-page');
});