function scrollIt(destination, duration = 200, easing = "linear", callback) {
  const easings = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return --t * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };

  const start = window.pageYOffset;
  const startTime =
    "now" in window.performance ? performance.now() : new Date().getTime();

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );
  const windowHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName("body")[0].clientHeight;
  const destinationOffset =
    typeof destination === "number" ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(
    documentHeight - destinationOffset < windowHeight
      ? documentHeight - windowHeight
      : destinationOffset
  );

  if ("requestAnimationFrame" in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now =
      "now" in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, (now - startTime) / duration);
    const timeFunction = easings[easing](time);
    window.scroll(
      0,
      Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start)
    );

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }

  scroll();
}

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    let context = this,
      args = arguments;
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function fixNav() {
  // console.log(window.scrollY, topOfNav);
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + "px";
    document.body.classList.add("fixed-nav");
  } else {
    document.body.classList.remove("fixed-nav");
    document.body.style.paddingTop = 0;
  }
}

/* Adding animated scrolling funtionality base on
this example https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/ */
const links = document.querySelectorAll("nav ul li a");
const nav = document.querySelector("nav");
links.forEach(link =>
  link.addEventListener("click", () =>
    scrollIt(
      document.querySelector(`#${link.dataset.page}`).offsetTop,
      (duration = 1000),
      (easing = "easeInQuad")
    )
  )
);

/* Adding fixNav functionalitity
based on WesBos example */
const topOfNav = nav.offsetTop;

document.addEventListener("scroll", debounce(fixNav, 10));

const allSkills = [
  {
    name: "html",
    level: "medium",
    logo: "./img/html.png"
  },
  {
    name: "css",
    level: "medium",
    logo: "./img/css.png"
  },
  {
    name: "jquery",
    level: "medium",
    logo: "./img/jquery.png"
  },
  {
    name: "js",
    level: "medium",
    logo: "./img/js.png"
  },
  {
    name: "git",
    level: "high",
    logo: "./img/git.png"
  },
  {
    name: "python",
    level: "high",
    logo: "./img/python.png"
  },
  {
    name: "saltstack",
    level: "high",
    logo: "./img/saltstack.png"
  },
  {
    name: "docker",
    level: "high",
    logo: "./img/docker.png"
  },
  {
    name: "terraform",
    level: "high",
    logo: "./img/terraform.png"
  }
];

const skillsDiv = document.querySelector(".skills-div");

const allSkillsHTML = allSkills.map(
  skill =>
    `<div class='skill-div'><image alt="${skill.name}" src="/img/${
      skill.name
    }.png"><p>${skill.name}</p></div>`
);
skillsDiv.innerHTML = allSkillsHTML.join("");
