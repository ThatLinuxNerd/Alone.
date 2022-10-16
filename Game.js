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
        text: "You wake up in a foreign place and you don't know how you ended up there, after looking around you notice that you're completely ALONE So now knowing that there seems to be no escape you decide to pull out your camera you think logging your travel through this place might help reveal a way out of wherever you are at",
        options: [
            {
                text: '>Look Around<',
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "As you are looking around you notice some peculiar symbols around do you",
        options: [
            {
                text: '>Inspect the Symbols<',
                setState: { symbolsSeen1: true, noPhoto: true},
                nextText: 3
            },
            {
                text: '>Ignore the Symbols<',
                nextText: 104
            }
            
        ]
    },
    {
        id: 3,
        text: "you bend down and inspect the strange symbols written into the ground, they	seem....Familiar...maybe if you had enough to go off of you could maybe understand it?",
        options: [
            {
                text: '>Search for More Symbols<',
                nextText: 4
            },
            {
                text: '>Take a photo of it for later use<',
                requiredState: (currentState) => currentState.noPhoto,
                setState: {hasPhoto: true, noPhoto: false},
                nextText: 3
            }
        ]
    },
]

startGame()