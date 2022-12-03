import completed from "./completed.js";
import future from "./future.js";


const completedProjects = document.getElementById('completed-projects')
const futureProjects = document.getElementById('future-projects')

populatedCompleted(completedProjects, completed)
populatedFuture(futureProjects, future)