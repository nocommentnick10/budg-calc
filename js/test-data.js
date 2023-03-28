const generateTestData = (function(){
    const ExampleItem = function(type, desc, sum){
        this.type = type
        this.desc = desc
        this.sum = sum
    }
    
    const testData = [
        new ExampleItem('inc', 'Зарплата', 12345),
        new ExampleItem('inc', 'Фриланс', 12512),
        new ExampleItem('inc', 'Партнерская программа', 6563),
        new ExampleItem('inc', 'Продажи digital', 5635),
        new ExampleItem('exp', 'Рента', 32011),
        new ExampleItem('exp', 'Бензин', 2103),
        new ExampleItem('exp', 'Продукты', 21312),
        new ExampleItem('exp', 'Развлечения', 67431)
    ]
    
    function getRandomInt(max){
        return Math.floor(Math.random() * max)
    }
    
    function insertInUi(){
        const random = getRandomInt(testData.length)
        const randomItem = testData[random]
    
        document.querySelector('#input__type').value = randomItem.type
        document.querySelector('#input__description').value = randomItem.desc
        document.querySelector('#input__value').value = randomItem.sum
    }
    
    return {
        init: insertInUi
    }
})()