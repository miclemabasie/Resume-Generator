
// Get the parent element
var parentElement = document.querySelector('.exps');

// Get the button element
var addButton = document.getElementById('add-exp');
addButton.addEventListener('click', duplicateForm);

function duplicateForm() {
    // Create a clone of the form
    var clonedForm = document.querySelector('.expForm').cloneNode(true);

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

    // Show the cloned form with a slow animation
    fadeIn(clonedForm);

    // Add click event listener to the minus button
    minusButton.addEventListener('click', function (e) {
        e.preventDefault()
        fadeOut(clonedForm, function () {
            // Remove the cloned form from the DOM after fading out
            clonedForm.parentNode.removeChild(clonedForm);
        });
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
            if (callback) {
                callback();
            }
        }
        element.style.opacity = opacity;
        opacity -= 0.1;
    }, 50);
}