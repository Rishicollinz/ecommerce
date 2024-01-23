document.getElementById('togglePassword').addEventListener('click', function() {
    var passwordInput = document.getElementById('pwd');
    var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    });

    
    //image getting process
    function previewImage() {
        var imageInput = document.getElementById('image');
        var previewContainer = document.querySelector('.preview-container');
        var imagePreview = document.getElementById('imagePreview');

        // Clear previous preview
        previewContainer.style.display = 'none';
        imagePreview.src = '';

        if (imageInput.files && imageInput.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            previewContainer.style.display = 'block';
        };

        reader.readAsDataURL(imageInput.files[0]);
        }
    }


        function calculateAge() {
            var birthdateInput = document.getElementById('birthdate');
            var resultElement = document.getElementById('result');

            var selectedDate = new Date(birthdateInput.value);
            var currentDate = new Date();

            var age = currentDate.getFullYear() - selectedDate.getFullYear();

            // Adjust age based on the current month and day
            if (currentDate.getMonth() < selectedDate.getMonth() || (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() < selectedDate.getDate())) {
                age--;
            }
            return age;
        }

    
    //validation
    function validateForm() {
        let finalChk=false;

        //name validation

          let name = document.forms["register"]["name"].value;
        let nameChk=false;
        let nameRegExp=/^[a-zA-Z\s]+$/;
        
        if(nameRegExp.test(name)){
            nameChk=true;
            document.getElementById("errName").innerHTML ="";
        }else{
            document.getElementById("errName").innerHTML ="Enter a valid name without special characters";
        }

        //email validation
        let email = document.forms["register"]["email"].value;
        let emailChk=false;
        let emailRegExp=/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

        
        if(emailRegExp.test(email)){
            emailChk=true;
            document.getElementById("errEmail").innerHTML ="";
        }else{
            document.getElementById("errEmail").innerHTML ="Enter a valid email";
        }

        //phone validation
        let phone = document.forms["register"]["phone"].value;
        let phoneChk=false;
        let phoneRegExp=/^[6-9]\d{9}$/;
        
        if(phoneRegExp.test(phone)){
            phoneChk=true;
            document.getElementById("errPhone").innerHTML ="";
        }else{
            document.getElementById("errPhone").innerHTML ="Enter a valid Phone";
        }

        //dob validation
        var birthdateInput = document.getElementById('birthdate');
        let dobChk=false;
        var birthdateValue = birthdateInput.value;
        if(birthdateValue===""){
            document.getElementById("errDob").innerHTML ="Choose your birthdate";
        }else{
            dobChk=true;
            document.getElementById("errDob").innerHTML ="";
        }

        //gender validation
        let gender=document.getElementById("gender").value;
        let genderChk=false;

        if(gender===""){
            document.getElementById("errGender").innerHTML ="Choose your gender";
        }else{ 
            genderChk=true;
            document.getElementById("errGender").innerHTML ="";
        }

        //education validation
        let edu=document.getElementById("edu").value;
        let eduChk=false;

        if(edu===""){
            document.getElementById("errEdu").innerHTML ="Choose your educational qualification";
        }else{
            eduChk=true;
            document.getElementById("errEdu").innerHTML ="";
        }

        //username validation-unique condition
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

        
        


        //pan validation
        let pan = document.forms["register"]["pan"].value;
        let panChk=false;
        let panRegExp=/^[A-Z]{5}\d{4}[A-Z]$/;
        
        if(panRegExp.test(pan)){
            panChk=true;
            document.getElementById("errPan").innerHTML ="";
        }else{
            document.getElementById("errPan").innerHTML ="Enter a valid PAN Number";
        }

        //password validation
        let pwd = document.forms["register"]["pwd"].value;
        let pwdChk=false;
        let pwdRegExp=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|;:'",.<>?/~`-])(?=.*\d).{8,15}$/;
        //let pwdRegExp=/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|;:'",.<>?/~`-]).{8,15}$/;

        
        if(pwdRegExp.test(pwd)){
            pwdChk=true;
            document.getElementById("errPwd").innerHTML ="";
        }else{
            document.getElementById("errPwd").innerHTML ="Password should contain 8-15 chars,one uppercase, one lowercase,one numeric char and one special char ";
        }

        //image validation
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
            age:calculateAge(),
            gender:document.getElementById('gender').value,
            occupation:document.getElementById('occ').value,
            education:document.getElementById('edu').value,
            username:document.getElementById('username').value,
            password:document.getElementById('pwd').value,
            pan:document.getElementById('pan').value,
            image: document.getElementById('image').files[0] ? document.getElementById('image').files[0].name : '',
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