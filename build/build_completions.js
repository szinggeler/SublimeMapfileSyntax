/**
 * Convert a source file into sublime snippets
 *
 *
 *   ## Running The Build ##
 *
 *   Just run `node build_completions.js` and it will rake the source.txt file and then write the new completions
 *   in the '1-mapfile-completions.sublime-completions' file.
 *
 *   Everything before the first `(` will be used as the filename.
 *
 */

var fs = require('fs');

function makeTemplateMetadata(line, quotes) {
    // turn wms_style_[style_name]_title###Title of the layer. [style_name] = the name of the style.
    // into wms_style_${1:[style_name]}_occurances${2: # Title of the layer. [style_name] = the name of the style.}
    var content = '';
    var lineparts = line.split('$$$');
    // auto generate a name
    var triggerName = lineparts[0].trim();

    var myRegExp = /\[[a-zA-Z-_]*\]/g;
    var itemnames = myRegExp.exec(triggerName);

    if (itemnames) {
        var itPart0 = itemnames.input.split('[');
        var itPart1 = itemnames.input.split(']');
        content = itPart0[0] + '${1:' + itemnames[0] + '}' + itPart1[1];
    } else {
        content = triggerName;
    }


    if (quotes) {
        if (lineparts.length > 1) {
            content += '\\"' + lineparts[1] + '\\"${2:text}';
            if (lineparts.length > 2 && lineparts[2].length > 5) {
                content += '\\"${3:\t#.  ' + lineparts[2] + '}';
            } else {
                content += '\\"';
            }
        } else {
            content += '\\"';
        }
    } else {

    }

    // return the nice template
    var rowparts = [];
    rowparts.push("\t{ \"trigger\": \"");
    rowparts.push(triggerName);
    if (quotes) {
        rowparts.push("\\t\\\"...\\\"");
    }
    rowparts.push("\", \"contents\": \"");
    if (quotes) {
        rowparts.push("\\\"");
    }
    rowparts.push(content);
    rowparts.push("\" },\n");

    var row = rowparts.join('');
    return row;
}

fs.readFile('source.txt', function(err, data) {
    var templateFunction = makeTemplateMetadata;
    var quotes = false;
    // start our completions_text string with the opening object and array
    var completions_text = '{\n  "scope": "source.map",\n\n  "completions": [\n';
    if (err) throw err;
    // split the file into an array of lines
    var lines = data.toString().split('\n');
    for (var i in lines) {
        // leave out the commented lines
        if (lines[i][0] !== '#') {
            completions_text += templateFunction(lines[i], quotes);
        } else {
            if (lines[i][1] === 'M') {  //  #METADATA
                quotes = true;
            } else {
                quotes = false;
            }
        }
    }
    // cap off the end
    completions_text += '  ]\n}';
    // write to file
    fs.writeFile('1-mapfile-completions.sublime-completions', completions_text, function(err) {
        if (err) throw err;
        console.log('file saved');
    });
});
