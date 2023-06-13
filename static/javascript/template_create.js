const CV = {
    PersonalInfo: {
        firstName: "",
        lastName: "",
        image: "",
        location: "",
        headline: "",
        pob: "",
        dob: ""
    },
    Skills: {
        technical: [],
        soft: []
    },
    Education: {
        degree: "",
        major: "",
        school: "",
        date: "",
        GPA: "",
        description: ""
    },
    Experience: {
        position: "",
        company: "",
        date: "",
        location: "",
        description: "",
        achievements: []
    },
    Language: {
        languages: []
    },
    Contact: {
        linkedin: "",
        github: "",
        website: "",
        other: []
    },
    Projects: {
        name: "",
        date: "",
        description: "",
        technologies: [],
        link: ""
    },
    Achievements: {
        name: "",
        date: "",
        description: "",
        organization: "",
        link: ""
    }
};

const pInfoForm = document.getElementById("pinfo")

pInfoForm.addEventListener("keyup", function (e) {
    console.log(e.target.id)
    let element = e.target.id
    let value = e.target.value
    updateCVData(CV, "PersonalInfo", element, value)
})

function updateCVData(data, form, element, value) {

    data[form][element] = value
    console.log(data)

}

function updateTemplate(template_id, element, data) {
    // template_id is the template we wish to update
    // element refers to the particular part of the template we wish to update
    // data is the value with which the template and element is to be updated

    element.innerHTML = data;
}