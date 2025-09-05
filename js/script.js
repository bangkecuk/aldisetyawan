// Typed Animation
var typed = new Typed(".typing", {
  strings: ["Human", "Fantasy Author", "Corporate Slaves", "WNI"],
  typeSpeed: 100,
  backSpeed: 60,
  backDelay: 1500,
  startDelay: 500,
  smartBackspace: true,
  loop: true,
  showCursor: true,
  cursorChar: "|",
  preStringTyped: function (arrayPos, self) {
    // Kalau masuk ke string pertama (Human) lagi
    if (arrayPos === 0 && self.loopCount > 0) {
      self.stop(); // pause animasi
      self.el.innerHTML = ""; // kosongin teks
      setTimeout(() => {
        self.start(); // lanjut ketik Human lagi
      }, 500); // jeda 1 detik kosong
    }
  },
});
// Aside
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function () {
    removeBackSection();
    for (let j = 0; j < totalNavList; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {
        addBackSection(j);
      }
      navList[j].querySelector("a").classList.remove("active");
    }
    this.classList.add("active");
    showSection(this);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}
function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}
function addBackSection(num) {
  allSection[num].classList.add("back-section");
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}
function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
document.querySelector(".hire-me").addEventListener("click", function () {
  const sectionIndex = this.getAttribute("data-section-index");
  showSection(this);
  updateNav(this);
  removeBackSection();
  addBackSection(sectionIndex);
});
const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});
function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}

// skills animation
document.addEventListener("DOMContentLoaded", () => {
  const skillItems = document.querySelectorAll(".skill-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const bar = entry.target.querySelector(".progress-in");
          const percentText = entry.target.querySelector(".skill-percent");
          const target = parseInt(bar.getAttribute("data-percent"));

          // Selalu reset ke 0 setiap kali terlihat
          bar.style.width = "0%";
          percentText.textContent = "0%";

          // Hentikan animasi lama (jaga-jaga biar nggak dobel)
          if (bar.interval) clearInterval(bar.interval);

          // Delay biar smooth & berurutan
          setTimeout(() => {
            let count = 0;
            let duration = 1500; // durasi animasi (ms)
            let stepTime = Math.max(Math.floor(duration / target), 15);

            bar.interval = setInterval(() => {
              if (count >= target) {
                clearInterval(bar.interval);
              } else {
                count++;
                percentText.textContent = count + "%";
                bar.style.width = count + "%";
              }
            }, stepTime);
          }, index * 250);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillItems.forEach((item) => observer.observe(item));
});

document.addEventListener("DOMContentLoaded", () => {
  const cvBtn = document.querySelector(".btn");
  const modal = document.getElementById("cvModal");
  const closeBtn = modal.querySelector(".close");

  // buka modal
  cvBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hide");
    modal.style.display = "flex";
    modal.classList.add("show");
  });

  // fungsi tutup modal
  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    setTimeout(() => {
      modal.style.display = "none";
    }, 350);
  }

  // klik tombol close
  closeBtn.addEventListener("click", closeModal);

  // klik luar modal
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
});
