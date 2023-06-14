const CV = {
    PersonalInfo: {
        name: "",
        firstName: "",
        lastName: "",
        image: "",
        location: "",
        headline: "",
        pob: "",
        dob: "",
        phone: "",
        location: "",
        email: ""
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

// Get the form elements
const pInfoForm = document.getElementById("pinfo")

// Get the template placeholders
let firstName_tem = document.getElementById("fname_tem"),
    lastName_tem = document.getElementById("lname_tem"),
    dob_tem = document.getElementById("dob_tem"),
    email_tem = document.getElementById("email_tem"),
    pob_tem = document.getElementById("pob_tem"),
    phone_tem = document.getElementById("phone_tem"),
    name_tem = document.getElementById("name_tem"),
    location_tem = document.getElementById("location_tem"),
    headline_tem = document.getElementById("headline_tem")

console.log(email_tem)

pInfoForm.addEventListener("keyup", function (e) {
    // console.log(e.target.id)
    let element = e.target.id
    let value = e.target.value
    updateCVData(CV, "PersonalInfo", element, value)
    // Send the values from JSON to the template
    personal_data = CV["PersonalInfo"]
    // console.log(personal_data['firstName'])

    // name_tem = personal_data["name"]
    firstName_tem.innerHTML = personal_data["firstName"]
    lastName_tem.innerHTML = personal_data["lastName"]
    dob_tem.innerHTML = personal_data["dob"]
    email_tem.innerHTML = personal_data["email"]
    pob_tem.innerHTML = personal_data["pob"]
    phone_tem.innerHTML = personal_data["phone"]
    location_tem.innerHTML = personal_data['location']
    headline_tem.innerHTML = personal_data['headline']
    name_tem.innerHTML = `${firstName_tem.innerHTML} ${lastName_tem.innerHTML}`



})

function updateCVData(data, form, element, value) {

    data[form][element] = value
    // console.log(data)

}

function updateTemplate(template_id, cv_json, form) {
    const data = cv[form]

    element.innerHTML = data;
}