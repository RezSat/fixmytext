let inputTextBox = document.querySelector('.input-box');
let outputTextBox = document.querySelector('.output-box');
let copyMessage = document.querySelector('.copyMessage');
var fixingText;

document.getElementById('fixBtn').addEventListener('click', function() {
    let inputText = inputTextBox.value;
    fixedText = inputText;
    let fixedText = FixText();
    outputTextBox.value = fixedText;
});

document.getElementById('clearBtn').addEventListener('click', function() {
    inputTextBox.value = "";
    outputTextBox.value = "";
});


document.getElementById('copyBtn').addEventListener('click', function() {
    let outputText = outputTextBox.value;
    navigator.clipboard.writeText(outputText)
        .then(() => {
            copyMessage.textContent = "Copied successfully!";
            setTimeout(function() {
                copyMessage.textContent = ""
            }, 2000);
            
        })
        .catch(err => {
            copyMessage.textContent = "Failed to copy";
            console.error('Failed to copy: ', err);
        });
});


// Declaring Consonants:
var consonants = [];

// Non-Unicode consonants (conjunct letters) with glyphs in the Unicode font
consonants["CI"] = "ක්‍ෂ"; // Ksha
consonants["Cj"] = "ක්‍ව"; // Kwa
consonants["Ë"] = "ක්‍ෂ"; // Ksha (alternate representation)
consonants["†"] = "ත්‍ථ"; // Ttha
consonants["…"] = "ත්‍ව"; // Twa
consonants["‡"] = "න්‍ද"; // Nda
consonants["JO"] = "න්‍ධ"; // Ndha
consonants["Š"] = "ද්‍ධ"; // Ddha
consonants["`O"] = "ද්‍ධ"; // Ddha (alternate representation)
consonants["„"] = "ද්‍ව"; // Dwa
consonants["`j"] = "ද්‍ව"; // Dwa (alternate representation)

// Unicode consonants
consonants["`o"] = "ඳ";   // Nda
consonants["`P"] = "ඦ";   // Nya
consonants["`v"] = "ඬ";   // Nda
consonants["`."] = "ඟ";   // Nga
consonants["`y"] = "ඟ";   // Nga (uncertain)
consonants["P"] = "ඡ";    // Cha
consonants["X"] = "ඞ";    // Nga
consonants["r"] = "ර";     // Ra
consonants["I"] = "ෂ";    // Sha
consonants["U"] = "ඹ";    // Ba
consonants["c"] = "ජ";     // Ja
consonants["V"] = "ඪ";    // Da
consonants[">"] = "ඝ";    // Gha
consonants["L"] = "ඛ";    // Kha
consonants["<"] = "ළ";    // La
consonants["K"] = "ණ";    // Na
consonants["M"] = "ඵ";    // Pa
consonants["G"] = "ඨ";    // Ta
consonants["¿"] = "ළු";   // Lu
consonants["Y"] = "ශ";    // Sha
consonants["["] = "ඤ";    // Nya
consonants["{"] = "ඥ";    // Nya
consonants["|"] = "ඳ";    // Nda
consonants["~"] = "ඬ";    // Nda
consonants["CO"] = "ඣ";   // Ja
consonants["®"] = "ඣ";    // Ja (alternate representation)
consonants["Õ"] = "ඟ";    // Nga
consonants["n"] = "බ";     // Ba
consonants["p"] = "ච";     // Cha
consonants["v"] = "ඩ";     // Da
consonants["*"] = "ෆ";     // Fa
consonants["."] = "ග";     // Ga
consonants["y"] = "හ";     // Ha
consonants["l"] = "ක";     // Ka
consonants[","] = "ල";     // La
consonants["u"] = "ම";     // Ma
consonants["k"] = "න";     // Na
consonants["m"] = "ප";     // Pa
consonants["o"] = "ද";     // Da
consonants["i"] = "ස";     // Sa
consonants["g"] = "ට";     // Ta
consonants["j"] = "ව";     // Wa
consonants[";"] = "ත";     // Ta
consonants["N"] = "භ";     // Bha
consonants["h"] = "ය";     // Ya
consonants["O"] = "ධ";     // Dha
consonants[":"] = "ථ";     // Tha

// non-repeating vowels in the sinhala language
var nonRepeatingVowels = [
    "ැ", // Short vowel 'æ'
    "ෑ", // Long vowel 'æ'
    "ි",  // Short vowel 'i'
    "ී",  // Long vowel 'i'
    "ු",  // Short vowel 'u'
    "ූ",  // Long vowel 'u'
    "්",  // Consonant sign
    "ා",  // Long vowel 'a'
    "ෙ",  // Short vowel 'e'
    "ේ",  // Long vowel 'e'
    "ෛ",  // Diphthong vowel 'ai'
    "ො",  // Short vowel 'o'
    "ෝ",  // Long vowel 'o'
    "ෲ",  // Diphthong vowel 'u'
    "ෘ"   // Diphthong vowel 'ru'
];

