import completed from "./completed.js";
import future from "./future.js";
import { populateCompleted, populateFuture } from "./makeProjects.js";


const completedProjects = document.getElementById('completed-projects')
const futureProjects = document.getElementById('future-projects')

populateCompleted(completedProjects, completed)
populateFuture(futureProjects, future)