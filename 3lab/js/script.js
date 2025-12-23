
const skills = {
  data: [
    { title: "html", level: 25, icon: "Icon-html.svg" },
    { title: "css", level: 20, icon: "Icon-css.svg" },
    { title: "python", level: 100, icon: "Icon-python.svg" },
    { title: "c++", level: 10, icon: "Icon-c++.svg" }
  ],

  generateList(parentElement) {
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
  }
};

const skillList = document.querySelector(".skill-list");
skills.generateList(skillList);
