function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        console.log(modalTimerId);
        clearInterval(modalTimerId);
    }
}

function closeModal (modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector ,modalSelector, modalTimerId) {
    //MODAL

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);


    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (event, modalTimerId) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e, modalTimerId) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll (modalTimerId) {
        if ((window.pageYOffset + document.documentElement.clientHeight) >= document.documentElement.scrollHeight - 1) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);    
        }
    }
    window.addEventListener('scroll', showModalByScroll);

}
export default modal;
export {closeModal};
export {showModal};