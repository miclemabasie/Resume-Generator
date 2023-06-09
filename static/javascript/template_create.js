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
    Skills: [{
        // technical: [],
        // soft: []
        name: "",
        level: "",
    }],
    Experience: [{
        title: "",
        role: "",
        company: "",
        start: "",
        end: "",
        description: "",
        // achievements: []
    }],
    Education: [{
        name: "",
        major: "",
        start: "",
        end: "",
        institution: "",
        description: ""
    }],
    Languages: [{
        // languages: []
        name: "",
        level: "",
    }],
    Contact: {
        linkedin: "",
        github: "",
        website: "",
        other: []
    },
    Achievements: [{
        name: "",
        date: "",
        description: "",
        organization: "",
        link: ""
    }]
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
                console.log("data from dajngo", data)
                CV["PersonalInfo"] = data["personal_info"]
                CV["Experience"] = data["experiences"]
                // CV["Education"] = data["education"]
                // Update the form field values with data from django
                updatePersonalInfoForm(data["personal_info"], pInfoForm)
                updateTemplatePersonalInfo(data["personal_info"], true)
                if (data["experiences"].length > 0) {
                    // find the length of exps for current user
                    let database_exps_len = data["experiences"].length;
                    for (let i = 0; i < database_exps_len; i++) {
                        if (i != 0) {
                            duplicateForm()
                        }
                        let formsss = document.querySelectorAll('.expForm')
                        compileExtraCVData(formsss, CV)
                        updateExpForm(data['experiences'][i], formsss[i])
                        if (i != 0) {
                            updateTemplateExpInfoRest(data["experiences"][i], i)
                            console.log("this is update from rest")
                            updateTemplateHtml(CV, formsss);
                        } else {
                            updateTemplateExpInfo(data["experiences"][i])
                        }
                    }
                }

                // Check if education is available in dataset
                if (data["education"].length > 0) {
                    CV["Education"] = data["education"]
                    // find the length of exps for current user
                    let database_education_len = data["education"].length;
                    for (let i = 0; i < database_education_len; i++) {
                        if (i != 0) {
                            let parentElement = document.querySelector('.educations');
                            duplicateForm2("educationForm", parentElement)
                        }
                        let formsss = document.querySelectorAll('.educationForm')
                        compileExtraCVDataEducation(formsss, CV)
                        updateEducationForm(data['education'][i], formsss[i])
                        if (i != 0) {
                            updateTemplateEducationInfoRest(data["education"][i], i)
                            updateTemplateHtmlEducation(CV, formsss);
                        } else {
                            updateTemplateEducationInfo(data["education"][i])
                        }
                    }
                }

                // Achievements
                if (data["achievements"].length > 0) {
                    console.log("this acchs")
                    CV["Achievements"] = data["achievements"]
                    // find the length of ach for current user
                    let database_education_len = data["achievements"].length;
                    for (let i = 0; i < database_education_len; i++) {
                        if (i != 0) {
                            let parentElement = document.querySelector('.achievements');
                            duplicateFormAchievement("achievementForm", parentElement)
                        }
                        let formsss = document.querySelectorAll('.achievementForm')
                        compileExtraCVDataAchievement(formsss, CV)
                        updateachievementForm(data['achievements'][i], formsss[i])
                        if (i != 0) {
                            updateTemplateAchievementRest(data["achievements"][i], i)
                            updateTemplateHtmlAchievement(CV, formsss);
                        } else {
                            updateTemplateAchievementInfo(data["achievements"][i])
                        }
                    }
                } else {
                    console.log("No data about achievements from djagno")
                }

                // skills
                if (data["skills"].length > 0) {
                    console.log("this acchs")
                    CV["Skills"] = data["skills"]
                    // find the length of skills for current user
                    let database_education_len = data["skills"].length;
                    for (let i = 0; i < database_education_len; i++) {
                        if (i != 0) {
                            let parentElement = document.querySelector('.skills');
                            duplicateFormSkill("skillForm", parentElement)
                        }
                        let formsss = document.querySelectorAll('.skillForm')
                        compileExtraCVDataSkill(formsss, CV)
                        updateSkillForm(data['skills'][i], formsss[i])
                        if (i != 0) {
                            updateTemplateSkillInfoRest(data["skills"][i], i)
                            updateTemplateHtmlSkill(CV, formsss);
                        } else {
                            updateTemplateSkillInfo(data["skills"][i])
                        }
                    }
                } else {
                    console.log(data["skills"])
                    console.log("No data about skills from djagno")
                }

                // Languages
                if (data["languages"].length > 0) {
                    CV["Languages"] = data["languages"]
                    // find the length of languages for current user
                    let database_education_len = data["languages"].length;
                    for (let i = 0; i < database_education_len; i++) {
                        if (i != 0) {
                            let parentElement = document.querySelector('.languages');
                            duplicateFormLanguage("languageForm", parentElement)
                        }
                        let formsss = document.querySelectorAll('.languageForm')
                        compileExtraCVDataLanguage(formsss, CV)
                        updateLanguageForm(data['languages'][i], formsss[i])
                        if (i != 0) {
                            updateTemplateLanaguageRest(data["languages"][i], i)
                            updateTemplateHtmlLanguage(CV, formsss);
                        } else {
                            updateTemplateLanaguageInfo(data["languages"][i])
                        }
                    }
                } else {
                    console.log(data["languages"])
                    console.log("No data about languages from djagno")
                }
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
        // addEventToFirstForm("educationForm", "Education")
        // addEventToFirstForm("exp", "Experience")
    }
})

