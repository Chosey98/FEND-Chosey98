const sections = document.querySelectorAll('section');
const navbar = document.querySelector('header').querySelector('nav')
let active = "#s1"
function createListItems() {
    for(let i = 0; i < sections.length; i++){
        const listItem = `<li ${(i == 0) ? 'class="active"': ""}><a href="#${sections[i].id}">Section ${i + 1}</a></li>`;
        const unorderedList = navbar.querySelector('ul');
        unorderedList.innerHTML += listItem
    }
}

function addEventListeners(){
    const listItems = navbar.querySelector('ul').querySelectorAll('li')
    for(const li of listItems){
        li.addEventListener('click', (e) => {
            if(e.target.getAttribute('href') == active) return;
            const activeElement = [...listItems].find(l => l.querySelector('a').getAttribute('href') == active)
            li.classList.add('active')
            activeElement.classList.remove('active')
            active = e.target.getAttribute('href')
        })
    }
}

function setActiveSection() {
  for (const section of sections) {
    const activeLink = document.querySelector(
      `a[href="#${section.getAttribute("id")}"]`
    );
      const bounding = section.getBoundingClientRect();
    if (bounding.top >= 0.4 && bounding.top <= 0.4 * (window.innerHeight || document.documentElement.clientHeight)){
        active = activeLink.getAttribute("href")
      section.classList.add("active");
      activeLink.parentElement.classList.add("active");
    } else {
      section.classList.remove("active");
      activeLink.parentElement.classList.remove("active");
    }
  }
}


document.addEventListener("DOMContentLoaded", () => {
    createListItems();
    addEventListeners()
})

setTimeout(
    window.addEventListener('scroll', () => {
        setActiveSection()
    })
    , 2000)
