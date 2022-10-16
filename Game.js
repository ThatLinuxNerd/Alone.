const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
 const nextTextNodeId = option.nextText
 state = Object.assign(state, option.setState)
 showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: "You wake up in a foreign place and you don't know how you ended up there",
        options: [
            {
                text: 'Look Around',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: ", after looking around you notice that your are completely ALONE So now knowing that there seems to be no escape you decide to pull out your camera you think logging your travel through this place might help reveal a way out of were ever you are at You start your journey starting off your log stating that you some how ended up here but you dont know why As you are looking around you notice some peculiar symbols around do you inspect or explore",
        options: [
            {
                text: 'stuff',
                nextText: 3
            }
            
        ]
    }
]

startGame()