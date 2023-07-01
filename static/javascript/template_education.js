
document.addEventListener("DOMContentLoaded", function () {
    // Get the add education form buttona
    const addEducationBtn = document.getElementById("add-education")
    addEducationBtn.addEventListener("click", function () {
        let parentElement = document.querySelector('.educations');
        duplicateForm2("educationForm", parentElement)
    })
})

const educationContainer = document.querySelector(".education-list-tem")

function duplicateForm2(section, parentElement) {

    // Create a clone of the form
    var clonedForm = document.querySelector(`.${section}`).cloneNode(true);
    // empty fields
    emptyFormFields(clonedForm)
    console.log("from education form")
    // console.log(clonedForm)

    // Add a minus button to the cloned form
    var minusButton = document.createElement('button');
    minusButton.innerHTML = '-';
    minusButton.classList.add('minus-button');
    minusButton.classList.add('btn');
    minusButton.classList.add('btn-danger');
    clonedForm.appendChild(minusButton);

    //     // Hide the cloned form initially
    clonedForm.style.display = 'none';

    //     // Append the cloned form to the parent element
    parentElement.appendChild(clonedForm);

    const sectionFormList = document.querySelectorAll(`.${section}`)
    console.log(sectionFormList)

    // Show the cloned form with a slow animation
    fadeIn(clonedForm);
    // update the CV data with new form
    // CV["Experience"] = []
    compileExtraCVDataEducation(sectionFormList, CV)

    // Add click event listener to the minus button
    minusButton.addEventListener('click', function (e) {

        e.preventDefault()
        fadeOut(clonedForm, function () {

            clonedForm.parentNode.removeChild(clonedForm);
            compileExtraCVDataEducation(sectionFormList, CV)
            let formsss = document.querySelectorAll(`.${section}`)

        });
    });

    console.log("section: ", section)
    if (section === "skillForm") {
        const sectionCVID = "Skills"
    } else if (section === "educationForm") {
        const sectionCVID = "Education"
        console.log("section id:", sectionCVID)
        sectionFormList.forEach((form, index) => {
            form.addEventListener("keyup", function (e) {
                let element = e.target.id
                let value = e.target.value
                updateCVData2(CV, sectionCVID, index, element, value)
                // updateTemplateExpInfo(CV["Experience"][index])
                // get the nodelist of all exps
            })
            let formsss = document.querySelectorAll(`.${section}`)
            console.log("formsss", formsss)
            compileExtraCVDataEducation(formsss, CV)
            updateTemplateHtmlEducation(CV, formsss);
        });
    }
    console.log(CV)
}

function compileExtraCVDataEducation(formNodeList, globalCV) {
    // form => form that holds the data
    // list of objects for all the forms

    // perform a reset on the cv data
    let formss = document.querySelectorAll(".educationForm")
    console.log(formss)
    CV["Education"] = []
    formss.forEach(form => {

        var education = {
            name: form.name.value,
            major: form.major.value,
            start: form.start.value,
            end: form.end.value,
            institution: form.institution.value,
            description: form.description.value
        }
        // console.log(CV["Experience"])
        CV["Education"].push(education)
        console.log(CV["Education"])

    });
    // updateTemplateHtmlEducation(CV, formss);

}

function updateTemplateHtmlEducation(cv, formNodeList) {
    // Clear the container before updating it's contents
    const nodeList = document.querySelectorAll('.edu');

    const arrayNodes = [...nodeList];
    arrayNodes.forEach((node, index) => {
        // get the max number of
        if (index !== 0) {
            node.parentNode.removeChild(node);

        }
    });

    // console.log(formNodeList[1])
    compileExtraCVDataEducation(formNodeList, cv)
    cv["Education"].forEach((education, index) => {
        if (index !== 0) {
            createExpHTMLEducation(cv["Education"][index], index, cv)
            updateTemplateEducationInfoRest(cv["Education"][index], index)
            formNodeList[index].addEventListener("keyup", function () {
                // update template
                document.getElementById(`edu_name_tem_${index}`).innerHTML = education["name"]
                document.getElementById(`edu_start_tem_${index}`).innerHTML = education["start"]
                document.getElementById(`edu_end_tem_${index}`).innerHTML = education["end"]
                document.getElementById(`edu_major_tem_${index}`).innerHTML = education["major"]
                document.getElementById(`edu_institute_tem_${index}`).innerHTML = education["institution"]
                document.getElementById(`edu_description_tem_${index}`).innerHTML = education["description"]
            })
        }
    });
}

// Create html for the new xp
// adds new li to the template when plus button is clicked
function createExpHTMLEducation(data, index, formNodeList) {
    let educationHTML = `
        <h5><strong id="edu_name_tem_${index}"></strong></h5>
        <h5 id="edu_start_tem_${index}"></h5>
        <h5 id="edu_end_tem_${index}"></h5>
        <h5 id="edu_major_tem_${index}"></h5>
        <h5 id="edu_institute_tem_${index}"></h5>
        <h5 id="edu_description_tem_${index}"></h5>
        `
    let li = document.createElement("li")
    li.classList.add("edu")
    li.innerHTML = educationHTML
    // Add the new li to the list of experieces
    educationContainer.appendChild(li)
}

// Update template data for experience 
function updateTemplateEducationInfo(education) {
    document.getElementById("edu_name_tem").innerHTML = education["name"]
    document.getElementById("edu_start_tem").innerHTML = education["start"]
    document.getElementById("edu_end_tem").innerHTML = education["end"]
    document.getElementById("edu_major_tem").innerHTML = education["major"]
    document.getElementById("edu_institute_tem").innerHTML = education["institution"]
    document.getElementById("edu_description_tem").innerHTML = education["description"]
}


// update all other exps on the template except the first one
function updateTemplateEducationInfoRest(education, index) {
    document.getElementById(`edu_name_tem_${index}`).innerHTML = education["name"]
    document.getElementById(`edu_start_tem_${index}`).innerHTML = education["start"]
    document.getElementById(`edu_end_tem_${index}`).innerHTML = education["end"]
    document.getElementById(`edu_major_tem_${index}`).innerHTML = education["major"]
    document.getElementById(`edu_institute_tem_${index}`).innerHTML = education["institution"]
    document.getElementById(`edu_description_tem_${index}`).innerHTML = education["description"]
}

// Add event listener to experience form
const educationForms = document.querySelectorAll(".educationForm")
let educationForm = educationForms[0]

educationForm.addEventListener("keyup", function (e) {
    let element = e.target.id
    let value = e.target.value

    let formsss = document.querySelectorAll('.educationForm')
    compileExtraCVData(formsss, CV)
    // updateCVData(CV, "Experience", element, value)
    updateCVData2(CV, "Education", 0, element, value)
    updateTemplateEducationInfo(CV["Education"][0])
})

// update education form fields
function updateEducationForm(education, form) {
    form.name.value = education["name"]
    form.start.value = education["start"]
    form.end.value = education["end"]
    form.major.value = education["major"]
    form.institution.value = education["institution"]
    form.description.value = education["description"]
}
