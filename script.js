let interviewList = [];
let rejectedList = [];
let currentTab = 'all';

const totalCount = document.getElementById('total-count');
const interviewCount = document.getElementById('interview-count');
const rejectedCount = document.getElementById('rejected-count');

const btnAll = document.getElementById('btn-all');
const btnInterview = document.getElementById('btn-interview');
const btnRejected = document.getElementById('btn-rejected');

const cardSection = document.getElementById('card-section');
const noJobCard = document.getElementById('no-job-card');
const filteredSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');

function toggleTab(tabName) {
    currentTab = tabName;

    btnAll.classList.remove('btn-primary');
    btnInterview.classList.remove('btn-primary');
    btnRejected.classList.remove('btn-primary');

    if(tabName === 'all') {
        btnAll.classList.add('btn-primary');
        cardSection.classList.remove('hidden');
        filteredSection.classList.add('hidden');
        filteredSection.classList.remove('flex');
        noJobCard.classList.add('hidden');
        noJobCard.classList.remove('flex');
    } else if(tabName === 'interview') {
        btnInterview.classList.add('btn-primary');
        cardSection.classList.add('hidden');
        noJobCard.classList.add('hidden');
        noJobCard.classList.remove('flex');
        renderInterview();
    } else if(tabName === 'rejected') {
        btnRejected.classList.add('btn-primary');
        cardSection.classList.add('hidden');
        noJobCard.classList.add('hidden');
        noJobCard.classList.remove('flex');
        renderRejected();
    }
}

function updateCount() {
    totalCount.innerText = cardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    document.getElementById('jobs-count').innerText = cardSection.children.length;

    if(cardSection.children.length === 0) {
        noJobCard.classList.remove('hidden');
        noJobCard.classList.add('flex');
    }
}

function renderInterview() {
    filteredSection.innerHTML = '';

    if(interviewList.length === 0) {
        filteredSection.classList.add('hidden');
        filteredSection.classList.remove('flex');
        noJobCard.classList.remove('hidden');
        noJobCard.classList.add('flex');
        return;
    }

    filteredSection.classList.remove('hidden');
    filteredSection.classList.add('flex');
    noJobCard.classList.add('hidden');
    noJobCard.classList.remove('flex');

    for(let job of interviewList) {
        let div = document.createElement('div');
        div.className = 'job-card bg-white p-8 border border-gray-50 rounded-2xl flex flex-row justify-between';
        div.innerHTML = `
            <div class="flex flex-col gap-3.5">
                <h2 class="company-name">${job.companyName}</h2>
                <p class="position">${job.position}</p>
                <h2 class="status-badge w-[15%] text-center bg-green-400 text-white font-bold text-[16px]">Interview</h2>
                <p class="description">${job.description}</p>
                <div>
                    <button class="interview-btn btn btn-success btn-outline">Interview</button>
                    <button class="rejected-btn btn btn-secondary btn-outline">Rejected</button>
                </div>
            </div>
            <div>
                <button class="btn-delete btn btn-circle"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
        filteredSection.appendChild(div);
    }
}

function renderRejected() {
    filteredSection.innerHTML = '';

    if(rejectedList.length === 0) {
        filteredSection.classList.add('hidden');
        filteredSection.classList.remove('flex');
        noJobCard.classList.remove('hidden');
        noJobCard.classList.add('flex');
        return;
    }

    filteredSection.classList.remove('hidden');
    filteredSection.classList.add('flex');
    noJobCard.classList.add('hidden');
    noJobCard.classList.remove('flex');

    for(let job of rejectedList) {
        let div = document.createElement('div');
        div.className = 'job-card bg-white p-8 border border-gray-50 rounded-2xl flex flex-row justify-between';
        div.innerHTML = `
            <div class="flex flex-col gap-3.5">
                <h2 class="company-name">${job.companyName}</h2>
                <p class="position">${job.position}</p>
                <h2 class="status-badge w-[15%] text-center bg-red-400 text-white font-bold text-[16px]">Rejected</h2>
                <p class="description">${job.description}</p>
                <div>
                    <button class="interview-btn btn btn-success btn-outline">Interview</button>
                    <button class="rejected-btn btn btn-secondary btn-outline">Rejected</button>
                </div>
            </div>
            <div>
                <button class="btn-delete btn btn-circle"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
        filteredSection.appendChild(div);
    }
}

updateCount();

btnAll.addEventListener('click', function() { toggleTab('all'); });
btnInterview.addEventListener('click', function() { toggleTab('interview'); });
btnRejected.addEventListener('click', function() { toggleTab('rejected'); });

mainContainer.addEventListener('click', function(event) {

    if(event.target.classList.contains('interview-btn')) {
        const parentCard = event.target.parentNode.parentNode.parentNode;
        const companyName = parentCard.querySelector('.company-name').innerText;
        const position = parentCard.querySelector('.position').innerText;
        const description = parentCard.querySelector('.description').innerText;

        const cardInfo = { companyName, position, description }

        const alreadyExist = interviewList.find(item => item.companyName === cardInfo.companyName);
        if(!alreadyExist) {
            interviewList.push(cardInfo);
        }
        rejectedList = rejectedList.filter(item => item.companyName !== companyName);

        const statusBadge = parentCard.querySelector('.status-badge');
        statusBadge.innerText = 'Interview';
        statusBadge.classList.remove('bg-blue-400');
        statusBadge.classList.add('bg-green-400');

        updateCount();

    } else if(event.target.classList.contains('rejected-btn')) {
        const parentCard = event.target.parentNode.parentNode.parentNode;
        const companyName = parentCard.querySelector('.company-name').innerText;
        const position = parentCard.querySelector('.position').innerText;
        const description = parentCard.querySelector('.description').innerText;

        const cardInfo = { companyName, position, description }

        const alreadyExist = rejectedList.find(item => item.companyName === cardInfo.companyName);
        if(!alreadyExist) {
            rejectedList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.companyName !== companyName);

        const statusBadge = parentCard.querySelector('.status-badge');
        statusBadge.innerText = 'Rejected';
        statusBadge.classList.remove('bg-blue-400');
        statusBadge.classList.add('bg-red-400');

        updateCount();

    } else if(event.target.classList.contains('btn-delete') || event.target.closest('.btn-delete')) {
    const parentCard = event.target.closest('.btn-delete').parentNode.parentNode;
    const companyName = parentCard.querySelector('.company-name').innerText;

    parentCard.remove();

    interviewList = interviewList.filter(item => item.companyName !== companyName);
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    updateCount();
    }

});