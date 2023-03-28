const Controller = (function(budgController, uiController){

    function setupEventListeners(){
        const dom = uiController.getDomStrings()
    
        document.querySelector(dom.form).addEventListener('submit', ctrlAddItem)

        document.querySelector(dom.budgetTable).addEventListener('click', ctrlDelItem)
    }

    function updatePercentages(){
        budgController.calcPercentages()
        // budgController.test()

        const idsAndPercents = budgController.getAllIdsAndPercentages()

        uiController.updateItemsPercentages(idsAndPercents)
    }

    function ctrlAddItem(e){
        e.preventDefault()

        const input = uiController.getInput()

        if(input.desc != '' && !isNaN(input.value) && input.value > 0){
            const newItem = budgController.addItem(input.type, input.desc, input.value)
            // budgController.test()

            uiController.renderListItem(newItem, input.type)

            uiController.clearFields()
            // generateTestData.init()

            updateBudget()
        }

        updatePercentages()
    }

    function ctrlDelItem(e){
        if(e.target.closest('.item__remove')){
            const itemId = e.target.closest('li.budget-list__item').id

            const splitId = itemId.split('-')
            const type = splitId[0]
            const id = parseInt(splitId[1])

            budgController.delItem(type, id)

            uiController.delListItem(itemId)
            updatePercentages()
        }
    }

    function updateBudget(){
        budgController.calcBudget()

        const budgetObj = budgController.getBudget()

        uiController.updateBudget(budgetObj)
    }

    return{
        init: function(){
            console.log('App started')
            uiController.displayMonth()
            setupEventListeners()
            uiController.updateBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: '--'
            })
        }
    }

})(ModelController, ViewController)

Controller.init()