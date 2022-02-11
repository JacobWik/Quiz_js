
    // Variables

    var count = 0;
    var marks = 0;
    var answer = [];

    //    Main Ready funtion

    $(document).ready(function () {
        console.log("external js loaded");
        $('#finish').hide();
        $('#Result').hide();
        $('#restartButton').hide();

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

        // Create Question Function
        function adding_Questions(data, i) {
            $('#question').text(data[i].Quiz)
            $('#options1').text(data[i].option1)
            $('#options2').text(data[i].option2)
            $('#options3').text(data[i].option3)
            $('#options4').text(data[i].option4)
            $('#number').text(Number(i + 1));

        }

        // Answer Selection Function

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

                    marks += 5;
                }
            }
            console.log(answer)
            $('#main').hide();

            $("#marks").text(marks);
            $('#correct_answer').text(marks / 5);
            $('#percentage').text((marks / 25) * 100 + "%");

            $("#Result").show();
        }
        $("#options").hide();

        // Attach API

        fetch('data.json')
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
                    }
                });

                //Reload webpage
                $('#restartButton').click(function () {
                    location.reload();
                });

            })




    })

