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



// Individual validation functions for each field
function validateName() {
    let name=document.getElementById('name');
    let nameChk=false;
    let nameRegExp=/^[a-zA-Z\s]+$/;
    
    if(nameRegExp.test(name.value)){
        nameChk=true;
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
        document.getElementById("errName").innerHTML ="";
    }else{
        name.classList.remove("is-valid");
        name.classList.add("is-invalid");
        document.getElementById("errName").innerHTML ="Enter a valid name without special characters";
    }
    return nameChk;
}

function validateEmail() {
        let email = document.forms["register"]["email"];
        let emailChk=false;
        let emailRegExp=/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

        
        if(emailRegExp.test(email.value)){
            emailChk=true;
            email.classList.remove("is-invalid");
            email.classList.add("is-valid");
            document.getElementById("errEmail").innerHTML ="";
        }else{
            email.classList.remove("is-valid");
            email.classList.add("is-invalid");
            document.getElementById("errEmail").innerHTML ="Enter a valid email";
        }
    return emailChk;
}

function validatePhone(){
        let phone = document.forms["register"]["phone"];
        let phoneChk=false;
        let phoneRegExp=/^[6-9]\d{9}$/;
        
        if(phoneRegExp.test(phone.value)){
            phoneChk=true;
            phone.classList.remove("is-invalid");
            phone.classList.add("is-valid");
            document.getElementById("errPhone").innerHTML ="";
        }else{
            phone.classList.remove("is-valid");
            phone.classList.add("is-invalid");
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
            birthdateInput.classList.remove("is-valid");
            birthdateInput.classList.add("is-invalid");
            document.getElementById("errDob").innerHTML ="Choose your birthdate";
        }else{
            if(selectedYear > 2010 || selectedYear<1950){
                birthdateInput.classList.remove("is-valid");
                birthdateInput.classList.add("is-invalid");
                document.getElementById("errDob").innerHTML="Date of birthdate should be between 1950-2010"
            }
            else{
                dobChk=true;
                birthdateInput.classList.remove("is-invalid");
                birthdateInput.classList.add("is-valid");
                document.getElementById("errDob").innerHTML ="";
            }
        }
        return dobChk;
}

function validateGender(){
        let gender=document.getElementById("gender");
        let genderChk=false;

        if(gender.value===""){
            gender.classList.remove("is-valid");
            gender.classList.add("is-invalid");
            document.getElementById("errGender").innerHTML ="Choose your gender";
        }else{ 
            genderChk=true;
            gender.classList.remove("is-invalid");
            gender.classList.add("is-valid");
            document.getElementById("errGender").innerHTML ="";
        }
        return genderChk;
}

function validateEducation(){
        let edu=document.getElementById("edu");
        let eduChk=false;

        if(edu.value===""){
            edu.classList.remove("is-valid");
            edu.classList.add("is-invalid");
            document.getElementById("errEdu").innerHTML ="Choose your educational qualification";
        }else{
            eduChk=true;
            edu.classList.remove("is-invalid");
            edu.classList.add("is-valid");
            document.getElementById("errEdu").innerHTML ="";
        }

        return eduChk;
}


function validateUsername(){
    let username = document.getElementById("username").value;
    let usernameInp=document.getElementById("username");
        let usernameChk = false;
        if(username===""){
            usernameInp.classList.remove("is-valid");
            usernameInp.classList.add("is-invalid");
            document.getElementById("errUsername").innerHTML="Provide a username";
        }else{
            if (!isUsernameUnique(username)) {
                usernameInp.classList.remove("is-valid");
                usernameInp.classList.add("is-invalid");
                document.getElementById("errUsername").innerHTML = "Username already exists. Please choose a different username.";
            } else {
                usernameChk = true;
                usernameInp.classList.remove("is-invalid");
                usernameInp.classList.add("is-valid");
                document.getElementById("errUsername").innerHTML = "";
            }
        }
        return usernameChk;
}

