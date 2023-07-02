
document.addEventListener("DOMContentLoaded", function () {
    // Get the add education form buttona
    const addLanguage = document.getElementById("add-language")
    addLanguage.addEventListener("click", function () {
        let parentElement = document.querySelector('.languages');
        duplicateFormLanguage("languageForm", parentElement)
    })
})

const languageContainer = document.querySelector(".language-list-tem")

function duplicateFormLanguage(section, parentElement) {

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
    compileExtraCVDataLanguage(sectionFormList, CV)

    // Add click event listener to the minus button
    minusButton.addEventListener('click', function (e) {

        e.preventDefault()
        fadeOut(clonedForm, function () {

            clonedForm.parentNode.removeChild(clonedForm);
            compileExtraCVDataLanguage(sectionFormList, CV)
            let formsss = document.querySelectorAll(`.${section}`)
            updateTemplateHtmlLanguage(CV, formsss);
        });
    });


    const sectionCVID = "Languages"
    sectionFormList.forEach((form, index) => {
        form.addEventListener("keyup", function (e) {
            let element = e.target.id
            let value = e.target.value
            updateCVData2(CV, sectionCVID, index, element, value)
            // updateTemplateExpInfo(CV["Experience"][index])
            // get the nodelist of all exps
        })
        let formsss = document.querySelectorAll(`.${section}`)
        compileExtraCVDataLanguage(formsss, CV)
        updateTemplateHtmlLanguage(CV, formsss);
    });
}

function compileExtraCVDataLanguage(formNodeList, globalCV) {
    // form => form that holds the data
    // list of objects for all the forms

    // perform a reset on the cv data
    let formss = document.querySelectorAll(".languageForm")
    CV["Languages"] = []
    formss.forEach(form => {

        var language = {
            name: form.name.value,
            level: form.level.value,
        }
        CV["Languages"].push(language)

    });
    // updateTemplateHtmlLanguage(CV, formss);
}

function updateTemplateHtmlLanguage(cv, formNodeList) {
    // Clear the container before updating it's contents
    const nodeList = document.querySelectorAll('.language');

    const arrayNodes = [...nodeList];
    arrayNodes.forEach((node, index) => {
        // get the max number of
        if (index !== 0) {
            node.parentNode.removeChild(node);

        }
    });


    compileExtraCVDataLanguage(formNodeList, cv)
    cv["Languages"].forEach((lang, index) => {
        if (index !== 0) {
            createLanguageHTML(cv["Languages"][index], index, cv)
            updateTemplateLanaguageRest(cv["Languages"][index], index)
            formNodeList[index].addEventListener("keyup", function () {
                // update template
                document.getElementById(`lang_name_tem_${index}`).innerHTML = lang["name"]
                document.getElementById(`lang_level_tem_${index}`).innerHTML = lang["level"]
            })
        }
    });
}

// Create html for the new xp
// adds new li to the template when plus button is clicked
function createLanguageHTML(data, index, formNodeList) {
    let langHTML = `
        <h5><strong id="lang_name_tem_${index}"></strong></h5>
        <h5 id="lang_level_tem_${index}"></h5>
        `
    let li = document.createElement("li")
    li.classList.add("language")
    li.innerHTML = langHTML
    // Add the new li to the list of experieces
    languageContainer.appendChild(li)
}

// Update template data for experience 
function updateTemplateLanaguageInfo(lang) {
    document.getElementById("lang_name_tem").innerHTML = lang["name"]
    document.getElementById("lang_level_tem").innerHTML = lang["level"]
}


// update all other languages on the template except the first one
function updateTemplateLanaguageRest(lang, index) {
    document.getElementById(`lang_name_tem_${index}`).innerHTML = lang["name"]
    document.getElementById(`lang_level_tem_${index}`).innerHTML = lang["level"]
}

// Add event listener to experience form
const langForms = document.querySelectorAll(".languageForm")
let langForm = langForms[0]

// Add event to first language form on the page
langForm.addEventListener("keyup", function (e) {
    let element = e.target.id
    let value = e.target.value

    let formsss = document.querySelectorAll('.langForm')
    compileExtraCVData(formsss, CV)
    // updateCVData(CV, "Experience", element, value)
    updateCVData2(CV, "Languages", 0, element, value)
    updateTemplateLanaguageInfo(CV["Languages"][0])
})

// update education form fields
function updateLanguageForm(lang, form) {
    form.name.value = lang["name"]
    form.level.value = lang["level"]
}
