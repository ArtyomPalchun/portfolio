function getComparer(prop) {
  return (a, b) => {
    if (a[prop] < b[prop]) return -1;
    if (a[prop] > b[prop]) return 1;
    return 0;
  };
}
const skills = {
  data: [],
  listEL:null,
  sortBtnsEl: null,

  sortConfig: {
    type: null,   
    order: 'asc'  
  },

  init(listSelector, sortBtnsSelector, dataPath) {
    this.listEl = document.querySelector(listSelector);
    this.sortBtnsEl = document.querySelector(sortBtnsSelector);

    this.sortBtnsEl.addEventListener('click', (event) => {
      const btn = event.target.closest('button');
      if (btn && btn.dataset.type) {
        this.sortList(btn.dataset.type);
      }
    });
    
    this.getData(dataPath);
  },

  render() {
    this.listEl.innerHTML = '';
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
      this.listEl.append(dt, dd);
    });
  },

  sortList(type) {
    const { sortConfig } = this;

    if (sortConfig.type === type) {
      sortConfig.order = sortConfig.order === 'asc' ? 'desc' : 'asc';
    } else {
      sortConfig.type = type;
      sortConfig.order = 'asc';
    }
    this.data.sort(getComparer(type));
    if (sortConfig.order === 'desc') {
      this.data.reverse(); 
    }

    this.render();
  },

  getData(path) {
    fetch(path)
      .then(response => {
        if (!response.ok) throw new Error('Сеть ответила с ошибкой');
        return response.json();
      })
      .then(data => {
        this.data = data;            
        this.render(); 
      })
      .catch(() => {
        const section = this.listEl.closest('.section-skills');
        if (section) section.style.display = 'none';
      });
  }
};

const menu = {
  btn: null,
  nav: null,

  init(btnSelector, navSelector) {
    this.btn = document.querySelector(btnSelector);
    this.nav = document.querySelector(navSelector);

    this.btn.addEventListener('click', () => {
      if (this.btn.classList.contains('nav-btn-open')) {
        this.open();
      } else {
        this.close();
      }
    });
    this.close();
  },

  getLabel() {
    return this.btn.querySelector('.nav-btn-text');
  },

  open() {
    this.nav.classList.remove('main-nav_closed');
    this.btn.classList.remove('nav-btn-open');
    this.btn.classList.add('nav-btn-close');
    this.getLabel().textContent = 'Закрыть меню';
    this.btn.setAttribute('aria-expanded', 'true');
  },

  close() {
    this.nav.classList.add('main-nav_closed');
    this.btn.classList.remove('nav-btn-close');
    this.btn.classList.add('nav-btn-open');
    this.getLabel().textContent = 'Открыть меню';
    this.btn.setAttribute('aria-expanded', 'false');
  }
};

const theme = {
  switchEl: null,

  init(switchSelector) {
    this.switchEl = document.querySelector(switchSelector);
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      this.switchEl.checked = true;
    }

    this.switchEl.addEventListener('change', () => {
      if (this.switchEl.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  skills.init('.skill-list', '.skills-sort', 'db/skills.json');
  menu.init('.nav-btn', '.main-nav');
  theme.init('#switch');
});