function escapeRE(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function replaceSeq(fm_pre, fm_post, un_pre, un_post) {
    for (fm in consonants) {
        var re = new RegExp(escapeRE(fm_pre + fm + fm_post), "g");
        fixingText = fixingText.replace(re, un_pre + consonants[fm] + un_post);
    }
    return fixingText;
}

// Function to replace specific patterns in the input text with corresponding Roman numerals
function NumberReplacements() {
    let outputText = outputTextBox.value;

    const replacements = [
        { pattern: /:ස\*|\(ස\)/g, replacement: "(i)" },
        { pattern: /:සස\*|\(සස\)/g, replacement: "(ii)" },
        { pattern: /:සසස\*|\(සසස\)/g, replacement: "(iii)" },
        { pattern: /:සඩ\*|\(සඩ\)/g, replacement: "(iv)" },
        { pattern: /:ඩ\*|\(ඩ\)/g, replacement: "(v)" },
        { pattern: /:ඩස\*|\(ඩස\)/g, replacement: "(vi)" },
        { pattern: /:ඩසස\*|\(ඩසස\)/g, replacement: "(vii)" },
        { pattern: /:ඩසසස\*|\(ඩසසස\)/g, replacement: "(viii)" },
        { pattern: /:සං\*|\(සං\)/g, replacement: "(ix)" },
        { pattern: /:ං\*|\(ං\)/g, replacement: "(x)" },
        { pattern: /:ංස\*|\(ංස\)/g, replacement: "(xi)" },
        { pattern: /:ංසස\*|\(ංසසස\)/g, replacement: "(xii)" },
        { pattern: /:ංසසස\*|\(ංසසස\)/g, replacement: "(xiii)" },
        { pattern: /:ංසඩ\*|\(ංසඩ\)/g, replacement: "(xiv)" },
        { pattern: /:ංඩ\*|\(ංඩ\)/g, replacement: "(xv)" },
        { pattern: /:ංඩස\*|\(ංඩස\)/g, replacement: "(xvi)" },
        { pattern: /ක්‍ඳා/g, replacement: "ඤා" } // Correct a common typing error
    ];

    // Perform all replacements
    replacements.forEach(({ pattern, replacement }) => {
        outputText = outputText.replace(pattern, replacement);
    });

    // Update the input element with the modified text
    outputTextBox.value = outputText;
}
function FixText() {
    // Correct common errors
    fixingText = fixingText.replace(/A/g, "a")
                           .replace(/=/g, "q")
                           .replace(/\+/g, "Q");

    // Replace multiple vowels of the same type with one
    fixingText = fixingText.replace(/a{2,}/g, "a") //"්"
                         .replace(/q{2,}/g, "q") //"ු"
                         .replace(/Q{2,}/g, "Q") //"ූ"
                         .replace(/s{2,}/g, "s") //"ි"
                         .replace(/S{2,}/g, "S") //"ී"
                         .replace(/%{2,}/g, "%"); // Rakaransaya

    // Replace uncommon sequences
    fixingText = fixingText.replace(/ff;%/g, "ත්‍රෛ")
                         .replace(/fm%!/g, "ප්‍රෞ");

    // Replace specific sequences using a helper function
    fixingText = replaceSeq("ff", "", "", "ෛ").replace(/fft/g, "එෛ"); // Special non-conso
    fixingText = replaceSeq("f", "Hda", "", "්‍යෝ");
    fixingText = replaceSeq("f", "Hd", "", "්‍යො");
    fixingText = replaceSeq("f", "H", "", "\u0DCA\u200D\u0DBA\u0DD9"); // ්‍යෙ

    const replacements_1 = [
        { pattern: /fI%da/g, replacement: "ෂ්‍රෝ" },
        { pattern: /f>%da/g, replacement: "‍ඝ්‍රෝ" },
        { pattern: /fY%da/g, replacement: "ශ්‍රෝ" },
        { pattern: /fCI%da/g, replacement: "ක්‍ෂ්‍රෝ" },
        { pattern: /fË%da/g, replacement: "ක්‍ෂ්‍රෝ" },
        { pattern: /fn%da/g, replacement: "බ්‍රෝ" },
        { pattern: /fv%da/g, replacement: "ඩ්‍රෝ" },
        { pattern: /f\*%da/g, replacement: "ෆ්‍රෝ" },
        { pattern: /f\.%da/g, replacement: "ග්‍රෝ" },
        { pattern: /fl%da/g, replacement: "ක්‍රෝ" },
        { pattern: /fm%da/g, replacement: "ප්‍රෝ" },
        { pattern: /føda/g, replacement: "ද්‍රෝ" },
        { pattern: /fi%da/g, replacement: "ස්‍රෝ" },
        { pattern: /fg%da/g, replacement: "ට්‍රෝ" },
        { pattern: /f\;%da/g, replacement: "ත්‍රෝ" },

        { pattern: /fY%d/g, replacement: "ශ්‍රො" },
        { pattern: /fv%d/g, replacement: "ඩ්‍රො" },
        { pattern: /f\*%d/g, replacement: "ෆ්‍රො" },
        { pattern: /f\.%d/g, replacement: "ග්‍රො" },
        { pattern: /fl%d/g, replacement: "ක්‍රො" },
        { pattern: /fm%d/g, replacement: "ප්‍රො" },
        { pattern: /fi%d/g, replacement: "ස්‍රො" },
        { pattern: /fg%d/g, replacement: "ට්‍රො" },
        { pattern: /f\;%d/g, replacement: "ත්‍රො" },

        { pattern: /fød/g, replacement: "ද්‍රො" },

        { pattern: /%a/g, replacement: "a%" }, // can swap
        { pattern: /fYa%/g, replacement: "ශ්‍රේ%" },
        { pattern: /f\*a%/g, replacement: "ෆ්‍රේ%" },
        { pattern: /f\.a%/g, replacement: "ග්‍රේ%" },
        { pattern: /fla%/g, replacement: "ක්‍රේ%" },
        { pattern: /fma%/g, replacement: "ප්‍රේ%" },
        { pattern: /fia%/g, replacement: "ස්‍රේ%" },
        { pattern: /f\;\w%/g, replacement: "ත්‍රේ%" },        

        { pattern: /fí%/g, replacement: "බ්‍රේ" },
        { pattern: /fâ%/g, replacement: "ඩ්‍රේ" },
        { pattern: /føa/g, replacement: "ද්‍රේ" },
        { pattern: /fè%/g, replacement: "ධ්‍රේ" },

        { pattern: /fI%/g, replacement: "ෂ්‍රෙ" },
        { pattern: /fY%/g, replacement: "ශ්‍රෙ" },
        { pattern: /fn%/g, replacement: "බ්‍රෙ" },
        { pattern: /f\*%/g, replacement: "ෆ්‍රෙ" },
        { pattern: /f\.%/g, replacement: "ග්‍රෙ" },
        { pattern: /fl%/g, replacement: "ක්‍රෙ" },
        { pattern: /fm%/g, replacement: "ප්‍රෙ" },
        { pattern: /fi%/g, replacement: "ස්‍රෙ" },
        { pattern: /f\;%/g, replacement: "ත්‍රෙ" },
        { pattern: /fN%/g, replacement: "භ්‍රෙ" },
        { pattern: /fO%/g, replacement: "ධ්‍රෙ" },

        { pattern: /fø/g, replacement: "ද්‍රෙ" },

    ];

    // Apply all replacements_1
    replacements_1.forEach(({ pattern, replacement }) => {
        fixingText = fixingText.replace(pattern, replacement);
    });


    fixingText = replaceSeq("f", "!", "", "ෞ");
    fixingText = replaceSeq("f", "da", "", "ෝ");
    fixingText = replaceSeq("f", "d", "", "ො");
    fixingText = replaceSeq("f", "a", "", "ේ"); // shorter hal glyph is 'A' e.g. in ළේ

    const replacements_2 = [
        { pattern: /fþ/g, replacement: "ඡේ" },
        { pattern: /fÜ/g, replacement: "ටේ" },
        { pattern: /fõ/g, replacement: "වේ" },
        { pattern: /fò/g, replacement: "ඹේ" },
        { pattern: /fï/g, replacement: "මේ" },
        { pattern: /fí/g, replacement: "බේ" },
        { pattern: /fè/g, replacement: "ධේ" },
        { pattern: /fâ/g, replacement: "ඩේ" },
        { pattern: /få/g, replacement: "ඬේ" },
        { pattern: /fÙ/g, replacement: "ඞේ" },
        { pattern: /f¾/g, replacement: "රේ" },
        { pattern: /fÄ/g, replacement: "ඛේ" },
        { pattern: /fÉ/g, replacement: "චේ" },
        { pattern: /fÊ/g, replacement: "ජේ" },
    ];

    // Apply all replacements_2 to the text
    replacements_2.forEach(({ pattern, replacement }) => {
        fixingText = fixingText.replace(pattern, replacement);
    });

    fixingText = replaceSeq("f", "", "", "ෙ");

    // Replace specific patterns with their corresponding characters
    fixingText = fixingText.replace(/hH_/g, "ර්‍ය්‍ය"); // Replace "hH_" with "ර්‍ය්‍ය" (for "ර්ය")
    fixingText = fixingText.replace(/hœ/g, "ර්‍ය්‍ය"); // Replace "hœ" with "ර්‍ය්‍ය" (for "ර්‍්‍ය")

    // Note: The font does not seem to support "ර්‍්‍ය" for anything other than "ය"
    // Therefore, keep the replication disabled for now
    // fixingText = replaceSeq("", "H_", "\u0DBB\u0DCA\u200D", "්‍ය");
    // fixingText = replaceSeq("", "œ", "\u0DBB\u0DCA\u200D", "්‍ය");

    // Example of replacing "h_" with "ර්‍ය" (added for clarity)
    // fixingText = fixingText.replace(/h_/g, "ර්‍ය"); 

    // Use replication rules to replace underscores with the appropriate character
    fixingText = replaceSeq("", "_", "\u0DBB\u0DCA\u200D", "");

    // Special letters (mostly special glyphs in the FM font)
    const replacements_3 = [
        { pattern: /rE/g, replacement: "රූ" },
        { pattern: /re/g, replacement: "රු" },
        { pattern: /\?/g, replacement: "රෑ" }, // added
        { pattern: /\//g, replacement: "රැ" }, // =
        { pattern: /ƒ/g, replacement: "ඳැ" }, // =
        { pattern: /\\/g, replacement: "ඳා" }, // added
        { pattern: /Æ/g, replacement: "ලූ" },
        { pattern: /¨/g, replacement: "ලු" }, // corrected
        { pattern: /ø/g, replacement: "ද්‍ර" },
        { pattern: /÷/g, replacement: "ඳු" },
        { pattern: /`ÿ/g, replacement: "ඳු" }, // added
        { pattern: /ÿ/g, replacement: "දු" },
        { pattern: /ª/g, replacement: "ඳූ" }, // added
        { pattern: /`¥/g, replacement: "ඳූ" }, // added
        { pattern: /¥/g, replacement: "දූ" }, // added
        // { pattern: /μ/g, replacement: "ද්‍ය" }, // one version of the FM fonts use this
        { pattern: /ü/g, replacement: "ඤූ" }, // =
        { pattern: /û/g, replacement: "ඤු" }, // =
        { pattern: /£/g, replacement: "ඳී" },
        { pattern: /`§/g, replacement: "ඳී" },
        { pattern: /§/g, replacement: "දී" },
        { pattern: /°/g, replacement: "ඣී" },
        { pattern: /Á/g, replacement: "ඨී" },
        { pattern: /Â/g, replacement: "ඡී" },
        { pattern: /Ç/g, replacement: "ඛී" },
        { pattern: /Í/g, replacement: "රී" },
        { pattern: /Ð/g, replacement: "ඪී" },
        { pattern: /Ò/g, replacement: "ථී" },
        { pattern: /Ô/g, replacement: "ජී" },
        { pattern: /Ö/g, replacement: "චී" },
        { pattern: /Ú/g, replacement: "ඵී" },
        { pattern: /Ý/g, replacement: "ඵී" },
        { pattern: /à/g, replacement: "ටී" },
        { pattern: /é/g, replacement: "ඬී" },
        { pattern: /`ã/g, replacement: "ඬී" },
        { pattern: /ã/g, replacement: "ඩී" },
        { pattern: /ë/g, replacement: "ධී" },
        { pattern: /î/g, replacement: "බී" },
        { pattern: /ó/g, replacement: "මී" },
        { pattern: /ö/g, replacement: "ඹී" },
        { pattern: /ù/g, replacement: "වී" },
        { pattern: /Ú/g, replacement: "ඵී" },
        { pattern: /Œ/g, replacement: "ණී" },
        { pattern: /“/g, replacement: " ර්‍ණ" },
        { pattern: /¢/g, replacement: "ඳි" },
        { pattern: /`È/g, replacement: "ඳි" },
        { pattern: /È/g, replacement: "දි" },
        { pattern: /¯/g, replacement: "ඣි" },
        { pattern: /À/g, replacement: "ඨි" },
        { pattern: /Å/g, replacement: "ඛි" },
        { pattern: /ß/g, replacement: "රි" },
        { pattern: /Î/g, replacement: "ඪි" },
        { pattern: /Ñ/g, replacement: "චි" },
        { pattern: /Ó/g, replacement: "ථි" },
        { pattern: /á/g, replacement: "ටි" },
        { pattern: /ç/g, replacement: "ඬි" },
        { pattern: /`ä/g, replacement: "ඬි" },
        { pattern: /ä/g, replacement: "ඩි" },
        { pattern: /ê/g, replacement: "ධි" },
        { pattern: /ì/g, replacement: "බි" },
        { pattern: /ñ/g, replacement: "මි" },
        { pattern: /ý/g, replacement: "ඡි" }, // added
        { pattern: /ð/g, replacement: "ජි" },
        { pattern: /ô/g, replacement: "ඹි" },
        { pattern: /ú/g, replacement: "වි" },
        { pattern: /ˉ/g, replacement: "ඣි" },
        { pattern: /‚/g, replacement: "ණි" },
        { pattern: /‹/g, replacement: "ද්‍ධි" }, // added
        { pattern: /‰/g, replacement: "ද්‍වි" }, // added
        { pattern: /þ/g, replacement: "ඡ්" },
        { pattern: /Ü/g, replacement: "ට්" },
        { pattern: /õ/g, replacement: "ව්" },
        { pattern: /ò/g, replacement: "ඹ්" },
        { pattern: /ï/g, replacement: "ම්" },
        { pattern: /í/g, replacement: "බ්" },
        { pattern: /è/g, replacement: "ධ්" },
        { pattern: /â/g, replacement: "ඩ්" },
        { pattern: /å/g, replacement: "ඬ්" },
        { pattern: /`Ù/g, replacement: "ඬ්" },
        { pattern: /Ù/g, replacement: "ඞ්" },
        { pattern: /¾/g, replacement: "ර්" },
        { pattern: /Ä/g, replacement: "ඛ්" },
        { pattern: /É/g, replacement: "ච්" },
        { pattern: /Ê/g, replacement: "ජ්" },
        { pattern: /×/g, replacement: "ඥා" }, // ඥ
        { pattern: /Ø/g, replacement: "ඤා" }, // ඤ
        { pattern: /F/g, replacement: "ත්‍" }, // todo - can we make bandi akuru for these
        { pattern: /J/g, replacement: "න්‍" },
        { pattern: /Þ/g, replacement: "දා" },
        { pattern: /±/g, replacement: "දැ" },
        { pattern: /ˆ/g, replacement: "න්‍දා" },
        { pattern: /›/g, replacement: "ශ්‍රී" }
    ];

    // Apply all replacements_4 to the text
    replacements_3.forEach(({ pattern, replacement }) => {
        fixingText = fixingText.replace(pattern, replacement);
    });

    // Vowel Replacements
    const vowelReplacements = [
        { pattern: /ft/g, replacement: "ඓ" },
        { pattern: /T!/g, replacement: "ඖ" },
        { pattern: /W!/g, replacement: "ඌ" },
        { pattern: /wE/g, replacement: "ඈ" },
        { pattern: /wd/g, replacement: "ආ" },
        { pattern: /we/g, replacement: "ඇ" },
        { pattern: /ta/g, replacement: "ඒ" },
        { pattern: /RD/g, replacement: "ඎ" },
        { pattern: /R/g, replacement: "ඍ" },
        { pattern: /Ï/g, replacement: "ඐ" },
        { pattern: /´/g, replacement: "ඕ" },
        { pattern: /Ta/g, replacement: "ඕ" }, // Error correcting
        { pattern: /Ì/g, replacement: "ඏ" },
        { pattern: /b/g, replacement: "ඉ" },
        { pattern: /B/g, replacement: "ඊ" },
        { pattern: /t/g, replacement: "එ" },
        { pattern: /T/g, replacement: "ඔ" },
        { pattern: /W/g, replacement: "උ" },
        { pattern: /w/g, replacement: "අ" },
    ];

    // Special Cases
    const specialCases = [
        { pattern: /`Co/g, replacement: "ඤ" },
        { pattern: /`G/g, replacement: "ට්ඨ" } // Very rare
    ];

    // Apply all vowel replacements to the text
    vowelReplacements.forEach(({ pattern, replacement }) => {
        fixingText = fixingText.replace(pattern, replacement);
    });

    // Apply all special case replacements to the text
    specialCases.forEach(({ pattern, replacement }) => {
        fixingText = fixingText.replace(pattern, replacement);
    });   
}