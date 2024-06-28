class Player {
    constructor({ position, velocity, facing, color, reloadTime = 3000, ammo, health = 10, knockback = 15 }) {
        this.position = position;
        this.velocity = velocity;
        this.width = 40;
        this.height = 80;
        this.facing = facing;
        this.color = color;
        this.touchingGround = false;
        this.offset = 0;
        this.ammo = ammo;
        this.reloadTime = reloadTime;
        this.health = health;
        this.knockback = knockback;
    }
    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if (this.position.y + this.height + this.velocity.y <= canvas.height - ground.height) {
            this.velocity.y += gravity;
            this.touchingGround = false;
        } else {
            this.velocity.y = 0;
            this.touchingGround = true;
        }
        if (this.facing === "right") {
            this.offset = 70;
        }
        if (this.facing === "left") {
            this.offset = -50;
        }
    }
    attack() {
        if (this.ammo > 0) {
            projectiles.push(
                new Projectile({
                    position: {
                        x: this.position.x + this.offset,
                        y: this.position.y + 40
                    },
                    velocity: {
                        x: 0,
                        y: 0
                    },
                    width: 20,
                    height: 20,
                    color: "green",
                    facing: this.facing
                })
            );
            this.ammo--;
        } else if (this.ammo === 0) {
            this.reload();
        } else if (this.ammo < 0) {
            this.ammo = 0;
        }
    }
    reload() {
        setTimeout(() => {
            this.ammo = 10;
        }, this.reloadTime);
    }
}

class Ground {
    constructor() {
        this.x = 0;
        this.y = canvas.height - 25;
        this.height = 25;
        this.width = canvas.width;
    }
    draw() {
        c.fillStyle = "chartreuse";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Projectile {
    constructor({ position, velocity, width, height, color, facing }) {
        this.position = position;
        this.velocity = velocity;
        this.width = width;
        this.height = height;
        this.color = color;
        this.facing = facing;
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        if (this.facing === "right") {
            this.velocity.x = 10;
        }
        if (this.facing === "left") {
            this.velocity.x = -10;
        }
    }
}

class Healthbar {
    constructor({ width, height }) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.backwidth = 150;
        this.backheight = 30;
    }
    draw() {
        //this is the back interface of the healthbar
        c.fillStyle = "red";
        c.fillRect(this.x, this.y, this.backwidth, this.backheight);
        //this is the shrinking part
        c.fillStyle = "green";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.width = player.health * 15;
    }
}

class Healthbar2 {
    constructor({ width, height }) {
        this.x = canvas.width - 150;
        this.x2 = canvas.width - 150;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.backwidth = 150;
        this.backheight = 30;
    }
    draw() {
        //this is the back interface of the healthbar
        c.fillStyle = "red";
        c.fillRect(this.x2, this.y, this.width, this.height);
        c.fillStyle = "green";
        c.fillRect(this.x, this.y, this.backwidth, this.backheight);
    }
    update() {
        this.draw();
        this.x = canvas.width - player2.health * 15;
    }
}

class AmmoBar {
    constructor({ width, height }) {
        this.x = 0;
        this.y = 35;
        this.width = width;
        this.height = height;
        this.backwidth = 150;
        this.backheight = 30;
    }
    draw() {
        //this is the back interface of the healthbar
        c.fillStyle = "orange";
        c.fillRect(this.x, this.y, this.backwidth, this.backheight);
        //this is the shrinking part
        c.fillStyle = "yellow";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.width = player.ammo * 15;
    }
}

class AmmoBar2 {
    constructor({ width, height }) {
        this.x = canvas.width - 150;
        this.x2 = canvas.width - 150;
        this.y = 35;
        this.width = width;
        this.height = height;
        this.backwidth = 150;
        this.backheight = 30;
    }
    draw() {
        //this is the back interface of the healthbar
        c.fillStyle = "orange";
        c.fillRect(this.x2, this.y, this.width, this.height);
        c.fillStyle = "yellow";
        c.fillRect(this.x, this.y, this.backwidth, this.backheight);
    }
    update() {
        this.draw();
        this.x = canvas.width - player2.ammo * 15;
    }
}

class Menu {
    constructor(imageSrc) {
        this.x = 45;
        this.y = 35;
        this.width = canvas.width - 100;
        this.height = canvas.height - 100;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw() {
        c.fillStyle = "gray";
        c.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}

class MapIcon {
    constructor({ x, y, width, height, imageSrc }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
    }
    draw() {
        c.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Platforms {
    constructor({ position, width, height }) {
        this.position = position;
        this.width = width;
        this.height = height;
    }
    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
    }
}
