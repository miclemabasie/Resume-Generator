
// Get the parent element
var parentElement = document.querySelector('.exps');

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
    CV["Experience"] = []
    compileExtraCVData(expFormList, CV)




    // Add click event listener to the minus button
    minusButton.addEventListener('click', function (e) {
        e.preventDefault()
        fadeOut(clonedForm, function () {
            // Remove the cloned form from the DOM after fading out
            clonedForm.parentNode.removeChild(clonedForm);
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
        })
    });
    console.log(CV)
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

    formNodeList.forEach(form => {
        var exp = {
            title: form.title.value,
            company: form.company.value,
            start: form.start.value,
            end: form.end.value,
            description: form.description.value
        }
        console.log(globalCV)
        // CV["Experience"] = []
        CV["Experience"].push(exp)
    });
}

// Handle updating CV Data from all forms
// function UpdateDataForDuplicateForms(formNodeList, cvSection) {
// loop through the form and add even listeners

// }