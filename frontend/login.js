const form = document.querySelector('#login-form');


const handleSubmitForm = async(e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const sha256pw = sha256(formData.get('pw'));
    formData.set('pw', sha256pw);

        const res = await fetch('/login', {
            method:'post',
            body: formData
        });

        const data = await res.json();
        const accessToken = data.access_token;
        window.localStorage.setItem('token',accessToken);
        alert('로그인 되었습니다');

        window.location.pathname="/";




        // const btn = document.createElement('button');
        // btn.innerText='상품 가져오기';
        // btn.addEventListener('click',async()=>{
        //     const res = await fetch('/items', {
        //         headers:{
        //             'Authorization': `Bearer ${accessToken}`
        //         }
        //     });
        //     const data = await res.json();
        //     console.log(data);
        // });
        // infoDiv.appendChild(btn);


        // if (res.status === 200) {
        // alert('로그인 성공');
        // window.location.pathname="/";
        // } else if(res.status===401){
        //     alert('아이디 혹은 패스워드가 틀렸습니다');
        // }
    }

form.addEventListener('submit', handleSubmitForm);