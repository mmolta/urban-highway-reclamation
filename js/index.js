import completed from "./completed.js";
import future from "./future.js";
import { clickNav, clickToTop } from "./home.js";
import { populateCompleted, populateFuture } from "./makeProjects.js";

const main = document.getElementById('main')
const completedProjects = document.getElementById('completed-projects')
const futureProjects = document.getElementById('future-projects')
const toTop = document.getElementById('to-top')
const navBtns = document.querySelectorAll('.nav-btn')

populateCompleted(completedProjects, completed)
populateFuture(futureProjects, future)

// nav
navBtns.forEach(btn => btn.onclick = e => clickNav(e))

// to top jawn
const observer = clickToTop(toTop)

observer.observe(main)