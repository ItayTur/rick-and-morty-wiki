function Circle({ x, y, dx, dy, radius, context, mouse, color }) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.maxRadius = 40;
    this.color = color

    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.fillStyle = this.color;
        context.strokeStyle = this.color;
        context.fill();
    }

    this.update = function () {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        if (
            mouse.x - this.x < 50 &&
            mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 &&
            mouse.y - this.y > -50 &&
            this.radius < this.maxRadius
        ) {
            this.radius+=1 ;
        } else if (this.radius > this.minRadius) {
            this.radius-=1 ;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

export default Circle;