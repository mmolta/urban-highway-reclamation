const sections = {
    completed: null,
    planned: null,
    glossary: null,
    references: null
}

const clickNav = e => {
    const section = e.target.dataset.navto

    if(!sections[section]) sections[section] = document.getElementById(section)

    const el = sections[section]

    console.log(el)

    el.scrollIntoView({behavior: 'smooth'})
}

export { clickNav }