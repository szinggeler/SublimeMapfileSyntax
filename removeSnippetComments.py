import sublime, sublime_plugin

class RemoveSnippetCommentsCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        # self.view.insert(edit, 0, "")
        comments = self.view.find_all(" *\t*#\.  .*\n")
        comments.reverse()
        for r in comments:
            self.view.erase(edit, r)

        trailing_white_space = self.view.find_all("[\t ]+$")
        trailing_white_space.reverse()
        for r in trailing_white_space:
            self.view.erase(edit, r)
