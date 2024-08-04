// Create main container
var main = document.createElement("div");
main.id = "container";
main.className = "main";
main.style.height = "25vh";
main.style.width = "100%";
main.style.backgroundColor = "blue";
main.style.display = "flex";
document.body.appendChild(main);

//create image for logo
const image = document.createElement('img')
image.setAttribute('src', 'Assets/jeopardy.jfif')
main.appendChild(image)
image.setAttribute('height','200')
image.setAttribute('width','30%')

//designing the logo
const image2 = document.createElement('img')
image2.setAttribute('src','Assets/image.crdownload')
main.appendChild(image2)
image2.setAttribute('height','200')
image2.setAttribute('width','40%')


let image1 = document.createElement('img')
image1.setAttribute('src', 'Assets/jeopardy.jfif')
main.appendChild(image1)
image1.setAttribute('height','200')
image1.setAttribute('width','30%')



// Create game container
var game = document.createElement("div");
game.id = "game";
game.className = "mygame";
game.style.height = "69vmin";
game.style.width = "98.6%";
game.style.marginTop = "0px";
game.style.textAlign = "center";
game.style.backgroundColor = "#1520A6";
game.style.display = "flex";
game.style.alignItems = "center";
game.style.justifyContent = "space-evenly";
game.style.padding = "10px";
document.body.appendChild(game);

// Create score display
let score = document.createElement("h3");
score.innerHTML = "Score: 0"; // Initial score display
score.className = "score";
score.id="score"
score.style.color = "white";
score.style.textAlign = "left";
score.style.fontSize = "1.3rem";
game.appendChild(score);

// data handling initializers
const url = 'data.json';
let allData = [];
let categories = new Set();
let Index = new Set();
let currentCategory = "";
let score1 = 0;
let QuestionIndex = null; // To store the index of the current question

// Fetch data from JSON and extract categories
fetch(url)
    .then(res => res.json())
    .then(data => {
        allData = data;
        data.forEach(item => categories.add(item.Category));
        createCategoryButtons();
    })
    .catch((error) => {
        console.error(error);
    });

// Function to create category buttons and layout
function createCategoryButtons() {
    categories.forEach(category => {
        const categoryDiv = document.createElement("div");
        categoryDiv.className = "category";
        categoryDiv.innerHTML = `<h5>${category}</h5>`;
        categoryDiv.style.height = "350px";
        categoryDiv.style.width = "20%";
        categoryDiv.style.backgroundColor = "#2832C2";
        categoryDiv.style.color = "white";
        categoryDiv.style.fontSize = "1.2rem";
        categoryDiv.style.display = "flex";
        categoryDiv.style.flexDirection = "column";
        categoryDiv.style.justifyContent = "space-evenly";
        categoryDiv.style.alignItems = "center";

        // Create buttons for each category
        for (let i = 1; i <= 4; i++) {
            const button = document.createElement("button");
            button.innerText = `$${i * 200}`;
            button.style.display = "flex";
            button.style.gap = "1.3rem";
            button.style.width = "30%";
            button.style.height = "40px";
            button.style.backgroundColor = "blue";
            button.style.border = "1px solid white";
            button.style.fontSize = "2rem";
            button.style.color = "yellow";
            button.style.fontWeight = "500";
            button.style.boxShadow = "10px 10px 10px black";
            button.classList.add("category-button");

            button.addEventListener('click', () => {
                currentCategory = category;
                fetchNewQuestion();
                // main.style.display = "none";
                game.style.display = "none";
                container1.style.display = "block";
                container1.style.backgroundImage="url ('image.crdownload')"
                element.style.display = "flex";
                element.style.justifyContent = "center";
                input.style.display = "inline-block";
                input.value = "";
                response.style.display = "inline";
                reset.style.display = "flex";
                showing.style.display = "block";
                showing.innerHTML = "";
                answer.innerHTML = "";
            });
            categoryDiv.appendChild(button);
        }
        game.appendChild(categoryDiv);
    });
}

