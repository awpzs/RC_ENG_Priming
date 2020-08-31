PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming/master/audios/")
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming/master/images/")

//Sequence( "information", "identification", "recording_information", "initRecorder", "prac1_start", "prac_1", "prac2_start", "prac_2", "exp_start", "exp", "send", "final" )
Sequence( "recording_information", "initRecorder", "instruction", "prac", "send", "final" )

newTrial( "information" ,
    newHtml("information", "information.html")
        .print()
    ,
    newButton("Agree")
        .settings.center()
        .print()
        .wait()
)

newTrial( "identification" ,
    newText("<p>Please provide your ID before proceeding to the instructions.</p>")
        .print()
    ,
    newTextInput("inputID", "Your ID")
        .settings.center()
        .log("final")
        .print()
    ,
    newButton("Agree")
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
    newText("<p><strong>Important:</strong></p><p>Your responses will be audio recorded during the experiment. Please complete this experiment in a quiet place, and make your voice loud and clear.</p><p>Please stay focused during the experiment, and finish it in one go. You will be able to take a brief break (1-2 mins), where specified.</p><p>You will not be able to return to this study if you closed or refreshed this webpage.</p>")
        .settings.center()
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
            newText("<p>Please click on “Listen” to listen to an audio, and then use your mouse to click on the object that’s just been described.</p><p>Once you’ve selected an object, you cannot change your response.</p><p>Please listen to descriptions carefully and choose the object accurately.</p>")
                .settings.center()
                .print()
            ,
            newButton("listen", "Listen")
                .settings.center()
                .print()
                .wait()
            ,
            getButton("cont")
                .remove()
            ,
            newAudio("description", variable.audio)
                .play()
            ,
            newImage("1", variable.pos1)
                .size(245,245)
            ,
            newImage("2", variable.pos2)
                .size(245,245)
            ,
            newImage("3", variable.pos3)
                .size(245,245)
            ,
            newImage("4", variable.pos4)
                .size(245,245)
            ,
            newImage("5", variable.pos5)
                .size(245,245)
            ,
            newImage("6", variable.pos6)
                .size(245,245)
            ,
            newImage("7", variable.pos7)
                .size(245,245)
            ,
            newImage("8", variable.pos8)
                .size(245,245)
            ,
            newCanvas(1000,550)
                .center()
                .add(0, 0, getImage("1") )
                .add(250, 0, getImage("2") )
                .add(500, 0, getImage("3") )
                .add(750, 0, getImage("4") )
                .add(0, 250, getImage("5") )
                .add(250, 250, getImage("6") )
                .add(500, 250, getImage("7") )
                .add(750, 250, getImage("8") )
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
            newText("<p>Now it’s your turn - please describe the object that’s in the box, so your listener can identify the object.</p><p>When you finished describing the object, click on “Proceed” to continue.</p>")
                .settings.center()
                .print()
                .wait(2000)
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
            newCanvas(1000,550)
                .add(0, 0, getImage("1") )
                .add(250, 0, getImage("2") )
                .add(500, 0, getImage("3") )
                .add(750, 0, getImage("4") )
                .add(0, 250, getImage("5") )
                .add(250, 250, getImage("6") )
                .add(500, 250, getImage("7") )
                .add(750, 250, getImage("8") )
                .add(495, 505, getButton("proc"))
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
            newText("You may say ")
                .settings.after(newText(variable.targetPC).settings.bold())
                .settings.after(newText(" or "))
                .settings.after(newText(variable.targetCP).settings.bold())
                .settings.after(newText(", but avoid using spatial descriptions like"))
                .settings.after(newText(variable.targetSP).settings.bold())
                .settings.after(newText("; the objects may be placed in different positions for your listener."))
                .settings.bold()
                .settings.center()
                .print()
            ,
            getButton("proc")
                .print()
                .wait()
    )
  .log( "ID"     , getVar("ID")    )
)

newTrial( "exp_start" ,
    newText("<p>Now the experiment begins.</p><p>First, you should listen to the audio and click on the described object. The audio will start playing automatically.</p><p>Then, please describe the object in the box by speaking aloud.</p></p><p>After describing the object, press the <strong>Proceed</strong> button to continue.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

Template(
    GetTable("prac.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "exp" ,
            newAudio("description", variable.audio)
                .play()
            ,
            newImage("1", variable.pos1)
                .size(245,245)
            ,
            newImage("2", variable.pos2)
                .size(245,245)
            ,
            newImage("3", variable.pos3)
                .size(245,245)
            ,
            newImage("4", variable.pos4)
                .size(245,245)
            ,
            newImage("5", variable.pos5)
                .size(245,245)
            ,
            newImage("6", variable.pos6)
                .size(245,245)
            ,
            newImage("7", variable.pos7)
                .size(245,245)
            ,
            newImage("8", variable.pos8)
                .size(245,245)
            ,
            newCanvas(1000,550)
                .center()
                .add(0, 0, getImage("1") )
                .add(250, 0, getImage("2") )
                .add(500, 0, getImage("3") )
                .add(750, 0, getImage("4") )
                .add(0, 250, getImage("5") )
                .add(250, 250, getImage("6") )
                .add(500, 250, getImage("7") )
                .add(750, 250, getImage("8") )
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
            newCanvas(1000,550)
                .add(0, 0, getImage("1") )
                .add(250, 0, getImage("2") )
                .add(500, 0, getImage("3") )
                .add(750, 0, getImage("4") )
                .add(0, 250, getImage("5") )
                .add(250, 250, getImage("6") )
                .add(500, 250, getImage("7") )
                .add(750, 250, getImage("8") )
                .add(495, 505, getButton("proc"))
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
)          

SendResults( "send" )

newTrial( "final" ,
    newText("<p>Thank you very much for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://stir.ac.uk' href='_blank'>Click here to finish the experiment</a></p>")
        .settings.center()
        .print()
    ,
    newButton("void")
        .wait()
)
