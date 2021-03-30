import os
import time
import sys


def add():
    b = int(input('Please enter the first number:\nroot@cj.py~ '))
    c = int(input('Please enter the second number:\nroot@cj.py~'))
    d = b + c
    print('Result:- ' + str(d))


def sub():
    b = int(input('Please enter the first number:\nroot@cj.py~ '))
    c = int(input('Please enter the second number:\nroot@cj.py~'))
    d = b - c
    print('Result:- ' + str(d))


def div():
    b = int(input('Please enter the numerator:\nroot@cj.py~ '))
    c = int(input('Please enter the denominator:\nroot@cj.py~'))
    d = b / c
    print('Result:- ' + str(d))


def mul():
    b = int(input('Please enter the first number:\nroot@cj.py~ '))
    c = int(input('Please enter the second number:\nroot@cj.py~'))
    d = b * c
    print('Result:- ' + str(d))


def exp():
    b = int(input('Please enter the base number:\nroot@cj.py~ '))
    c = int(input('Please enter the exponent:\nroot@cj.py~'))
    d = b ** c
    print('Result:- ' + str(d))


def Calculator():
    z = f'''
    1) Addition
    2) Subtraction
    3) Division
    4) Multiplication
    5) Exponents
    '''
    print(z)
    l = input(
        "Please select an option by entering it's corresponding number:\nroot@cj.py~")
    if l[0] == '1':
        add()
    elif l[0] == '2':
        sub()
    elif l[0] == '3':
        div()
    elif l[0] == '4':
        mul()
    elif l[0] == '5':
        exp()
    try:
        input("Press enter to continue \n")
    except SyntaxError:
        pass

    main()


def clear():
    os.system('cls')
    os.system('color a')


def Greeting():
    x = input("Please enter your name here:\nroot@cj.py~ ")
    print("Hello, " + x + ".\nWelcome, to my first python program!")

    try:
        input("Press enter to continue            ")
    except SyntaxError:
        pass

    main()


def Exit():
    print("Thank you for using my program, hope we will meet soon! ;)")
    sys.exit()


def main():
    clear()
    q = f'''
    1) Calculator
    2) Greeting
    3) Exit
    '''
    print(q)
    a = input(
        "Please select an option by entering it's corresponding number:\nroot@cj.py~")
    if a[0] == '1':
        Calculator()
    elif a[0] == "2":
        Greeting()
    elif a[0] == '3':
        Exit()


main()
