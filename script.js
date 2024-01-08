// Потрібно розробити форму для реєстрації, логінування а також блок профайлу.
// Всі дані проходять через localStorage. Основні пункти що має працювати:
// При реєстрації дані попадають в localStorage. Перед добавленням нового користувача провіряємо чи нема у нас вже користувача з такою поштою, якщо є то не добавляти його. Всі дані мають валідуватися регулярними виразами.
// При логінуванні перевіряти чи всі поля заповнені і чи правильний логін та пароль, якщо щось не так виводити відповідне повідомлення. Всі дані беруться з localStorage.
// Якщо правильний логін та пароль то перейти на блок профайлу.
// При натисканні на Sign Out переходимо назад на блок Sign In.

// +Ім’я та прізвище: може бути слово англійською з великої або маленької букви і не більше 20. Цифр і інші символи не допускаються.
// Емейл: обов'язково @. Усі букви повинні бути англійською. Загальні вимоги наступні(будь-яка кількість букв, цифр, тире і крапок@будьяка кількість букв.( net.ua, org.ua, gmail.com. і т.д.)).
// +Пароль: Від 8 до 15 символів можуть бути букви та цифри.

let getID = id => document.getElementById(id);

let testNameRegExp = /^[a-zA-Z]{1,20}$/;
let testEmailRegExp = /^[\w.-]+@[\w.]+$/;
let testPasswordRegExp = /^\w{8,15}$/;
let testFirstName;
let testLastName;
let testEmail;
let testPassword;
let users = [];
let checkEmail = true;
let checkDataEnter;


// Function Help
getID('form').onmouseover = function HelpName() {
    getID('helpWindow').classList.remove('hide');
}
getID('form').onmouseout = function () {
    getID('helpWindow').classList.add('hide');
}

// FUNCTION CHECK FIRST NAME
getID('firstName').oninput = function () {
    let testFirstName = testNameRegExp.test(getID('firstName').value);
    if (testFirstName) {
        getID('firstName').style.color = 'green';
    }
    else {
        getID('firstName').style.color = 'red';
    }
}
// FUNCTION CHECK LAST NAME
getID('lastName').oninput = function () {
    let testLastName = testNameRegExp.test(getID('lastName').value);
    if (testLastName) {
        getID('lastName').style.color = 'green';
    }
    else {
        getID('lastName').style.color = 'red';
    }
}
// FUNCTION CHECK EMAIL
getID('email').oninput = function () {
    let testEmail = testEmailRegExp.test(getID('email').value);
    if (testEmail) {
        getID('email').style.color = 'green';
    }
    else {
        getID('email').style.color = 'red';
    }
}
// FUNCTION CHECK PASSWORD
getID('pass').oninput = function () {
    let testPassword = testPasswordRegExp.test(getID('pass').value);
    if (testPassword) {
        getID('pass').style.color = 'green';

    }
    else {
        getID('pass').style.color = 'red';
        // getID('signUp').style.backgroundColor = 'aqua';
        // getID('signUp').disabled = true;
        // getID('agree').checked = false;
    }
}

// Function Sign In Now
getID('SignInNow').onclick = function () {
    getID('signUpWindow').classList.add('hide');
    getID('signInWindow').classList.remove('hide');
    getID('incorectEmail').classList.add('hide');
}

// Function Sign Up Now
getID('SignUpNow').onclick = function () {
    getID('signInWindow').classList.add('hide');
    getID('signUpWindow').classList.remove('hide');
    getID('empty').classList.add('hide');
    getID('wrongData').classList.add('hide');
}

// FUNCTION BUTTON 'SIGN UP'
getID('signUp').onclick = function () {
    if (getID('firstName').style.color == 'green' && getID('lastName').style.color == 'green' && getID('email').style.color == 'green' && getID('pass').style.color == 'green') {
        if (localStorage.length > 0 && localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'));
            for (let i = 0; i < users.length; i++) {
                if (users[i].email === getID('email').value) {
                    getID('incorectEmail').classList.remove('hide')
                    checkEmail = false;
                    break;
                }
                else {
                    checkEmail = true;
                    getID('incorectEmail').classList.add('hide');
                }
            }
        }
        if (checkEmail) {
            let user = {
                fiNa: getID('firstName').value,
                laNa: getID('lastName').value,
                email: getID('email').value,
                pas: getID('pass').value
            }
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            location.reload();

        }
    }
}

// FUNCTION BUTTON 'SIGN IN'
getID('signIn').onclick = function () {
    if (localStorage.length > 0) {
        getID('empty').classList.add('hide');
        getID('wrongData').classList.add('hide');
        users = JSON.parse(localStorage.getItem('users'));

        for (let i = 0; i < users.length; i++) {
            if (users[i].email === getID('loginEmail').value && users[i].pas === getID('loginPass').value) {
                checkDataEnter = true;
                getID('name').textContent = users[i].fiNa + ' ' + users[i].laNa;
                getID('emailUser').textContent = users[i].email;
                break;
            }
            else {
                getID('wrongData').classList.remove('hide');
                checkDataEnter = false;
            }
        }
        if (checkDataEnter) {
            getID('wrongData').classList.add('hide');
            getID('signInWindow').classList.add('hide');
            getID('modalWindow').classList.remove('hide');
        }
    }
    else {
        getID('empty').classList.remove('hide');
    }
}
// FUNCTION SIGN UP ON MODAL WINDOW USER
getID('sign').onclick = function () {
    location.reload();
}