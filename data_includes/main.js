PennController.ResetPrefix(null) // Shorten command names (keep this line here)
//PennController.DebugOff()
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming/master/audios/")
PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_ENG_Priming/master/images/")

Sequence( "information", "identification", "initRecorder", "prac1_start", "prac_1", "prac2_start", "prac_2", "exp_start", "exp", "send", "final" )

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

//Template(
//    GetTable("instruction.csv")
//            , variable =>
//    newTrial( "instruction" ,
//        newHtml("information", variable.insPage)
//            .print()
//        ,
//        newImage("example", variable.exImg)
//            .settings.center()
//            .print()
//        ,
//        newButton("Proceed")
//            .settings.center()
//            .print()
//            .wait()
//  )
//  .log( "ID"     , getVar("ID")    )
//)

InitiateRecorder("http://myserver/saveVoiceRecordings.php", "Please grant expt.pcibex.net access to your microphone.").label("initRecorder")

newTrial( "prac1_start" ,
    newText("<p>Please listen to the audio description, and select the described object by clicking on it with your mouse.</p>")
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
    newTrial( "prac_1" ,
            newAudio("description", variable.audio)
                .play()
            ,
            newImage("1", variable.pos1)
                .size(250,250)
            ,
            newImage("2", variable.pos2)
                .size(250,250)
            ,
            newImage("3", variable.pos3)
                .size(250,250)
            ,
            newImage("4", variable.pos4)
                .size(250,250)
            ,
            newImage("5", variable.pos5)
                .size(250,250)
            ,
            newImage("6", variable.pos6)
                .size(250,250)
            ,
            newImage("7", variable.pos7)
                .size(250,250)
            ,
            newImage("8", variable.pos8)
                .size(250,250)
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

  )
  .log( "ID"     , getVar("ID")    )
)            

newTrial( "prac2_start" ,
    newText("<p>Now please describe the object in the box by speaking aloud.</p><p>After describing the object, press the <strong>Proceed</strong> button to continue.</p>")
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
    newTrial( "prac_2" ,
        newVar("box", variable.boxPos)
        ,
        newMediaRecorder("recorder", "audio")
            .record()
        ,
        newImage("1", variable.pos1)
            .size(250,250)
        ,
        getVar("box").test.is("1")
            .success(getImage("1").css("border", "solid 2px black"))
            .failure(getImage("1"))
        ,
        newImage("2", variable.pos2)
            .size(250,250)
        ,
        getVar("box").test.is("2")
            .success(getImage("2").css("border", "solid 2px black"))
            .failure(getImage("2"))
        ,
        newImage("3", variable.pos3)
            .size(250,250)
        ,
        getVar("box").test.is("3")
            .success(getImage("3").css("border", "solid 2px black"))
            .failure(getImage("3"))
        ,
        newImage("4", variable.pos4)
            .size(250,250)
        ,
        getVar("box").test.is("4")
            .success(getImage("4").css("border", "solid 2px black"))
            .failure(getImage("4"))
        ,
        newImage("5", variable.pos5)
            .size(250,250)
        ,
        getVar("box").test.is("5")
            .success(getImage("5").css("border", "solid 2px black"))
            .failure(getImage("5"))
        ,
        newImage("6", variable.pos6)
            .size(250,250)
        ,
        getVar("box").test.is("6")
            .success(getImage("6").css("border", "solid 2px black"))
            .failure(getImage("6"))
        ,
        newImage("7", variable.pos7)
            .size(250,250)
        ,
        getVar("box").test.is("7")
            .success(getImage("7").css("border", "solid 2px black"))
            .failure(getImage("7"))
        ,
        newImage("8", variable.pos8)
            .size(250,250)
        ,
        getVar("box").test.is("8")
            .success(getImage("8").css("border", "solid 2px black"))
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
        getVoiceRecorder("recorder")
            .stop()
        ,
        getMediaRecorder("recorder").test.recorded()
    )
  .log( "ID"     , getVar("ID")    )
)

newTrial( "exp_start" ,
    newText("<p>Now the experiment begins.</p><p>First, you should listen to the audio and click on the described object.</p><p>Then, please describe the object in the box by speaking aloud.</p></p><p>After describing the object, press the <strong>Proceed</strong> button to continue.</p>")
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
                .size(250,250)
            ,
            newImage("2", variable.pos2)
                .size(250,250)
            ,
            newImage("3", variable.pos3)
                .size(250,250)
            ,
            newImage("4", variable.pos4)
                .size(250,250)
            ,
            newImage("5", variable.pos5)
                .size(250,250)
            ,
            newImage("6", variable.pos6)
                .size(250,250)
            ,
            newImage("7", variable.pos7)
                .size(250,250)
            ,
            newImage("8", variable.pos8)
                .size(250,250)
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
                .success(getImage("1").css("border", "solid 2px black"))
                .failure(getImage("1"))
            ,
            getVar("box").test.is("2")
                .success(getImage("2").css("border", "solid 2px black"))
                .failure(getImage("2"))
            ,
            getVar("box").test.is("3")
                .success(getImage("3").css("border", "solid 2px black"))
                .failure(getImage("3"))
            ,
            getVar("box").test.is("4")
                .success(getImage("4").css("border", "solid 2px black"))
                .failure(getImage("4"))
            ,
            getVar("box").test.is("5")
                .success(getImage("5").css("border", "solid 2px black"))
                .failure(getImage("5"))
            ,
            getVar("box").test.is("6")
                .success(getImage("6").css("border", "solid 2px black"))
                .failure(getImage("6"))
            ,
            getVar("box").test.is("7")
                .success(getImage("7").css("border", "solid 2px black"))
                .failure(getImage("7"))
            ,
            getVar("box").test.is("8")
                .success(getImage("8").css("border", "solid 2px black"))
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
            getVoiceRecorder("recorder")
                .stop()
            ,
            getMediaRecorder("recorder").test.recorded()

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