// Create question display area
let container1 = document.createElement("div");
container1.id = "container1";
container1.style.display = "none";
container1.style.backgroundColor = "#0066b2";
container1.style.height = "69vh";
container1.style.width = "100%";
document.body.appendChild(container1);

let element = document.createElement("h2");
element.style.display = "none";
element.style.color = "#F4FDFF";
element.id = "question";
container1.appendChild(element);

let input = document.createElement("input");
input.style.display = "none";
input.id = "input";
input.style.borderRadius="10px"
input.style.height = "40px";
input.style.width = "300px";
input.style.marginLeft = "35%";
input.style.marginTop = "10%";
input.style.fontSize="1rem"
container1.appendChild(input);

let response = document.createElement('button');
response.style.display = "none";
response.innerHTML = "Submit";
response.style.backgroundColor = "#FCC208";
response.style.color = "black";
response.style.fontSize = "1rem";
response.style.fontWeight = "700";
response.className = "response";
response.style.marginLeft = "40px";
response.style.width = "80px";
response.style.height = "50px";
container1.appendChild(response);

let answer = document.createElement('h2');
answer.style.display = "none";
answer.className = "answer";
answer.style.textAlign = "center";
answer.style.color="white"
container1.appendChild(answer);

let showing = document.createElement('h3');
showing.style.display = "none";
showing.className = "showing";
showing.style.textAlign = "center";
showing.style.color="white"
container1.appendChild(showing);

function fetchNewQuestion() {
    if (Index.size === allData.length) {
        Index.clear(); // Reset if all questions have been used
    }

    let questionIndex;
    do {
        questionIndex = Math.floor(Math.random() * allData.length);
    } while (Index.has(questionIndex) || allData[questionIndex].Category !== currentCategory);

    Index.add(questionIndex);
    QuestionIndex = questionIndex; // Store the index of the current question
    displayQuestion(questionIndex);
}

function displayQuestion(questionIndex) {
    const question = allData[questionIndex];
    element.innerText = question.Question;
    element.style.paddingTop = "30px";
}
let questionValue = 0;

// Function to update and display the score

function updateScore(points) {
    score1 += points;

}

// Event listener for when the user submits an answer
response.addEventListener('click', () => {
    if (QuestionIndex !== null) {
        const questionData = allData[currentQuestionIndex];
        questionValue = parseInt(allData[0].Value.replace('$', ''));
        const correctAnswer = questionData.Answer.toLowerCase(); 
        answer.style.display = "block";

        const userAnswer = document.getElementById('input').value.trim().toLowerCase();
        if (userAnswer === "") {
            showing.style.display = "block";
            showing.innerText = "Please type your answer first in the input box.";
        } else {
            if (userAnswer === correctAnswer) {
                alert("Correct!");
                showing.innerText = `Correct! The answer is "${correctAnswer}".`;
                answer.innerText = "Congratulations! The answer is correct.";
                updateScore(questionValue);            
                input.value = ""; 
            } else {
                alert("Incorrect!");
                showing.innerText = `Incorrect. The correct answer was "${correctAnswer}".`;
                answer.innerText = "Please try again!";
            }
          
        }
    } 
    }
);

let reset = document.createElement('button');
reset.id = "reset";
reset.style.display = "none";
reset.innerHTML = "Reset Game";
reset.style.marginLeft = "40%";
reset.style.height="40px";
reset.style.width="100px"
reset.style.fontSize="1rem"
reset.style.fontWeight="700"
reset.style.backgroundColor="#FCC308"
container1.appendChild(reset);

reset.addEventListener('click', resetGame);

function resetGame() {
    main.style.display = "flex";
    game.style.display = "flex";
    reset.style.display = "none";
    element.style.display = "none";
    input.style.display = "none";
    response.style.display = "none";
    container1.style.display = "none";
    score.innerText= ` Score : $ ${score1}`;
}
