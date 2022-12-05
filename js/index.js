import completed from "./completed.js";
import future from "./future.js";
import { populateCompleted, populateFuture } from "./makeProjects.js";

const main = document.getElementById('main')
const completedProjects = document.getElementById('completed-projects')
const futureProjects = document.getElementById('future-projects')
const toTop = document.getElementById('to-top')

populateCompleted(completedProjects, completed)
populateFuture(futureProjects, future)

const observer = new IntersectionObserver(el => {
    if(el[0].isIntersecting) {
        toTop.style.opacity = '100%'
    }
    else {
        toTop.style.opacity = '0%'
    }
}, { threshold: [0.2] })

observer.observe(main)