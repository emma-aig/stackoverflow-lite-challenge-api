const express = require("express");
const app = express();
app.use(express.json());
 
//Create default record
    const questions = [
    {questionID: 1, questioner: "James Ike", questionText: "How can I learn to program?"},
    {questionID: 2, questioner: "Juwon Odion", questionText: "What is programming?"}
];
 
//Accessing root directory
app.get("/api/v1/users/", (req, res) => {
    console.log("Server is responding to route");
    res.send("Root directory...");
});


//Fetch all questions
app.get("/api/v1/users/questions/", (req, res) => {
    res.send(questions);
});

//Fetch a specific question 
app.get("/api/v1/users/questions/:questionID", (req, res) => { 
    const question = questions.find(quest => quest.questionID === parseInt(req.params.questionID));
    if (!question) {
        res.status(404).send("No questions found with the ID you specified");
        return;
    }
    res.send(question);
});


//Add a question
app.post("/api/v1/users/questions", (req, res) => {
    if (!req.body.questioner || req.body.questioner.length < 2) {
        res.status(400).send("Your name is too short (minimum character is 2)");
        return;
    }
    if (!req.body.questionText) {
        res.status(400).send("Your question seems empty");
        return;
    }
    if (req.body.questionText.trim().length < 4) {
        res.status(400).send("Your question seems too short.");
        return;
    }
    const question = {
        questionID: questions.length + 1,
        questioner: req.body.questioner,
        questionText: req.body.questionText
    };
    questions.push(question);
    res.send(question);
});

//Add an answer
app.post("/api/v1/users/questions/:questionID?", (req, res) => {
    const questionID = req.params.questionID;
    if (questionID) {
        const question = {
            questionID: req.body.questionID,
            questioner: req.body.questioner,
            questionText: req.body.questionText
        };
        questions.push(question);
        res.send(question);
    }
});

//Update an existing record
app.put("/api/v1/users/questions/:questionID", (req, res) => {
    const question = questions.find(quest => quest.questionID === parseInt(req.params.questionID));
    if (!question) {
        res.status(404).send("Can't update because no questions found with the ID you specified ");
        res.send(question);
        return;
    }
    question.questioner = req.body.questioner;
    question.questionText = req.body.questionText;
    res.send(question);

});

//Delete an existing record
app.delete("/api/v1/users/questions/:questionID", (req, res) => {
    const question = questions.find(quest => quest.questionID === parseInt(req.params.questionID));
    if (!question) {
        res.status(404).send("Can't delete because no questions found with the ID you specified");
        res.send(question);
        return;
    }
    const index = questions.indexOf((question));
    questions.splice(index, 1);
    res.send(question);
});

//Setting port and directory
const staticPort = 3000;
const port = process.env.PORT || staticPort;
app.use(express.static(__dirname + "/api/v1/users/"));


//Reporting connection status
app.listen(port, () => {
    console.log(`Server running and listening on port ${port}...`);
});