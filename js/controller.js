/*
 *
 *	Marcin Tatuś
 *	7IGR_S 2018
 *	WSTI w Katowicach
 *  
 *  NAME: controller.js
 *  DESCRIPTION: This JavaScript file uses 'BeatboxTool' class to change View
 *  
 */


$(document).ready(function(){

    var openedContent = 0;

    $('.info').click(function(){
        switch(openedContent){
            case 0 : break;
            case 1 : {
                $('#noises').fadeOut('slow',function(){
                    $('#info').fadeIn('slow');
                });
            } break;
            case 2 : {
                $('#permutations').fadeOut('slow',function(){
                    $('#info').fadeIn('slow');
                });
            } break;
        }
        openedContent = 0;
    });

    $('.random').click(function(){
        switch(openedContent){
            case 0 : {
                $('#info').fadeOut('slow',function(){
                    $('#noises').fadeIn('slow');
                }); 
                openedContent = 1;
            } break;
            case 1 : {
                $('#noises').fadeOut('slow',function(){ 
                    $('#permutations').fadeIn('slow'); 
                });
                openedContent = 2;
            } break;
            case 2 : {
                $('#permutations').fadeOut('slow',function(){
                    $('#noises').fadeIn('slow');
                }); 
                openedContent = 1;
            } break;
        }
    });

    // BeatboxTool control:
    var bt = new BeatboxTool($('#noises'),$('#chosenNoises'),$('#permutations'));

    $('#noises').on('click', '.folderHeader', function(event){
        bt.toggleFolder($(this));
    });
    
    $('#noises').on('click', '.noise', function(event){
        bt.addNoise($(this));
    });

    $('#chosenNoises').on('click', '.chosenNoise', function(event){
        $(this).fadeOut('slow', function(){ 
            bt.removeNoise($(this));
        });
    });

    $('.remove').click(function(){
        $('.chosenNoise').fadeOut('slow', function(){ 
            bt.removeAllNoises();
        });
    });

    $('#permutations').on('click', '.perm', function(event){
        bt.clickPermutation($(this).text());
    });

});