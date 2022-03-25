// @Author: Jacob Wik 
    // Variables

    var count = 0; // which question the player is at
    var marks = 0; // amount of points the player has
    var correctAnswer = []; // the correct answer for each question (is collected from the json when finished is pressed)
    var answer = []; // array that collects the answer from the user.
    const username = document.querySelector('#username');
    const highScores = JSON.parse(localStorage.getItem('highScores')) || []
    const saveScoreBtn = document.querySelector('#saveScoreBtn')

    let mostRecentScore = 0;


    //    Main Ready funtion

    $(document).ready(function () {
        console.log("external js loaded");
        $('#finish').hide();
        $('#Result').hide();
        $('#highscoreButton').hide();
        $('#restartButton').hide();
        $('#footer').hide();
        $('#submitResultContainer').hide();

        buttons_manager();

        //    Create Function

        function buttons_manager() {
            if (count > 0) {
                $('#prev').show();
                if (count == 4) {
                    $('#next').hide();
                    $('#finish').show();
                }
                else {
                    $('#next').show();
                }
            }
            else {
                $('#prev').hide();
            }
        }

        
        // Submit score button disabled if the username form is not filled out
        username.addEventListener('keyup', () => {
            saveScoreBtn.disabled = !username.value
        })
                
        saveHighScore = e => {
            e.preventDefault()

            const score = {
                score: mostRecentScore,
                name: username.value
            }

            highScores.push(score)

            highScores.sort((a,b) => {
                return b.score - a.score
            })

            highScores.splice(5)

            localStorage.setItem('highScores', JSON.stringify(highScores));
            window.open('/highscores.html');
            window.location.assign('/');

            
        }

        // Generates the question from the json data
        function adding_Questions(data, i) {
            $('#question').text(data[i].Quiz)
            $('#options1').text(data[i].option1)
            $('#options2').text(data[i].option2)
            $('#options3').text(data[i].option3)
            $('#options4').text(data[i].option4)
            $('#number').text(Number(i + 1));

        }


        function selected_Answer() {
            for (var i = 0; i < 4; i++) {
                var temp = document.getElementById("options").children;
                if (temp[i].innerHTML == answer[count]) {
                    $("#options").children("button")[i].classList.add("active");
                }
                else {
                    $("#options").children("button")[i].classList.remove("active");
                }
            }
        }

        function creating_result(data) {
            for (var i = 0; i < answer.length; i++) {
                if (answer[i] == data.Questions[i].answer) {
                    marks += 1;
                }
                correctAnswer[i] = " " + data.Questions[i].answer + " ";
            }
            $('#main').hide();
            $('#arrayOfUserAnswers').text("Your Answers: " + answer);
            $('#arrayOfCorrectAnswers').text("Correct Answers: " + correctAnswer);
            $('#correct_answer').text(marks + " ");
            $('#percentage').text((marks / 5) * 100 + "%");
            mostRecentScore= marks;

            $("#Result").show();
        }


        $("#options").hide();

        fetch('data.json') // fetches the information from the json file
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // gives function to start button
                $('.start').click(function () {
                    $('#options').show();
                    adding_Questions(data.Questions, count);
                    $('.start_page').hide();
                    $('#prev').hide();
                    $('.start').hide();
                    $('#footer').show();
                });

                // Select Option

                $(".optionsbutton").click(function () {

                    $(this).addClass("active");
                    $(this).siblings().removeClass("active");
                    answer[count] = $(this).html();
                });

                // Next Questions

                $('#next').click(function () {
                    if (count > answer.length - 1) {
                        alert("Select Atleast 1 Option")
                    }
                    else {
                        count++;
                        adding_Questions(data.Questions, count);
                        $("#prev").show();
                        $(".option").removeClass("active");
                        buttons_manager();
                        selected_Answer();
                    }
                });

                // Previous Questions

                $('#prev').click(function () {
                    count--;
                    adding_Questions(data.Questions, count);
                    buttons_manager();
                    selected_Answer();
                });

                // Finish Quiz

                $("#finish").click(function () {
                    if (count > answer.length - 1) {
                        alert("Select at least one Option");
                    }
                    else {
                        creating_result(data);
                        $('#restartButton').show();
                        $('#highscoreButton').show();
                        $('#submitResultContainer').show();
                        
                    }
                });

                //Reload webpage
                $('#restartButton').click(function () {
                    location.reload();
                });

            })




    })