// function to activate download btn
function downloadBtn(btn) {
    btn.style.pointerEvents = ""
}




// Set the template name to username
CV["cvName"] = `${username}-${userID}`

pInfoForm.addEventListener("keyup", function (e) {
    let element = e.target.id
    let value = e.target.value
    updateCVData(CV, "PersonalInfo", element, value)
    // Send the values from JSON to the template
    updateTemplatePersonalInfo(CV["PersonalInfo"], false);

})
function updateCVData(data, form, element, value) {
    data[form][element] = value
}


// Add event listener to experience form
expInfoForm.addEventListener("keyup", function (e) {
    let element = e.target.id
    let value = e.target.value

    let formsss = document.querySelectorAll('.expForm')
    compileExtraCVData(formsss, CV)
    // updateCVData(CV, "Experience", element, value)
    updateCVData2(CV, "Experience", 0, element, value)
    updateTemplateExpInfo(CV["Experience"][0])
})


// for testing only
function updateCVData2(data, form, id, element, value) {
    data[form][id][element] = value
}

// // Create an event to take handle the cv generation
// generateBtn.addEventListener("click", function () {
//     sendCVData(CV)
// })


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
        .then(data => {
            console.log(data)
        }) // Data from Django
        .catch(err => {
            console.log("Something went wrong!")
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

// // Add Eventlistener to all # 1 forms 

// function addEventToFirstForm(section, cv_section) {
//     // Get all first forms and loop through
//     let firstForms = document.querySelectorAll(".firstForm")
//     // console.log("first forms ", firstForms)
//     firstForms.forEach(form => {
//         console.log("running update for first form", form)
//         form.addEventListener("keyup", function (e) {
//             let element = e.target.id
//             let value = e.target.value

//             if (section === "exp" && cv_section === "Experience") {
//                 console.log("This is exp section", form)
//                 let expForms = document.querySelectorAll('.expForm')
//                 compileExtraCVData(expForms, CV)
//                 // updateCVData(CV, "Experience", element, value)
//                 updateCVData2(CV, cv_section, 0, element, value)
//                 updateTemplateExpInfo(CV["Experience"][0])
//             } else {
//                 let restForms = document.querySelectorAll(section)
//                 compileExtraCVDataEducation(restForms, CV)
//                 updateCVData2(CV, cv_section, 0, element, value)
//                 updateTemplateEducationInfo(CV["Education"][0])
//             }
//         })
//     });

// }


// Add a click event listener to the button
generateBtn.addEventListener('click', function () {
    sendCVData(CV)
    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Create the modal element and set its classes
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade', 'd-flex', 'align-items-center', 'justify-content-center');
    modal.style.zIndex = '10000';
    // Create the modal dialog element
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modal.appendChild(modalDialog);

    // Create the modal content element
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalDialog.appendChild(modalContent);

    // Create the modal header element
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    modalContent.appendChild(modalHeader);

    // Create the close button for the modal
    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.setAttribute('type', 'button');
    closeButton.innerHTML = '&times;';
    modalHeader.appendChild(closeButton);

    // Create the modal body element
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body', 'text-center');
    modalContent.appendChild(modalBody);

    // Create the text for the modal body
    const modalText = document.createTextNode('Your CV has been successfuly created!');
    modalBody.appendChild(modalText);

    // Create the first button in the modal
    const button1 = document.createElement('a');
    button1.classList.add('btn', 'btn-primary');
    button1.setAttribute('href', '/download-cv');
    button1.innerText = 'Download';
    // modalBody.appendChild(button1);

    // Create the second button in the modal
    const button2 = document.createElement('a');
    button2.classList.add('btn', 'btn-success');
    button2.setAttribute('href', '/download-cv/?preview=yes');
    button2.innerText = 'Preview';
    // button1.style.marginTop = "50px"
    // button2.style.marginTop = "50px"
    // modalBody.appendChild(button2);

    // create div to hold to the buttons
    const btnContainer = document.createElement("div")
    btnContainer.style.marginTop = "50px"
    btnContainer.appendChild(button1);
    btnContainer.appendChild(button2);
    btnContainer.style.display = "flex"
    btnContainer.style.justifyContent = 'space-between'

    modalBody.appendChild(btnContainer)


    // Append the modal to the document body
    document.body.appendChild(modal);

    // Show the overlay and modal
    setTimeout(function () {
        overlay.classList.add('show');
        modal.classList.add('show');
    }, 50);

    // Hide the overlay and modal when clicking on the close button
    closeButton.addEventListener('click', function () {
        overlay.classList.remove('show');
        modal.classList.remove('show');
        overlay.parentNode.removeChild(overlay)
        modal.parentNode.removeChild(modal)
    });
});