
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('expandable-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle-btn');
    const sidebarLinks = sidebar.querySelectorAll('a');

    // Bind main toggle if exists
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });
    }

    // Try to bind cart toggle later if it becomes visible
    function bindCartToggleIfVisible() {
        const cartToggle = document.getElementById('sidebar-toggle-btn-cart');
        if (cartToggle && !cartToggle.hasAttribute('data-bound')) {
            cartToggle.setAttribute('data-bound', 'true');
            cartToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                sidebar.classList.toggle('active');
            });
        }
    }

    // Bind once when monitoring section shown
    const monitoringLink = document.getElementById('monitoring-link');
    if (monitoringLink) {
        monitoringLink.addEventListener('click', () => {
            setTimeout(bindCartToggleIfVisible, 100); // wait for header to appear
        });
    }

    // Auto-close on link click
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function () {
            sidebar.classList.remove('active');
        });
    });

    // Close on outside click
    document.addEventListener('click', function (event) {
        if (
            !sidebar.contains(event.target) &&
            !toggleBtn?.contains(event.target) &&
            !document.getElementById('sidebar-toggle-btn-cart')?.contains(event.target)
        ) {
            sidebar.classList.remove('active');
        }
    });
});




document.addEventListener('DOMContentLoaded', function () {
    const dashboardLink = document.getElementById('dashboard-link');
    const monitoringLink = document.getElementById('monitoring-link');
    const inventoryLink = document.getElementById('inventory-link');
    const dashboardSection = document.getElementById('dashboard-section'); 
    const monitoringSection = document.getElementById('monitoring-section');
    const inventorySection = document.getElementById('full-inventory');
    const header = document.getElementById('main-header');    
    const cartHeader = document.getElementById('live-cart-header');
    const navBar = document.getElementById('navbar');

    if (dashboardLink && monitoringLink && inventoryLink) {
        dashboardLink.addEventListener('click', (e) => {
            e.preventDefault();
            dashboardSection.style.display = 'block';
            monitoringSection.style.display = 'none';
            inventorySection.style.display = 'none';
            header.style.display = 'flex'; // show header again
            cartHeader.style.display = 'none';
            navBar.style.display = 'block';
        });

        monitoringLink.addEventListener('click', (e) => {
            e.preventDefault();
            dashboardSection.style.display = 'none';
            monitoringSection.style.display = 'block';
            inventorySection.style.display = 'none';
            header.style.display = 'none'; // hide header
            cartHeader.style.display = 'flex';
        });

        inventoryLink.addEventListener('click', (e) => {
            e.preventDefault();
            header.style.display = 'flex';
            dashboardSection.style.display = 'none';
            inventorySection.style.display = 'block';
            monitoringSection.style.display = 'none';
            cartHeader.style.display = 'none';
            navBar.style.display = 'none';
        })
    }
});

const videoWrapper = document.getElementById('video-wrapper');

// Utility to show a message
function showVideoMessage(msg) {
    videoWrapper.innerHTML = `<p class="video-message">${msg}</p>`;
}

// Utility to show video
function showVideoStream(url) {
    videoWrapper.innerHTML = `
        <img src="${url}" onerror="this.onerror=null; this.src=''; this.parentElement.innerHTML='<p class=video-message>Stream not responding</p>';" alt="Live Stream">
    `;
}


//Full Inventory Logic
// Toggle sections
document.getElementById("view-full-inventory-btn").addEventListener("click", () => {
    document.getElementById("dashboard-section").style.display = "none";  // Replace with your main container ID
    document.getElementById("full-inventory").style.display = "block";
    document.getElementById('navbar').style.display = "none";
    loadCompleteInventory();
});

// Load all products
async function loadCompleteInventory() {
    const fullList = document.getElementById("full-inventory-list");
    fullList.innerHTML = ""; // clear

    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    snapshot.forEach((doc) => {
        const p = doc.data();
        const card = document.createElement("div");
        card.className = "inventory-card";
        card.innerHTML = `
            <h3>${p.name}</h3>
            <p>Price: ₹${p.price}</p>
            <p>Quantity: ${p.quantity}</p>
            <p>Weight: ${p.weight} ${p.weight_unit}</p>
        `;
        fullList.appendChild(card);
    });
}

document.getElementById("back-to-dashboard").addEventListener("click", () => {
    const dashboardSection = document.getElementById("dashboard-section");
    const inventorySection = document.getElementById("full-inventory");

    dashboardSection.style.display = 'block';
    inventorySection.style.display = 'none';
    document.getElementById('navbar').style.display = 'flex'
});

document.getElementById("live-back-to-dashboard").addEventListener("click", () => {
    const dashboardSection = document.getElementById("dashboard-section");
    const monitoringSection = document.getElementById("monitoring-section");
    const header = document.getElementById('main-header');    
    const cartHeader = document.getElementById('live-cart-header');

    dashboardSection.style.display = 'block';
    monitoringSection.style.display = 'none';
    document.getElementById('navbar').style.display = 'flex';
    header.style.display = 'flex';
    cartHeader.style.display = 'none';
    
});



