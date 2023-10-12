document.addEventListener('DOMContentLoaded', function() {
    var currentCard = 0;
    var flashcards = [
        { color: 'color1', title: 'Shop less!', text: 'You can save so much on this, it is absolutely crazy. I promise you, there is a lot to get here. And if you are absolutely going to shop, you can save a lot of money by buying second-hand clothes.' },
        { color: 'color2', title: 'Work!', text: 'Get a job, here you can earn a lot if you enjoy yourself and don\'t think you\'re working, then find something you like! Additionally, consider freelance or part-time gigs for extra income. Pursuing a hobby that can be monetized means earning while enjoying, making it feel less like work!' },
        { color: 'color3', title: 'Optimize Bills and Subscriptions!', text: 'Review bills, negotiate for better rates, and cancel unused subscriptions to save money. Also, turn off lights and unplug electronics when not in use to lower your electric bill. Remember, small changes can lead to big savings over time.' },
        { color: 'color4', title: 'Drink water!', text: 'Soda, juice, red bull, are expensive drinking options when you are thirsty! Water is free.Drinking water can stop snack spending, as thirst often feels like hunger. Choosing tap water saves money and helps the planet. Also, using a reusable bottle is cheaper than buying many plastic ones.'},
        { color: 'color5', title: 'Cook at Home!', text: 'Frequently eating out can quickly eat up your budget. Preparing meals at home is significantly cheaper, healthier, and can turn into a fun activity! Plan your meals and shop in bulk to save even more. Learning to use leftovers creatively prevents waste and stretches your budget further!' }
    ];

    var cardContainer = document.getElementById('card-container');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');

    function createCard(cardData) {
        var card = document.createElement('div');
        card.className = 'flashcard';

        var cardInner = document.createElement('div');
        cardInner.className = 'flashcard-inner ' + cardData.color;

        var cardFront = document.createElement('div');
        cardFront.className = 'flashcard-front';
        cardFront.innerHTML = `<h3>${cardData.title}</h3>`;

        var cardBack = document.createElement('div');
        cardBack.className = 'flashcard-back';
        cardBack.innerHTML = `<p>${cardData.text}</p>`;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        return card;
    }

    function displayCard() {
        cardContainer.innerHTML = '';
        var cardElement = createCard(flashcards[currentCard]);
        cardContainer.appendChild(cardElement);
    }

    prevBtn.addEventListener('click', function() {
        if (currentCard > 0) {
            currentCard--;
            displayCard();
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentCard < flashcards.length - 1) {
            currentCard++;
            displayCard();
        }
    });

    // Initial display
    displayCard();
});
