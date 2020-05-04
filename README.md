# AFT-Notes-MVC 

## install
So all the taskrunners included in the Gruntfile.js will be installed, you will have to enter this into your console
      
        $ npm install
 

## start server
You have to start your server, whether it is xampp, mamp or docker.
       
## start grunt
       $ grunt

## installed taskrunners
There were several taskrunners installed for this main file. 
One example is **'less'**, where less files were translated into css files. 
Next one is **'concat'**. This one concatenates some files and the output is one single file. 
**'cssmin'**, **'htmlmin'** and **'uglify'** will leave minified versions of css, html and js sourcecode.
The taskrunner **'compress'** will leave a compressed directory from the files. **'copy'** does make a 
safety copy of your files onto your local drive. Another taskrunner installed in this project is **'jsbeautifier'**
it beautifies your minified js code and therefore returns it to its original state.
         
**'browserSync'** is a grunt task, which can watch your files as you work. 
Changes you make will either be injected into the page (CSS & images) or will cause all browsers 
to do a full-page refresh. In addition to that **'watch'** will emit a watch event when watched files 
are modified. This is useful if you would like a simple notification when files are edited or if you're 
using this task in tandem with another task.

You can execute all of these taskrunners by running

       $ grunt (nameOfTheTask)
e.g  

       $ grunt htmlmin
            
You can also call upon registered Task, which will execute all of those entered
tasks, when called upon. For this project the following registered Tasks were created.
You can add them to your Gruntfile.js like this.
                      
       grunt.registerTask('default', ['less', 'concat', 'cssmin', 'htmlmin', 'uglify', 'compress', 'copy']);               
       grunt.registerTask('beautifyjs', ['jsbeautifier']);
       grunt.registerTask('serve', ['default', 'browserSync', 'watch']);
            
To execute them enter this for example
       
       $ grunt serve
       
The default tasks will be called upon, if you only entered 
       
       $ grunt