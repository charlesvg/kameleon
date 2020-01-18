From https://gist.github.com/natedana/cc71d496b611e70673cab5e8f5a78485

# How to copy a GitHub repo without forking

GitHub only lets you fork a repo once, if you want to make more than one copy of a project here's how you can do it.
Useful for starter code.

1. Create a new empty folder for your project and initialize git

    ```sh
    cd where-you-keep-your-projects
    mkdir your-project-name
    cd your-project-name
    git init
    ```

1. "Pull" the repo you want to copy:

    ```sh
    # git url is the same as the clone URL
    git pull git-url-of-the-repo-you-want-to-copy
    ```

1. Create a new repository for your project on GitHub
1. Push your code to the new repository you just created

    ```
    git remote add origin git-url-of-the-new-repo-you-created
    git push -u origin master
    ```