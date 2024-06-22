import { useWriteContract, useReadContract } from 'wagmi'

export const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profile",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "app",
                "type": "string"
            }
        ],
        "name": "block_app",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profile",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "tag",
                "type": "string"
            }
        ],
        "name": "block_tag",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profile",
                "type": "address"
            }
        ],
        "name": "get_apps",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profile",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "app",
                "type": "string"
            }
        ],
        "name": "get_tags",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profile",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "app",
                "type": "string"
            }
        ],
        "name": "remove_app_from_profile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "profile",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "app",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "tag",
                "type": "string"
            }
        ],
        "name": "remove_tag_from_profile",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const CONTRACT = "0x1966cc76d20c88EF2C30d12F61ca4509Cc1f228C";

const { writeContract } = useWriteContract()

export async function get_profile(profile: string) {
    const apps_response = useReadContract({
        abi: ABI,
        address: CONTRACT,
        functionName: "get_apps",
        args: [profile]
    });

    if (!apps_response.error) {
        const apps = apps_response.data as string[];
    
        const map = new Map<string, string[]>()
        for (const app of apps) {
            const tags_response = useReadContract({
                abi: ABI,
                address: CONTRACT,
                functionName: "get_tags",
                args: [profile, app]
            })
            if (!tags_response.error) {
                map.set(app, tags_response.data as string[])
            }
        }
        return map
    } else {
        return null
    }
}

export async function block_app(profile: string, app: string) {
    return writeContract({
        abi: ABI,
        address: CONTRACT,
        functionName: "block_app",
        args: [profile, app]
    });
}

export async function block_tag(profile: string, tag: string) {
    return writeContract({
        abi: ABI,
        address: CONTRACT,
        functionName: "block_tag",
        args: [profile, tag]
    });
}

export async function remove_app_from_profile(profile: string, app: string) {
    return writeContract({
        abi: ABI,
        address: CONTRACT,
        functionName: "remove_app_from_profile",
        args: [profile, app]
    });
}

export async function remove_tag_from_profile(profile: string, app: string, tag: string) {
    return writeContract({
        abi: ABI,
        address: CONTRACT,
        functionName: "remove_tag_from_profile",
        args: [profile, app, tag]
    });
}