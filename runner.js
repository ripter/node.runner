// runner.js
// Created by Chris Richards
// December 1st, 2009
//
// If the directory changes, reload node.
// useage: ./node runner.js code/start.js
//
var sys = require("sys"); 
var child_proc;
var file = process.cwd() + "/" + process.ARGV[2];
//Watch the Directory for changes
var reg = /\/.*\//;

sys.puts( "Regex: " +  );
//This will create and run the child process.
function run()
{
    //If the Process is already running, kill it.
    if( undefined !== child_proc )
    {
	child_proc.kill();
    }

    //Create the Process
    child_proc = process.createChildProcess("./node", [file] );
    sys.puts("Starting: " + file);

    //Display Output
    child_proc.addListener("output", function(data) {
	sys.puts("Output: " + data);
    });
    //Display Error
    child_proc.addListener("error", function(data) {
	sys.puts("Error: " + data);
    });
    //Disply Exit
    child_proc.addListener("exit", function(data) {
	sys.puts("Exit: " + data);
    });

}

//Watch the file for changes
if( undefined === child_proc ) 
{ 
    //Watch for file changes
    process.watchFile( reg.exec(file), function(cur, prev) {
	sys.puts("File: " + file + " has changed.");
	//Restart the child
	run();
    });

    //Start the frist run
    run();    
}
