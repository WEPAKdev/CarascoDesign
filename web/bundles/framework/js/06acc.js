$(document).ready(function()
{
    arrayAnim = [];
    runingPatternCircleIntro_pt1 = [];
    runingPatternCircleIntro_pt2 = [];
    runingPatternPoints = [];
    runingPatternLinesCircle_pt1 = [];
    runingPatternLinesCircle_pt2 = [];
    runingPatternLinesCircle = [];
    RPtoday = [];
    theoBlue = "rgba(16,23,30,1)";
    //le but de la création de ce timeLine SVG animation runner est de:
        //animer une propritété du SVG en utilisant la fonction anim de snapsvg
        //creer une timeline d'animation SVG
    
    //run anim SVG
    function runAnimSVGStep(arrayAnim, runingPattern, runingStep, beginAt, endWhen, reverse) {
       //alert(beginAt);
       var animIndex, anim, toAnimate, animDef, indexAnimToUseLength;

       indexAnimToUseLength = runingStep.animIndexs.length;
       //retourner le tableau d'anim si reverse
       if(reverse)
       {
           runingStep.animIndexs.reverse();
       }
       for(var i = 0; i < indexAnimToUseLength; i++)
       {
           animIndex = runingStep.animIndexs[i];
           anim = arrayAnim[animIndex];
           //prepare le param animDef
           toAnimate = anim.toAnimate;
           animDef = {toAnimate : toAnimate};
           if(reverse)
           {
               animDef[toAnimate] = anim.from;
           }
           else{
               animDef[toAnimate] = anim.to;
           }
           //s'il y a plusieurs anims qui s'effectuent en meme temps
           //alert(indexAnimToUseLength);
           if(indexAnimToUseLength > 1)
           {
               anim.elem.animate(animDef, anim.speed, anim.easing);
           }
           //sinon
           else{
               anim.elem.animate(animDef, anim.speed, anim.easing, function(){beginAt++; runTimelineAnim(arrayAnim, runingPattern, reverse, beginAt, endWhen)});
           }
       }
   }

    //run a timeline of SVG anims
    function runTimelineAnim(arrayAnim, runingPattern, reverse, beginAt, endWhen){

        //alert('reverse : ' + reverse);
        //init parameters if nescessary
        if(!beginAt)
        {
            beginAt = 0;
        }
        if(!endWhen)
        {
            endWhen = runingPattern.length;
        }
        if(beginAt >= endWhen)
        {
            return false
        }
        else{
            //si revers est set, on parcour a l'envers
            if(reverse)
            {
                runingPattern.reverse();
            }
            runingStep = runingPattern[beginAt];
            //console.log(runingStep);
            //launch anims of paternStep with delay
            if(runingStep.delay === true)
            {
                setTimeout(
                    function(){
                        runAnimSVGStep(arrayAnim, runingPattern, runingStep, beginAt, endWhen, reverse);
                    }, parseInt(runingStep.delay)
                );
            }
            //launch anims of paternStep without delay
            else{
                runAnimSVGStep(arrayAnim, runingPattern, runingStep, beginAt, endWhen, reverse);
            }
        }
    }

    //anims SVG
    function initSVGAnims() {
        var genSpeed =  333;
        var genEasing = mina.linear();
        var elastic1 =  mina.elastic();
        var easeOut =   mina.easeout();
        var easeIn =    mina.easein();
        var backIn =    mina.backin();

        //SVGS
        var A2_logo_svg =   Snap(document.querySelector('svg[data-elem="A_shape2"]'));
        var circles =       Snap(document.querySelector('svg[data-elem="circles"]'));
        var Apath =         Snap(document.querySelector('path[data-elem="under-maskA"]'));

        //on stock les elements et vars nescessaires aux seting des anims
        arrayAnim.push(
            //0
            {
                info :  "drawing a left bar",
                toAnimate : 'path',
                elem :  A2_logo_svg.select('path[data-anim-elem="1"]'),
                from :  "M35.333,129h-34H0h37H35.333z",
                to :    "M89,0H55L0,129h37L89,0z",
                speed : genSpeed,
                easing : genEasing
            },
            //1
            {
                info : "scaling circle gradiant",
                toAnimate : 'r',
                elem :  circles.select('circle[data-elem="circle-gradiant-shadow"]'),
                from :  0,
                to :    200,
                speed : 800,
                easing : backIn
            },
            //2
            {
                info : "scaling circle mask",
                toAnimate : 'r',
                elem :  circles.select('circle[data-elem="circle-mask"]'),
                from :  0,
                to :    205,
                speed : 580,
                easing : easeOut
            },
            //3
            {
                info : "scaling left point",
                toAnimate : 'r',
                elem :  circles.select('circle[data-elem="circle-line-left"]'),
                from :  0,
                to :    3,
                speed : 200,
                easing : easeIn
            },
            //4
            {
                info : "move point to left",
                toAnimate : 'cx',
                elem :  circles.select('circle[data-elem="circle-line-left"]'),
                from :  253,
                to :    10,
                speed : 650,
                easing : easeIn
            },
            //5
            {
                info : "scaling right point",
                toAnimate : 'r',
                elem :  circles.select('circle[data-elem="circle-line-right"]'),
                from :  0,
                to :    3,
                speed : 200,
                easing : easeIn
            },
            //6
            {
                info : "move point to right",
                toAnimate : 'cx',
                elem :  circles.select('circle[data-elem="circle-line-right"]'),
                from :  253,
                to :    490,
                speed : 650,
                easing : easeIn
            },
            //7
            {
                info : "scaling + left bar",
                toAnimate : 'x1',
                elem :  circles.select('line[data-elem="line-left"]'),
                from :  253,
                to :    10,
                speed : 650,
                easing : easeIn
            },
            //8
            {
                info : "scaling + right bar",
                toAnimate : 'x1',
                elem :  circles.select('line[data-elem="line-right"]'),
                from :  253,
                to :    490,
                speed : 650,
                easing : easeIn
            },
            //9
            {
                info : "scaling - left bar",
                toAnimate : 'x2',
                elem :  circles.select('line[data-elem="line-left"]'),
                from :  253,
                to :    10,
                speed : 650,
                easing : backIn
            },
            //10
            {
                info : "scaling - right bar",
                toAnimate : 'x2',
                elem :  circles.select('line[data-elem="line-right"]'),
                from :  253,
                to :    491,
                speed : 650,
                easing : backIn
            },
            //
            {
                info : "morphing A in today",
                toAnimate : 'd',
                elem :  Apath,
                from :  "M147.4,125.5l-2.5-6.5h-10.1l3.1-7.6h4.1l-4.1-10.4l-9.9,24.5h-10.4L133,89.2h9.6l15.2,36.3H147.4z",
                to :    "M324.7,224.9h-10.8v-8.8h31.7v8.8h-10.9v27.3h-10L324.7,224.9L324.7,224.9z M368.1,253c-2.8,0-5.4-0.5-7.7-1.5"
                +"c-2.4-1-4.4-2.3-6.1-4s-3.1-3.7-4-5.9c-0.9-2.2-1.5-4.7-1.5-7.3v-0.1c0-2.6,0.5-5,1.5-7.3s2.3-4.3,4.1-6c1.8-1.7,3.8-3,6.2-4"
                +"c2.4-1,5-1.5,7.7-1.5c2.8,0,5.4,0.5,7.7,1.5c2.4,1,4.4,2.3,6.1,4s3.1,3.7,4,5.9c0.9,2.2,1.5,4.7,1.5,7.3v0.1c0,2.6-0.5,5-1.5,7.3"
            +"s-2.3,4.3-4.1,6c-1.8,1.7-3.8,3-6.2,4C373.5,252.5,370.9,253,368.1,253z M368.2,243.9c1.4,0,2.6-0.3,3.8-0.8"
                +"c1.1-0.5,2.1-1.2,2.9-2.1s1.4-1.9,1.9-3.1c0.4-1.2,0.7-2.4,0.7-3.7v-0.1c0-1.3-0.2-2.5-0.7-3.7c-0.4-1.2-1.1-2.2-1.9-3.1"
                +"s-1.8-1.6-2.9-2.1s-2.4-0.8-3.8-0.8s-2.6,0.3-3.8,0.8c-1.1,0.5-2.1,1.2-2.9,2.1s-1.4,1.9-1.9,3.1c-0.4,1.2-0.6,2.4-0.6,3.7v0.1"
            +"c0,1.3,0.2,2.5,0.7,3.7c0.4,1.2,1.1,2.2,1.9,3.1s1.8,1.6,2.9,2.1C365.6,243.7,366.8,243.9,368.2,243.9z M392.8,216.1h13.9"
            +"c3.2,0,6.1,0.4,8.6,1.3s4.7,2.1,6.4,3.7s3.1,3.5,4,5.6c0.9,2.2,1.4,4.6,1.4,7.2v0.1c0,2.6-0.5,5-1.4,7.2s-2.3,4.1-4,5.8"
            +"c-1.8,1.6-3.9,2.9-6.5,3.8s-5.5,1.4-8.7,1.4h-13.7L392.8,216.1L392.8,216.1z M406.9,243.4c3,0,5.4-0.8,7.2-2.4"
                +"c1.8-1.6,2.7-3.8,2.7-6.8v-0.1c0-2.9-0.9-5.1-2.7-6.7c-1.8-1.6-4.2-2.4-7.2-2.4h-4.1v18.4H406.9z M444.8,215.9h9.6l15.4,36.4h-10.7"
                +"l-2.6-6.4h-13.9l-2.6,6.4h-10.5L444.8,215.9z M453.5,238.1l-4-10.3l-4.1,10.3H453.5z M483.7,238.7L470,216.1h11.4l7.4,13.2l7.5-13.2"
                +"h11.2l-13.7,22.4v13.7h-10.1L483.7,238.7L483.7,238.7z",
                speed : 350,
                easing : easeIn
            }
        );

        //alert(typeof(arrayAnim));

        //on crée un tableau de runing des anims
        //animIndexs : array() , contient les index des anim a charger simultanément
        //delay : int , delay a partir de laquelle les animations désignés par animIndexs doivent etre chargée
        runingPatternCircleIntro_pt1.push(
            {
                animIndexs: [1],
                delay: false
            }
        );

        runingPatternCircleIntro_pt2.push(
            {
                animIndexs: [2],
                delay: false
            }
        );
        
        runingPatternPoints.push(
            {
                animIndexs: [3,5,4,6],
                delay: false
            }
        );

        runingPatternLinesCircle_pt1.push(
            {
                animIndexs: [7,8],
                delay: false
            }
        );

        runingPatternLinesCircle_pt2.push(
            {
                animIndexs: [9,10],
                delay: false
            }
        );

        RPtoday.push(
            {
                animIndexs: [11],
                delay: false
            }
        );
    }

    //resize an img patern used as background of an SVG element
    function changeSizePattern(pattern, newwidth) {
        pattern.attr('width', newwidth).find($('image')).attr('width', newwidth);
    }

    //add class "moved" to TODAY word to move it into the page
    function moveToday(){
        $('svg[data-elem="word-carasco"]').addClass("moved");
    }

    //load intro animations
    function runIntroAnims(){
        tl = new TimelineLite();
        tl
              .to($('#intro-gif-cont'), 0.5, {scale: 0.5, top: '-42%',left: '-20%',ease: Power4.easeOut}, "+=5.5")
              .staggerTo($('#topmenu item'), 0.5, {marginTop:"0", opacity:1, ease: Power4.easeOut}, 0.08, "-=0.5")
            //.to($('#intro-gif'), 0.5, {opacity:0}, "+=5.5")
            //.call(typewrite, [], this, "+=0");
    }
    
    
    //init anims SVG (set pattern anim)
    initSVGAnims();

    //type wrinting of the sentence 'START NEW ADVENTURE"
    function typewrite(){
        //placer le curseur sur la première lettre
        //deplacer le curseur a la lettre suivante //desopacifier la lettre courante //repeter
        var parent =    $("#text-intro");
        var letters =   parent.find($(".letter"));
        var cursor =    $('#cursor');
        //placer le curseur
        var letter1 =       letters.eq(0);
        var parentWidth =   parent.width();
        var parentHeight =  parent.height();
        var letterWidth =   letter1.width();
        var cursorWidth =   cursor.width();
        var posleterX =     letter1.offset().left - parent.offset().left - cursorWidth;   //position left of first letter
        //var posleterY = letter1.offset().top - parent.offset().top + "px";     //position top of first letter
        cursor.css({'left' : posleterX, 'background-size' : parentWidth, 'opacity': 1});//.css('top',posleterY);

        //deplacer le curseur a la lettre suivante //desopacifier la lettre courante //repeter
        var length = letters.length - 1;
        var interval = 0.1;
        var returnAt = 11;
        tl = new TimelineLite();
        for(var i = 0; i < length; i++){
            //alert('move cursor');
            var letter = letters.eq(i);
            var toMoveRight = letter.outerWidth(true) + letter.outerWidth(true)*0.03;
            if(i != returnAt)
            {
                tl
                    .to(cursor, interval, {x : "+=" + toMoveRight, backgroundPosition: "+="+toMoveRight +"0px", ease: Power1.easeOut})   //deplacer le curseu
                    .to(letter, interval, {opacity : 1}, "-="+interval/3);                     //desopacifier la lettre a devoiler au meme moment
            }
            else{
                //placer le curseur au debut de la ligne suivante
            }
        }
    }

    //Intro Animations
    runIntroAnims();

    //Tween Intro
    /*1. desinner le A
     //corp se crée avec animation sroke
     scaleOut le A
     2. scaleIn le logo et continuer le scale in pendant qq secondes, faire apparraitre chaque lettre en translate verticale en modifiant l'opacity
     3. l'etoile apparait en translate vertical, les etoiles se séparent et translate vers les coté
     le mot design se décoile a partir du centre
     */

    //SVG elems
    var path_plain_word =       $('svg[data-elem="A-gradient-shadow"] path[data-elem="plein-word"]');
    var path_gradient_word =    $('svg[data-elem="A-gradient-shadow"] path[data-elem="gradient-word"]');
    var svg_virgule =           $('svg[data-elem="vir-gradient-shadow"]');
    var path_mask_vir =         $('svg[data-elem="vir-gradient-shadow"] path[data-elem="mask-vir"]');
    var path_vir =              $('svg[data-elem="vir-gradient-shadow"] path[data-elem="virgule"]');
    var svg_A =                 $('svg[data-elem="A-gradient-shadow"]');
    var svg_circles =           $('svg[data-elem="circles"]');
    //var path_gradient_shadow =  $('svg[data-elem="circles"] path[data-elem="virgule"]');
    //var path_circle_mask =      $('svg[data-elem="circles"] path[data-elem="virgule"]');
    //var line_left =             $('svg[data-elem="circles"] line[data-elem="line-left"]');
    //var line_right =            $('svg[data-elem="circles"] line[data-elem="line-right"]');
    var g_circle_line =         $('svg[data-elem="circles"] g[data-elem="circle-line"]');
    //var svg_circles =           $('svg[data-elem="circles"]');
    //var svg_carasco =           $('svg[data-elem="word-carasco"]');
    var svg_carasco =           $('svg[data-elem="word-carasco"]');
    var g_carasco =             $('svg[data-elem="word-carasco"] g');
    var path_carasco =          $('svg[data-elem="word-carasco"] path');
    var path_Amask_carasco =    $('svg[data-elem="word-carasco"] path[data-elem="mask-A"]');
    var path_tosclout =         $('svg[data-elem="word-carasco"] path[data-elem="letter"]');
    var path_maskA =            $('svg[data-elem="word-carasco"] path[data-elem="mask-A"]');
    var path_AtoMorph =         $('svg[data-elem="word-carasco"] path[data-elem="under-maskA"]');
    //var svg_design =            $('svg[data-elem="word-design"]');

    var g_design =              $('svg[data-elem="word-design"] g');
    var path_design =           $('svg[data-elem="word-design"] path');



    tl = new TimelineLite();

    tl
        //sets
        /*.set(g_carasco, {rotation:"5deg"}) // cache le carasco derrière le mask
        .set(g_design, {rotation:"-5deg"}) // cache le carasco derrière le mask
        .set(path_carasco, {y:50}) // cache le carasco derrière le mask
        .set(path_design, {y:-50}) // cache le Logo & Webdesign derrière le mask

        //A

        .to(path_gradient_word, 0.5, {strokeDashoffset: "20px", strokeDasharray: "620px 61px", ease: Power0.easeNone})
        .to(path_plain_word, 0.3, {strokeDashoffset: "390px", strokeDasharray: "0px, 69px, 15px, 650px", ease: Power0.easeNone}, '-=0.15')

        .to(path_gradient_word, 0.5, {strokeDashoffset: "198px", strokeDasharray: "620px 175px", ease: Power0.easeNone})
        .to(path_plain_word, 0.5, {strokeDashoffset: "573px", strokeDasharray: "0px, 69, 67px, 650px", ease: Power0.easeNone}, "-=0.6")

        .to(path_gradient_word, 0.5, {strokeDashoffset: "435px", strokeDasharray: "620px 236px", ease: Power0.easeNone})
        .to(path_plain_word, 0.6, {strokeDashoffset: "817px", strokeDasharray: "15px, 76, 90px, 650px", ease: Power0.easeNone}, "-=0.41")

        .to(path_gradient_word, 0.5, {strokeDashoffset: "499", strokeDasharray: "620px 80px", ease: Power0.easeNone})
        .to(path_plain_word, 0.5, {strokeDashoffset: "932px", strokeDasharray: "15px, 76, 0px, 650px", ease: Power0.easeNone}, "-=0.5")

        .to(path_gradient_word, 0.5, {strokeDashoffset: "541px", strokeDasharray: "620px, 80px", ease: Power0.easeNone})
        .to(path_plain_word, 0.3, {strokeDashoffset: "937px", strokeDasharray: "0px, 76, 0px, 650px", ease: Power0.easeNone}, "-=0.45")

        .to(path_gradient_word, 0.5, {strokeDashoffset: "617px", strokeDasharray: "620px 23px", ease: Power0.easeNone}, "-=0.3")

        .to(path_gradient_word, 0.5, {opacity:0, strokeDashoffset: "654px", strokeDasharray: "620px, 0px", ease: Power0.easeNone}, "-=0.1")


        //virgule
        .set(svg_virgule, {css:{opacity:1}}, "-=0.7")
        .to(path_mask_vir, 0.3, {strokeDashoffset: "150px", ease: Power0.easeNone}, "-=0.65")
        .to(path_vir, 1, {opacity:1}, "-=0.7")


        .to(path_mask_vir, 0.3, {strokeDashoffset: "292px", ease: Power0.easeNone}, "-=0.7")
        .to(path_mask_vir, 0.3, {strokeDashoffset: "533px", ease: Power0.easeNone}, "-=0.5")
        .to(path_mask_vir, 0.3, {strokeDashoffset: "546px", strokeDasharray: "580px, 0px", ease: Power0.easeNone}, "-=0.4")

        //circle
        .call(runTimelineAnim, [arrayAnim, runingPatternCircleIntro_pt1], this, "-=0.3")//gradient
        .call(runTimelineAnim, [arrayAnim, runingPatternCircleIntro_pt2], this, "-=0") //mask

        //double points & white lines pt1
        .call(runTimelineAnim, [arrayAnim, runingPatternPoints], this, "+=0.1")
        .call(runTimelineAnim, [arrayAnim, runingPatternLinesCircle_pt1], this, "+=0")

        //carasco
        .to(path_carasco, 0.8, {opacity:1, y:0, ease: Power1.easeOut}, "+=0.2")
        .to(g_carasco, 0.5, {rotation:"0deg", ease: Power1.easeOut}, "-=0.4")
        .to(path_Amask_carasco, 1, {strokeDashoffset:"195px", ease: Power1.easeOut}, "-=0.4")
        .call(runTimelineAnim, [arrayAnim, runingPatternLinesCircle_pt2], this, "-=1.3")
        .to(path_design, 0.4, {opacity:1, y:0, ease: Power1.easeOut}, "-=0.8")
        .to(g_design, 0.4, {rotation:"0deg", ease: Power1.easeOut}, "-=0.55")
        .to(g_circle_line, 0.2, {opacity:0, ease: Power1.easeIn}, "-=0.7")

        //scale out car sco
        .staggerTo(path_tosclout, 0.4, {scale:0, transformOrigin:"50% 50%", ease: Power1.easeIn}, 0.1, "+=0.7")
        .to(g_design, 0.7, {opacity:0,ease: Power4.easeOut}, "-=0.4")


        //morph A into Today
        .to(path_maskA, 0.3, {opacity:0, transformOrigin:"50% 50%", ease: Power4.easeIn}, "-=1.1")
        .to(path_maskA, 0.5, {scale:0, transformOrigin:"50% 50%", ease: Power4.easeIn}, "-=1.1")
        .call(changeSizePattern, [$('pattern[id="gradient_rose_little"]'), 280], this, "-=0.4") //mask
        //.to(svg_carasco, 0.7, {scale:1.2, top:"-5%", ease: Power4.easeOut}, "-=0.4")
        .call(moveToday, [], this, "-=0.75") //mask
        .call(runTimelineAnim, [arrayAnim, RPtoday], this, "-=0.8") //mask

        //mask all useless SVG
        .to(svg_A, 0, {opacity:0}, "-=1")
        .to(svg_virgule, 0, {opacity:0}, "-=1")
        .to(svg_circles, 0, {opacity:0}, "-=0.5")
        */

        //type write sentences
        //.call(typewrite, [], this);
});

/* bject JS
function setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 100,
        tempTypeSpeed = 0;

    var type = function() {

        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }

        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }

    };

    return {
        type: type
    };
}

var typer = document.getElementById('typewriter');

typewriter = setupTypewriter(typewriter);

typewriter.type();
*/