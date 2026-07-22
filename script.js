// ---------- HERO CAROUSEL ----------
const heroProjects = [
    { title:"Home", img:"images/Background.jpg", role:"Sphesihle Shezi", stack:"Software Engineer", desc:"Graduate Software Developer with hands-on practical experience in building database-driven, secured with role-based authentication web applications using technologies and frameworks such as ASP.NET MVC (LINQ, DAPPER), C#, and SQL Server." },
    { title:"Ward Management", img:"images/Project1.PNG", role:"Hospital Management System", stack:"ASP.NET MVC (Entity Framework) · C# · SQL Server", desc:"ASP.NET Core MVC with Dapper, AI chatbot, SignalR live chat, and real-time email notifications for appointments and billing. Includes EMR, scheduling, inventory, and analytics dashboards to streamline workflows and enhance patient engagement" },
    { title:"Online Shopping", img:"images/Project2.PNG", role:"Online Shopping Website", stack:"C#, ASP.NET Core MVC, Bootstrap, HTML, CSS, JavaScript, SQL Server", desc:"ASP.NET Core MVC with Entity Framework, smart recommendations, real-time inventory, and automated order/shipping email alerts. Features product catalog, secure checkout, payment gateway, and sales reports for seamless e-commerce operations." },
    { title:"Hotel Booking", img:"images/Project3.png", role:"Hotel Booking System", stack: "C#, ASP.NET Core MVC, Bootstrap, HTML, CSS, JavaScript, SQL Server", desc:"ASP.NET Core MVC with Dapper, confirmations for bookings and check-ins. Manages room inventory, dynamic pricing, payments, and occupancy analytics to optimize reservations and guest satisfaction." }
  ];
  
  let heroIndex = 0;
  const heroCarousel = document.getElementById("heroCarouselInner");
  const heroBg = document.getElementById("hero");
  
  function updateHeroContent(proj) {
    document.getElementById("dynamicRole").textContent = proj.role;
    document.getElementById("dynamicStack").textContent = proj.stack;
    document.getElementById("dynamicDescription").textContent = proj.desc;
  }
  
  function renderHero() {
    heroCarousel.innerHTML = "";
    heroProjects.forEach((p,i) => {
      const card = document.createElement("div");
      card.className = "card";
      if (i === heroIndex) card.classList.add("active");
      else if (i === (heroIndex-1+heroProjects.length)%heroProjects.length) card.classList.add("left");
      else if (i === (heroIndex+1)%heroProjects.length) card.classList.add("right");
      card.style.backgroundImage = `url('${p.img}')`;
      card.innerHTML = `<div class="card-overlay"></div>
                        <div class="card-text">
                          <h3>${p.title}</h3>
                          <small>${i===0?'Intro':'Project'}</small>
                        </div>`;
      card.onclick = ()=> selectHero(i);
      heroCarousel.appendChild(card);
    });
    heroBg.style.backgroundImage = `url('${heroProjects[heroIndex].img}')`;
    updateHeroContent(heroProjects[heroIndex]);
  }
  
  function selectHero(i) { heroIndex = i; renderHero(); }
  function moveHero(dir) { heroIndex = (heroIndex+dir+heroProjects.length)%heroProjects.length; renderHero(); }
  
  // ---------- CERTIFICATES CAROUSEL (background = certificate image) ----------
  const certsData = [
    { 
      title:"Oracle Cloud DB Pro", 
      desc:"Oracle Cloud Database Professional 2025",
      link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=E1805F30B43188A5777BA9B2A58676523F1C5C5DFD6257BDCE929D45E92ADAB2",
      img: "images/Oracle.PNG"
    },
    { 
      title:"CCNAv7", 
      desc:"CCNAv7: Introduction to Networks – Cisco",
      link: "https://www.credly.com/earner/earned/badge/b9cc50cd-636a-47e6-8f80-0f1afdbd4911",
      img: "images/Networks.PNG"
    },
    { 
      title:"Cybersecurity", 
      desc:"Introduction to Cybersecurity – Cisco",
      link: "https://www.credly.com/badges/35004b35-f595-4415-b16b-49b93b90152b",
      img: "images/cybersecurity.PNG"
    }
  ];
  
  let certsIndex = 0;
  const certsCarousel = document.getElementById("certsCarouselInner");
  const certsDesc = document.getElementById("certsDescription");
  const certsSection = document.getElementById("certificates");
  
  function renderCerts() {
    certsCarousel.innerHTML = "";
    certsData.forEach((c,i) => {
      const card = document.createElement("div");
      card.className = "card";
      if (i === certsIndex) card.classList.add("active");
      else if (i === (certsIndex-1+certsData.length)%certsData.length) card.classList.add("left");
      else if (i === (certsIndex+1)%certsData.length) card.classList.add("right");
      card.style.backgroundImage = `url('${c.img}')`;
      card.innerHTML = `<div class="card-overlay"></div>
                        <div class="card-text">
                          <h3>${c.title}</h3>
                          <small>Certificate</small>
                        </div>`;
      card.onclick = ()=> selectCerts(i);
      certsCarousel.appendChild(card);
    });
    const current = certsData[certsIndex];
    certsDesc.innerHTML = `${current.desc}<br/><a href="${current.link}" target="_blank" class="cert-link">Verify credential →</a>`;
    // Set the certificate section background to the selected certificate's image
    certsSection.style.backgroundImage = `url('${current.img}')`;
  }
  
  function selectCerts(i) { certsIndex = i; renderCerts(); }
  function moveCerts(dir) { certsIndex = (certsIndex+dir+certsData.length)%certsData.length; renderCerts(); }
  
  // ---------- SWIPE SUPPORT ----------
  function addSwipe(containerId, moveFunc) {
    const el = document.getElementById(containerId);
    let startX = 0;
    el.addEventListener("touchstart", e => startX = e.touches[0].clientX, {passive:true});
    el.addEventListener("touchend", e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) diff > 0 ? moveFunc(1) : moveFunc(-1);
    });
  }
  
  addSwipe("heroCarousel", moveHero);
  addSwipe("certsCarousel", moveCerts);
  
  // ---------- SMOOTH SCROLL ----------
  function go(sectionId) {
    document.getElementById(sectionId).scrollIntoView({behavior:"smooth"});
  }
  
  // INITIALISE
  window.addEventListener("load", ()=>{
    renderHero();
    renderCerts();
    const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

    // ---------- INTRO LOADER ----------
    const loader = document.getElementById('intro-loader');

    // After 3 seconds: slide loader up, reveal hero content
    setTimeout(() => {
      loader.classList.add('exit');

      // When exit animation finishes, remove loader & unlock scroll
      loader.addEventListener('animationend', () => {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        document.body.classList.add('revealed');
      }, { once: true });
    }, 3000);

  });
