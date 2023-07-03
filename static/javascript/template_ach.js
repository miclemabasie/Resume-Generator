
document.addEventListener("DOMContentLoaded", function () {
    // Get the add education form buttona
    const addAchievement = document.getElementById("add-achievement")
    addAchievement.addEventListener("click", function () {
        let parentElement = document.querySelector('.achievements');
        duplicateFormAchievement("achievementForm", parentElement)
    })
})

const achievmentContainter = document.querySelector(".achievement-list-tem")

function duplicateFormAchievement(section, parentElement) {

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
    compileExtraCVDataAchievement(sectionFormList, CV)

    // Add click event listener to the minus button
    minusButton.addEventListener('click', function (e) {

        e.preventDefault()
        fadeOut(clonedForm, function () {

            clonedForm.parentNode.removeChild(clonedForm);
            compileExtraCVDataAchievement(sectionFormList, CV)
            let formsss = document.querySelectorAll(`.${section}`)
            updateTemplateHtmlAchievement(CV, formsss);
        });
    });


    const sectionCVID = "Achievements"
    sectionFormList.forEach((form, index) => {
        form.addEventListener("keyup", function (e) {
            let element = e.target.id
            let value = e.target.value
            updateCVData2(CV, sectionCVID, index, element, value)
            // updateTemplateExpInfo(CV["Experience"][index])
            // get the nodelist of all exps
        })
        let formsss = document.querySelectorAll(`.${section}`)
        compileExtraCVDataAchievement(formsss, CV)
        updateTemplateHtmlAchievement(CV, formsss);
    });
}

function compileExtraCVDataAchievement(formNodeList, globalCV) {
    // form => form that holds the data
    // list of objects for all the forms

    // perform a reset on the cv data
    let formss = document.querySelectorAll(".achievementForm")
    CV["Achievements"] = []
    formss.forEach(form => {

        var ach = {
            name: form.name.value,
            date: form.date.value,
            organization: form.organization.value,
            link: form.link.value,
            description: form.description.value,
        }
        CV["Achievements"].push(ach)

    });
    // updateTemplateHtmlAchievement(CV, formss);
}

function updateTemplateHtmlAchievement(cv, formNodeList) {
    // Clear the container before updating it's contents
    const nodeList = document.querySelectorAll('.ach');

    const arrayNodes = [...nodeList];
    arrayNodes.forEach((node, index) => {
        // get the max number of
        if (index !== 0) {
            node.parentNode.removeChild(node);

        }
    });


    compileExtraCVDataAchievement(formNodeList, cv)
    cv["Achievements"].forEach((ach, index) => {
        if (index !== 0) {
            createAchievementHTML(cv["Achievements"][index], index, cv)
            updateTemplateAchievementRest(cv["Achievements"][index], index)
            formNodeList[index].addEventListener("keyup", function () {
                // update template
                document.getElementById(`ach_name_tem_${index}`).innerHTML = ach["name"]
                document.getElementById(`ach_date_tem_${index}`).innerHTML = ach["date"]
                document.getElementById(`ach_organization_tem_${index}`).innerHTML = ach["organization"]
                document.getElementById(`ach_link_tem_${index}`).innerHTML = ach["link"]
                document.getElementById(`ach_description_tem_${index}`).innerHTML = ach["description"]
            })
        }
    });
}

// Create html for the new xp
// adds new li to the template when plus button is clicked
function createAchievementHTML(data, index, formNodeList) {
    let achHtml = `
            <h5><strong id="ach_name_tem_${index}"></strong></h5>
            <h5 id="ach_date_tem_${index}"></h5>
            <h5 id="ach_organization_tem_${index}"></h5>
            <h5 id="ach_link_tem_${index}"></h5>
            <h5 id="ach_description_tem_${index}"></h5>
            <hr>
        `
    let li = document.createElement("li")
    li.classList.add("ach")
    li.innerHTML = achHtml
    // Add the new li to the list of experieces
    achievmentContainter.appendChild(li)
}

// Update template data for experience 
function updateTemplateAchievementInfo(ach) {
    document.getElementById("ach_name_tem").innerHTML = ach["name"]
    document.getElementById("ach_date_tem").innerHTML = ach["date"]
    document.getElementById("ach_organization_tem").innerHTML = ach["organization"]
    document.getElementById("ach_link_tem").innerHTML = ach["link"]
    document.getElementById("ach_description_tem").innerHTML = ach["description"]
}


// update all other achievements on the template except the first one
function updateTemplateAchievementRest(ach, index) {
    document.getElementById(`ach_name_tem_${index}`).innerHTML = ach["name"]
    document.getElementById(`ach_date_tem_${index}`).innerHTML = ach["date"]
    document.getElementById(`ach_organization_tem_${index}`).innerHTML = ach["organization"]
    document.getElementById(`ach_link_tem_${index}`).innerHTML = ach["link"]
    document.getElementById(`ach_description_tem_${index}`).innerHTML = ach["description"]

}

// Add event listener to experience form
const achForms = document.querySelectorAll(".achievementForm")
let achForm = achForms[0]

// Add event to first achievement form on the page
achForm.addEventListener("keyup", function (e) {
    let element = e.target.id
    let value = e.target.value

    let formsss = document.querySelectorAll('.achievementForm')
    compileExtraCVData(formsss, CV)
    // updateCVData(CV, "Experience", element, value)
    updateCVData2(CV, "Achievements", 0, element, value)
    updateTemplateAchievementInfo(CV["Achievements"][0])
})

// update education form fields
function updateachievementForm(ach, form) {
    form.name.value = ach["name"]
    form.date.value = ach["date"]
    form.organization.value = ach["organization"]
    form.link.value = ach["link"]
    form.description.value = ach["description"]
}
