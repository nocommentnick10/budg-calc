const ModelController = (function(){
    
    const Income = function(id, desc, value){
        this.id = id
        this.desc = desc
        this.value = value
    }

    const Expence = function(id, desc, value){
        this.id = id
        this.desc = desc
        this.value = value
        this.percentage = -1
    }

    Expence.prototype.calcPercentage = function(totalinc){
        if(totalinc > 0){
            this.percentage = Math.round((this.value / totalinc) * 100)
        } else {
            this.percentage = -1
        }
    }

    Expence.prototype.getPercentage = function(){
        return this.percentage
    }

    function calcTotalSum(type){
        let sum = 0

        data.allItems[type].forEach(function(item){
            sum += item.value
        })

        return sum
    }

    function addItem(type, desc, value){
        let newItem

        if(data.allItems[type].length > 0){
            id = data.allItems[type][data.allItems[type].length - 1].id + 1
        } else {
            id = 1
        }

        if(type === 'inc'){
            newItem = new Income(id, desc, parseFloat(value))
        } else if(type === 'exp') {
            newItem = new Expence(id, desc, parseFloat(value))
        }

        data.allItems[type].push(newItem)

        return newItem
    }

    function delItem(type, id){
        const ids = data.allItems[type].map(function(item){
            return item.id
        })

        const index = ids.indexOf(id)

        if(index !== -1){
            data.allItems[type].splice(index, 1)
        }
    }

    function calcBudget(){
        data.totals.inc = calcTotalSum('inc')

        data.totals.exp = calcTotalSum('exp')

        data.budget = data.totals.inc - data.totals.exp

        if(data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
        } else {
            data.percentage = -1
        }
    }

    function getBudget(){
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    }

    function calcPercentages(){
        data.allItems.exp.forEach(function(item){
            item.calcPercentage(data.totals.inc)
        })
    }

    function getAllIdsAndPercentages(){
        let allPerc = data.allItems.exp.map(function(item){
            return [item.id, item.getPercentage()]
        })

        return allPerc
    }

    const data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem,
        test: function(){
            console.log(data)
        },
        calcBudget,
        getBudget,
        delItem,
        calcPercentages,
        getAllIdsAndPercentages
    }

})()