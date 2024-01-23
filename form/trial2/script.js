// document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility());
var resImage='';
var ftype='';
var fsize='';
function togglePasswordVisibility() {
    var passwordInput = document.getElementById('pwd');
    var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
}

function calculateAge() {
    var birthdateInput = document.getElementById('birthdate');

    var selectedDate = new Date(birthdateInput.value);
    var currentDate = new Date();

    var age = currentDate.getFullYear() - selectedDate.getFullYear();

    // Adjust age based on the current month and day
    if (currentDate.getMonth() < selectedDate.getMonth() || (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() < selectedDate.getDate())) {
        age--;
    }
    return age;
}

function previewImage() {
    var imageInput = document.getElementById('image');
    var previewContainer = document.querySelector('.preview-container');
    var imagePreview = document.getElementById('imagePreview');
    ftype=image.files[0].type;
    fsize=image.files[0].size;
    // Clear previous preview
    previewContainer.style.display = 'none';
    imagePreview.src = '';

    if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            resImage=imagePreview.src;
            previewContainer.style.display = 'block';
        };

        reader.readAsDataURL(imageInput.files[0]);
    }
}

// Individual validation functions for each field
function validateName() {
    let name = document.forms["register"]["name"].value;
        let nameChk=false;
        let nameRegExp=/^[a-zA-Z\s]+$/;
        
        if(nameRegExp.test(name)){
            nameChk=true;
            document.getElementById("errName").innerHTML ="";
        }else{
            document.getElementById("errName").innerHTML ="Enter a valid name without special characters";
        }
        return nameChk;
}

function validateEmail() {
    let email = document.forms["register"]["email"].value;
        let emailChk=false;
        let emailRegExp=/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

        
        if(emailRegExp.test(email)){
            emailChk=true;
            document.getElementById("errEmail").innerHTML ="";
        }else{
            document.getElementById("errEmail").innerHTML ="Enter a valid email";
        }
    return emailChk;
}

function validatePhone(){
        let phone = document.forms["register"]["phone"].value;
        let phoneChk=false;
        let phoneRegExp=/^[6-9]\d{9}$/;
        
        if(phoneRegExp.test(phone)){
            phoneChk=true;
            document.getElementById("errPhone").innerHTML ="";
        }else{
            document.getElementById("errPhone").innerHTML ="Enter a valid Phone";
        }
        return phoneChk;
}

function validateBirthdate(){
        var birthdateInput = document.getElementById('birthdate');
        var selectedDate = new Date(birthdateInput.value);
        let selectedYear=selectedDate.getFullYear();
        let dobChk=false;
        var birthdateValue = birthdateInput.value;
        if(birthdateValue===""){
            document.getElementById("errDob").innerHTML ="Choose your birthdate";
        }else{
            if(selectedYear > 2010){
                document.getElementById("errDob").innerHTML="Date of birthdate should be between 1950-2010"
            }
            else{
                dobChk=true;
                document.getElementById("errDob").innerHTML ="";
            }
        }
        return dobChk;
}

function validateGender(){
        let gender=document.getElementById("gender").value;
        let genderChk=false;

        if(gender===""){
            document.getElementById("errGender").innerHTML ="Choose your gender";
        }else{ 
            genderChk=true;
            document.getElementById("errGender").innerHTML ="";
        }
        return genderChk;
}

function validateEducation(){
        let edu=document.getElementById("edu").value;
        let eduChk=false;

        if(edu===""){
            document.getElementById("errEdu").innerHTML ="Choose your educational qualification";
        }else{
            eduChk=true;
            document.getElementById("errEdu").innerHTML ="";
        }

        return eduChk;
}


function validateUsername(){
    let username = document.getElementById("username").value;
        let usernameChk = false;
        if(username===""){
            document.getElementById("errUsername").innerHTML="Provide a username";
        }else{
            if (!isUsernameUnique(username)) {
                document.getElementById("errUsername").innerHTML = "Username already exists. Please choose a different username.";
            } else {
                usernameChk = true;
                document.getElementById("errUsername").innerHTML = "";
            }
        }
        return usernameChk;
}

function validatePan(){
        let pan = document.forms["register"]["pan"].value;
        let panChk=false;
        let panRegExp=/^[A-Z]{5}\d{4}[A-Z]$/;
        
        if(panRegExp.test(pan)){
            panChk=true;
            document.getElementById("errPan").innerHTML ="";
        }else{
            document.getElementById("errPan").innerHTML ="Enter a valid PAN Number";
        }
        return panChk;
}

function validatePassword(){
        let pwd = document.forms["register"]["pwd"].value;
        let pwdChk=false;
        let pwdRegExp=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|;:'",.<>?/~`-])(?=.*\d).{8,15}$/;
        if(pwdRegExp.test(pwd)){
            pwdChk=true;
            document.getElementById("errPwd").innerHTML ="";
        }else{
            document.getElementById("errPwd").innerHTML ="Password should contain 8-15 chars,one uppercase, one lowercase,one numeric char and one special char ";
        }
        return pwdChk;
}

