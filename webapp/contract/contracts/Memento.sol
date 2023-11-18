//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Memento {
    struct Box {
        address recipient;
        address sender;
        bytes memento;
        uint256 expiration_date;
        string receiver_email;
    }

    event MementoCreated(
        address indexed sender,
        address indexed receiver,
        uint256 id
    );

    mapping(uint256 => Box) private mementoes;

    function create(
        uint256 id,
        address recipient,
        bytes memory memento,
        uint256 expiration_date,
        string memory receiver_email
    ) public {
        require(
            mementoes[id].sender == address(0),
            "Mememento already exists!!"
        );

        Box memory box = Box({
            recipient: recipient,
            sender: msg.sender,
            memento: memento,
            receiver_email: receiver_email,
            expiration_date: expiration_date
        });

        mementoes[id] = box;
        emit MementoCreated(box.sender, box.recipient, id);
    }

    function getMemento(uint256 id) public view returns (Box memory) {
        return mementoes[id];
    }
}
