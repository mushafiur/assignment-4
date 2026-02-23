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
const mainContainer = document.querySelector('main');

function toggleTab(tabName) {
    currentTab = tabName;

    btnAll.classList.remove('btn-primary');
    btnInterview.classList.remove('btn-primary');
    btnRejected.classList.remove('btn-primary');

    if(tabName === 'all') {
        btnAll.classList.add('btn-primary');
        cardSection.classList.remove('hidden');
        noJobCard.classList.add('hidden');
        noJobCard.classList.remove('flex');
    } else if(tabName === 'interview') {
        btnInterview.classList.add('btn-primary');
        cardSection.classList.add('hidden');
        noJobCard.classList.remove('hidden');
        noJobCard.classList.add('flex');
    } else if(tabName === 'rejected') {
        btnRejected.classList.add('btn-primary');
        cardSection.classList.add('hidden');
        noJobCard.classList.remove('hidden');
        noJobCard.classList.add('flex');
    }
}

function updateCount() {
    totalCount.innerText = cardSection.children.length;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if(cardSection.children.length === 0) {
        noJobCard.classList.remove('hidden');
        noJobCard.classList.add('flex');
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
        
        const cardInfo = { companyName, position }

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
        
        const cardInfo = { companyName, position }

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
    } else if(event.target.classList.contains('btn-delete')) {
    const parentCard = event.target.parentNode.parentNode;
    const companyName = parentCard.querySelector('.company-name').innerText;

    parentCard.remove();

    interviewList = interviewList.filter(item => item.companyName !== companyName);
    rejectedList = rejectedList.filter(item => item.companyName !== companyName);

    updateCount();
}

});