function validateImage(){
        let imageInput=document.getElementById('image');
        let image=document.getElementById('image').files;
        let imageChk=false;

        
    
        if(image.length===0){
            document.getElementById("errImg").innerHTML ="Choose your profile picture";
        }else if (imageInput.files[0].size > 2 * 1024 * 1024) {
                document.getElementById("errImg").innerHTML ="Image size must be less than 2MB.";
        }else{
            imageChk=true;
            document.getElementById("errImg").innerHTML ="";
        }
        return imageChk;
}


function validateForm() {
    let nameChk=validateName();
    let emailChk=validateEmail();
    let phoneChk=validatePhone();
    let dobChk=validateBirthdate();
    let genderChk=validateGender();
    let eduChk=validateEducation();
    let usernameChk=validateUsername();
    let panChk=validatePan();
    let pwdChk=validatePassword();
    let imageChk=validateImage();

    let finalChk = false;
    if(nameChk && phoneChk && emailChk && dobChk && imageChk && panChk && pwdChk && genderChk && eduChk && usernameChk ){
        finalChk=true;
        submitForm();
    }
    return finalChk;
}

function submitForm() {
    var formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        birthdate: document.getElementById('birthdate').value,
        age: calculateAge(),
        gender: document.getElementById('gender').value,
        occupation: document.getElementById('occ').value,
        education: document.getElementById('edu').value,
        username: document.getElementById('username').value,
        password: document.getElementById('pwd').value,
        pan: document.getElementById('pan').value,
        // image: document.getElementById('image').files[0] ? document.getElementById('image').files[0].name : '',
        image: resImage,
        imgProp:{ftype,fsize}
    };

    // Store the form data in local storage
    var submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    // Display the submitted data
    alert("Data submitted!");
}

function isUsernameUnique(username) {
    var submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    return !submissions.some(submission => submission.username === username);
}
// search

function search() {
        
    var searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (searchInput == "") {
        document.getElementById('searchError').innerHTML="Enter anything to search";
        backToForm();
        return;
    }
    else if(searchInput > 3){
        var storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
        var searchResults = storedData.filter(data => data.age < (searchInput/365));
        console.log(searchResults)
        displaySearchResults(searchResults);          
    }
    else if(searchInput.typeof='string'){
        var match = searchInput.match(/^(\d+)([mMkK]+[bB]+)$/);

        if (match) {
            var numericValue = parseFloat(match[1]);
            var unit = match[2].toLowerCase();
        
            var searchInputBytes = (unit === 'kb' ? numericValue * 1024 : numericValue * 1024 * 1024);
        
            var storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
            var searchResults = storedData.filter(data => data.imgProp.fsize < searchInputBytes);
            console.log(searchResults);
            displaySearchResults(searchResults);
        } else {
            var storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
            var searchResults = storedData.filter(data => data.name.toLowerCase().startsWith(searchInput.toLowerCase()));
            displaySearchResults(searchResults);
        }
    }
}

function displaySearchResults(results) {
    var container = document.getElementById('searchResultsContainer');
    var backForm = document.getElementById('backForm');
    let flag=1;
    container.textContent = '';

    console.log(results.length);

    for(i=0;i<=results.length;i++){
    if (results[i]) {
        container.style.display = 'block';
        backForm.style.display='none';
        var resultItem = document.createElement('div');
        resultItem.innerHTML ="<p>User Details:</p>";
        resultItem.innerHTML += `<img src="${results[i].image}" width="120" height="100">`;
        resultItem.innerHTML +=`<p><strong>Name:</strong>${results[i].name}</p>`;
        resultItem.innerHTML +=`<p><strong>Email:</strong> ${results[i].email}</p>`;
        resultItem.innerHTML +=`<p><strong>Phone:</strong> ${results[i].phone}</p>`;
        resultItem.innerHTML +=`<p><strong>DOB:</strong> ${results[i].birthdate}</p>`;
        resultItem.innerHTML +=`<p><strong>Age:</strong> ${results[i].age}</p>`;
        resultItem.innerHTML +=`<p><strong>Gender:</strong> ${results[i].gender}</p>`;
        resultItem.innerHTML +=`<p><strong>Occupation:</strong> ${results[i].occupation}</p>`;
        resultItem.innerHTML +=`<p><strong>Education:</strong> ${results[i].education}</p>`;
        resultItem.innerHTML +=`<p><strong>Username:</strong> ${results[i].username}</p><br><br>`;
        container.appendChild(resultItem);
        resultItem.classList.add('aligned-content');
        flag=0;

    }
    }
    if(flag==0){
        resultItem.innerHTML +=`<button id="back"  onclick="backToForm()">Back</button>`;
    }
    else{
        container.style.display = 'none';
        document.getElementById('searchError').innerHTML = 'No matching records found.';
    }
}

function backToForm(){
    var backForm = document.getElementById('backForm');
    var container = document.getElementById('searchResultsContainer');
    container.style.display = 'none';
    backForm.style.display='block';

}