PennController.ResetPrefix(null) // Shorten command names (keep this line here)
var showProgressBar = false;
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming/master/audios/")
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming/master/images/")
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming/master/images2/")

Sequence( "information", "survey", "identification", "recording_information", "initRecorder", "instruction", "prac", "exp_start", "exp_block1", "rest", "exp_block2", "send", "final" )

newTrial( "information" ,
    newHtml("information", "information.html")
        .print()
    ,
    newButton("Agree")
        .settings.center()
        .print()
        .wait()
)

newTrial( "survey" ,
    newHtml("questionnaire", "survey.html")
        .print()
    ,
    newButton("Start")
        .settings.center()
        .print()
        .wait(getHtml("questionnaire").test.complete()
            .failure(getHtml("questionnaire").warn()))
)
.log( "ID", PennController.GetURLParameter("id") )

newTrial( "identification" ,
    newText("<p>Below is your unique ID for this experiment.</p><p>Please take a note of it in case you need it as a reference.</p><p>Press <strong>Continue</strong> to proceed.</p>")
        .print()
    ,
    newTextInput("inputID", GetURLParameter("id"))
        .settings.center()
        .log("final")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
)
.log( "ID" , getVar("ID") )

newTrial("recording_information" ,
    newText("<p><strong>Important:</strong></p><p>You will hear audio descriptions during the experiment, so please adjust the sound volume to a comfortable level before starting the experiment.</p><p>Your responses will be audio recorded during the experiment. Please complete this experiment in a quiet place.</p><p>Please stay focused during the experiment, and finish it in one go. You will be able to take a brief break (1-2 mins), where specified.</p><p>You will not be able to return to this study if you closed or refreshed this webpage.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()    
)

InitiateRecorder("https://langprolab.stir.ac.uk/pcibex/index.php", "Please grant expt.pcibex.net access to your microphone.").label("initRecorder")

Template(
    GetTable("instructions.csv")
            , variable =>
    newTrial( "instruction" ,
        newHtml("information", variable.insPage)
            .print()
        ,
        newButton("Continue")
            .settings.center()
            .print()
            .wait()
  )
  .log( "ID"     , getVar("ID")    )
)

Template(
    GetTable("prac.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "prac" ,
            newText("prac_item", variable.item)
            ,
            newImage("1", variable.pos1)
                .size(170,170)
            ,
            newImage("2", variable.pos2)
                .size(170,170)
            ,
            newImage("3", variable.pos3)
                .size(170,170)
            ,
            newImage("4", variable.pos4)
                .size(170,170)
            ,
            newImage("5", variable.pos5)
                .size(170,170)
            ,
            newImage("6", variable.pos6)
                .size(170,170)
            ,
            newImage("7", variable.pos7)
                .size(170,170)
            ,
            newImage("8", variable.pos8)
                .size(170,170)
            ,
            newCanvas(700,350)
                .center()
                .add(0, 0, getImage("1") )
                .add(175, 0, getImage("2") )
                .add(350, 0, getImage("3") )
                .add(525, 0, getImage("4") )
                .add(0, 175, getImage("5") )
                .add(175, 175, getImage("6") )
                .add(350, 175, getImage("7") )
                .add(525, 175, getImage("8") )
                .print()
            ,
            getText("prac_item").test.text("p1")
                .success(newText("In every trial, you’ll see a display of 8 objects. Here you’ve just heard&nbsp;")
                        .settings.after(newText("&ldquo;"))
                        .settings.after(newText("prime_description", variable.prime_description).settings.center().css("font-size", "small"))
                        .settings.after(newText("&#8221;."))
                        .settings.center()
                        .css("font-size", "small")
                        .print()            
                        ,
                    newText("Please click on the object described. You cannot change your response, so please listen carefully.")
                        .settings.center()
                        .css("font-size", "small")
                        .print())
                .failure(newText("Listen carefully. Click on the object described.")
                        .settings.center()
                        .css("font-size", "small")
                        .print())            
            ,
            newTimer("delay", 2000)
                .start()
                .wait()
            ,
            newAudio("description", variable.audio)
                .play()
            ,
            newSelector("imgSelect")
                .add( getImage("1") , getImage("2"), getImage("3"), getImage("4"),
                      getImage("5") , getImage("6"), getImage("7"), getImage("8") )
                .log()
                .wait()                        
            ,
            getAudio("description")
                .wait("first")
            ,
            clear()
            ,
            newText("production", "<p>Now it’s your turn - please describe the object that’s in the box, so that your listener can identify the object.</p><p>When you finished describing the object, click on “Proceed” to proceed.</p>")
                .css("font-size", "small")
            ,
            newVar("box", variable.boxPos)
            ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            getVar("box").test.is("1")
                .success(getImage("1").css("border", "solid 1px black"))
                .failure(getImage("1"))
            ,
            getVar("box").test.is("2")
                .success(getImage("2").css("border", "solid 1px black"))
                .failure(getImage("2"))
            ,
            getVar("box").test.is("3")
                .success(getImage("3").css("border", "solid 1px black"))
                .failure(getImage("3"))
            ,
            getVar("box").test.is("4")
                .success(getImage("4").css("border", "solid 1px black"))
                .failure(getImage("4"))
            ,
            getVar("box").test.is("5")
                .success(getImage("5").css("border", "solid 1px black"))
                .failure(getImage("5"))
            ,
            getVar("box").test.is("6")
                .success(getImage("6").css("border", "solid 1px black"))
                .failure(getImage("6"))
            ,
            getVar("box").test.is("7")
                .success(getImage("7").css("border", "solid 1px black"))
                .failure(getImage("7"))
            ,
            getVar("box").test.is("8")
                .success(getImage("8").css("border", "solid 1px black"))
                .failure(getImage("8"))
            ,
            newButton("proc", "Proceed")
            ,
            newCanvas(700,500)
                .center()
                .add(0, 0, getImage("1") )
                .add(175, 0, getImage("2") )
                .add(350, 0, getImage("3") )
                .add(525, 0, getImage("4") )
                .add(0, 175, getImage("5") )
                .add(175, 175, getImage("6") )
                .add(350, 175, getImage("7") )
                .add(525, 175, getImage("8") )
                .add(0, 355, getText("production"))
                .add(300, 425, getButton("proc"))
                .print()
            ,
            newSelector()
                .add(getButton("proc"))
                .log()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
            ,
            clear()
            ,
            getText("prac_item").test.text("p1")
                .success(newText("You may say ")
                            .settings.after(newText(variable.targetPC).settings.bold())
                            .settings.after(newText("&nbsp;or&nbsp;"))
                            .settings.after(newText(variable.targetCP).settings.bold())
                            .settings.after(newText("."))
                            .print()
                        ,
                        newText("But avoid mentioning the location (e.g., ")
                            .settings.after(newText(variable.targetSP))
                            .settings.after(newText(")."))
                            .print()
                        ,
                        newText("The objects may be positioned differently for your listener.")
                            .print())
                .failure(newText("As before, you may say ")
                            .settings.after(newText(variable.targetPC).settings.bold())
                            .settings.after(newText("&nbsp;or&nbsp;"))
                            .settings.after(newText(variable.targetCP).settings.bold())
                            .settings.after(newText("."))
                            .print()
                        ,
                        newText("But avoid mentioning the location (e.g., ")
                            .settings.after(newText(variable.targetSP))
                            .settings.after(newText(")."))
                            .print()
                        ,
                        newText("The objects may be arranged differently for your listener.")
                            .print())
            ,
            newButton("Continue")
                .settings.center()
                .print()
                .wait()
    )
  .log( "ID"     , getVar("ID")    )
)

newTrial( "exp_start" ,
    newText("<p>Now the experiment begins.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

Template(
    GetTable("block_1.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "exp_block1" ,
            newText("exp_item", variable.item)
            ,
            newAudio("description", variable.audio)
                .play()
            ,
            newImage("1", variable.pos1)
                .size(170,170)
            ,
            newImage("2", variable.pos2)
                .size(170,170)
            ,
            newImage("3", variable.pos3)
                .size(170,170)
            ,
            newImage("4", variable.pos4)
                .size(170,170)
            ,
            newImage("5", variable.pos5)
                .size(170,170)
            ,
            newImage("6", variable.pos6)
                .size(170,170)
            ,
            newImage("7", variable.pos7)
                .size(170,170)
            ,
            newImage("8", variable.pos8)
                .size(170,170)
            ,
            newCanvas(700,350)
                .center()
                .add(0, 0, getImage("1") )
                .add(175, 0, getImage("2") )
                .add(350, 0, getImage("3") )
                .add(525, 0, getImage("4") )
                .add(0, 175, getImage("5") )
                .add(175, 175, getImage("6") )
                .add(350, 175, getImage("7") )
                .add(525, 175, getImage("8") )
                .print()
            ,
            newSelector("imgSelect")
                .add( getImage("1") , getImage("2"), getImage("3"), getImage("4"),
                      getImage("5") , getImage("6"), getImage("7"), getImage("8") )
                .log()
                .wait()
            ,
            getAudio("description")
                .wait("first")
            ,
            clear()
            ,
            newVar("box", variable.boxPos)
            ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            getVar("box").test.is("1")
                .success(getImage("1").css("border", "solid 1px black"))
                .failure(getImage("1"))
            ,
            getVar("box").test.is("2")
                .success(getImage("2").css("border", "solid 1px black"))
                .failure(getImage("2"))
            ,
            getVar("box").test.is("3")
                .success(getImage("3").css("border", "solid 1px black"))
                .failure(getImage("3"))
            ,
            getVar("box").test.is("4")
                .success(getImage("4").css("border", "solid 1px black"))
                .failure(getImage("4"))
            ,
            getVar("box").test.is("5")
                .success(getImage("5").css("border", "solid 1px black"))
                .failure(getImage("5"))
            ,
            getVar("box").test.is("6")
                .success(getImage("6").css("border", "solid 1px black"))
                .failure(getImage("6"))
            ,
            getVar("box").test.is("7")
                .success(getImage("7").css("border", "solid 1px black"))
                .failure(getImage("7"))
            ,
            getVar("box").test.is("8")
                .success(getImage("8").css("border", "solid 1px black"))
                .failure(getImage("8"))
            ,
            newButton("proc", "Proceed")
            ,
            newCanvas(700,500)
                .center()
                .add(0, 0, getImage("1") )
                .add(175, 0, getImage("2") )
                .add(350, 0, getImage("3") )
                .add(525, 0, getImage("4") )
                .add(0, 175, getImage("5") )
                .add(175, 175, getImage("6") )
                .add(350, 175, getImage("7") )
                .add(525, 175, getImage("8") )
                .add(300, 365, getButton("proc"))
                .print()
            ,
            newSelector()
                .add(getButton("proc"))
                .log()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
    )
  .log( "ID"     , getVar("ID")    )
  .log("List", variable.list)
    .log("Order", variable.order)
    .log("Item", variable.item)
    .log("Condition", variable.condition)
    .log("Prime", variable.prime)
    .log("NounRepetition", variable.noun_repetition)
    .log("PrimeDescription", variable.prime_description)
    .log("TargetDescription", variable.target_description)
    .log("TargetObject", variable.target_object)
    .log("RepeatedPrime", variable.repeated_prime)
    .log("NonRepeatedPrime", variable.non_repeated_prime)
    .log("ExpTrials", variable.expTrials)
    .log("PrimePosition", variable.targetImg)
    .log("TargetPosition", variable.boxPos)
)

newTrial( "rest" ,
    newText("<p>Now you can take a break (1-2 mins).</p><p>Press <strong>Continue</strong> when you are ready.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

Template(
    GetTable("block_2.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "exp_block2" ,
            newText("exp_item", variable.item)
            ,
            newAudio("description", variable.audio)
                .play()
            ,
            newImage("1", variable.pos1)
                .size(170,170)
            ,
            newImage("2", variable.pos2)
                .size(170,170)
            ,
            newImage("3", variable.pos3)
                .size(170,170)
            ,
            newImage("4", variable.pos4)
                .size(170,170)
            ,
            newImage("5", variable.pos5)
                .size(170,170)
            ,
            newImage("6", variable.pos6)
                .size(170,170)
            ,
            newImage("7", variable.pos7)
                .size(170,170)
            ,
            newImage("8", variable.pos8)
                .size(170,170)
            ,
            newCanvas(700,350)
                .center()
                .add(0, 0, getImage("1") )
                .add(175, 0, getImage("2") )
                .add(350, 0, getImage("3") )
                .add(525, 0, getImage("4") )
                .add(0, 175, getImage("5") )
                .add(175, 175, getImage("6") )
                .add(350, 175, getImage("7") )
                .add(525, 175, getImage("8") )
                .print()
            ,
            newSelector("imgSelect")
                .add( getImage("1") , getImage("2"), getImage("3"), getImage("4"),
                      getImage("5") , getImage("6"), getImage("7"), getImage("8") )
                .log()
                .wait()
            ,
            getAudio("description")
                .wait("first")
            ,
            clear()
            ,
            newVar("box", variable.boxPos)
            ,
            newMediaRecorder("recorder", "audio")
                .record()
            ,
            getVar("box").test.is("1")
                .success(getImage("1").css("border", "solid 1px black"))
                .failure(getImage("1"))
            ,
            getVar("box").test.is("2")
                .success(getImage("2").css("border", "solid 1px black"))
                .failure(getImage("2"))
            ,
            getVar("box").test.is("3")
                .success(getImage("3").css("border", "solid 1px black"))
                .failure(getImage("3"))
            ,
            getVar("box").test.is("4")
                .success(getImage("4").css("border", "solid 1px black"))
                .failure(getImage("4"))
            ,
            getVar("box").test.is("5")
                .success(getImage("5").css("border", "solid 1px black"))
                .failure(getImage("5"))
            ,
            getVar("box").test.is("6")
                .success(getImage("6").css("border", "solid 1px black"))
                .failure(getImage("6"))
            ,
            getVar("box").test.is("7")
                .success(getImage("7").css("border", "solid 1px black"))
                .failure(getImage("7"))
            ,
            getVar("box").test.is("8")
                .success(getImage("8").css("border", "solid 1px black"))
                .failure(getImage("8"))
            ,
            newButton("proc", "Proceed")
            ,
            newCanvas(700,500)
                .center()
                .add(0, 0, getImage("1") )
                .add(175, 0, getImage("2") )
                .add(350, 0, getImage("3") )
                .add(525, 0, getImage("4") )
                .add(0, 175, getImage("5") )
                .add(175, 175, getImage("6") )
                .add(350, 175, getImage("7") )
                .add(525, 175, getImage("8") )
                .add(300, 365, getButton("proc"))
                .print()
            ,
            newSelector()
                .add(getButton("proc"))
                .log()
                .wait()
            ,
            getMediaRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()
                .failure(newText("Sorry, there seems to be something wrong with your microphone. Please stop the experiment, and contact the researcher.").settings.center().print())
    )
  .log( "ID"     , getVar("ID")    )
  .log("List", variable.list)
    .log("Order", variable.order)
    .log("Item", variable.item)
    .log("Condition", variable.condition)
    .log("Prime", variable.prime)
    .log("NounRepetition", variable.noun_repetition)
    .log("PrimeDescription", variable.prime_description)
    .log("TargetDescription", variable.target_description)
    .log("TargetObject", variable.target_object)
    .log("RepeatedPrime", variable.repeated_prime)
    .log("NonRepeatedPrime", variable.non_repeated_prime)
    .log("ExpTrials", variable.expTrials)
    .log("PrimePosition", variable.targetImg)
    .log("TargetPosition", variable.boxPos)
)

SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you very much for your participation!</p>")
        .print()
    ,
    newText("<p>If you were asked to download a copy of the recordings on the last page, please send the file and your unique ID to <strong>shi.zhang[at]stir.ac.uk.</strong></p><p>Otherwise, please click on the link below to validate your participation.</p>")
        .print()
    ,
    newText("<p><a href='https://stirling.sona-systems.com/webstudy_credit.aspx?experiment_id=1903&credit_token=73dbad39838a446598271bf8fdf6da8b&survey_code="+GetURLParameter("id")+"' href='_blank'>Click here to validate your participation and finish the experiment</a></p>")
        .settings.center()
        .print()
    ,
    newButton("void")
        .wait()
)
