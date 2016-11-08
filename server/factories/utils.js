export function seedData() {
    let questions = [
        {
            question: "Bonjour",
            answer: "Hello",
        },
        {
            question: "Au revoir",
            answer: "Goodbye",
        },
        {
            question: "Je suis",
            answer: "I am",
        },
        {
            question: "fromage",
            answer: "cheese",
        },
        {
            question: "visage",
            answer: "face",
        },
        {
            question: "entrepreneur",
            answer: "businessman",
        },
        {
            question: "je ne sais quoi",
            answer: "special something",
        },
        {
            question: "meurtre",
            answer: "murder",
        },
        {
            question: "chein",
            answer: "dog",
        },
        {
            question: "femme",
            answer: "woman",
        }
    ];

    for (var i = 0; i < questions.length; i++) {
        questions[i].weight = 1;
    }

    return questions;
}

export function errorHandler(err, res) {
    if(!err) return false;
    console.error(err);
    res.status(500).json({message: 'Internal server error :('});
    return true;
}