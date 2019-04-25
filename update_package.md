update package
==============

- copy directory /home/ste/.config/sublime-text-3/Packages/SyntaxMapfile to /home/ste/Documents
- remove files from /home/ste/.config/sublime-text-3/Packages/SyntaxMapfile except
	- Comments.tmPreferences
	- LICENSE
	- README.md
	- mapfile.sublime-syntax
- update mapfile.sublime-syntax
- git commit -am "Update some keywords according to mapserver 7.2.2 documentation"
- git tag -a 1.0.3 -m "new release with some updated keywords according mapserver documentation 7.2.2"
- git push --follow-tags

- new release will be active automatically (Package Control will check it for updates approximately once per hour. The Last Seen date on the package detail page of this site will show the last time (UTC) when the package information was refreshed.) [https://packagecontrol.io/docs/submitting_a_package]