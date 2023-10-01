{/* <div class="main-list">
            <div class="main-list1">
                <img src="./icons/img.svg" alt="">
            </div>
            <div class="main-list2">
                <div class="main-list2-title">
                    게이밍피씨 조립 pc 컴퓨터 싸게 팝니다 급처분입니다
                </div>
                <div class="main-list2-meta">
                    역삼동 · 19초 전
                </div>
                <div class="main-list2-price">
                    100만원
                </div>
            </div>
        </div> */}

const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9*60*60*1000;
    const time = new Date(curTime - timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    if(hour>0) return `${hour}시간 전`;
    else if(minute>0) return `${minute}분 전`;
    else if(second>0) return `${second}초 전`;
    else return "방금 전";
}

const renderData = (data)=>{
    const main = document.querySelector('main');
    data.reverse().forEach(async(obj)=>{
        const Div = document.createElement('div');
        Div.className = 'main-list';

        const imgDIv = document.createElement('div');
        imgDIv.className = 'main-list1';

        const img = document.createElement('img');
        const res = await fetch(`/images/${obj.id}`)
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        img.src = url;

        const InfoDiv = document.createElement('div');
        InfoDiv.className = 'main-list2';

        const TitleDiv = document.createElement('div');
        TitleDiv.className = 'main-list2-title';
        TitleDiv.innerText = obj.title;

        const MetaDiv = document.createElement('div');
        MetaDiv.className = 'main-list2-meta';
        MetaDiv.innerText = obj.place + '' + calcTime(obj.insertAt);

        const PriceDiv = document.createElement('div');
        PriceDiv.className = 'main-list2-price';
        PriceDiv.innerText = obj.price;
        
        imgDIv.appendChild(img);
        TitleDiv.appendChild(TitleDiv);
        MetaDiv.appendChild(MetaDiv);
        PriceDiv.appendChild(PriceDiv);
        Div.appendChild(imgDIv);
        InfoDiv.appendChild(InfoDiv);

        main.appendChild(Div);
    });
}


const fetchList = async () => {
    const accessToken = window.localStorage.getItem('token');
    const res = await fetch('/items', {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    });

    if(res.status===401){
        alert('로그인이 필요합니다');
        window.location.pathname="login.html";
        return;
    }
    const data = await res.json();
    renderData(data);
}

fetchList();