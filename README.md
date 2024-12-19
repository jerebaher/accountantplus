# Expenses Manager

This project is a personal expense manager devveloped by @jerebaher with Python and Django

## Virtual enviroment:"venv"- setup

This section is using the official [Documentation]("https://docs.python.org/es/3/tutorial/venv.html")
as reference

#### 1. Once we have Python and **venv** installed we'll specify the python package with the _-m_ flag to use an already installed module

```python
python -m venv <directory_name>
```

#### 2. After creation we activate the enviroment inside our terminal.

On Linux

```Linux
source <directory-name>/bin/activate.<shell-extension>
```

On Windows

```Windows
<directory-name>\Scripts\activate.<user_shell>
```

#### 3. To install packages inside the venv we use the commands

`python -m pip install <package-name> `

for specific versioning:

`python -m pip install <package-name>==<version>`

to upgrade our packages:

` python -m pip install --upgrade <package-name>`

#### 4. Creating a requirements.txt

The requirements.txt file is the convention for python packages such as this one.
We can list our packages inside the venv by executing the command `python -m pip list`

```
(directory-name) $ python -m pip list
Package  Version
-------- -------
asgiref  3.8.1
Django   5.1.4
pip      24.3.1
sqlparse 0.5.3
tzdata   2024.2
```

to transfer the list as an requirements file with autoformatting we use

`python -m pip freeze >requirements.txt`

to obtain the following file:

```
(directory-name) $ cat requirements.txt

asgiref==3.8.1
Django==5.1.4
sqlparse==0.5.3
tzdata==2024.2
```
#### 5. To install our venv after activation we use the command 

`pip install -r requirements.txt`


#### 6. Keep updating the file when adding new packages. 
If done manually specify version 

## Initialize project
To initialize the project the following steps were made

#### 1. Run `django-admin start project expense_manager`

#### 2.  If first start Run `python manage.py runserver`
    the following must be printed
    ```python
    Watching for file changes with StatReloader
    Performing system checks...

    System check identified no issues (0 silenced).

    You have 18 unapplied migration(s). Your project may not work properly until you apply the migrations for app(s): admin, auth, contenttypes, sessions.
    Run 'python manage.py migrate' to apply them.
    December 13, 2024 - 19:18:26
    Django version 5.1.4, using settings 'expense_manager.settings'
    Starting development server at http://127.0.0.1:8000/
    Quit the server with CTRL-BREAK.
    ```

