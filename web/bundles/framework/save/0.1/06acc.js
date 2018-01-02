$(function() {
    arrayAnim = [];
    runingPatternDrawA = [];
    runingPatternDrawLosange = [];
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
           animDef = {toAnimate : 0};
           if(reverse)
           {
               animDef[toAnimate] = anim.from;
           }
           else{
               animDef[toAnimate] = anim.to;
           }
           //s'il y a plusieurs anims qui s'effectuent en meme temps
           if(indexAnimToUseLength > 1)
           {
               if(i != indexAnimToUseLength - 1)
               {
                   anim.elem.animate(animDef, anim.speed, anim.easing);
               }
               else{
                   anim.elem.animate(animDef, anim.speed, anim.easing, function(){beginAt++; runTimelineAnim(arrayAnim, runingPattern, reverse, beginAt, endWhen)});
               }
           }
           //sinon
           else{
               //alert('ok');
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
        if(beginAt > endWhen)
        {
            //alert('pas ok');
            return false
        }
        else{
            //si revers est set, on parcour a l'envers
            var runingStep;
            if(reverse)
            {
                //alert('pas du tout ok');
                runingPattern.reverse();
            }
            runingStep = runingPattern[beginAt];
            //launch anims of paternStep with delay
            if(runingStep.delay)
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
        var genSpeed = 333;
        //var genEasing = mina.linear();
        var elastic1 = mina.elastic();
        var genEasing = "";

        //SVGS
        //var A1_logo_svg = Snap(document.querySelector('svg[data-elem="A_shape1"]'));
        var A2_logo_svg = Snap(document.querySelector('svg[data-elem="A_shape2"]'));
        //var C_logo_svg = Snap(document.querySelector('svg[data-elem="C_shape"]'));
        //var R_logo_svg = Snap(document.querySelector('svg[data-elem="R_shape"]'));
        //var S_logo_svg = Snap(document.querySelector('svg[data-elem="S_shape"]'));
        //var O_logo_svg = Snap(document.querySelector('svg[data-elem="O_shape"]'));
        var losange1 = Snap(document.querySelector('svg[data-elem="losange1"]'));
        var losange2 = Snap(document.querySelector('svg[data-elem="losange2"]'));


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
            }
        );

        //on crée un tableau de runing des anims
        //animIndexs : array() , contient les index des anim a charger simultanément
        //delay : int , delay a partir de laquelle les animations désignés par animIndexs doivent etre chargée
        runingPatternDrawA.push(
            {
                animIndexs: [0],
                delay: false
            },
            {
                animIndexs: [1],
                delay: false
            },
            {
                animIndexs: [2],
                delay: false
            }
        );

        runingPatternDrawLosange.push(
            {
                animIndexs: [3,4],
                delay: false
            }
        );
    }

    //draw line top menu anim
    function drawLineTopMenu() {
        $('#topmenu').addClass('drawline');
    }

    //init anims SVG
    initSVGAnims();

    //Tween Intro
    /*1. desinner le A
     //corp se crée avec animation sroke
     scaleOut le A
     2. scaleIn le logo et continuer le scale in pendant qq secondes, faire apparraitre chaque lettre en translate verticale en modifiant l'opacity
     3. l'etoile apparait en translate vertical, les etoiles se séparent et translate vers les coté
     le mot design se décoile a partir du centre
     */

    //SVG elems
    var losange1 = $("svg[data-elem='losange1']");
    var losange2 = $("svg[data-elem='losange2']");
    var svg_plain_word = $('svg[data-elem="plain-word"] path');
    var svg_plain_word_A = $('svg[data-elem="plain-word"] path[data-order="0"]');
    var svg_plain_word_RS = $('svg[data-elem="plain-word"] path[data-order="1"]');
    var svg_plain_word_AC = $('svg[data-elem="plain-word"] path[data-order="2"]');
    var svg_plain_word_CO = $('svg[data-elem="plain-word"] path[data-order="3"]');
    var content_svg_plainword = $('div[data-elem="svg2_container"] .svg_content');
    var container_svg_gradient = $('div[data-elem="svg1_container"]');
    var content_logo_fp = $('.logo_fp_content');

    //
    //import com.greensock.plugins.BlurFilterPlugin;
    //TweenPlugin.activate([BlurFilterPlugin]); //activation is permanent in the SWF, so this line only needs to be run once.

    //noinspection JSUnresolvedFunction
    tl = new TimelineLite();
    tl
        //.to(logo_fp_svg, 3, {strokeDashoffset: "-605px", ease: Power1.easeInOut});
        .staggerTo(svg_plain_word, 2, {strokeWidth: "0px", strokeDashoffset: "-605px", ease: Power1.easeInOut}, 0.3)
        .to(content_svg_plainword, 1.2, {height:0, ease: Power4. easeOut});
        //.to(content_logo_fp, 0.8, {marginTop:"-30px", ease: Power4. easeOut}, "-=1.1")
        //.to(content_logo_fp, 0.4, {marginTop:"0px", ease: Elastic.easeOut.config( 2.5, 1)}, "-=0.6");
        /*.to(svg_plain_word_A, 0.5, {scale:0, transformOrigin: "50% 50%", ease: Power1.easeInOut})
        .to(svg_plain_word_RS, 0.7, {scale:0, transformOrigin: "50% 50%", ease: Power1.easeInOut}, "-=0.6")
        .to(svg_plain_word_AC, 0.9, {scale:0, transformOrigin: "50% 50%", ease: Power1.easeInOut}, "-=0.6")
        .to(svg_plain_word_CO, 1, {scale:0, transformOrigin: "50% 50%", ease: Power1.easeInOut}, "-=0.6");*/
        /*.call(runTimelineAnim, [arrayAnim, runingPatternDrawA]) //le call doit etre en premier sinon le scale du .from ne se fait pas
        .from(A_shape_intro, 1, {scale:4, opacity:0, ease:Elastic.easeOut.config(1.5, 1)})
        .staggerFrom("#logo .logo_fp_container svg:not(svg[data-elem='A_shape2'])", 0.1, {opacity:0, y:-30, ease:Elastic.easeOut.config(1.5, 1)}, 0.1, "+=0.6")
        .to(design_word_container, 0.5, {marginTop:"2%"})
        .call(replaceApath)
        .to(loso_sp_svg, 0.5, {marginTop:0}, "-=0.6")

        .fromTo(mask_design, 2.5, {backgroundPosition: "300% 0%"}, {backgroundPosition: "0% 0%"}, '+=1')
        .to(loso_sp_svg, 8, {marginTop:"-10vw",  ease:Expo.easeOut}, "-=1.8")
        .to(logo_fp_path, 0.3, {fill:"white"}, "-=7.8")
        .to(logo_fp_svg, 1, {stroke:theoBlue, strokeWidth: "2px"}, "-=7.8")
        .to(logo_fp_svg, 3, {strokeDashoffset: "-660px", ease:Expo.easeOut}, "-=7.5")

        .add(drawLineTopMenu, [], this, "+=5");*/
});