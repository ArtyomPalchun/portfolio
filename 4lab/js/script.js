const skills = {
  data: [
    { title: "html", level: 5, icon: "Icon-html.svg" },
    { title: "css", level: 55, icon: "Icon-css.svg" },
    { title: "python", level: 100, icon: "Icon-python.svg" },
    { title: "c++", level: 85, icon: "Icon-c++.svg" }
  ],

  sortConfig: {
    type: null,   
    order: 'asc'  
  },

  generateList(parentElement) {
    parentElement.innerHTML = '';
    this.data.forEach(skill => {
      const dt = document.createElement('dt');
      dt.classList.add('skill-item');
      dt.textContent = skill.title;
      dt.style.backgroundImage = `url(img/${skill.icon})`;

      const dd = document.createElement('dd');
      dd.classList.add('skill-level');

      const div = document.createElement('div');
      div.textContent = `${skill.level}%`;
      div.style.width = `${skill.level}%`;

      dd.append(div);
      parentElement.append(dt, dd);
    });
  },

  getComparer(prop) {
    return (a, b) => {
      if (a[prop] < b[prop]) return -1;
      if (a[prop] > b[prop]) return 1;
      return 0;
    };
  },

  sortList(type) {
    const { sortConfig } = this;

    if (sortConfig.type === type) {
      sortConfig.order = sortConfig.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortConfig.type = type;
      sortConfig.order = 'asc';
    }
    this.data.sort(this.getComparer(type));
    if (sortConfig.order === 'desc') {
      this.data.reverse(); 
    }

    this.generateList(skillList);
  }
};

const skillList = document.querySelector('.skill-list');
const sortBtnsBlock = document.querySelector('.skills-sort');
const navBtn = document.querySelector('.nav-btn');
const navMenu = document.querySelector('.main-nav');

skills.generateList(skillList);

sortBtnsBlock.addEventListener('click', function(event) {
  const btn = event.target.closest('button');
  if (btn && btn.dataset.type) {
    skills.sortList(btn.dataset.type);
  }
});

function getNavBtnLabel() {
  return navBtn.querySelector('.visually-hidden');
}

const menu = {
  open() {
    navMenu.classList.remove('main-nav_closed');
    navBtn.classList.remove('nav-btn-open');
    navBtn.classList.add('nav-btn-close');
    getNavBtnLabel().textContent = 'Закрыть меню';
    navBtn.setAttribute('aria-expanded', 'true');
  },

  close() {
    navMenu.classList.add('main-nav_closed');
    navBtn.classList.remove('nav-btn-close');
    navBtn.classList.add('nav-btn-open');
    getNavBtnLabel().textContent = 'Открыть меню';
    navBtn.setAttribute('aria-expanded', 'false');
  }
};

menu.close();

navBtn.addEventListener('click', () => {
  if (navBtn.classList.contains('nav-btn-open')) {
    menu.open();
  } else {
    menu.close();
  }
});