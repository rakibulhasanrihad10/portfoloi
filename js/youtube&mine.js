// ============= typing animation ============= 

// var typed = new Typed(".typing", {
//     strings:["Computer Science Undergraduate Student", "Muslim", "Programmer", "Learner"],
//     typeSpeed: 100,
//     backSpeed: 60,
//     loop: true
// })

// ============= typing animation ============= 

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
    for(let i=0; i<totalNavList; i++)
    {
    
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function()

        {
            removeBackSection();
            for(let j=0; j<totalNavList; j++)
            {
                if(navList[j].querySelector("a").classList.contains("active"))
                {
                    addBackSection(j);
                    //allSection[j].classList.add("back-section");
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active")
            showSection(this);
            if(window.innerWidth <1200)
            {
                asideSectionTogglerBtn();
            }
        })

    }

    function removeBackSection()
    {
        for( let i=0; i<totalSection; i++)
            {
                allSection[i].classList.remove("back-section");
    
            }
    }
    function addBackSection(num)
    {
        allSection[num].classList.add("back-section");
    }
    function showSection(element)
    {
        for( let i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("active");

        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active")
    }
    function updateNav(element)
    {
        for(let i=0; i<totalNavList; i++)
        {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
            {
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }
    document.querySelector(".hire-me").addEventListener("click", function()
    {
        const sectionIndex = this.getAttribute("data-section-index");
        //console.log(sectionIndex)
        showSection(this);
        updateNav(this);
        removeBackSection();
        addBackSection(sectionIndex);
    })
    const navTogglerBtn = document.querySelector(".nav-toggler"),
        aside = document.querySelector(".aside");
        navTogglerBtn.addEventListener("click", () =>
        {
            asideSectionTogglerBtn();
        })
        function asideSectionTogglerBtn()
        {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
            for(let i=0; i<totalSection; i++)
            {
                allSection[i].classList.toggle("open")
            }

        }



// ============= send mail =============
function openMailClient() {
    window.location.href = "mailto:rakibulhasanrihad@gmail.com";
}
// ============= send mail =============





// ============= Last modified date display =============
let lastMod = new Date(document.lastModified);
let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZone: 'Asia/Dhaka'
};
let formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(lastMod);
document.getElementById("last-modified").textContent += `${formattedDateTime} (BD Local Time, GMT+6)`;
// ============= Last modified date display =============


