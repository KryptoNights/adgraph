// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AdGraph {
    struct Profile {
        address owner;

        string[] apps;
        mapping(string => string[]) tags;

        string[] blocked_tags;
        string[] blocked_apps;
    }

    mapping(address => Profile) public profiles;

    event TagAdded(address profile, string app, string tag);

    function add_tag_to_profile(
        address profile,
        string calldata app,
        string calldata tag
    ) public {
        // if profile doesn't exist, create it
        if (profiles[profile].owner == address(0)) {
            profiles[profile].owner = profile;
        }

        // if app or tag is blocked, raise an error
        for (uint256 i = 0; i < profiles[profile].blocked_tags.length; i++) {
            require(keccak256(bytes(profiles[profile].blocked_tags[i])) != keccak256(bytes(tag)), "Tag is blocked");
        }
        for (uint256 i = 0; i < profiles[profile].blocked_apps.length; i++) {
            require(keccak256(bytes(profiles[profile].blocked_apps[i])) != keccak256(bytes(app)), "App is blocked");
        }

        // add app if it doesn't exist
        bool app_exists = false;
        for (uint256 i = 0; i < profiles[profile].apps.length; i++) {
            if (keccak256(bytes(profiles[profile].apps[i])) == keccak256(bytes(app))) {
                app_exists = true;
                break;
            }
        }
        if (!app_exists) {
            profiles[profile].apps.push(app);
        }

        // add tag if it doesn't exist
        bool tag_exists = false;
        for (uint256 i = 0; i < profiles[profile].tags[app].length; i++) {
            if (keccak256(bytes(profiles[profile].tags[app][i])) == keccak256(bytes(tag))) {
                tag_exists = true;
                break;
            }
        }
        if (!tag_exists) {
            profiles[profile].tags[app].push(tag);
        }

        // emit event
        emit TagAdded(profile, app, tag);

        // return
        return;
    }

    function block_tag(address profile, string calldata tag) public {
        require(profiles[profile].owner == msg.sender, "Not the owner");

        // if profile doesn't exist, create it
        if (profiles[profile].owner == address(0)) {
            profiles[profile].owner = profile;
        }

        // add tag to blocked tags
        profiles[profile].blocked_tags.push(tag);

        // return
        return;
    }

    function block_app(address profile, string calldata app) public {
        require(profiles[profile].owner == msg.sender, "Not the owner");

        // if profile doesn't exist, create it
        if (profiles[profile].owner == address(0)) {
            profiles[profile].owner = profile;
        }

        // add app to blocked apps
        profiles[profile].blocked_apps.push(app);

        // return
        return;
    }

    function remove_tag_from_profile(
        address profile,
        string calldata app,
        string calldata tag
    ) public {
        // require msg.sender to be the owner of the profile
        require(profiles[profile].owner == msg.sender, "Not the owner");

        // if profile doesn't exist, create it
        if (profiles[profile].owner == address(0)) {
            profiles[profile].owner = profile;
        }

        // remove tag
        for (uint256 i = 0; i < profiles[profile].tags[app].length; i++) {
            if (keccak256(bytes(profiles[profile].tags[app][i])) == keccak256(bytes(tag))) {
                delete profiles[profile].tags[app][i];
                break;
            }
        }

        // return
        return;
    }

    function remove_app_from_profile(address profile, string memory app) public {
        // require msg.sender to be the owner of the profile
        require(profiles[profile].owner == msg.sender, "Not the owner");

        // if profile doesn't exist, create it
        if (profiles[profile].owner == address(0)) {
            profiles[profile].owner = profile;
        }

        // remove app
        for (uint256 i = 0; i < profiles[profile].apps.length; i++) {
            if (keccak256(bytes(profiles[profile].apps[i])) == keccak256(bytes(app))) {
                delete profiles[profile].apps[i];
                break;
            }
        }

        // return
        return;
    }

    function get_apps(address profile) public view returns (string[] memory) {
        return profiles[profile].apps;
    }

    function get_tags(address profile, string calldata app)
        public
        view
        returns (string[] memory)
    {
        // payment logic
        return profiles[profile].tags[app];
    }
}