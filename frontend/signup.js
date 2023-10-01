const form = document.querySelector('#signup-form');

const checkPw =()=>{
    const formData = new FormData(form);
    const pw01 = formData.get('pw');
    const pw02 = formData.get('pw2');

    if(pw01===pw02) {
        return true;
    } else return false;
}


const handleSubmitForm = async(e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const sha256pw = sha256(formData.get('pw'));
    formData.set('pw', sha256pw);

    const div = document.querySelector('#info');

    if(checkPw()){
        const res = await fetch('/signup', {
            method:'post',
            body: formData
        });

        const data = await res.json();
        if(data==='200'){
            alert('회원가입에 성공했습니다.')
            window.location.pathname = "/login.html"
        }
    } else{
        div.innerText = '비밀번호가 같지 않습니다.';
        div.style.color = 'red';
    }
}

form.addEventListener('submit', handleSubmitForm);