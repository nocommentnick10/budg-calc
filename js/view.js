const ViewController = (function(){
    
    const domStrings = {
        form: '#budget-form',
        inputType: '#input__type',
        inputDesc: '#input__description',
        inputVal: '#input__value',
        incomeContainer: '#income__list',
        expenceContainer: '#expenses__list',
        budgetLabel: '#budget-value',
        incomeLabel: '#income-label',
        expLabel: '#exp-label',
        expPercLabel: '#exp-perc-label',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year'
    }

    function getDomStrings(){
        return domStrings
    }

    function getInput(){ 
        return {
            type: document.querySelector(domStrings.inputType).value,
            desc: document.querySelector(domStrings.inputDesc).value,
            value: document.querySelector(domStrings.inputVal).value
        }
    }

    function formatNum(type, num){
        num = Math.abs(num)
        num = num.toFixed(2)

        const numSplit = num.split('.')

        int = numSplit[0]
        dec = numSplit[1]

        let newInt = 0

        if(int.length > 3){
            newInt = ''
            for(let i = 0; i < int.length / 3; i++){
                newInt = ',' + int.substring(int.length - 3 * (i+1), int.length - 3 * i) + newInt
            }
            if(newInt[0] === ','){
                newInt = newInt.substring(1)
            }
        } else if(int === '0'){
            newInt = '0'
        } else {
            newInt = int
        }

        let resNum = newInt + '.' + dec

        if(type === 'exp'){
            resNum = '- ' + resNum
        } else if(type === 'inc'){
            resNum = '+ ' + resNum
        }

        return resNum
    }

    function renderListItem(obj, type){
        let containerEl, markup

        if(type === 'inc'){
            containerEl = domStrings.incomeContainer
            markup = `
            <li id="inc-${obj.id}" class="budget-list__item item item--income">
                <div class="item__title">${obj.desc}</div>
                <div class="item__right">
                    <div class="item__amount">${formatNum('inc', obj.value)}</div>
                    <button class="item__remove">
                        <img
                            src="./img/circle-green.svg"
                            alt="delete"
                        />
                    </button>
                </div>
            </li>
            `
        } else {
            containerEl = domStrings.expenceContainer
            markup = `
            <li id="exp-${obj.id}" class="budget-list__item item item--expense">
                <div class="item__title">${obj.desc}</div>
                <div class="item__right">
                    <div class="item__amount">
                        ${formatNum('exp', obj.value)}
                        <div class="item__badge">
                            <div class="item__percent badge badge--dark">
                                15%
                            </div>
                        </div>
                    </div>
                    <button class="item__remove">
                        <img src="./img/circle-red.svg" alt="delete" />
                    </button>
                </div>
            </li>
            `
        }

        document.querySelector(containerEl).insertAdjacentHTML('beforeend', markup)
    }

    function clearFields(){
        const inputDesc = document.querySelector(domStrings.inputDesc)
        const inputVal = document.querySelector(domStrings.inputVal)

        inputDesc.value = ''
        inputVal.value = ''
        inputDesc.focus()
    }

    function updateBudget(obj){
        let type

        if(obj.budget > 0){
            type = 'inc'
        } else {
            type = 'exp'
        }

        document.querySelector(domStrings.budgetLabel).textContent = formatNum(type, obj.budget)
        document.querySelector(domStrings.incomeLabel).textContent = formatNum('inc', obj.totalInc)
        document.querySelector(domStrings.expLabel).textContent = formatNum('exp', obj.totalExp)

        if(obj.percentage > 0){
            document.querySelector(domStrings.expPercLabel).textContent = obj.percentage
        } else {
            document.querySelector(domStrings.expPercLabel).textContent = '--'
        }

        // {
        //     budget: data.budget,
        //     totalInc: data.totals.inc,
        //     totalExp: data.totals.exp,
        //     percentage: data.percentage
        // }
    }

    function delListItem(itemId){
        document.getElementById(itemId).remove()
    }

    function updateItemsPercentages(items){
        items.forEach(function(item){

            const el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent')

            if(item[1] >= 0){
                el.parentElement.style.display = 'block'
                el.textContent = item[1] + '%'
            } else {
                el.parentElement.style.display = 'none'
            }
        })
    }

    function displayMonth(){
        const now = new Date()
        const year = now.getFullYear()
        let month = now.getMonth()

        const monthArr = [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ]

        month = monthArr[month]

        document.querySelector(domStrings.monthLabel).innerText = month
        document.querySelector(domStrings.yearLabel).innerText = year
    }

    return {
        getDomStrings,
        getInput,
        renderListItem,
        clearFields,
        updateBudget,
        delListItem,
        updateItemsPercentages,
        displayMonth
    }
})()