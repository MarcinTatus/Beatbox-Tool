/*
 *
 *	Marcin Tatuś
 *	7IGR_S 2018
 *	WSTI w Katowicach
 *  
 *  NAME: tables.js
 *  DESCRIPTION: JavaScript file with global variables
 *  
 */


/****************************************** MAYBE CHANGE WAV TO MP3 ?????????????????? */
/*
 *  DESCRIPTION: Every noise have four parameters
 *  > the name of noise (some of them was created for this program)
 *  > the sign of noise (some of them was created for this program too)
 *  > audio is JavaScript element with path in "wav" folder
 *  > folder is important to match noise to folders in view
 */

function Noise(name, sign, audio, folder) {
    this.name = name;
    this.sign = sign;
    this.audio = audio;
    this.folder = folder;
}



/*
 *  DESCRIPTION: Global table of objects - noises (29 objects)
 */

var noises = [
    new Noise(  'BMG snare',            'bmg',      new Audio('wav/snares/bmg_snare.wav'),             'Snares'        ),
    new Noise(  'Bongo drum',           'Gn!',      new Audio('wav/snares/bongo_gn.wav'),              'Snares'        ),
    new Noise(  'Bongo inward',         '^Um',      new Audio('wav/snares/bongo_um.wav'),              'Snares'        ),
    new Noise(  'Clap snare inward',    '^Kch',     new Audio('wav/snares/clap_snare_inward.wav'),     'Snares'        ),
    new Noise(  'Clap snare outward',   'Kch',      new Audio('wav/snares/clap_snare_outward.wav'),    'Snares'        ),
    new Noise(  'Click',                'cli',      new Audio('wav/clicks/click.wav'),                 'Clicks'        ),
    new Noise(  'Clickroll',            'clr',      new Audio('wav/clicks/clickroll.wav'),             'Clicks'        ),
    new Noise(  'Dolphin noise high',   'dolp^',    new Audio('wav/sound_effects/dolphin_high.wav'),   'Sound effects' ),
    new Noise(  'Dolphin noise low',    'dolp_',    new Audio('wav/sound_effects/dolphin_low.wav'),    'Sound effects' ),
    new Noise(  'Down clap',            'cla_',     new Audio('wav/clicks/clap_down.wav'),             'Clicks'        ),
    new Noise(  'Drum snare',           'Pf',       new Audio('wav/snares/drum_snare.wav'),            'Snares'        ),
    new Noise(  'Dry kick',             'd',        new Audio('wav/kicks/dry_kick.wav'),               'Kicks'         ),
    new Noise(  'f hi-hat',             'f',        new Audio('wav/hihats/hihat_f.wav'),               'Hi-hats'       ),
    new Noise(  'Hi-hat closed',        't',        new Audio('wav/hihats/closed_hihat.wav'),          'Hi-hats'       ),
    new Noise(  'Hi-hat opened',        'ts',       new Audio('wav/hihats/opened_hihat.wav'),          'Hi-hats'       ),
    new Noise(  'Hollow clap',          'cla!',     new Audio('wav/clicks/clap_hollow.wav'),           'Clicks'        ),
    new Noise(  'Horse clap',           'cla',      new Audio('wav/clicks/clap_horse.wav'),            'Clicks'        ),
    new Noise(  'House snare',          'Psh',      new Audio('wav/snares/house_snare.wav'),           'Snares'        ),
    new Noise(  'Inward Ms snare',      '^Ms',      new Audio('wav/snares/ms_snare_inward.wav'),       'Snares'        ),
    new Noise(  'Kick',                 'P',        new Audio('wav/kicks/kick.wav'),                   'Kicks'         ),
    new Noise(  'Kick + hi-hat',        'Ps',       new Audio('wav/snares/kick_and_hihat_outward.wav'),'Snares'        ),
    new Noise(  'Laser sound',          'tsf',      new Audio('wav/sound_effects/laser.wav'),          'Sound effects' ),
    new Noise(  'Little rimshot',       'k',        new Audio('wav/snares/little_rimshot.wav'),        'Snares'        ),
    new Noise(  'Moduled click',        'cli!',     new Audio('wav/clicks/click_moduled.wav'),         'Clicks'        ),
    new Noise(  'Throat kick',          'ng',       new Audio('wav/kicks/throat_kick.wav'),           'Kicks'         ),
    new Noise(  'Outward Ngsh snare',   'Ngsh',     new Audio('wav/snares/outward_ngsh.wav'),          'Snares'        ),
    new Noise(  'Outward Uch snare',    'Uch',      new Audio('wav/snares/outward_uch.wav'),           'Snares'        ),
    new Noise(  'Rimshot',              'K',        new Audio('wav/snares/rimshot.wav'),               'Snares'        ),
    new Noise(  'Water drop',           'uwhit',    new Audio('wav/sound_effects/water_drop.wav'),     'Sound effects' )
];



/*
 *  DESCRIPTION: Global table of the names of folders (5 elements)
 */

var folders = [
    'Clicks',
    'Hi-hats',
    'Kicks',
    'Snares',
    'Sound effects'
];



/*
 *  DESCRIPTION: The two global variables.
 *  To play permutation we need global table of noises and global iterator of permutation elements.
 *  In class it has not been working.
 */

var iAudio = [];
var iNoise = 0;