
// Get the parent element
var parentElement = document.querySelector('.exps');
var expContainer = document.querySelector("#exp-list")
// Get the button element
var addButton = document.getElementById('add-exp');
addButton.addEventListener('click', duplicateForm);



function duplicateForm() {

    // Create a clone of the form
    var clonedForm = document.querySelector('.expForm').cloneNode(true);
    // empty fields
    emptyFormFields(clonedForm)

    // Add a minus button to the cloned form
    var minusButton = document.createElement('button');
    minusButton.innerHTML = '-';
    minusButton.classList.add('minus-button');
    minusButton.classList.add('btn');
    minusButton.classList.add('btn-danger');
    clonedForm.appendChild(minusButton);

    // Hide the cloned form initially
    clonedForm.style.display = 'none';

    // Append the cloned form to the parent element
    parentElement.appendChild(clonedForm);

    const expFormList = document.querySelectorAll(".expForm")
    // Show the cloned form with a slow animation
    fadeIn(clonedForm);
    // update the CV data with new form
    // CV["Experience"] = []
    compileExtraCVData(expFormList, CV)



    // Add click event listener to the minus button
    minusButton.addEventListener('click', function (e) {

        e.preventDefault()
        fadeOut(clonedForm, function () {

            clonedForm.parentNode.removeChild(clonedForm);
            compileExtraCVData(expFormList, CV)
            let formsss = document.querySelectorAll('.expForm')
            // console.log("formsss", formNodeList)
            updateTemplateHtml(CV, formsss);
        });
    });

    expFormList.forEach((form, index) => {
        form.addEventListener("keyup", function (e) {
            let element = e.target.id
            let value = e.target.value
            // console.log("element", element)
            // console.log("value", value)

            updateCVData2(CV, "Experience", index, element, value)
            // updateTemplateExpInfo(CV["Experience"][index])
            // get the nodelist of all exps
        })
        let formsss = document.querySelectorAll('.expForm')
        // console.log("formsss", formNodeList)
        compileExtraCVData(formsss, CV)
        updateTemplateHtml(CV, formsss);
    });

}

function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = 'block';

    var opacity = 0;
    var timer = setInterval(function () {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity += 0.1;
    }, 50);
}

function fadeOut(element, callback) {
    var opacity = 1;
    var timer = setInterval(function () {
        if (opacity <= 0) {
            clearInterval(timer);
            element.style.display = 'none';
            // CV["Experience"] = []
            let v = document.querySelectorAll(".expForm")
            compileExtraCVData(v, CV)
            if (callback) {
                callback();
            }
        }
        element.style.opacity = opacity;
        opacity -= 0.1;
    }, 50);
}

// Clean all form fields before duplicating the form
function emptyFormFields(form) {
    // Iterate through each form element
    Array.from(form.elements).forEach(element => {
        // Check if the element is an input, select, or textarea
        if (['INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)) {
            // Reset the value to an empty string
            element.value = '';
        }
    });
}

// Add CV data on form 
function compileExtraCVData(formNodeList, globalCV) {
    // form => form that holds the data
    // list of objects for all the forms

    // perform a reset on the cv data
    let formss = document.querySelectorAll('.expForm')
    CV["Experience"] = []
    formss.forEach(form => {

        var exp = {
            title: form.title.value,
            company: form.company.value,
            start: form.start.value,
            end: form.end.value,
            description: form.description.value
        }
        CV["Experience"].push(exp)
    });
    // updateTemplateHtml(CV, formss);

}

// update experiences in the template

function updateTemplateHtml(cv, formNodeList) {
    // Clear the container before updating it's contents
    const nodeList = document.querySelectorAll('.exp');

    const arrayNodes = [...nodeList];
    arrayNodes.forEach((node, index) => {
        // get the max number of
        if (index !== 0) {
            node.parentNode.removeChild(node);

        }
    });

    // console.log(formNodeList[1])
    compileExtraCVData(formNodeList, CV)
    cv["Experience"].forEach((exp, index) => {
        if (index !== 0) {
            createExpHTML(cv["Experience"][index], index, cv)
            updateTemplateExpInfoRest(cv["Experience"][index], index)
            formNodeList[index].addEventListener("keyup", function () {
                // update template
                document.getElementById(`exp_title_tem_${index}`).innerHTML = exp["title"]
                document.getElementById(`exp_company_tem_${index}`).innerHTML = exp["company"]
                document.getElementById(`exp_start_tem_${index}`).innerHTML = exp["start"]
                document.getElementById(`exp_end_tem_${index}`).innerHTML = exp["end"]
                document.getElementById(`exp_desc_tem_${index}`).innerHTML = exp["description"]
                document.getElementById(`respon_${index}`).innerHTML = "<strong>Responsibilities:</strong>"
                // document.getElementById(`to`).innerHTML = "-"
            })
        }
    });
}

// Update template data for experience 
function updateTemplateExpInfo(exp_info) {
    document.getElementById("exp_title_tem").innerHTML = exp_info["title"]
    document.getElementById("exp_company_tem").innerHTML = exp_info["company"]
    document.getElementById("exp_start_tem").innerHTML = exp_info["start"]
    document.getElementById("exp_end_tem").innerHTML = exp_info["end"]
    document.getElementById("exp_desc_tem").innerHTML = exp_info["description"]
}


// update all other exps on the template except the first one
function updateTemplateExpInfoRest(exp_info, index) {
    document.getElementById(`exp_title_tem_${index}`).innerHTML = exp_info["title"]
    document.getElementById(`exp_company_tem_${index}`).innerHTML = exp_info["company"]
    document.getElementById(`exp_start_tem_${index}`).innerHTML = exp_info["start"]
    document.getElementById(`exp_end_tem_${index}`).innerHTML = exp_info["end"]
    document.getElementById(`exp_desc_tem_${index}`).innerHTML = exp_info["description"]
    document.getElementById(`respon_${index}`).innerHTML = "<strong>Responsibilities:</strong>"
}

// update experience form fields
function updateExpForm(exp_data, form) {
    form.title.value = exp_data["title"]
    form.company.value = exp_data["company"]
    form.start.value = exp_data["start"]
    form.end.value = exp_data["end"]
    form.description.value = exp_data["description"]
}


// Create html for the new xp
// adds new li to the template when plus button is clicked
function createExpHTML(data, index, formNodeList) {
    let expHTML = `
        <h5 id="exp_title_tem_${index}"></h5>
        <h5 id="exp_company_tem_${index}"></h5>
        <h5><span id="exp_start_tem_${index}"></span>  <span id="exp_end_tem_${index}"></span></h5>
        <h5 id="respon_${index}"></h5>
        <p style="font-size: 20px" id="exp_desc_tem_${index}"></p>
        <hr>
        `
    let li = document.createElement("li")
    li.classList.add("exp")
    li.innerHTML = expHTML
    // Add the new li to the list of experieces
    expContainer.appendChild(li)
}


