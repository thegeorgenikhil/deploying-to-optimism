// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Greeter.sol";

contract CounterTest is Test {
    Greeter public greeter;

    function setUp() public {
        greeter = new Greeter("Hello, Forge!");
    }

    function testGreet() public {
        assertEq(greeter.greet(), "Hello, Forge!");
    }

    function testSetGreeting() public {
        greeter.setGreeting("Hello, World!");
        assertEq(greeter.greet(), "Hello, World!");
    }
}
