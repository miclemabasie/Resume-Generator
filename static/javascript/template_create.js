const CV = {
    cvName: "",
    PersonalInfo: {
        firstName: "",
        lastName: "",
        image: "",
        location: "",
        headline: "",
        pob: "",
        dob: "",
        phone: "",
        location: "",
        email: "",
        summary: "",
    },
    Skills: {
        // technical: [],
        // soft: []
        name: "",
        level: "",
    },
    Education: {
        name: "",
        major: "",
        school: "",
        start: "",
        end: "",
        institution: "",
        description: ""
    },
    Experience: {
        position: "",
        company: "",
        start: "",
        end: "",
        location: "",
        description: "",
        // achievements: []
    },
    Language: {
        // languages: []
        lang_name: "",
        level: "",
    },
    Contact: {
        linkedin: "",
        github: "",
        website: "",
        other: []
    },
    Projects: {
        // date: "",
        // technologies: [],
        name: "",
        description: "",
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

const generateBtn = document.getElementById("generateCV")
const username = document.getElementById("username").dataset.username,
    userID = document.getElementById("user-id").dataset.userid
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

// Set the template name to username
CV["cvName"] = `${username}-${userID}`

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
    console.log(form, element, value)
}

function updateTemplate(template_id, cv_json, form) {
    const data = cv[form]

    element.innerHTML = data;
}

// Create an event to take handle the cv generation
generateBtn.addEventListener("click", function () {
    sendCVData(CV)
})


function sendCVData(object) {
    // convert the js object into JSON
    const json = JSON.stringify(object)
    const url = document.getElementById("url").innerText
    // Send the data to django for processing

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    }
    console.log(url)
    fetch(`${url}`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => {
            console.log("Something went wrong")
            console.log(err)
        })

}