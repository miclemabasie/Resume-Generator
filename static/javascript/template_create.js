// Construct new data for the new user
CV = {
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
        start: "",
        end: "",
        institution: "",
        description: ""
    },
    Experience: {
        title: "",
        role: "",
        company: "",
        start: "",
        end: "",
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
const pInfoForm = document.getElementById("pinfo") // personal info
const expInfoForm = document.getElementById("expInfo")



// Get the template placeholders
const firstName_tem = document.getElementById("fname_tem"),
    lastName_tem = document.getElementById("lname_tem"),
    dob_tem = document.getElementById("dob_tem"),
    email_tem = document.getElementById("email_tem"),
    pob_tem = document.getElementById("pob_tem"),
    phone_tem = document.getElementById("phone_tem"),
    name_tem = document.getElementById("name_tem"),
    location_tem = document.getElementById("location_tem"),
    headline_tem = document.getElementById("headline_tem")

document.addEventListener("DOMContentLoaded", function (e) {
    let globaldata;
    function getUserCVData() {
        // Request user data if it already exists in the database
        const url1 = document.getElementById("url1").dataset.createurl
        const options = {
            method: "GET",
            headers: {
                "content-type": "application/json",
            }
        }
        fetch(`${url1}?data=data`, options)
            .then(response => response.json())
            .then(data => {
                CV["PersonalInfo"] = data["personal_info"]
                CV["Experience"] = data["experiences"][0]
                console.log(CV["Experience"])
                // Update the form field values with data from django
                updatePersonalInfoForm(data["personal_info"], pInfoForm)
                updateExpForm(data['experiences'][0], expInfoForm)
                // console.log()
                // update the template with data from django
                updateTemplatePersonalInfo(data["personal_info"], true)
                updateTemplateExpInfo(data["experiences"][0])
            })

        return false;
    }
    // deactivate the download button unless CV is ready
    const downBtn = document.getElementById("download-btn")
    downBtn.style.pointerEvents = "none";

    // check if CV for user already exists in the database
    if (document.getElementById("usercv")) {
        getUserCVData()
        downloadBtn(downBtn)
    }
})

// function to activate download btn
function downloadBtn(btn) {
    btn.style.pointerEvents = ""
}




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
    updateTemplatePersonalInfo(personal_data, false);

})

// Add event listener to experience form
// expInfoForm.addEventListener("keyup", function (e) {
//     let element = e.target.id
//     let value = e.target.value
//     updateCVData(CV, "Experience", element, value)
//     updateTemplateExpInfo(CV["Experience"])
// })

function updateCVData(data, form, element, value) {
    data[form][element] = value
}

// for testing only
function updateCVData2(data, form, id, element, value) {
    data[form][id][element] = value
    console.log(data[form][id].title)
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
    fetch(`${url}`, options)
        .then(response => response.json())
        .then(data => console.log(data)) // Data from Django
        .catch(err => {
            console.log("Something went wrong")
        })

}


function updateTemplatePersonalInfo(personal_data, update) {
    firstName_tem.innerHTML = personal_data["firstName"]
    lastName_tem.innerHTML = personal_data["lastName"]
    // name_tem = personal_data["name"]
    dob_tem.innerHTML = personal_data["dob"]
    email_tem.innerHTML = personal_data["email"]
    pob_tem.innerHTML = personal_data["pob"]
    phone_tem.innerHTML = personal_data["phone"]
    location_tem.innerHTML = personal_data['location']
    headline_tem.innerHTML = personal_data['headline']
    name_tem.innerHTML = `${firstName_tem.innerHTML} ${lastName_tem.innerHTML}`
}

// Function to update form fields if data already exists about the user
function updatePersonalInfoForm(personal_data, form) {
    form.firstName.value = personal_data["firstName"]
    form.lastName.value = personal_data["lastName"]
    form.location.value = personal_data["location"]
    form.headline.value = personal_data["headline"]
    form.pob.value = personal_data["pob"]
    form.dob.value = personal_data["dob"]
    form.email.value = personal_data["email"]
    form.phone.value = personal_data["phone"]
}

// Update template data for experience 
function updateTemplateExpInfo(exp_info) {
    document.getElementById("exp_title_tem").innerHTML = exp_info["title"]
    document.getElementById("exp_company_tem").innerHTML = exp_info["company"]
    document.getElementById("exp_start_tem").innerHTML = exp_info["start"]
    document.getElementById("exp_end_tem").innerHTML = exp_info["end"]
    document.getElementById("exp_desc_tem").innerHTML = exp_info["description"]
}

// update experience form fields
function updateExpForm(exp_data, form) {
    form.title.value = exp_data["title"]
    form.company.value = exp_data["company"]
    form.start.value = exp_data["start"]
    form.end.value = exp_data["end"]
    form.description.value = exp_data["description"]
}
