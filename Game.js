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
        text: "As you are looking around you notice some peculiar symbols around",
        options: [
            {
                text: '>Inspect the Symbols<',
                setState: { symbolsSeen1: true, noPhoto: true},
                nextText: 52
            },
            {
                text: '>Ignore the Symbols<',
                nextText: 98
            }
            
        ]
    },
    {
        id: 52,
        text: "you bend down and inspect the strange symbols written into the ground, they	seem....Familiar...maybe if you had enough to go off of you could maybe understand it?",
        options: [
            {
                text: '>Search for More Symbols<',
                nextText: 20
            },
            {
                text: '>Take a photo of it for later use<',
                requiredState: (currentState) => currentState.noPhoto,
                setState: {hasPhoto: true, noPhoto: false},
                nextText: 31
            }
        ]
    },
    {
        id: 20,
        text: "While looking for more symbols do go",
        options: [
            {
                text: '>East<',
                nextText: 5
            },
            {
                text: '>North<',
                nextText: 4
            },
        ]
    },
    {
        id: 4,
        text: "While heading north you come across a cliff.",
        options: [
            {
                text: '>Climb The Cliff<',
                nextText: 325
            },
            {
                text: '>Look for a Diffrent Way<',
                nextText: 624
            }
        ]
    },
    {
        id: 325,
        text: "You decided to climb the cliff. When you make it to the halfway point you slip and fall to your death",
        options: [
            {
                text: '>Restart?<',
                nextText: 2
            }
        ]
    },
    {
        id: 624,
        text: "You decided on not going up the cliff and decided it would be better if you looked for a different way. You walk around in the dark with no idea were you are. You can't see a thing and you end up tripping on something.  You don't know what it is",
        options: [
            {
                text: '>Look at What You Tripped On<',
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'you spot a rock picking it up seems to have revealed a message “look closely at the numbers” maybe a clue to crack the code?',
        options: [
            {
                text: '>Continue Exploring<',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        text: 'while heading east you stumble upon a tree with a carving looking closely you see that it has  symbols they read 01110000 and 01100101 After finding the tree you are very excited you have three symbols already and you think you remember what they mean so you look back through your footage you have so far',
        options: [
            {
                text: '>the code is FREEDOM<',
                nextText:999
            },  
            {
                text: '>the code is ESCAPE<',
                nextText:8
            },
            {
                text: '>the code is 42<',
                nextText:999
            }, 
            {
                text: '>Continue Looking From Start<',
                nextText:2
            },
        ]
    },
    {
        id: 8,
        text: 'You cracked the code, the world fades into a weird blurry spiral as you wake up in bed, what a strange dream…..',
        options: [
            {
                text: '>Replay?<',
                nextText: 1
            }
        ]
    },
    {
        id: 31,
        text: "You look a little closer and notice it says 01000101. You decide to walk off to try to explore",
        options: [
            {
                text: '>Look for Food<',
                nextText: 19
            },
            {
                text: '>Look For Shelter<',
                nextText: 12
            }
        ]
    },
    {
        id: 19,
        text: "When you go out to look for food you find some berries",
        options: [
            {
                text: '>Eat the Berries<',
                nextText: 666
            },
            {
                text: '>Leave the Berries<',
                nextText: 12
            }
        ]
    },
    {
        id: 12,
        text: "You seek shelter in a cave. You notice a symbol. You lean in closer and notice it says 01100011. The cave begin to crumble in on itself",
        options: [
            {
                text: '>You Run Out<',
                nextText: 2
            }
        ]
    },
    {
        id:666,
        text: 'The berries were poisonous. You die shortly after eating them',
        options: [
            {
                text: '>You Died<',
                nextText: 999
            }
        ]
    },
    {
        id: 999,
        text: 'GAME OVER',
        options: [
            {
                text: '>Return to Start?<',
                nextText: 1
            }
        ]
    }
]

startGame()