function validatePan(){
        let pan = document.forms["register"]["pan"];
        let panChk=false;
        let panRegExp=/^[A-Z]{5}\d{4}[A-Z]$/;
        
        if(panRegExp.test(pan.value)){
            panChk=true;
            pan.classList.remove("is-invalid");
            pan.classList.add("is-valid");
            document.getElementById("errPan").innerHTML ="";
        }else{
            pan.classList.remove("is-valid");
            pan.classList.add("is-invalid");
            document.getElementById("errPan").innerHTML ="Enter a valid PAN Number";
        }
        return panChk;
}

function validatePassword(){
        let pwd = document.forms["register"]["pwd"];
        let pwdChk=false;
        let pwdRegExp=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|;:'",.<>?/~`-])(?=.*\d).{8,15}$/;
        if(pwdRegExp.test(pwd.value)){
            pwdChk=true;
            pwd.classList.remove("is-invalid");
            pwd.classList.add("is-valid");
            document.getElementById("errPwd").innerHTML ="";
        }else{
            pwd.classList.remove("is-valid");
            pwd.classList.add("is-invalid");
            document.getElementById("errPwd").innerHTML ="Password should contain 8-15 chars,one uppercase, one lowercase,one numeric char and one special char ";
        }
        return pwdChk;
}

function validateImage() {
    let imageChk = false;
    let imageInput = document.getElementById('imageInput');
    let image = document.getElementById('imageInput').files;
    imageChk = false;
    
    if (image.length === 0) {
        handleInvalidInput("Choose your profile picture");
    } else if (image[0].size > 2 * 1024 * 1024) {//[0]=gives file not fileList
        handleInvalidInput("Image size must be less than 2MB.");
    } else {
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedImageTypes.includes(image[0].type)) {
            imageChk = true;
            imageInput.classList.remove("is-invalid");
            imageInput.classList.add("is-valid");
            document.getElementById("errImage").innerHTML = "";

            var reader = new FileReader();
            reader.onload = function (e) {
                resImage = e.target.result;
            };
            reader.readAsDataURL(image[0]);
        } else {
            handleInvalidInput("Invalid image type. Please choose a valid image file.");
        }
    }

    function handleInvalidInput(errorMessage) {
        imageInput.classList.remove("is-valid");
        imageInput.classList.add("is-invalid");
        document.getElementById("errImage").innerHTML = errorMessage;
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
    ftype=document.getElementById('imageInput').files[0].type;
    fsize=document.getElementById('imageInput').files[0].size;
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

function search() {
        
    var searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (searchInput == "") {
        document.getElementById('searchError').innerHTML="Enter anything to search";
        backToForm();
        return;
    }else{
        var ageRegex=searchInput.match(/^(\d+)$/);
        var sizeRegex=searchInput.match(/^(\d+)([mMkK]{1}[bB]{1})$/);
        var nameRegex=searchInput.match(/^[a-zA-Z\s]+$/);
        if(ageRegex){
            var storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
            var searchResults = storedData.filter(data => data.age < (searchInput/365));
            displaySearchResults(searchResults);          
        }else if(sizeRegex){
                var numericValue = parseFloat(sizeRegex[1]);
                var unit = sizeRegex[2].toLowerCase();
                var searchInputBytes = (unit === 'kb' ? numericValue * 1024 : numericValue * 1024 * 1024);
            
                var storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
                var searchResults = storedData.filter(data => data.imgProp.fsize < searchInputBytes);
                displaySearchResults(searchResults);
        }else if(nameRegex){
            var storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
            var searchResults = storedData.filter(data => data.name.toLowerCase().startsWith(searchInput.toLowerCase()));
            displaySearchResults(searchResults);
        }
    }
}

function displaySearchResults(results) {
    var container = document.getElementById('searchResultsContainer');
    var backForm = document.getElementById('backForm');
    let flag=1;//for back button
    container.textContent = '';

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