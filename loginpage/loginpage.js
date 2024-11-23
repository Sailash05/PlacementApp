let container = document.querySelector('.container');


function change(choice) {

    switch(choice) {
        case 1:
            container.innerHTML = `
            <h1>Student Log in</h1>
            <form action="/student/addstudent" method="POST" class="studentLogInForm studentSignInForm">
                <input type="number" placeholder="Roll Number"><br>
                <input type="password" placeholder="Password">
                <br>
                <button type="button" class="submitBtn">Log in</button>
            </form>
            <p class="changeToLoginS">New User? <span onClick="change(2)">Sign in</span></p>
            `;
            break;
        
        case 2:
            container.innerHTML = `
            <h1>Student Sign in</h1>
            <form action="/student/addstudent" method="POST" class="studentSignInForm">
                <input type="text" placeholder="User Name"><br>
                <input type="number" placeholder="Roll Number"><br>
                <input type="number" placeholder="Year"><br>
                <select name="departmentSelect" id="departmentSelect">
                    <option value="" disabled selected>Select a department</option>
                    <option value="CSE">CSE</option>
                    <option value="AIDS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="GEO">GEO</option>
                </select>
                <input type="password" placeholder="Set Password">
                <br>
                <button type="button" class="submitBtn">Sign in</button>
            </form>
            <p class="changeToLoginS">Already have an account? <span onclick="change(1)">Log in</span></p>
            `;
            document.querySelector('.studentBtn').classList.add('underLine');
            document.querySelector('.facultyBtn').classList.remove('underLine');
            break;

        case 3:
            container.innerHTML = `
            <h1>Faculty Sign in</h1>
            <form action="/student/addstudent" method="POST" class="studentSignInForm">
                <input type="text" placeholder="User Name"><br>
                <input type="number" placeholder="Mobile Number"><br>
                <select name="departmentSelect" id="departmentSelect">
                    <option value="" disabled selected>Select a department</option>
                    <option value="CSE">CSE</option>
                    <option value="AIDS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    <option value="MECH">MECH</option>
                    <option value="GEO">GEO</option>
                </select>
                <input type="password" placeholder="Set Password">
                <br>
                <button type="button" class="submitBtn">Sign in</button>
            </form>
            <p class="changeToLoginS">Already have an account? <span onClick="change(4)">Log in</span></p>
            `;
            document.querySelector('.studentBtn').classList.remove('underLine');
            document.querySelector('.facultyBtn').classList.add('underLine');
            break;
            
        case 4:
            container.innerHTML = `
            <h1>Faculty Log in</h1>
            <form action="/student/addstudent" method="POST" class="studentLogInForm studentSignInForm">
                <input type="number" placeholder="Mobile Number"><br>
                <input type="password" placeholder="Password">
                <br>
                <button type="button" class="submitBtn">Log in</button>
            </form>
            <p class="changeToLoginS">New here? <span onClick="change(3)">Sign in</span></p>
            `;
            break;
    }
}