<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Steve in Three.js with Advanced Features</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        // Crear la escena
        const scene = new THREE.Scene();

        // Crear la cámara
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 10);
        camera.lookAt(0, 0, 0);

        // Crear el renderizador
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Crear un cubo para representar a Steve
        const steveGeometry = new THREE.BoxGeometry(1, 2, 1); // Dimensiones del cubo para representar a Steve
        const steveMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const steve = new THREE.Mesh(steveGeometry, steveMaterial);
        scene.add(steve);

        // Variables de control de movimiento
        let moveForward = false;
        let moveBackward = false;
        let moveLeft = false;
        let moveRight = false;
        let moveSpeed = 0.1;
        
        // Variables de control de salto
        let jumpVelocity = 0;
        let isJumping = false;
        const jumpHeight = 2;
        const gravity = 0.02;

        // Función para manejar los eventos de teclado
        function onKeyDown(event) {
            switch(event.key) {
                case 'w':
                    moveForward = true;
                    break;
                case 's':
                    moveBackward = true;
                    break;
                case 'a':
                    moveLeft = true;
                    break;
                case 'd':
                    moveRight = true;
                    break;
                case ' ':
                    if (!isJumping) {
                        jumpVelocity = 0.3;
                        isJumping = true;
                    }
                    break;
            }
        }

        function onKeyUp(event) {
            switch(event.key) {
                case 'w':
                    moveForward = false;
                    break;
                case 's':
                    moveBackward = false;
                    break;
                case 'a':
                    moveLeft = false;
                    break;
                case 'd':
                    moveRight = false;
                    break;
            }
        }

        // Asignar eventos de teclado
        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

        // Función para actualizar la posición de Steve
        function updateStevePosition() {
            if (moveForward) steve.translateZ(-moveSpeed);
            if (moveBackward) steve.translateZ(moveSpeed);
            if (moveLeft) steve.translateX(-moveSpeed);
            if (moveRight) steve.translateX(moveSpeed);
        }

        // Función para manejar el salto de Steve
        function updateJump() {
            if (isJumping) {
                steve.position.y += jumpVelocity;
                jumpVelocity -= gravity;
                if (steve.position.y <= 0) {
                    steve.position.y = 0;
                    isJumping = false;
                }
            }
        }

        // Función para renderizar la escena
        function render() {
            updateStevePosition();
            updateJump();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }

        // Renderizar la escena
        render();
    </script>
</body>
</html>