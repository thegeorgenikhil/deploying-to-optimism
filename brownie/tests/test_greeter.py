from brownie import Greeter, accounts

def test_greeter():
    greeter = Greeter.deploy("Hello World!", {'from': accounts[0]})
    assert greeter.greet() == "Hello World!"

def test_setGreeting():
    greeter = Greeter.deploy("Hello World!", {'from': accounts[0]})
    greeter.setGreeting("Hola, Mundo!", {'from': accounts[0]})
    assert greeter.greet() == "Hola, Mundo!"