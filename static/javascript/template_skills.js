
document.addEventListener("DOMContentLoaded", function () {
    // Get the add education form buttona
    const addEducationBtn = document.getElementById("add-skill")
    addEducationBtn.addEventListener("click", function () {
        let parentElement = document.querySelector('.skills');
        duplicateFormSkill("skillForm", parentElement)
    })
})

const skillContainer = document.querySelector(".skill-list-tem")

function duplicateFormSkill(section, parentElement) {

    // Create a clone of the form
    var clonedForm = document.querySelector(`.${section}`).cloneNode(true);
    // empty fields
    emptyFormFields(clonedForm)

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

    // Show the cloned form with a slow animation
    fadeIn(clonedForm);
    // update the CV data with new form
    // CV["Experience"] = []
    compileExtraCVDataSkill(sectionFormList, CV)

    // Add click event listener to the minus button
    minusButton.addEventListener('click', function (e) {

        e.preventDefault()
        fadeOut(clonedForm, function () {

            clonedForm.parentNode.removeChild(clonedForm);
            compileExtraCVDataSkill(sectionFormList, CV)
            let formsss = document.querySelectorAll(`.${section}`)
            updateTemplateHtmlSkill(CV, formsss);
        });
    });


    const sectionCVID = "Skills"
    sectionFormList.forEach((form, index) => {
        form.addEventListener("keyup", function (e) {
            let element = e.target.id
            let value = e.target.value
            updateCVData2(CV, sectionCVID, index, element, value)
            // updateTemplateExpInfo(CV["Experience"][index])
            // get the nodelist of all exps
        })
        let formsss = document.querySelectorAll(`.${section}`)
        compileExtraCVDataSkill(formsss, CV)
        updateTemplateHtmlSkill(CV, formsss);
    });
}

function compileExtraCVDataSkill(formNodeList, globalCV) {
    // form => form that holds the data
    // list of objects for all the forms

    // perform a reset on the cv data
    let formss = document.querySelectorAll(".skillForm")
    CV["Skills"] = []
    formss.forEach(form => {

        var skill = {
            name: form.name.value,
            level: form.level.value,
        }
        CV["Skills"].push(skill)

    });
    // updateTemplateHtmlSkill(CV, formss);
}

function updateTemplateHtmlSkill(cv, formNodeList) {
    // Clear the container before updating it's contents
    const nodeList = document.querySelectorAll('.skill');

    const arrayNodes = [...nodeList];
    arrayNodes.forEach((node, index) => {
        // get the max number of
        if (index !== 0) {
            node.parentNode.removeChild(node);

        }
    });

    compileExtraCVDataSkill(formNodeList, cv)
    cv["Skills"].forEach((skill, index) => {
        if (index !== 0) {
            createSkillHTML(cv["Skills"][index], index, cv)
            updateTemplateSkillInfoRest(cv["Skills"][index], index)
            formNodeList[index].addEventListener("keyup", function () {
                // update template
                document.getElementById(`skill_name_tem_${index}`).innerHTML = skill["name"]
                document.getElementById(`skill_level_tem_${index}`).innerHTML = skill["level"]
            })
        }
    });
}

// Create html for the new xp
// adds new li to the template when plus button is clicked
function createSkillHTML(data, index, formNodeList) {
    let skillHTML = `
        <h5><strong id="skill_name_tem_${index}"></strong></h5>
        <h5 id="skill_level_tem_${index}"></h5>
        `
    let li = document.createElement("li")
    li.classList.add("skill")
    li.innerHTML = skillHTML
    // Add the new li to the list of experieces
    skillContainer.appendChild(li)
}

// Update template data for experience 
function updateTemplateSkillInfo(skill) {
    document.getElementById("skill_name_tem").innerHTML = skill["name"]
    document.getElementById("skill_level_tem").innerHTML = skill["level"]
}


// update all other skills on the template except the first one
function updateTemplateSkillInfoRest(skill, index) {
    document.getElementById(`skill_name_tem_${index}`).innerHTML = skill["name"]
    document.getElementById(`skill_level_tem_${index}`).innerHTML = skill["level"]
}

// Add event listener to experience form
const skillForms = document.querySelectorAll(".skillForm")
let skillForm = skillForms[0]

// Add event to first skill form on the page
skillForm.addEventListener("keyup", function (e) {
    let element = e.target.id
    let value = e.target.value

    let formsss = document.querySelectorAll('.skillForm')
    compileExtraCVData(formsss, CV)
    // updateCVData(CV, "Experience", element, value)
    updateCVData2(CV, "Skills", 0, element, value)
    updateTemplateSkillInfo(CV["Skills"][0])
})

// update education form fields
function updateSkillForm(skill, form) {
    form.name.value = skill["name"]
    form.level.value = skill["level"]
}
