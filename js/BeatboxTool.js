/*
 *
 *	Marcin Tatuś
 *	7IGR_S 2018
 *	WSTI w Katowicach
 *  
 *  NAME: BeatboxTool.js
 *  PARAMETERS:
 *  > divNoisesToChoose (for example: $('#noises'))
 *  > divChosenNoises (for example: $('#chosenNoises'))
 *  > divPermutations (for example: $('#permutations'))
 *  DESCRIPTION: JavaScript file with class 'BeatboxTool' and functions (prototypes)
 *  Class 'BeatboxTool' have all important functions like creating permutations or playing them
 *  
 */

function BeatboxTool( divNoisesToChoose, divChosenNoises, divPermutations ){
    this.sequence = [];
    this.permutationsAmount = 0;
    this.divNoisesToChoose = divNoisesToChoose;
    this.divChosenNoises = divChosenNoises;
    this.divPermutations = divPermutations;
    this.showFolders();
}



/*
 *  NAME: showFolders
 *  PARAMETERS: -
 *  DESCRIPTION: This function shows folders with noises to choose (from tables.js file with global variables)
 *  in the place specified in class parameter divNoisesToChoose
 */

BeatboxTool.prototype.showFolders = function(){
    for(i = 0; i < folders.length; i++){
        this.divNoisesToChoose
        .append('<div class="folder"></div>')
        .find('div').last()
        .append('<div class="folderHeader">'+folders[i]+'</div>')
        .append('<div class="folderContent"></div>');

        for(j = 0; j < noises.length; j++)
            if(noises[j].folder == folders[i]){
                $('.folderContent').last()
                .append('<div></div>')
                .find('div').last()
                .addClass('noise')
                .data('sign',noises[j].sign)
                .text(noises[j].name+' ['+noises[j].sign+']');
            }
    }
}



/*
 *  NAME: toggleFolder
 *  PARAMETERS: clickedFolder
 *  DESCRIPTION: cooperates with jQuery 'click' function, 'clickedFolder' variable should be '$(this)'
 */

BeatboxTool.prototype.toggleFolder = function(clickedFolder){
    clickedFolder.toggleClass('folderHeaderShadow').next().slideToggle('slow');
}



/*
 *  NAME: addNoise
 *  PARAMETERS: newNoise (sign of chosen noise)
 *  DESCRIPTION: function adds noise (sign in parameter 'newNoise') at the end of the sequence table
 *  and the left bar. It uses jQuery animation fadeIn.
 *  This function calls 'refreshHTML' function to refresh permutations in 'BeatboxTool' object and view
 */

BeatboxTool.prototype.addNoise = function(newNoise){
    this.sequence.push(newNoise.data('sign'));
    this.divChosenNoises.append('<div class="chosenNoise" style="display:none">'+newNoise.data('sign')+'</div>');
    this.refreshHTML();
    this.divChosenNoises.find('.chosenNoise').last().fadeIn('slow');
};



/*
 *  NAME: removeNoise
 *  PARAMETERS: noiseToRemove (cooperates with jQuery 'click' function, so variable should contain '$(this)')
 *  DESCRIPTION: removes chosen noise from the sequence and the left bar
 *  This function calls 'refreshHTML' function to refresh permutations in model and view
 *  To create fadeOut animation from jQuery, this function should be embeded in fadeOut function in controller
 *  
 *  For example:
 *  $(this).fadeOut('slow', function(){
 *      object.removeNoise($(this));
 *  });
 * 
 *  It not works when is embeded in this function
 */

BeatboxTool.prototype.removeNoise = function(noiseToRemove){
    for(i = 0; i < this.sequence.length; i++){
        if(this.sequence[i] == noiseToRemove.text()){
            this.sequence.splice(i,1);
            break;
        }
    }
    noiseToRemove.remove();
    this.refreshHTML();
};



/*
 *  NAME: removeAllNoises
 *  PARAMETERS: -
 *  DESCRIPTION: removes all chosen noise from the sequence and the left bar
 */

