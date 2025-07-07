const  sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');
const profileBtn = document.getElementById("profileBtn");
const profileInfo = document.getElementById("profileInfo");
const mainSection = document.getElementById("mainSection");
const walletGateway = document.querySelector('.gateway-btn')
const themeToggler = document.querySelector('.theme-toggler');
const dashboardLink = document.getElementById("dashboard-link");
const upplanLink = document.getElementById("upplan-link");
const dashboardSection = document.getElementById("dashboard-section");
const upplanSection = document.getElementById("upplan-section");


if(dashboardLink && upplanLink){

  dashboardLink.addEventListener('click', (e) =>{
    e.preventDefault();
    dashboardSection.style.display = 'block';
    upplanSection.style.display = 'none';
  });

  upplanLink.addEventListener('click', (e) => {
    e.preventDefault;
    upplanSection.style.display = 'block';
    dashboardSection.style.display = 'none';
  })
}


menuBtn.addEventListener('click',()=>{
       sideMenu.style.display = "block"
})
closeBtn.addEventListener('click',()=>{
    sideMenu.style.display = "none"
})

themeToggler.addEventListener('click',()=>{
     document.body.classList.toggle('dark-theme-variables')
     themeToggler.querySelector('span:nth-child(1').classList.toggle('active')
     themeToggler.querySelector('span:nth-child(2').classList.toggle('active')
})

profileBtn.addEventListener("click", () => {
  profileInfo.classList.toggle("show");
});

if(walletGateway){
  walletGateway.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = 'wallet_gateway.html';
  });
}