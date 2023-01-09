from brownie import Greeter, accounts

def main():
    account = accounts.load('main')
    Greeter.deploy("Hello, Brownie!", {'from': account}, publish_source=True)