BeatboxTool.prototype.removeAllNoises = function(){
    this.sequence = [];
    this.refreshHTML();
};



/*
 *  NAME: refreshAmount
 *  PARAMETERS: -
 *  DESCRIPTION: counts new amount of permutations, changes 'permutationsAmount' variable
 *  in 'else' there are some code using combinatorial formula from permutations theory
 *  There is limit to 100 permutations to create, permutations amount grows fast with amount of noises in sequence
 */

BeatboxTool.prototype.refreshAmount = function(){
    if(this.sequence.length < 3) 
        this.permutationsAmount = this.sequence.length;
    else{
        var mainFactorial = 1, uniqueNoises = [];
        for(i = 0; i < this.sequence.length; i++){
            mainFactorial *= (i+1);
            if($.inArray(this.sequence[i], uniqueNoises) == -1)
                uniqueNoises.push(this.sequence[i]);
        }
    
        var divisionFactorial = 1, tempAmount, tempFactorial;
        for(i = 0; i < uniqueNoises.length; i++){
            tempAmount = 0, tempFactorial = 1;
            for(j = 0; j < this.sequence.length; j++)
                if(uniqueNoises[i] == this.sequence[j])
                    tempFactorial *= ++tempAmount;
            divisionFactorial *= tempFactorial;
        }

        this.permutationsAmount = mainFactorial/divisionFactorial;
        if(this.permutationsAmount > 100)
            this.permutationsAmount = 100;
    }
};



/*
 *  NAME: refreshHTML
 *  PARAMETERS: -
 *  DESCRIPTION: creates permutations of sequence if possible (max 100)
 *  This function calls 'refreshAmount' function, then makes 'divPermutations' empty.
 *  Then in for loop creates permutations randomly (dashes between noises) end adds them to the view
 */

BeatboxTool.prototype.refreshHTML = function(){
    this.refreshAmount();
    this.divPermutations.empty();
    var permutations = [], newPermutation, randomCell;
    if(this.permutationsAmount == 0){
        this.divPermutations.append('<div id="permutationsEmpty">Choose noises first</div>');
    }else{
        this.divPermutations.append('<div id="permutationsAmount">Permutations: '+this.permutationsAmount+'</div>');
    }
    for(i = 0; i < this.permutationsAmount; i++ ){
        do{
            newPermutation = this.sequence;
            for(j = (newPermutation.length-1); j >= 0; j--){
                randomCell = ((j == 0) ? 0 : Math.round(Math.random()*j));
                newPermutation.push(this.sequence[randomCell]);
                newPermutation.splice(randomCell, 1);
            }
        }while($.inArray(newPermutation.join("-"),permutations) >= 0);
        permutations[i] = newPermutation.join("-");

        this.divPermutations.append('<div class="perm">'+newPermutation.join("-")+'</div>');
    }
};



/*
 *  NAME: clickPermutation
 *  PARAMETERS: clicked
 *  DESCRIPTION: function 
 */

BeatboxTool.prototype.clickPermutation = function(clicked){
    var clickedPerm = clicked.split("-");
    iAudio = [];
    for(i = 0; i < clickedPerm.length; i++){
        for(j = 0; j < noises.length; j++){
            if(clickedPerm[i] == noises[j].sign){
                iAudio[i] = noises[j].audio;
                break;
            }
        }
    }
    iNoise = 0;
    this.playNext();
};



/*
 *  NAME: playNext
 *  PARAMETERS: -
 *  DESCRIPTION: function uses recursion, because playing noises is asynchronic.
 *  This function allow to play noises one by one
 *  It is problem to stop playing permutation, because noises changes really fast
 */

BeatboxTool.prototype.playNext = function(){
    function playNextNoise(){
        if(iNoise < iAudio.length){
            iAudio[iNoise].play();
            iAudio[iNoise].onended = function() {
                iNoise++;
                playNextNoise();
            }
        }
    }
    playNextNoise();
};

