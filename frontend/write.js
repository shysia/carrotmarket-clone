const form = document.getElementById('w-form');

const handleSubmitForm = async (e) => {
    e.preventDefault();
    const body = new FormData(form);
    body.append('insertAt',new Date().getTime());
    try {
        const res = await fetch('/items', {
            method: 'POST',
            body
        });
        const data = await res.json();
        if(data==='200') window.location.pathname="/";
    } catch (error) {
        console.error(error);
    }
}


form.addEventListener('submit', handleSubmitForm);