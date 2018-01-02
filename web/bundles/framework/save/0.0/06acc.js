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
           animDef = {toAnimate : toAnimate};
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
            },
            //1
            {
                info :  "drawing a right bar",
                toAnimate : 'path',
                elem :  A2_logo_svg.select('path[data-anim-elem="2"]'),
                from :  A2_logo_svg.select('path[data-anim-elem="2"]').attr('d'),
                to :    A2_logo_svg.select('path[data-anim-elem="2"]').attr('to-path'),
                speed : genSpeed,
                easing : genEasing
            },
            //2
            {
                info :  "drawing middle bar",
                toAnimate : 'path',
                elem :  A2_logo_svg.select('path[data-anim-elem="3"]'),
                from :  A2_logo_svg.select('path[data-anim-elem="3"]').attr('d'),
                to :    A2_logo_svg.select('path[data-anim-elem="3"]').attr('to-path'),
                speed : genSpeed,
                easing : genEasing
            },
            //3
            {
                info :  "losange1 shadow",
                toAnimate : 'path',
                elem :  losange1.select('path[data-anim="shadow"]'),
                from :  losange1.select('path[data-anim="shadow"]').attr('d'),
                to :    losange1.select('path[data-anim="shadow"]').attr('to-path'),
                speed : 500,
                easing : elastic1
            },
            //4
            {
                info :  "losange2 shadow",
                toAnimate : 'path',
                elem :  losange2.select('path[data-anim="shadow"]'),
                from :  losange2.select('path[data-anim="shadow"]').attr('d'),
                to :    losange2.select('path[data-anim="shadow"]').attr('to-path'),
                speed : 500,
                easing : elastic1
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

    //replace A path with another
     var oldA;
    function replaceApath() {
        newA = $('svg[data-elem="A_shape1"] path').attr('d');
        oldA = $('svg[data-elem="A_shape2"]').html();
        $('svg[data-elem="A_shape2"] path').eq(0).attr('d',newA);
        $('svg[data-elem="A_shape2"] path')[2].remove();
        $('svg[data-elem="A_shape2"] path')[1].remove();
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
    //var logContainer = $('#logo');
    var A_shape_intro = $("svg[data-elem='A_shape2']");
    //var name_svg_content = $('.logo_fp_container');
    var design_word = $("svg[data-elem='word_design']");
    var losange1 = $("svg[data-elem='losange1']");
    var losange1shadow = losange1.find($('path[data-anim="shadow"]'));
    var losange2 = $("svg[data-elem='losange2']");
    var losange2shadow = losange2.find($('path[data-anim="shadow"]'));
    var design_word_container = $('.logo_sp_content');
    var mask_design = $('div[data-elem="design_mask"]');
    var logo_fp_svg = $('.logo_fp_content svg');
    var logo_fp_path = $('.logo_fp_content svg path');
    var loso_sp_svg = $('.logo_sp_content svg');
    //var a_lb = A_shape_intro.find($("path[data-anim-elem='1']"));
    //var a_rb = A_shape_intro.find($("path[data-anim-elem='2']"));
    //var a_mb = A_shape_intro.find($("path[data-anim-elem='3']"));

    //$('svg').attr('opacity','0');

    //noinspection JSUnresolvedFunction

    /*{% extends 'base.html.twig' %}

     {% block body %}
     <section id="intro">
     <div id="logo">
     <div class="logo_fp_container">
     <div class="logo_fp_content">
     <svg data-elem="C_shape" viewBox="0.287 -1.662 142.713 133.224">
     <g data-elem="C_shape">
     <path d="M76.166,131.563c-9.149,0-17.75-1.646-25.803-4.941c-8.052-3.293-15.037-7.896-20.953-13.816
     c-5.919-5.916-10.614-12.93-14.091-21.045c-3.477-8.111-5.215-16.928-5.215-26.443v-0.366c0-9.271,1.707-17.963,5.124-26.078
     c3.414-8.112,8.112-15.189,14.091-21.228c5.976-6.039,13.084-10.766,21.319-14.183c8.235-3.414,17.231-5.124,26.993-5.124
     c6.588,0,12.563,0.641,17.934,1.921c5.367,1.281,10.276,3.111,14.731,5.49c4.452,2.379,8.478,5.215,12.078,8.509
     c3.597,3.294,6.8,6.894,9.607,10.797l-26.718,20.679c-3.66-4.635-7.686-8.295-12.078-10.98c-4.393-2.682-9.699-4.026-15.921-4.026
     c-4.515,0-8.633,0.886-12.353,2.653c-3.723,1.77-6.926,4.181-9.608,7.229c-2.685,3.051-4.789,6.651-6.313,10.797
     c-1.527,4.149-2.287,8.541-2.287,13.176v0.366c0,4.758,0.76,9.241,2.287,13.45c1.524,4.209,3.629,7.841,6.313,10.889
     c2.682,3.051,5.885,5.462,9.608,7.229c3.72,1.771,7.838,2.654,12.353,2.654c3.294,0,6.313-0.366,9.058-1.098
     c2.746-0.732,5.244-1.799,7.504-3.203c2.256-1.401,4.392-3.049,6.404-4.941c2.014-1.89,3.995-3.994,5.947-6.313l26.719,19.031
     c-3.051,4.148-6.377,7.992-9.974,11.529c-3.601,3.539-7.687,6.588-12.261,9.15c-4.575,2.562-9.699,4.574-15.372,6.039
     C89.617,130.83,83.24,131.563,76.166,131.563z"/>
     </g>
     <g data-elem="A_shape1">
     <path d="M106,129l-8.9-23H61l11-27h14.6L72.1,41.9L37,129H0L55,0h0.8H89l54,129H106z"/>
     </g>
     <g data-elem="R_shape">
     <path d="M12.574,0.9h60.572c9.883,0,18.238,1.221,25.072,3.66c6.83,2.442,12.381,5.856,16.652,10.248
     c7.563,7.32,11.346,17.265,11.346,29.829v0.366c0,9.882-2.379,18.057-7.137,24.522c-4.758,6.468-11.164,11.409-19.215,14.823
     L130.426,129H89.434L63.631,90.205h-0.366H48.076V129H12.574V0.9z M71.5,62.389c6.1,0,10.797-1.373,14.09-4.118
     c3.295-2.745,4.941-6.434,4.941-11.071v-0.366c0-5.124-1.709-8.936-5.123-11.438c-3.418-2.499-8.115-3.751-14.091-3.751H48.076
     v30.744H71.5z"/>
     </g>
     <g>
     <path data-anim-elem="1" d="M35.333,129h-34H0h37H35.333z" to-path="M89,0H55L0,129h37L89,0z"/>
     <path data-anim-elem="2" d="M55.833,0H89h1.833h-37H55.833z" to-path="M55.833,0H89l54,129h-37L55.833,0z"/>
     <path data-anim-elem="3" d="M102.771,106L114,79l0,0L102.771,106L102.771,106z" to-path="M102.771,106l11.229-27H72l-11,27H102.771z"/>
     </g>
     </svg>
     <svg data-elem="A_shape1" viewBox="0 0 143 129">

     </svg>
     <svg data-elem="R_shape" viewBox="0 0 143 129">
     <g>
     <path d="M12.574,0.9h60.572c9.883,0,18.238,1.221,25.072,3.66c6.83,2.442,12.381,5.856,16.652,10.248
     c7.563,7.32,11.346,17.265,11.346,29.829v0.366c0,9.882-2.379,18.057-7.137,24.522c-4.758,6.468-11.164,11.409-19.215,14.823
     L130.426,129H89.434L63.631,90.205h-0.366H48.076V129H12.574V0.9z M71.5,62.389c6.1,0,10.797-1.373,14.09-4.118
     c3.295-2.745,4.941-6.434,4.941-11.071v-0.366c0-5.124-1.709-8.936-5.123-11.438c-3.418-2.499-8.115-3.751-14.091-3.751H48.076
     v30.744H71.5z"/>
     </g>
     </svg>
     <svg data-elem="A_shape2" viewBox="0 0 143 129">
     <g>
     <path data-anim-elem="1" d="M35.333,129h-34H0h37H35.333z" to-path="M89,0H55L0,129h37L89,0z"/>
     <path data-anim-elem="2" d="M55.833,0H89h1.833h-37H55.833z" to-path="M55.833,0H89l54,129h-37L55.833,0z"/>
     <path data-anim-elem="3" d="M102.771,106L114,79l0,0L102.771,106L102.771,106z" to-path="M102.771,106l11.229-27H72l-11,27H102.771z"/>
     </g>
     </svg>
     <svg data-elem="S_shape" viewBox="0 0 143 129">
     <g>
     <path d="M75.617,131.197c-11.468,0-22.357-1.781-32.665-5.34c-10.311-3.559-19.429-8.9-27.358-16.021l19.764-23.658
     c12.81,10.247,26.655,15.372,41.541,15.372c4.758,0,8.387-0.761,10.889-2.282c2.498-1.521,3.752-3.686,3.752-6.487v-0.363
     c0-1.338-0.307-2.527-0.916-3.563c-0.611-1.035-1.738-2.039-3.385-3.014c-1.646-0.973-3.843-1.916-6.588-2.832
     c-2.745-0.914-6.313-1.857-10.706-2.833c-6.834-1.581-13.176-3.317-19.032-5.204s-10.951-4.323-15.28-7.309
     c-4.332-2.982-7.749-6.697-10.248-11.143c-2.502-4.443-3.751-9.956-3.751-16.533v-0.363c0-5.967,1.126-11.449,3.385-16.441
     c2.256-4.993,5.55-9.316,9.882-12.97c4.329-3.654,9.544-6.485,15.646-8.495c6.099-2.007,12.993-3.014,20.679-3.014
     c10.979,0,20.771,1.444,29.372,4.329c8.6,2.885,16.377,7.151,23.332,12.795l-17.752,25.148c-5.855-4.146-11.865-7.289-18.024-9.424
     c-6.162-2.133-12.109-3.203-17.843-3.203c-4.271,0-7.474,0.792-9.607,2.376c-2.136,1.584-3.202,3.531-3.202,5.845v0.366
     c0,1.461,0.334,2.739,1.006,3.834c0.669,1.098,1.83,2.102,3.477,3.017s3.903,1.827,6.771,2.739
     c2.865,0.915,6.497,1.859,10.888,2.831c7.32,1.584,13.937,3.44,19.856,5.57c5.916,2.133,10.947,4.721,15.096,7.766
     c4.146,3.046,7.32,6.728,9.518,11.052c2.195,4.323,3.293,9.471,3.293,15.435v0.366c0,6.576-1.252,12.424-3.752,17.537
     c-2.502,5.115-6.01,9.47-10.521,13.061c-4.516,3.595-9.945,6.334-16.287,8.221C90.5,130.252,83.424,131.197,75.617,131.197z"/>
     </g>
     </svg>
     <svg data-elem="C_shape" viewBox="0.287 -1.662 142.713 133.224">
     <g>
     <path d="M76.166,131.563c-9.149,0-17.75-1.646-25.803-4.941c-8.052-3.293-15.037-7.896-20.953-13.816
     c-5.919-5.916-10.614-12.93-14.091-21.045c-3.477-8.111-5.215-16.928-5.215-26.443v-0.366c0-9.271,1.707-17.963,5.124-26.078
     c3.414-8.112,8.112-15.189,14.091-21.228c5.976-6.039,13.084-10.766,21.319-14.183c8.235-3.414,17.231-5.124,26.993-5.124
     c6.588,0,12.563,0.641,17.934,1.921c5.367,1.281,10.276,3.111,14.731,5.49c4.452,2.379,8.478,5.215,12.078,8.509
     c3.597,3.294,6.8,6.894,9.607,10.797l-26.718,20.679c-3.66-4.635-7.686-8.295-12.078-10.98c-4.393-2.682-9.699-4.026-15.921-4.026
     c-4.515,0-8.633,0.886-12.353,2.653c-3.723,1.77-6.926,4.181-9.608,7.229c-2.685,3.051-4.789,6.651-6.313,10.797
     c-1.527,4.149-2.287,8.541-2.287,13.176v0.366c0,4.758,0.76,9.241,2.287,13.45c1.524,4.209,3.629,7.841,6.313,10.889
     c2.682,3.051,5.885,5.462,9.608,7.229c3.72,1.771,7.838,2.654,12.353,2.654c3.294,0,6.313-0.366,9.058-1.098
     c2.746-0.732,5.244-1.799,7.504-3.203c2.256-1.401,4.392-3.049,6.404-4.941c2.014-1.89,3.995-3.994,5.947-6.313l26.719,19.031
     c-3.051,4.148-6.377,7.992-9.974,11.529c-3.601,3.539-7.687,6.588-12.261,9.15c-4.575,2.562-9.699,4.574-15.372,6.039
     C89.617,130.83,83.24,131.563,76.166,131.563z"/>
     </g>
     </svg>
     <svg data-elem="O_shape" viewBox="0.287 -1.662 142.713 133.224">
     <g data-elem="O_shape">
     <path d="M71.317,131.609c-9.883,0-19.033-1.738-27.451-5.215c-8.418-3.478-15.678-8.204-21.777-14.184
     c-6.102-5.976-10.889-12.992-14.366-21.045c-3.477-8.052-5.215-16.652-5.215-25.803v-0.365c0-9.151,1.738-17.78,5.215-25.895
     c3.477-8.112,8.327-15.189,14.548-21.228c6.222-6.039,13.542-10.797,21.96-14.274c8.418-3.477,17.568-5.216,27.45-5.216
     s19.032,1.739,27.45,5.216c8.418,3.477,15.675,8.206,21.776,14.182c6.1,5.979,10.889,12.993,14.366,21.045
     c3.477,8.052,5.216,16.653,5.216,25.803v0.367c0,9.149-1.739,17.781-5.216,25.895c-3.478,8.114-8.327,15.188-14.549,21.227
     c-6.222,6.039-13.542,10.798-21.96,14.275C90.349,129.871,81.198,131.609,71.317,131.609z M71.591,99.584
     c4.893,0,9.359-0.914,13.396-2.744s7.463-4.301,10.277-7.412c2.813-3.111,5.015-6.739,6.604-10.889
     c1.59-4.146,2.388-8.537,2.388-13.176v-0.365c0-4.636-0.798-9.028-2.388-13.177c-1.59-4.146-3.854-7.806-6.788-10.98
     c-2.937-3.171-6.422-5.702-10.459-7.594c-4.038-1.89-8.504-2.837-13.396-2.837c-4.896,0-9.331,0.915-13.305,2.745
     c-3.977,1.83-7.403,4.301-10.279,7.412s-5.078,6.742-6.605,10.889c-1.53,4.149-2.293,8.541-2.293,13.175v0.367
     c0,4.637,0.795,9.029,2.385,13.176c1.59,4.148,3.823,7.809,6.7,10.979c2.874,3.174,6.331,5.704,10.368,7.595
     C62.232,98.641,66.695,99.584,71.591,99.584z"/>
     </g>
     </svg>
     </div>
     <!--<div class="logo_fp_content">
     <svg data-elem="C_shape" viewBox="0.287 -1.662 142.713 133.224">
     <g>
     <path d="M76.166,131.563c-9.149,0-17.75-1.646-25.803-4.941c-8.052-3.293-15.037-7.896-20.953-13.816
     c-5.919-5.916-10.614-12.93-14.091-21.045c-3.477-8.111-5.215-16.928-5.215-26.443v-0.366c0-9.271,1.707-17.963,5.124-26.078
     c3.414-8.112,8.112-15.189,14.091-21.228c5.976-6.039,13.084-10.766,21.319-14.183c8.235-3.414,17.231-5.124,26.993-5.124
     c6.588,0,12.563,0.641,17.934,1.921c5.367,1.281,10.276,3.111,14.731,5.49c4.452,2.379,8.478,5.215,12.078,8.509
     c3.597,3.294,6.8,6.894,9.607,10.797l-26.718,20.679c-3.66-4.635-7.686-8.295-12.078-10.98c-4.393-2.682-9.699-4.026-15.921-4.026
     c-4.515,0-8.633,0.886-12.353,2.653c-3.723,1.77-6.926,4.181-9.608,7.229c-2.685,3.051-4.789,6.651-6.313,10.797
     c-1.527,4.149-2.287,8.541-2.287,13.176v0.366c0,4.758,0.76,9.241,2.287,13.45c1.524,4.209,3.629,7.841,6.313,10.889
     c2.682,3.051,5.885,5.462,9.608,7.229c3.72,1.771,7.838,2.654,12.353,2.654c3.294,0,6.313-0.366,9.058-1.098
     c2.746-0.732,5.244-1.799,7.504-3.203c2.256-1.401,4.392-3.049,6.404-4.941c2.014-1.89,3.995-3.994,5.947-6.313l26.719,19.031
     c-3.051,4.148-6.377,7.992-9.974,11.529c-3.601,3.539-7.687,6.588-12.261,9.15c-4.575,2.562-9.699,4.574-15.372,6.039
     C89.617,130.83,83.24,131.563,76.166,131.563z"/>
     </g>
     </svg>
     <svg data-elem="A_shape1" viewBox="0 0 143 129">
     <g>
     <path data-anim-elem="1" d="M89,0H55L0,129h37L89,0z"/>
     <path data-anim-elem="2" d="M55.833,0H89l54,129h-37L55.833,0z"/>
     <path data-anim-elem="3" d="M102.771,106l11.229-27H72l-11,27H102.771z"/>
     </g>
     </svg>
     <svg data-elem="R_shape" viewBox="0 0 143 129">
     <g>
     <path d="M12.574,0.9h60.572c9.883,0,18.238,1.221,25.072,3.66c6.83,2.442,12.381,5.856,16.652,10.248
     c7.563,7.32,11.346,17.265,11.346,29.829v0.366c0,9.882-2.379,18.057-7.137,24.522c-4.758,6.468-11.164,11.409-19.215,14.823
     L130.426,129H89.434L63.631,90.205h-0.366H48.076V129H12.574V0.9z M71.5,62.389c6.1,0,10.797-1.373,14.09-4.118
     c3.295-2.745,4.941-6.434,4.941-11.071v-0.366c0-5.124-1.709-8.936-5.123-11.438c-3.418-2.499-8.115-3.751-14.091-3.751H48.076
     v30.744H71.5z"/>
     </g>
     </svg>
     <svg data-elem="A_shape2" viewBox="0 0 143 129">
     <g>
     <path data-anim-elem="1" d="M35.333,129h-34H0h37H35.333z" to-path="M89,0H55L0,129h37L89,0z"/>
     <path data-anim-elem="2" d="M55.833,0H89h1.833h-37H55.833z" to-path="M55.833,0H89l54,129h-37L55.833,0z"/>
     <path data-anim-elem="3" d="M102.771,106L114,79l0,0L102.771,106L102.771,106z" to-path="M102.771,106l11.229-27H72l-11,27H102.771z"/>
     </g>
     </svg>
     <svg data-elem="S_shape" viewBox="0 0 143 129">
     <g>
     <path d="M75.617,131.197c-11.468,0-22.357-1.781-32.665-5.34c-10.311-3.559-19.429-8.9-27.358-16.021l19.764-23.658
     c12.81,10.247,26.655,15.372,41.541,15.372c4.758,0,8.387-0.761,10.889-2.282c2.498-1.521,3.752-3.686,3.752-6.487v-0.363
     c0-1.338-0.307-2.527-0.916-3.563c-0.611-1.035-1.738-2.039-3.385-3.014c-1.646-0.973-3.843-1.916-6.588-2.832
     c-2.745-0.914-6.313-1.857-10.706-2.833c-6.834-1.581-13.176-3.317-19.032-5.204s-10.951-4.323-15.28-7.309
     c-4.332-2.982-7.749-6.697-10.248-11.143c-2.502-4.443-3.751-9.956-3.751-16.533v-0.363c0-5.967,1.126-11.449,3.385-16.441
     c2.256-4.993,5.55-9.316,9.882-12.97c4.329-3.654,9.544-6.485,15.646-8.495c6.099-2.007,12.993-3.014,20.679-3.014
     c10.979,0,20.771,1.444,29.372,4.329c8.6,2.885,16.377,7.151,23.332,12.795l-17.752,25.148c-5.855-4.146-11.865-7.289-18.024-9.424
     c-6.162-2.133-12.109-3.203-17.843-3.203c-4.271,0-7.474,0.792-9.607,2.376c-2.136,1.584-3.202,3.531-3.202,5.845v0.366
     c0,1.461,0.334,2.739,1.006,3.834c0.669,1.098,1.83,2.102,3.477,3.017s3.903,1.827,6.771,2.739
     c2.865,0.915,6.497,1.859,10.888,2.831c7.32,1.584,13.937,3.44,19.856,5.57c5.916,2.133,10.947,4.721,15.096,7.766
     c4.146,3.046,7.32,6.728,9.518,11.052c2.195,4.323,3.293,9.471,3.293,15.435v0.366c0,6.576-1.252,12.424-3.752,17.537
     c-2.502,5.115-6.01,9.47-10.521,13.061c-4.516,3.595-9.945,6.334-16.287,8.221C90.5,130.252,83.424,131.197,75.617,131.197z"/>
     </g>
     </svg>
     <svg data-elem="C_shape" viewBox="0.287 -1.662 142.713 133.224">
     <g>
     <path d="M76.166,131.563c-9.149,0-17.75-1.646-25.803-4.941c-8.052-3.293-15.037-7.896-20.953-13.816
     c-5.919-5.916-10.614-12.93-14.091-21.045c-3.477-8.111-5.215-16.928-5.215-26.443v-0.366c0-9.271,1.707-17.963,5.124-26.078
     c3.414-8.112,8.112-15.189,14.091-21.228c5.976-6.039,13.084-10.766,21.319-14.183c8.235-3.414,17.231-5.124,26.993-5.124
     c6.588,0,12.563,0.641,17.934,1.921c5.367,1.281,10.276,3.111,14.731,5.49c4.452,2.379,8.478,5.215,12.078,8.509
     c3.597,3.294,6.8,6.894,9.607,10.797l-26.718,20.679c-3.66-4.635-7.686-8.295-12.078-10.98c-4.393-2.682-9.699-4.026-15.921-4.026
     c-4.515,0-8.633,0.886-12.353,2.653c-3.723,1.77-6.926,4.181-9.608,7.229c-2.685,3.051-4.789,6.651-6.313,10.797
     c-1.527,4.149-2.287,8.541-2.287,13.176v0.366c0,4.758,0.76,9.241,2.287,13.45c1.524,4.209,3.629,7.841,6.313,10.889
     c2.682,3.051,5.885,5.462,9.608,7.229c3.72,1.771,7.838,2.654,12.353,2.654c3.294,0,6.313-0.366,9.058-1.098
     c2.746-0.732,5.244-1.799,7.504-3.203c2.256-1.401,4.392-3.049,6.404-4.941c2.014-1.89,3.995-3.994,5.947-6.313l26.719,19.031
     c-3.051,4.148-6.377,7.992-9.974,11.529c-3.601,3.539-7.687,6.588-12.261,9.15c-4.575,2.562-9.699,4.574-15.372,6.039
     C89.617,130.83,83.24,131.563,76.166,131.563z"/>
     </g>
     </svg>
     <svg data-elem="O_shape" viewBox="0.287 -1.662 142.713 133.224">
     <g data-elem="O_shape">
     <path d="M71.317,131.609c-9.883,0-19.033-1.738-27.451-5.215c-8.418-3.478-15.678-8.204-21.777-14.184
     c-6.102-5.976-10.889-12.992-14.366-21.045c-3.477-8.052-5.215-16.652-5.215-25.803v-0.365c0-9.151,1.738-17.78,5.215-25.895
     c3.477-8.112,8.327-15.189,14.548-21.228c6.222-6.039,13.542-10.797,21.96-14.274c8.418-3.477,17.568-5.216,27.45-5.216
     s19.032,1.739,27.45,5.216c8.418,3.477,15.675,8.206,21.776,14.182c6.1,5.979,10.889,12.993,14.366,21.045
     c3.477,8.052,5.216,16.653,5.216,25.803v0.367c0,9.149-1.739,17.781-5.216,25.895c-3.478,8.114-8.327,15.188-14.549,21.227
     c-6.222,6.039-13.542,10.798-21.96,14.275C90.349,129.871,81.198,131.609,71.317,131.609z M71.591,99.584
     c4.893,0,9.359-0.914,13.396-2.744s7.463-4.301,10.277-7.412c2.813-3.111,5.015-6.739,6.604-10.889
     c1.59-4.146,2.388-8.537,2.388-13.176v-0.365c0-4.636-0.798-9.028-2.388-13.177c-1.59-4.146-3.854-7.806-6.788-10.98
     c-2.937-3.171-6.422-5.702-10.459-7.594c-4.038-1.89-8.504-2.837-13.396-2.837c-4.896,0-9.331,0.915-13.305,2.745
     c-3.977,1.83-7.403,4.301-10.279,7.412s-5.078,6.742-6.605,10.889c-1.53,4.149-2.293,8.541-2.293,13.175v0.367
     c0,4.637,0.795,9.029,2.385,13.176c1.59,4.148,3.823,7.809,6.7,10.979c2.874,3.174,6.331,5.704,10.368,7.595
     C62.232,98.641,66.695,99.584,71.591,99.584z"/>
     </g>
     </svg>
     </div>!-->
     </div>
     <div class="logo_sp_container">
     <div class="logo_sp_content">
     <div class="mask" data-elem="design_mask">

     </div>
     <svg data-elem="losange1" viewBox="0 0 203.5 91.2">
     <path data-anim="shadow" d="M101.7,21.4L77.5,45.6l24.2,24.2L126,45.6L101.7,21.4z M101.8,69.8L77.5,45.6l24.2-24.2L126,45.6L101.8,69.8z" to-path="M101.8,0.6l-45,45l45,45l45-45L101.8,0.6z M101.7,69.8L77.5,45.6l24.3-24.2L126,45.6L101.7,69.8z"/>
     <path d="M77.5,45.6l24.2,24.2L126,45.6l-24.2-24.2L77.5,45.6z M101.7,35.2l10.4,10.4L101.7,56L91.3,45.6L101.7,35.2z"/>
     </svg>
     <svg data-elem="word_design" viewBox="0 0 588.8 91.2">
     <path d="M0,1.5h32.9c6.9,0,13.2,1.1,19,3.3c5.8,2.2,10.7,5.3,14.9,9.3c4.2,3.9,7.4,8.6,9.6,13.9
     c2.3,5.3,3.4,11.1,3.4,17.3v0.3c0,6.2-1.1,12-3.4,17.4c-2.3,5.4-5.5,10-9.6,14c-4.2,3.9-9.1,7.1-14.9,9.3c-5.8,2.3-12.1,3.4-19,3.4
     H0V1.5z M32.8,75.7c4.6,0,8.8-0.7,12.6-2.2c3.8-1.5,7-3.5,9.6-6.2s4.7-5.8,6.2-9.5c1.5-3.7,2.2-7.7,2.2-12v-0.3
     c0-4.3-0.7-8.3-2.2-12c-1.5-3.7-3.5-6.9-6.2-9.6c-2.6-2.7-5.9-4.7-9.6-6.3c-3.8-1.5-8-2.3-12.6-2.3H15.4v60.2H32.8z"/>
     <path d="M120.5,1.5h65.3v14h-49.9v22.7h44.2v14h-44.2v23.6h50.5v14h-65.9V1.5z"/>
     <path d="M257.8,91c-6.8,0-13.3-1.2-19.5-3.5c-6.2-2.3-12-5.9-17.3-10.6l9.3-11.1c4.3,3.7,8.6,6.5,13,8.5
     c4.4,2,9.3,3,14.9,3c4.8,0,8.6-1,11.4-3c2.8-2,4.2-4.7,4.2-8.1v-0.3c0-1.6-0.3-3-0.8-4.2c-0.5-1.2-1.6-2.4-3-3.5
     c-1.5-1.1-3.5-2.1-6.1-3c-2.6-0.9-5.9-1.8-10-2.8c-4.7-1.1-8.9-2.3-12.6-3.7c-3.7-1.4-6.7-3.1-9.2-5c-2.5-2-4.4-4.4-5.7-7.2
     c-1.3-2.9-2-6.3-2-10.3v-0.3c0-3.8,0.7-7.2,2.2-10.4s3.6-5.8,6.2-8.1c2.6-2.2,5.8-4,9.5-5.2c3.7-1.3,7.7-1.9,12.1-1.9
     c6.5,0,12.3,0.9,17.5,2.8c5.2,1.9,10,4.6,14.6,8.3l-8.3,11.7c-4-2.9-8-5.2-12-6.7c-3.9-1.6-7.9-2.3-12-2.3c-4.5,0-8.1,1-10.6,3
     c-2.5,2-3.8,4.5-3.8,7.4v0.3c0,1.7,0.3,3.2,0.9,4.5c0.6,1.3,1.7,2.5,3.2,3.5c1.6,1.1,3.7,2,6.4,3c2.7,0.9,6.2,1.9,10.4,2.9
     c4.6,1.2,8.7,2.5,12.3,3.9c3.6,1.4,6.5,3.2,8.9,5.2c2.4,2.1,4.1,4.5,5.4,7.2c1.2,2.7,1.8,5.9,1.8,9.5v0.3c0,4.1-0.8,7.8-2.3,11.1
     c-1.5,3.3-3.7,6-6.4,8.3c-2.7,2.3-6.1,4-9.9,5.2C266.7,90.4,262.4,91,257.8,91z"/>
     <path d="M330.2,1.5h15.4v88.2h-15.4V1.5z"/>
     <path d="M433.1,91.2c-6.9,0-13.1-1.2-18.8-3.5c-5.6-2.3-10.4-5.5-14.4-9.6c-4-4.1-7.1-8.9-9.3-14.4
     c-2.2-5.5-3.3-11.5-3.3-18v-0.3c0-6.1,1.1-12,3.4-17.5c2.2-5.5,5.4-10.4,9.5-14.6c4.1-4.2,8.9-7.5,14.5-9.9
     c5.6-2.4,11.7-3.7,18.3-3.7c3.9,0,7.4,0.3,10.5,0.8c3.1,0.5,6.1,1.3,8.8,2.3c2.7,1,5.2,2.2,7.6,3.7c2.4,1.5,4.7,3.2,7,5.1L457,23.7
     c-1.7-1.4-3.4-2.7-5.2-3.9c-1.8-1.2-3.6-2.2-5.5-3c-1.9-0.8-4.1-1.4-6.4-1.9c-2.3-0.5-4.9-0.7-7.6-0.7c-4,0-7.8,0.8-11.3,2.5
     c-3.5,1.7-6.5,3.9-9.1,6.8c-2.6,2.8-4.6,6.1-6,9.9c-1.5,3.8-2.2,7.8-2.2,12v0.3c0,4.5,0.7,8.8,2.1,12.6c1.4,3.9,3.5,7.2,6.1,10
     c2.6,2.8,5.8,5,9.4,6.6c3.6,1.6,7.7,2.4,12.3,2.4c4.2,0,8.1-0.6,11.8-1.8c3.6-1.2,6.8-2.8,9.5-4.9V53.9h-22.6V40.4h37.5v37
     c-2.2,1.8-4.6,3.6-7.2,5.3c-2.6,1.7-5.5,3.1-8.6,4.4c-3.1,1.3-6.4,2.2-9.9,3C440.6,90.9,436.9,91.2,433.1,91.2z"/>
     <path d="M511.9,1.5h14.3l47.2,61v-61h15.4v88.2h-13L527.3,27v62.7h-15.4V1.5z"/>
     </svg>
     <svg data-elem="losange2" viewBox="0 0 203.5 91.2">
     <path data-anim="shadow" d="M101.7,21.4L77.5,45.6l24.2,24.2L126,45.6L101.7,21.4z M101.8,69.8L77.5,45.6l24.2-24.2L126,45.6L101.8,69.8z" to-path="M101.8,0.6l-45,45l45,45l45-45L101.8,0.6z M101.7,69.8L77.5,45.6l24.3-24.2L126,45.6L101.7,69.8z"/>
     <path d="M77.5,45.6l24.2,24.2L126,45.6l-24.2-24.2L77.5,45.6z M101.7,35.2l10.4,10.4L101.7,56L91.3,45.6L101.7,35.2z"/>
     </svg>
     </div>
     </div>
     </div>
     </section>
     <section id="topmenu" class="container">
     <div class="content">
     <nav>
     <item>menu1</item>
     <item>menu2</item>
     <item>menu3</item>
     <item>menu4</item>
     </nav>
     </div>
     </section>
     <section id="acc-pg1">

     </section>
     <section id="acc-pg2">

     </section>
     {% endblock %}*/
    tl = new TimelineLite();
    tl
        .call(runTimelineAnim, [arrayAnim, runingPatternDrawA]) //le call doit etre en premier sinon le scale du .from ne se fait pas
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

        .add(drawLineTopMenu, [], this, "+=5");

        //fondu degeu
            //fondu se fait avant l'animation, fondu rapide
            //sens d'exec du dashoffset inversé

        //.staggerFrom("#logo .logo_sp_content svg", 0.3, {y:-30}, 0.6, "-=1.2")
        //.to(losange1, 0.5, {marginTop:0}, "-=0.6")
        //.to(losange2, 0.5, {marginTop:0}, "-=0.6")

        //.to(logo_fp_svg, 2, {stroke: "white"}, "-=2.8");
        //remplacer le A du centre CARASCO, fill les lettres en white, desiner la stroke

        //.staggerFrom("#logo .logo_sp_content svg", 0.3, {y:-30}, 0.6, "-=1.2")
        //.to(loso_sp_svg, 1, {marginTop:"-10vw"}, "-=2");

        /*
        .from(losange1, 0.4, {scale:3, opacity:0})
        .from(losange2, 0.4, {scale:3, opacity:0}, "-=0.4")
        .call(runTimelineAnim, [arrayAnim, runingPatternDrawLosange])
        .to(losange1shadow, 1.7, {scale:2, transformOrigin:"50% 50%", opacity:0}, "-=0.3")
        .to(losange2shadow, 1.7, {scale:2, transformOrigin:"50% 50%", opacity:0}, "-=1.7")
        .call(runTimelineAnim, [arrayAnim, runingPatternDrawLosange, true], "-=0.2")
        //.set(mask_design, {background: "linear-gradient(45deg, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%)"});
        .fromTo(mask_design, 3, {backgroundPosition: "300% 0%"}, {backgroundPosition: "0% 0%"});
        */

        //.to(losange1shadow, 1.7, {scale:0, transformOrigin:"50% 50%", opacity:1})
        //.to(losange2shadow, 1.7, {scale:0, transformOrigin:"50% 50%", opacity:1}, "-=1.7")
        //.to(mask_design, 3, {background:"linear-gradient(45deg, red, green)"});
        //.staggerTo(mask_design, 1, {
        //    stopColor:'#cc0000',
        //cycle:{
        //    stopColor: ['#ff9999','#ff7777','#ff5555', '#ff3333','#ff1111','#ff8888']
        //}
        //}, 0.1, 0);
        //.to(losange1, 0.5, {scale:0, transformOrigin:"50% 50%", opacity:0}, "-=1.4")
        //.to(losange2, 0.5, {scale:0, transformOrigin:"50% 50%", opacity:0}, "-=1.4");
        //.from(losange1shadow, 1.7, {scale:2, transformOrigin:"50% 50%", opacity:0}, "+=1")
        //.from(losange2shadow, 1.7, {scale:2, transformOrigin:"50% 50%", opacity:0}, "+=2");

        //dessiner STREAT NEW ADV avec les contour
        //pareil carasco design
        //t home porte folio contact tombent du haut de la page
        //apparaitre l'image en fondu
});