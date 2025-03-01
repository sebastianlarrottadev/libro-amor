let scene, camera, renderer, book, pages, turningPage, table;
let currentPage = 0; // Ahora comienza con la primera imagen visible
const images = [
    "image1.png", "image2.png", "image3.png", "image4.png",
    "image5.png", "image6.png", "image7.png", "image8.png",
    "image9.png", "image10.png", "image11.png", "image12.png"
];

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const bookCoverGeometry = new THREE.BoxGeometry(3.5, 0.3, 2.5);
    const bookCoverMaterial = new THREE.MeshStandardMaterial({ color: 0x5A3E1B, metalness: 0.2, roughness: 0.8 });
    book = new THREE.Mesh(bookCoverGeometry, bookCoverMaterial);
    book.position.y = -0.15;
    scene.add(book);

    const pagesGeometry = new THREE.BoxGeometry(3, 0.4, 2);
    const pagesMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, metalness: 0.1, roughness: 0.9 });
    pages = new THREE.Mesh(pagesGeometry, pagesMaterial);
    pages.position.y = 0;
    scene.add(pages);

    const pageGeometry = new THREE.PlaneGeometry(3, 0.05);
    const pageMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf5f5dc, 
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0 
    });
    turningPage = new THREE.Mesh(pageGeometry, pageMaterial);
    turningPage.position.set(0, 0.2, 0.01);
    scene.add(turningPage);

    const tableGeometry = new THREE.BoxGeometry(6, 1, 4);
    const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x3d2b1f, metalness: 0.2, roughness: 0.9 });
    table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.set(0, -0.7, 0);
    scene.add(table);

    const warmLight = new THREE.PointLight(0xffffff, 1, 100);
    warmLight.position.set(5, 5, 5);
    scene.add(warmLight);

    const softGlow = new THREE.AmbientLight(0xff8c9c, 0.5);
    scene.add(softGlow);

    camera.position.set(0, 1, 5);

    // Mostrar la primera imagen al iniciar
    updateImage();
    
    animate();
}

function nextPage() {
    animatePageTurn(-1);
    currentPage = (currentPage + 1) % images.length; // Cicla de 0 a 11
    updateImage();
}

function prevPage() {
    animatePageTurn(1);
    currentPage = (currentPage - 1 + images.length) % images.length; // Cicla de 11 a 0
    updateImage();
}

function updateImage() {
    let imageContainer = document.getElementById("imageContainer");
    let bookImage = document.getElementById("bookImage");

    bookImage.src = images[currentPage];
    imageContainer.style.display = "block"; // Siempre mostrar imagen
}

function animatePageTurn(direction) {
    let angle = 0;
    let targetAngle = Math.PI;
    turningPage.material.opacity = 1;

    let interval = setInterval(() => {
        angle += 0.1 * direction;
        turningPage.rotation.z = angle;

        if (Math.abs(angle) >= targetAngle) {
            turningPage.rotation.z = 0;
            turningPage.material.opacity = 0;
            clearInterval(interval);
        }
    }, 16);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

window.onload = init;
