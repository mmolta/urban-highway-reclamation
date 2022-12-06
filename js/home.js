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

    el.scrollIntoView({behavior: 'smooth'})
}

const clickToTop = toTop => {
    return new IntersectionObserver(el => {
        if(el[0].isIntersecting) {
            toTop.style.opacity = '100%'
        }
        else {
            toTop.style.opacity = '0%'
        }
    }, { threshold: [0.2] })
}

export { clickNav, clickToTop }