const skills = {
  data: [
    { title: "html", level: 5, icon: "Icon-html.svg" },
    { title: "css", level: 55, icon: "Icon-css.svg" },
    { title: "python", level: 100, icon: "Icon-python.svg" },
    { title: "c++", level: 85, icon: "Icon-c++.svg" }
  ],
  sortMode: null, 

  generateList(parentElement) {
    parentElement.innerHTML = "";
    this.data.forEach(skill => {

      const dt = document.createElement("dt");
      dt.classList.add("skill-item");
      dt.textContent = skill.title;
      dt.style.backgroundImage = `url(img/${skill.icon})`;

      const dd = document.createElement("dd");
      dd.classList.add("skill-level");

      const div = document.createElement("div");
      div.textContent = `${skill.level}%`;
      div.style.width = `${skill.level}%`;

      dd.append(div);
      parentElement.append(dt, dd);
    });
  },

  sortList(type) {
    if (this.sortMode !== type) {
      this.data.sort(this.getComparer(type));
      this.sortMode = type;
      console.log(`Отсортировали данные по ${type}`);
    } else {
      this.data.reverse();
      console.log(`Инвертировали порядок сортировки`);
    }
    this.generateList(skillList);
  },

  getComparer(prop) {
    return function(a, b) {
      if (a[prop] < b[prop]) {
        return -1;
      }
      if (a[prop] > b[prop]) {
        return 1;
      }
      return 0;
    };
  }
};


const skillList = document.querySelector(".skill-list");
const sortBtnsBlock = document.querySelector(".skills-sort");
const navBtn = document.querySelector(".nav-btn");
const navMenu = document.querySelector(".main-nav");

skills.generateList(skillList);

sortBtnsBlock.addEventListener("click", function(event) {
  if (event.target.nodeName === "BUTTON") {
    const type = event.target.dataset.type;
    skills.sortList(type);
  }
});


const menu = {
  open() {
    navMenu.classList.remove("main-nav_closed");
    navBtn.classList.remove("nav-btn-open");
    navBtn.classList.add("nav-btn-close");
    navBtn.innerHTML = '<span class="visually-hidden"> Закрыть меню</span>';
  },

  close() {
    navMenu.classList.add("main-nav_closed");
    navBtn.classList.remove("nav-btn-close");
    navBtn.classList.add("nav-btn-open");
    navBtn.innerHTML = '<span class="visually-hidden"> Открыть меню</span>';
  }
};

menu.close();

navBtn.addEventListener("click", function() {
  if (navBtn.classList.contains("nav-btn_open")) {
    menu.open();
  } else {
    menu.close();
  }
});