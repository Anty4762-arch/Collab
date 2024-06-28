const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const gravity = 0.7;
let knockback = 15;
let gameState = "Menu";

const player = new Player({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    facing: "right",
    color: "blue",
    ammo: 10
});

const player2 = new Player({
    position: {
        x: 300,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    facing: "left",
    color: "red",
    ammo: 10
});

const ground = new Ground();

const projectiles = [];

const healthbar = new Healthbar({
    width: 150,
    height: 30
});

const ammobar = new AmmoBar({
    width: 150,
    height: 30
});

const healthbar2 = new Healthbar2({
    width: 150,
    height: 30
});
const ammobar2 = new AmmoBar2({
    width: 150,
    height: 30
});

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
};

const menu = new Menu();

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "Menu") {
        menu.update();
    }

    healthbar.update();
    ammobar.update();
    healthbar2.update();
    ammobar2.update();

    if (player.health > 0) {
        player.update();
    }

    if (player2.health > 0) {
        player2.update();
    }
    ground.draw();

    if (player.health > 0 && player2.health > 0) {
        projectiles.forEach((projectile, index) => {
            projectile.update();

            if (projectile.position.x <= 0 - 100 || projectile.position.x + projectile.width >= canvas.width + 100) {
                projectiles.splice(index, 1);
            }

            if (
                projectile.position.x <= player.position.x + player.width &&
                projectile.position.y - projectile.height >= player.position.y &&
                projectile.position.x + projectile.width >= player.position.x &&
                projectile.position.y <= player.position.y + player.height + player.velocity.y
            ) {
                projectiles.splice(index, 1);
                player.knockback += 10;
                player.health--;
                if (player2.facing === "left") player.position.x += -1 * player.knockback;
                if (player2.facing === "right") player.position.x += player.knockback;
            }

            if (
                projectile.position.x <= player2.position.x + player2.width &&
                projectile.position.y - projectile.height >= player2.position.y &&
                projectile.position.x + projectile.width >= player2.position.x &&
                projectile.position.y <= player2.position.y + player2.height + player2.velocity.y
            ) {
                projectiles.splice(index, 1);
                player2.knockback += 10;
                player2.health--;
                if (player.facing === "left") player2.position.x += -1 * player2.knockback;
                if (player.facing === "right") player2.position.x += player2.knockback;
            }
        });
    } else {
        gameState = "Menu";
    }

    if (player.position.x < 0 - 100 || player.position.x + player.width > canvas.width + 100) {
        player.health -= 10;
    }
    if (player2.position.x < 0 - 100 || player2.position.x + player2.width > canvas.width + 100) {
        player2.health -= 10;
    }

    if (keys.w.pressed && player.velocity.y === 0 && player.touchingGround === true) {
        player.velocity.y = -15;
    }
    if (keys.a.pressed) {
        player.velocity.x = -7;
    }
    if (keys.d.pressed) {
        if (player.position.x + player.width < canvas.width) {
            player.velocity.x = 7;
        }
    }
    if (keys.ArrowUp.pressed && player2.velocity.y === 0 && player2.touchingGround === true) {
        player2.velocity.y = -15;
    }
    if (keys.ArrowLeft.pressed) {
        player2.velocity.x = -7;
    }
    if (keys.ArrowRight.pressed) {
        player2.velocity.x = 7;
    }
}

animate();

addEventListener("keydown", (event) => {
    switch (event.key) {
        case "w":
            keys.w.pressed = true;
            break;
        case "a":
            keys.a.pressed = true;
            player.facing = "left";
            break;
        case "d":
            keys.d.pressed = true;
            player.facing = "right";
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = true;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            player2.facing = "left";
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            player2.facing = "right";
            break;
        case "z":
            player.attack();
            break;
        case ",":
            player2.attack();
            break;
    }
});

addEventListener("keyup", (event) => {
    switch (event.key) {
        case "w":
            keys.w.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            player.velocity.x = 0;
            break;
        case "d":
            keys.d.pressed = false;
            player.velocity.x = 0;
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            player2.velocity.x = 0;
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            player2.velocity.x = 0;
            break;
    }
});
