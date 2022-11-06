

const postCards = document.querySelectorAll('.post-cards');
let id = 1;

const addListener = () => {
    for(let i = 0; i < postCards.length; i++) {
        postCards[i].dataset.id = id;
        id++;
        postCards[i].addEventListener('click', renderCommentPage);
    }
    return postCards;
};


const renderCommentPage = async (e) => {
    e.preventDefault();
    // console.log(e.currentTarget.dataset.id)
    window.location.replace(`/post/${e.currentTarget.dataset.id}`);
};


addListener();
