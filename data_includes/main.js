PennController.ResetPrefix(null) // Shorten command names (keep this line here)
PennController.DebugOff()
//PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_Priming/master/audios/")
//PennController.AddHost("https://raw.githubusercontent.com/awpzs/RC_Priming/master/images/")

Sequence( "information", "identification", "prac1_start", "prac_1", "prac2_start", "prac_2", "send", "final" )

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

newTrial( "prac1_start" ,
    newText("<p>Let's start with some practice trials. </p><p>Please listen to the audio description, and select the described object by clicking on it with your mouse.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

Template(
    GetTable("prac_1.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "prac_1" ,
            newAudio("description", variable.audio)
                .play()
            ,
            newImage("upperLeft", variable.imgUpperLeft)
                .size(200,200)
            ,
            newImage("buttomLeft", variable.imgButtomLeft)
                .size(200,200)
            ,
            newImage("upperRight", variable.imgUpperRight)
                .size(200,200)
            ,
            newImage("buttomRight", variable.imgButtomRight)
                .size(200,200)
            ,
            newCanvas(400,200)
                .add("left at 0%", "top at 0%", getImage("upperLeft") )
                .add("left at 0%", "buttom at 100%", getImage("buttomLeft") )
                .add("right at 100%", "top at 0%", getImage("upperRight") )
                .add("right at 100%", "buttom at 100%", getImage("buttomRight") )
                .print()
            ,
            newSelector()
                .add( getImage("upperLeft") , getImage("buttomLeft"), getImage("upperRight"), getImage("buttomRight") )
                .log()
                .wait()
            ,
            getAudio("description")
                .wait("first")
  )
  .log( "ID"     , getVar("ID")    )
)

newTrial( "prac2_start" ,
    newText("<p>Let's do some other practice trials. </p><p>Please take a look at the objects, then describe the object in the box by speaking aloud.</p><p>After describing the object, press the <strong>Proceed</strong> button to continue.</p>")
        .print()
    ,
    newButton("Continue")
        .settings.center()
        .print()
        .wait()
)
.log( "ID" , getVar("ID") )

InitiateRecorder("http://myserver/saveVoiceRecordings.php");

Template(
    GetTable("prac_1.csv")
            .setGroupColumn("list") , variable =>
    newTrial( "prac_2" ,
            newVoiceRecorder("recorder")
                .record()
            ,
            newImage("upperLeft", variable.imgUpperLeft)
                .size(200,200)
            ,
            newImage("buttomLeft", variable.imgButtomLeft)
                .size(200,200)
            ,
            newImage("upperRight", variable.imgUpperRight)
                .size(200,200)
            ,
            newImage("buttomRight", variable.imgButtomRight)
                .size(200,200)
            ,
            newCanvas(400,200)
                .add("left at 0%", "top at 0%", getImage("upperLeft") )
                .add("left at 0%", "buttom at 100%", getImage("buttomLeft") )
                .add("right at 100%", "top at 0%", getImage("upperRight") )
                .add("right at 100%", "buttom at 100%", getImage("buttomRight") )
                .print()
            ,
            newButton("Proceed")
                .settings.center()
                .print()
                .wait()
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
