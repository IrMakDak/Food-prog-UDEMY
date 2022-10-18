function calc() {
    //CREATE CALCULATOR

    const result = document.querySelector('.calculating__result span');

    function dataFromLocalStorage(arg, val) {
        if (localStorage.getItem(arg)) {
            return localStorage.getItem(arg);
        } else {
            localStorage.setItem(arg, val);
            return val;
        }
    }

    let sex, height, weight, age, ratio;
    sex = dataFromLocalStorage('sex', 'female');
    ratio = +dataFromLocalStorage('ratio', 1.375);

    function shineFirstly(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        elements.forEach(div => {
            div.classList.remove(activeClass);
            if ((div.getAttribute('id') === sex) || (+div.getAttribute('data-ratio') === ratio)) {
                div.classList.add(activeClass);
            }
        });

    }
    shineFirstly('#gender', 'calculating__choose-item_active');
    shineFirstly('.calculating__choose_big', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio); 
        } else {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        }
    }
    calcTotal();

    function getStaticInfo(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                
                elements.forEach(e => {
                    e.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }
    getStaticInfo('#gender', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big', 'calculating__choose-item_active');

    function getDinamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
            }
            calcTotal();
        });
    }
    getDinamicInfo('#height');
    getDinamicInfo('#age');
    getDinamicInfo('#weight');
}
export default calc;