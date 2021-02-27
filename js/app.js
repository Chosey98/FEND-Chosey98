// Global variables

// This variable stores all the sections in it
const sections = document.querySelectorAll('section');

// This variable stores the navigation bar
const navbar = document.querySelector('header').querySelector('nav')

// This variable stores the latest active section (By default is section 1)
let active = "#s1"


// Functions

// This function creates the navigation bar dynamically based on the sections length
function createListItems() {
    for(let i = 0; i < sections.length; i++){
        const listItem = `<li ${(i == 0) ? 'class="active"': ""}><a id="#${sections[i].id}">Section ${i + 1}</a></li>`;
        const unorderedList = navbar.querySelector('ul');
        unorderedList.innerHTML += listItem
    }
}

// This function adds event listeners to the list items in the navigation bar and handles active class for them on click and scrolls to them smoothly
function addEventListeners(){
    const listItems = navbar.querySelector('ul').querySelectorAll('li')
    for(const li of listItems){
        li.addEventListener('click', async (e) => {
            sections.item(e.target.getAttribute('id')[2] - 1).scrollIntoView({behavior: 'smooth', block: 'center'})
        })
    }
}

// This function get's the section in view and sets it as active
function setActiveSection() {
    let activeLink
  for (const section of sections) {
     activeLink = document.querySelector(
      `a[id="#${section.getAttribute("id")}"]`
    );
      const bounding = section.getBoundingClientRect();
    if (bounding.top >= 0.4 && bounding.top <= 0.4 * (window.innerHeight || document.documentElement.clientHeight)){
      active = activeLink.getAttribute("id")
      section.classList.add("active");
      activeLink.parentElement.classList.add("active");
    } else {
      section.classList.remove("active");
      activeLink.parentElement.classList.remove("active");
    }
  }
}

// This event listener loads the when the content is loaded and creates the navbar dynamically and adds event listeners to the list items of the navbar
document.addEventListener("DOMContentLoaded", () => {
    createListItems();
    addEventListeners()
})

// This event listener runs when user is scrolling to set active section while hiding the navbar until it is done.
let timer = null;
window.addEventListener('scroll', () => {
        setActiveSection()
        navbar.classList.add("hide");
        if(timer !== null) {
            clearTimeout(timer);        
        }
        timer = setTimeout(function() {
              navbar.classList.remove("hide")
        }, 150);
    })